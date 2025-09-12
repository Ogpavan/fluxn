"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
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
    console.log("Creating project:", { projectName, projectDescription });
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
          <h1 className="">Projects</h1>
          <p className="text-gray-600 mt-1">
            Manage and deploy your applications
          </p>
        </div>

        <Dialog open={isOpen} onOpenChange={setIsOpen}>
          <DialogTrigger asChild>
            <Button>Add New Project</Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Add New Project</DialogTitle>
              <DialogDescription>
                Create a new project to deploy your application. Fill in the
                details below.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="name" className="text-right">
                  Name
                </Label>
                <Input
                  id="name"
                  value={projectName}
                  onChange={(e) => setProjectName(e.target.value)}
                  placeholder="My awesome project"
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="description" className="text-right">
                  Description
                </Label>
                <Textarea
                  id="description"
                  value={projectDescription}
                  onChange={(e) => setProjectDescription(e.target.value)}
                  placeholder="Brief description of your project"
                  className="col-span-3"
                />
              </div>
            </div>
            <DialogFooter>
              <Button type="submit" onClick={handleCreateProject}>
                Create Project
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      {/* Projects Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {projects.map((project) => (
          <Card
            key={project.id}
            className="bg-white hover:shadow-lg transition-shadow"
          >
            <CardHeader>
              <div className="flex items-start justify-between">
                <CardTitle className="text-lg font-semibold text-gray-900 truncate">
                  {project.name}
                </CardTitle>
                <span
                  className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(
                    project.status
                  )}`}
                >
                  {project.status}
                </span>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                {project.description}
              </p>

              <div className="space-y-3">
                <div className="text-xs text-gray-500">
                  Last deployment: {project.lastDeployment}
                </div>

                <div className="flex space-x-2">
                  <Button
                    variant="outline"
                    size="sm"
                    asChild
                    className="flex-1"
                  >
                    <Link href={`/dashboard/projects/${project.id}`}>
                      View Details
                    </Link>
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
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Empty State */}
      {projects.length === 0 && (
        <Card className="bg-white">
          <CardContent className="flex flex-col items-center justify-center py-12">
            <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mb-4">
              <span className="text-4xl">🚀</span>
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              No projects yet
            </h3>
            <p className="text-gray-600 text-center mb-6 max-w-md">
              Get started by creating your first project. Deploy your
              applications with just a few clicks.
            </p>
            <Dialog open={isOpen} onOpenChange={setIsOpen}>
              <DialogTrigger asChild>
                <Button>Create Your First Project</Button>
              </DialogTrigger>
            </Dialog>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
