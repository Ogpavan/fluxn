"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import Link from "next/link";

export default function ProjectsPage() {
  const [isOpen, setIsOpen] = useState(false);
  const [projectName, setProjectName] = useState("");
  const [projectDescription, setProjectDescription] = useState("");

  const projects = [
    {
      id: 1,
      name: "E-commerce Platform",
      description: "Full-stack e-commerce solution with React and Node.js",
      status: "Deployed",
      lastDeployment: "2 hours ago",
      url: "https://ecommerce.example.com",
    },
    {
      id: 2,
      name: "Blog Platform",
      description: "Personal blog built with Next.js and MDX",
      status: "Building",
      lastDeployment: "Building...",
      url: null,
    },
    {
      id: 3,
      name: "API Gateway",
      description: "Microservices API gateway with authentication",
      status: "Deployed",
      lastDeployment: "1 day ago",
      url: "https://api.example.com",
    },
    {
      id: 4,
      name: "Portfolio Website",
      description: "Personal portfolio with animations and contact form",
      status: "Deployed",
      lastDeployment: "3 days ago",
      url: "https://portfolio.example.com",
    },
    {
      id: 5,
      name: "Dashboard Analytics",
      description: "Real-time analytics dashboard for business metrics",
      status: "Failed",
      lastDeployment: "Build failed",
      url: null,
    },
    {
      id: 6,
      name: "Mobile App Backend",
      description: "REST API backend for mobile application",
      status: "Deployed",
      lastDeployment: "5 days ago",
      url: "https://mobile-api.example.com",
    },
  ];

  const handleCreateProject = () => {
    // Placeholder for project creation logic
    setIsOpen(false);
    setProjectName("");
    setProjectDescription("");
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "Deployed":
        return "bg-green-100 text-green-800";
      case "Building":
        return "bg-yellow-100 text-yellow-800";
      case "Failed":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-base font-semibold">Projects</h1>
          <p className="text-xs text-gray-600 mt-1">
            Manage and deploy your applications
          </p>
        </div>
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
          <DialogTrigger asChild>
            <Button size="sm">
              <span className="material-icons">Add New Project</span>
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle className="text-base">Add New Project</DialogTitle>
              <DialogDescription className="text-xs">
                Create a new project to deploy your application. Fill in the
                details below.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-3 py-2">
              <div className="grid grid-cols-4 items-center gap-2">
                <Label htmlFor="name" className="text-right text-xs">
                  Name
                </Label>
                <Input
                  id="name"
                  value={projectName}
                  onChange={(e) => setProjectName(e.target.value)}
                  placeholder="My awesome project"
                  className="col-span-3 text-xs"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-2">
                <Label htmlFor="description" className="text-right text-xs">
                  Description
                </Label>
                <Textarea
                  id="description"
                  value={projectDescription}
                  onChange={(e) => setProjectDescription(e.target.value)}
                  placeholder="Brief description of your project"
                  className="col-span-3 text-xs"
                />
              </div>
            </div>
            <DialogFooter>
              <Button type="submit" size="sm" onClick={handleCreateProject}>
                Create Project
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      {/* Minimal Table */}
      <div className="overflow-x-auto rounded border border-gray-200 bg-white">
        <table className="min-w-full text-xs">
          <thead>
            <tr className="bg-gray-50">
              <th className="px-3 py-2 text-left font-medium text-gray-700">
                Name
              </th>
              <th className="px-3 py-2 text-left font-medium text-gray-700">
                Description
              </th>
              <th className="px-3 py-2 text-left font-medium text-gray-700">
                Status
              </th>
              <th className="px-3 py-2 text-left font-medium text-gray-700">
                Last Deployment
              </th>
              <th className="px-3 py-2 text-left font-medium text-gray-700">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {projects.map((project) => (
              <tr
                key={project.id}
                className="border-t border-gray-100 hover:bg-gray-50"
              >
                <td className="px-3 py-2 font-semibold text-gray-900 truncate">
                  {project.name}
                </td>
                <td className="px-3 py-2 text-gray-600 truncate">
                  {project.description}
                </td>
                <td className="px-3 py-2 flex ">
                  <span
                    className={`px-2 py-1 rounded-full  ${getStatusColor(
                      project.status
                    )}`}
                  >
                    {project.status}
                  </span>
                </td>
                <td className="px-3 py-2 text-gray-500">
                  {project.lastDeployment}
                </td>
                <td className="px-3 py-2 flex gap-2">
                  <Button variant="outline" size="sm" asChild>
                    <Link href={`/dashboard/projects/${project.id}`}>View</Link>
                  </Button>
                  {project.url && (
                    <Button variant="outline" size="sm" asChild>
                      <a
                        href={project.url}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        🔗
                      </a>
                    </Button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Empty State */}
      {projects.length === 0 && (
        <div className="flex flex-col items-center justify-center py-12">
          <span className="text-4xl mb-4">🚀</span>
          <h3 className="text-base font-semibold text-gray-900 mb-2">
            No projects yet
          </h3>
          <p className="text-xs text-gray-600 text-center mb-6 max-w-md">
            Get started by creating your first project. Deploy your applications
            with just a few clicks.
          </p>
          <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger asChild>
              <Button size="sm">Create Your First Project</Button>
            </DialogTrigger>
          </Dialog>
        </div>
      )}
    </div>
  );
}
