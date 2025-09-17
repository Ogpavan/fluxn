import { NextResponse } from "next/server";
import { spawn } from "child_process";
import path from "path";
import fs from "fs";
import os from "os";

export async function POST(req) {
  const { repoUrl, repoName, accessToken } = await req.json();
  if (!repoUrl || !repoName) {
    return NextResponse.json({ error: "Missing repoUrl or repoName" }, { status: 400 });
  }

  // Create a temp dir for this deployment
  const tempDir = path.join(os.tmpdir(), `deploy_${Date.now()}_${repoName}`);
  fs.mkdirSync(tempDir, { recursive: true });

  // Prepare the git clone command
  let cloneUrl = repoUrl;
  if (accessToken && repoUrl.startsWith("https://github.com/")) {
    // Insert token for private repo
    cloneUrl = repoUrl.replace(
      "https://github.com/",
      `https://${accessToken}:x-oauth-basic@github.com/`
    );
  }

  // Helper to run a shell command and stream output
  function runCmd(cmd, args, cwd, logStep) {
    return new Promise((resolve, reject) => {
      const proc = spawn(cmd, args, { cwd, shell: true });
      let output = "";
      proc.stdout.on("data", (data) => {
        output += data.toString();
        if (logStep) logStep(data.toString());
      });
      proc.stderr.on("data", (data) => {
        output += data.toString();
        if (logStep) logStep(data.toString());
      });
      proc.on("close", (code) => {
        if (code === 0) resolve(output);
        else reject(output);
      });
    });
  }

  // Collect logs for each step
  let stepLogs = "";

  function logStep(msg) {
    stepLogs += msg;
  }

  try {
    // 1. Clone repo
    stepLogs += "> Cloning repository...\n";
    await runCmd("git", ["clone", cloneUrl, tempDir], process.cwd(), logStep);

    // 2. Read package.json
    stepLogs += "\n> Reading package.json...\n";
    const pkgPath = path.join(tempDir, "package.json");
    if (!fs.existsSync(pkgPath)) {
      throw new Error("No package.json found in the repository.");
    }
    const pkg = JSON.parse(fs.readFileSync(pkgPath, "utf-8"));
    const deps = { ...pkg.dependencies, ...pkg.devDependencies };
    let framework = "node";
    if (deps["next"]) framework = "next";
    else if (deps["react-scripts"]) framework = "react";
    else if (deps["vite"]) framework = "vite";
    else if (deps["express"]) framework = "express";
    // Add more detection as needed

    stepLogs += `Detected framework: ${framework}\n`;

    // 3. Install dependencies
    stepLogs += "\n> Installing dependencies...\n";
    try {
      await runCmd("npm", ["install"], tempDir, logStep);
    } catch {
      await runCmd("yarn", [], tempDir, logStep);
    }

    // 4. Build and serve based on framework
    let serveCmd, serveArgs, buildCmd, buildArgs, serveUrl = "http://localhost:5000";
    if (framework === "next") {
      // Next.js: build then start
      stepLogs += "\n> Building Next.js app...\n";
      await runCmd("npm", ["run", "build"], tempDir, logStep);
      stepLogs += "\n> Starting Next.js app on port 5000...\n";
      serveCmd = "npx";
      serveArgs = ["next", "start", "-p", "5000"];
    } else if (framework === "react") {
      // React (CRA): build then serve
      stepLogs += "\n> Building React app...\n";
      await runCmd("npm", ["run", "build"], tempDir, logStep);
      stepLogs += "\n> Serving build folder on port 5000...\n";
      serveCmd = "npx";
      serveArgs = ["serve", "-s", "build", "-l", "5000"];
    } else if (framework === "vite") {
      // Vite: build then preview
      stepLogs += "\n> Building Vite app...\n";
      await runCmd("npm", ["run", "build"], tempDir, logStep);
      stepLogs += "\n> Previewing Vite build on port 5000...\n";
      serveCmd = "npx";
      serveArgs = ["vite", "preview", "--port", "5000"];
    } else if (framework === "express") {
      // Express: just start
      stepLogs += "\n> Starting Express app on port 5000...\n";
      serveCmd = "node";
      serveArgs = [pkg.main || "index.js"];
    } else {
      // Fallback: try npm start
      stepLogs += "\n> Starting app with npm start on port 5000...\n";
      serveCmd = "npm";
      serveArgs = ["start"];
    }

    // Start the server (non-blocking, so it doesn't hang the API)
    spawn(serveCmd, serveArgs, { cwd: tempDir, shell: true, detached: true, stdio: "ignore" }).unref();

    stepLogs += `\n> Success! Your repo is being served at ${serveUrl}\n`;

    return NextResponse.json({
      success: true,
      log: stepLogs,
      url: serveUrl,
      framework,
    });
  } catch (err) {
    stepLogs += `\n> Error: ${err.toString()}\n`;
    return NextResponse.json({ error: stepLogs }, { status: 500 });
  }
}
