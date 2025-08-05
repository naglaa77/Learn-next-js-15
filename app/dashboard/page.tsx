import Link from "next/link";

export default function DashboardPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">
            Welcome to Dashboard
          </h2>
          <p className="text-gray-600">
            Monitor your application's performance and team activity
          </p>
        </div>
        <Link href="/" className="text-blue-600 hover:text-blue-800 underline">
          ← Back to Home
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-gradient-to-r from-blue-500 to-purple-600 text-white p-6 rounded-lg">
          <h3 className="text-lg font-semibold mb-2">Quick Actions</h3>
          <div className="space-y-2">
            <button className="block w-full text-left p-2 hover:bg-white/10 rounded">
              📊 View Detailed Analytics
            </button>
            <button className="block w-full text-left p-2 hover:bg-white/10 rounded">
              👥 Manage Team
            </button>
            <button className="block w-full text-left p-2 hover:bg-white/10 rounded">
              ⚙️ Settings
            </button>
          </div>
        </div>

        <div className="bg-gradient-to-r from-green-500 to-teal-600 text-white p-6 rounded-lg">
          <h3 className="text-lg font-semibold mb-2">Recent Activity</h3>
          <div className="space-y-2 text-sm">
            <div className="flex items-center space-x-2">
              <span>🔄</span>
              <span>System backup completed</span>
            </div>
            <div className="flex items-center space-x-2">
              <span>📧</span>
              <span>New user registration</span>
            </div>
            <div className="flex items-center space-x-2">
              <span>🔔</span>
              <span>Performance alert resolved</span>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white border border-gray-200 p-6 rounded-lg">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          Parallel Routes Demo
        </h3>
        <p className="text-gray-600 mb-4">
          This dashboard demonstrates Next.js 15 Parallel Routes. Notice how the
          Analytics and Team sections are rendered simultaneously alongside the
          main content, each in their own designated areas.
        </p>
        <div className="bg-yellow-50 border border-yellow-200 p-4 rounded-lg">
          <h4 className="font-semibold text-yellow-800 mb-2">Key Features:</h4>
          <ul className="text-sm text-yellow-700 space-y-1">
            <li>• Analytics slot (@analytics) - Shows real-time metrics</li>
            <li>• Team slot (@team) - Displays team members and status</li>
            <li>• Main content (children) - This area you're reading now</li>
            <li>• All rendered in parallel within the same layout</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
