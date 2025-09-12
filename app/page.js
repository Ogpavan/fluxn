import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-white to-gray-100 flex items-center justify-center">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="space-y-8">
          <div className="space-y-6">
            <h1 className="text-5xl md:text-6xl font-bold text-gray-900 leading-tight">
              Deploy with
              <span className="text-blue-600 block">Confidence</span>
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
              Fluxon provides a seamless hosting platform for your applications.
              Deploy, monitor, and scale your projects with ease using our
              intuitive dashboard.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button size="lg" className="px-8 py-3 text-lg" asChild>
              <Link href="/auth/login">Get Started</Link>
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="px-8 py-3 text-lg"
              asChild
            >
              <Link href="/docs">View Docs</Link>
            </Button>
          </div>

          <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8 text-left">
            <div className="space-y-3">
              <div className="w-12 h-12 bg-blue-100 rounded flex items-center justify-center">
                <span className="text-2xl">🚀</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900">
                Fast Deployment
              </h3>
              <p className="text-gray-600">
                Deploy your applications in seconds with our optimized
                infrastructure.
              </p>
            </div>

            <div className="space-y-3">
              <div className="w-12 h-12 bg-green-100 rounded flex items-center justify-center">
                <span className="text-2xl">📊</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900">
                Real-time Monitoring
              </h3>
              <p className="text-gray-600">
                Track your application performance with detailed analytics and
                logs.
              </p>
            </div>

            <div className="space-y-3">
              <div className="w-12 h-12 bg-purple-100 rounded flex items-center justify-center">
                <span className="text-2xl">⚡</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900">
                Auto Scaling
              </h3>
              <p className="text-gray-600">
                Automatically scale your applications based on traffic and
                demand.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
