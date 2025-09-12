import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function DashboardPage() {
  const stats = [
    {
      title: "Projects",
      value: "12",
      description: "Active projects",
      icon: "🚀",
      color: "bg-blue-50 text-blue-600",
    },
    {
      title: "Deployments",
      value: "47",
      description: "Successful deployments this month",
      icon: "📊",
      color: "bg-green-50 text-green-600",
    },
    {
      title: "Team Members",
      value: "8",
      description: "Active team members",
      icon: "👥",
      color: "bg-purple-50 text-purple-600",
    },
  ];

  const recentProjects = [
    { name: "E-commerce App", status: "Deployed", lastUpdate: "2 hours ago" },
    { name: "Blog Platform", status: "Building", lastUpdate: "5 minutes ago" },
    { name: "API Gateway", status: "Deployed", lastUpdate: "1 day ago" },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1>Dashboard</h1>
          <p>Welcome back! Here's what's happening with your projects.</p>
        </div>
        <Button asChild>
          <Link href="/dashboard/projects">View All Projects</Link>
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
                <span className="text-lg">{stat.icon}</span>
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

      {/* Recent Projects */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="bg-white">
          <CardHeader>
            <CardTitle>Recent Projects</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentProjects.map((project, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between py-2"
                >
                  <div>
                    <p>{project.name}</p>
                    <p>{project.lastUpdate}</p>
                  </div>
                  <div>
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-medium ${
                        project.status === "Deployed"
                          ? "bg-green-100 text-green-800"
                          : "bg-yellow-100 text-yellow-800"
                      }`}
                    >
                      {project.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
            <Button variant="outline" className="w-full mt-4" asChild>
              <Link href="/dashboard/projects">View All Projects</Link>
            </Button>
          </CardContent>
        </Card>

        <Card className="bg-white">
          <CardHeader>
            <CardTitle className="text-lg font-semibold text-gray-900">
              Quick Actions
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <Button
                className="w-full justify-start"
                variant="outline"
                asChild
              >
                <Link href="/dashboard/projects/new">
                  <span className="mr-2">🚀</span>
                  Deploy New Project
                </Link>
              </Button>
              <Button
                className="w-full justify-start"
                variant="outline"
                asChild
              >
                <Link href="/dashboard/settings">
                  <span className="mr-2">⚙️</span>
                  Manage Settings
                </Link>
              </Button>
              <Button
                className="w-full justify-start"
                variant="outline"
                asChild
              >
                <Link href="/docs">
                  <span className="mr-2">📚</span>
                  View Documentation
                </Link>
              </Button>
              <Button
                className="w-full justify-start"
                variant="outline"
                asChild
              >
                <Link href="/support">
                  <span className="mr-2">💬</span>
                  Contact Support
                </Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
