"use client";

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";

export default function DashboardPage() {
  const { data: session } = useSession();
  const [repos, setRepos] = useState([]);
  const [loadingRepos, setLoadingRepos] = useState(true);
  const [deployRepo, setDeployRepo] = useState(null);

  // Fetch GitHub repos for the logged-in user
  useEffect(() => {
    async function fetchRepos() {
      if (!session?.accessToken) {
        setLoadingRepos(false);
        return;
      }
      try {
        const res = await fetch("https://api.github.com/user/repos", {
          headers: {
            Authorization: `Bearer ${session.accessToken}`,
            Accept: "application/vnd.github+json",
          },
        });
        const data = await res.json();
        setRepos(data);
      } catch (err) {
        setRepos([]);
      } finally {
        setLoadingRepos(false);
      }
    }
    fetchRepos();
  }, [session]);

  const stats = [
    {
      title: "Projects",
      value: repos.length.toString(),
      description: "GitHub repositories",
      icon: "/rocket.png",
      color: "bg-blue-50 text-blue-600",
    },
    {
      title: "Deployments",
      value: "47",
      description: "Successful deployments this month",
      icon: "/deployment.png",
      color: "bg-green-50 text-green-600",
    },
    {
      title: "Team Members",
      value: "8",
      description: "Active team members",
      icon: "/collaboration.png",
      color: "bg-purple-50 text-purple-600",
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-base font-semibold">Dashboard</h1>
          <p className="text-xs text-gray-600 mt-1">
            Welcome back! Here's what's happening with your projects.
          </p>
        </div>
        <Button asChild>
          <Link href="/dashboard/projects">
            <span>View All Projects</span>
          </Link>
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {stats.map((stat) => (
          <Card key={stat.title} className="bg-white">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">
                {stat.title}
              </CardTitle>
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center ${stat.color}`}
              >
                <img src={stat.icon} alt={stat.title} className="text-lg" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-gray-900">
                {stat.value}
              </div>
              <p className="text-xs text-gray-600 mt-1">{stat.description}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Recent Repositories Table */}
      <Card className="bg-white">
        <CardHeader>
          <CardTitle>Recent Repositories</CardTitle>
        </CardHeader>
        <CardContent>
          {loadingRepos ? (
            <div>Loading repositories...</div>
          ) : repos.length === 0 ? (
            <div>No repositories found.</div>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full text-xs">
                <thead>
                  <tr className="bg-gray-50">
                    <th className="px-3 py-2 text-left font-medium text-gray-700">
                      Name
                    </th>
                    <th className="px-3 py-2 text-left font-medium text-gray-700">
                      Visibility
                    </th>
                    <th className="px-3 py-2 text-left font-medium text-gray-700">
                      Last Updated
                    </th>
                    <th className="px-3 py-2 text-left font-medium text-gray-700">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {repos.slice(0, 10).map((repo) => (
                    <tr
                      key={repo.id}
                      className="border-t border-gray-100 hover:bg-gray-50"
                    >
                      <td className="px-3 py-2 font-semibold text-gray-900 truncate">
                        <a
                          href={repo.html_url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="hover:underline"
                        >
                          {repo.name}
                        </a>
                      </td>
                      <td className="px-3 py-2">
                        <span
                          className={` px-2 py-1  ${
                            repo.private
                              ? "bg-yellow-100 text-yellow-800"
                              : "bg-green-100 text-green-800"
                          }`}
                        >
                          {repo.private ? "Private" : "Public"}
                        </span>
                      </td>
                      <td className="px-3 py-2 text-gray-500">
                        {new Date(repo.updated_at).toLocaleString("en-GB", {
                          day: "2-digit",
                          month: "short",
                          year: "numeric",
                          hour: "2-digit",
                          minute: "2-digit",
                          second: "2-digit",

                          hour12: false,
                        })}
                      </td>
                      <td className=" py-3">
                        <Button onClick={() => setDeployRepo(repo)}>
                          <span>Deploy</span>
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
          <Button variant="outline" className="w-full mt-4" asChild>
            <a
              href={`https://github.com/${
                session?.user?.login || ""
              }?tab=repositories`}
              target="_blank"
              rel="noopener noreferrer"
            >
              View All GitHub Repos
            </a>
          </Button>
        </CardContent>
      </Card>

      {/* Deploy Dialog */}
      <Dialog open={!!deployRepo} onOpenChange={() => setDeployRepo(null)}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Deploy Repository</DialogTitle>
          </DialogHeader>
          {deployRepo && (
            <div className="space-y-2">
              <div>
                <span className="font-semibold">Name:</span> {deployRepo.name}
              </div>
              <div>
                <span className="font-semibold">Visibility:</span>{" "}
                {deployRepo.private ? "Private" : "Public"}
              </div>
              <div>
                <span className="font-semibold">Last Updated:</span>{" "}
                {new Date(deployRepo.updated_at).toLocaleString("en-GB", {
                  day: "2-digit",
                  month: "short",
                  year: "numeric",
                  hour: "2-digit",
                  minute: "2-digit",
                  second: "2-digit",

                  hour12: false,
                })}
              </div>
              <div>
                <span className="font-semibold">URL:</span>{" "}
                <a
                  href={deployRepo.html_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 underline"
                >
                  {deployRepo.html_url}
                </a>
              </div>
            </div>
          )}
          <DialogFooter>
            <Button
              size="sm"
              className="w-full"
              onClick={() => {
                // TODO: Add your deploy logic here
                setDeployRepo(null);
              }}
            >
              <span>Confirm Deploy</span>
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
