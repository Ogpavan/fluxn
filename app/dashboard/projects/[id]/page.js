import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import { notFound } from "next/navigation";

// Mock data - in a real app, this would come from an API
const getProject = (id) => {
  const projects = {
    1: {
      id: "1",
      name: "E-commerce Platform",
      description: "Full-stack e-commerce solution with React and Node.js",
      status: "Deployed",
      url: "https://ecommerce.example.com",
      repository: "https://github.com/user/ecommerce-platform",
      framework: "Next.js",
      lastDeployment: "2 hours ago",
      deployments: [
        {
          id: "d1",
          commit: "abc123",
          message: "Fix checkout bug",
          status: "Deployed",
          time: "2 hours ago",
        },
        {
          id: "d2",
          commit: "def456",
          message: "Add payment integration",
          status: "Deployed",
          time: "1 day ago",
        },
        {
          id: "d3",
          commit: "ghi789",
          message: "Update UI components",
          status: "Deployed",
          time: "3 days ago",
        },
      ],
      logs: [
        "[2024-01-15 10:30:45] ✅ Build completed successfully",
        "[2024-01-15 10:30:42] 📦 Installing dependencies...",
        "[2024-01-15 10:30:15] 🔄 Starting build process",
        "[2024-01-15 10:30:10] 📡 Fetching latest changes from repository",
      ],
    },
    2: {
      id: "2",
      name: "Blog Platform",
      description: "Personal blog built with Next.js and MDX",
      status: "Building",
      url: null,
      repository: "https://github.com/user/blog-platform",
      framework: "Next.js",
      lastDeployment: "Building...",
      deployments: [
        {
          id: "d4",
          commit: "jkl012",
          message: "Add new blog post",
          status: "Building",
          time: "5 minutes ago",
        },
        {
          id: "d5",
          commit: "mno345",
          message: "Update theme",
          status: "Deployed",
          time: "2 days ago",
        },
      ],
      logs: [
        "[2024-01-15 10:35:20] 🔄 Build in progress...",
        "[2024-01-15 10:35:15] 📦 Installing dependencies...",
        "[2024-01-15 10:35:10] 🔄 Starting build process",
      ],
    },
  };

  return projects[id];
};

export default async function ProjectDetailsPage({ params }) {
  const { id } = await params;
  const project = getProject(id);

  if (!project) {
    notFound();
  }

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
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Button variant="ghost" asChild>
            <Link href="/dashboard/projects">← Back to Projects</Link>
          </Button>
          <div>
            <h1 className="text-3xl font-bold text-gray-900">{project.name}</h1>
            <p className="text-gray-600 mt-1">{project.description}</p>
          </div>
        </div>
        <div className="flex items-center space-x-3">
          <Badge className={getStatusColor(project.status)}>
            {project.status}
          </Badge>
          {project.url && (
            <Button variant="outline" asChild>
              <a href={project.url} target="_blank" rel="noopener noreferrer">
                🔗 Visit Site
              </a>
            </Button>
          )}
        </div>
      </div>

      {/* Project Info Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="bg-white">
          <CardHeader>
            <CardTitle className="text-sm font-medium text-gray-600">
              Framework
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold text-gray-900">
              {project.framework}
            </p>
          </CardContent>
        </Card>

        <Card className="bg-white">
          <CardHeader>
            <CardTitle className="text-sm font-medium text-gray-600">
              Last Deployment
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold text-gray-900">
              {project.lastDeployment}
            </p>
          </CardContent>
        </Card>

        <Card className="bg-white">
          <CardHeader>
            <CardTitle className="text-sm font-medium text-gray-600">
              Repository
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Button variant="outline" size="sm" asChild>
              <a
                href={project.repository}
                target="_blank"
                rel="noopener noreferrer"
              >
                View on GitHub
              </a>
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Deployments and Logs */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Deployments */}
        <Card className="bg-white">
          <CardHeader>
            <CardTitle>Recent Deployments</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {project.deployments.map((deployment) => (
                <div
                  key={deployment.id}
                  className="flex items-center justify-between py-2 border-b border-gray-100 last:border-b-0"
                >
                  <div className="flex-1">
                    <p className="font-medium text-gray-900 text-sm">
                      {deployment.message}
                    </p>
                    <p className="text-xs text-gray-500">
                      #{deployment.commit} • {deployment.time}
                    </p>
                  </div>
                  <Badge
                    className={`ml-3 ${getStatusColor(deployment.status)}`}
                  >
                    {deployment.status}
                  </Badge>
                </div>
              ))}
            </div>
            <Button variant="outline" className="w-full mt-4">
              View All Deployments
            </Button>
          </CardContent>
        </Card>

        {/* Build Logs */}
        <Card className="bg-white">
          <CardHeader>
            <CardTitle>Build Logs</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="bg-gray-900 rounded p-4 text-sm font-mono">
              <div className="space-y-1">
                {project.logs.map((log, index) => (
                  <div key={index} className="text-green-400">
                    {log}
                  </div>
                ))}
              </div>
            </div>
            <Button variant="outline" className="w-full mt-4">
              View Full Logs
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Actions */}
      <Card className="bg-white">
        <CardHeader>
          <CardTitle>Actions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-3">
            <Button>Redeploy</Button>
            <Button variant="outline">Configure Domain</Button>
            <Button variant="outline">Environment Variables</Button>
            <Button variant="outline">View Analytics</Button>
            <Button variant="destructive">Delete Project</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
