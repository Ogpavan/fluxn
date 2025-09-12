import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

export default function SettingsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Settings</h1>
        <p className="text-gray-600 mt-1">
          Manage your account and project settings
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Profile Settings */}
        <div className="lg:col-span-2">
          <Card className="bg-white">
            <CardHeader>
              <CardTitle>Profile Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="firstName">First Name</Label>
                  <Input
                    id="firstName"
                    placeholder="John"
                    defaultValue="John"
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label htmlFor="lastName">Last Name</Label>
                  <Input
                    id="lastName"
                    placeholder="Doe"
                    defaultValue="Doe"
                    className="mt-1"
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="email">Email Address</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="john@example.com"
                  defaultValue="john@example.com"
                  className="mt-1"
                />
              </div>

              <div>
                <Label htmlFor="bio">Bio</Label>
                <Textarea
                  id="bio"
                  placeholder="Tell us about yourself..."
                  defaultValue="Full-stack developer passionate about building scalable applications."
                  className="mt-1"
                />
              </div>

              <Button>Save Changes</Button>
            </CardContent>
          </Card>
        </div>

        {/* Account Actions */}
        <div className="space-y-6">
          <Card className="bg-white">
            <CardHeader>
              <CardTitle>Account Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h4 className="font-medium text-gray-900 mb-2">
                  Profile Picture
                </h4>
                <div className="flex items-center space-x-4">
                  <div className="w-16 h-16 bg-gray-300 rounded-full flex items-center justify-center">
                    <span className="text-xl font-medium text-gray-700">
                      JD
                    </span>
                  </div>
                  <Button variant="outline" size="sm">
                    Change Photo
                  </Button>
                </div>
              </div>

              <div>
                <h4 className="font-medium text-gray-900 mb-2">Security</h4>
                <Button variant="outline" className="w-full">
                  Change Password
                </Button>
              </div>

              <div>
                <h4 className="font-medium text-gray-900 mb-2">
                  Two-Factor Authentication
                </h4>
                <Button variant="outline" className="w-full">
                  Enable 2FA
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white border-red-200">
            <CardHeader>
              <CardTitle className="text-red-600">Danger Zone</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h4 className="font-medium text-gray-900 mb-2">Export Data</h4>
                <p className="text-sm text-gray-600 mb-3">
                  Download all your project data and configurations.
                </p>
                <Button variant="outline" className="w-full">
                  Export Account Data
                </Button>
              </div>

              <div>
                <h4 className="font-medium text-red-600 mb-2">
                  Delete Account
                </h4>
                <p className="text-sm text-gray-600 mb-3">
                  Once you delete your account, there is no going back. Please
                  be certain.
                </p>
                <Button variant="destructive" className="w-full">
                  Delete Account
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Team Settings */}
      <Card className="bg-white">
        <CardHeader>
          <CardTitle>Team Settings</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            <div>
              <Label htmlFor="teamName">Team Name</Label>
              <Input
                id="teamName"
                placeholder="My Awesome Team"
                defaultValue="Development Team"
                className="mt-1"
              />
            </div>

            <div>
              <h4 className="font-medium text-gray-900 mb-4">Team Members</h4>
              <div className="space-y-3">
                {[
                  {
                    name: "John Doe",
                    email: "john@example.com",
                    role: "Owner",
                  },
                  {
                    name: "Jane Smith",
                    email: "jane@example.com",
                    role: "Admin",
                  },
                  {
                    name: "Mike Johnson",
                    email: "mike@example.com",
                    role: "Member",
                  },
                ].map((member, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between py-2 border-b border-gray-100"
                  >
                    <div>
                      <p className="font-medium text-gray-900">{member.name}</p>
                      <p className="text-sm text-gray-600">{member.email}</p>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className="text-sm text-gray-500">
                        {member.role}
                      </span>
                      {member.role !== "Owner" && (
                        <Button variant="ghost" size="sm">
                          Remove
                        </Button>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              <div className="flex space-x-2 mt-4">
                <Input placeholder="Enter email address" className="flex-1" />
                <Button>Invite Member</Button>
              </div>
            </div>

            <Button>Save Team Settings</Button>
          </div>
        </CardContent>
      </Card>

      {/* Billing Settings */}
      <Card className="bg-white">
        <CardHeader>
          <CardTitle>Billing & Usage</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center p-4 border rounded">
              <div className="text-2xl font-bold text-gray-900">Free</div>
              <div className="text-sm text-gray-600">Current Plan</div>
              <div className="mt-2 text-xs text-gray-500">
                3 projects, 100 GB bandwidth
              </div>
            </div>

            <div className="text-center p-4 border rounded">
              <div className="text-2xl font-bold text-gray-900">12/100</div>
              <div className="text-sm text-gray-600">Projects Used</div>
              <div className="mt-2 text-xs text-gray-500">
                88 projects remaining
              </div>
            </div>

            <div className="text-center p-4 border rounded">
              <div className="text-2xl font-bold text-gray-900">45.2 GB</div>
              <div className="text-sm text-gray-600">Bandwidth Used</div>
              <div className="mt-2 text-xs text-gray-500">
                54.8 GB remaining
              </div>
            </div>
          </div>

          <div className="flex justify-center mt-6">
            <Button size="lg">Upgrade Plan</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
