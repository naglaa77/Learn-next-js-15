export default function AnalyticsPage() {
  return (
    <div className="space-y-4">
      <div className="bg-blue-50 p-4 rounded-lg">
        <h3 className="font-semibold text-blue-900">Page Views</h3>
        <p className="text-2xl font-bold text-blue-700">12,847</p>
        <p className="text-sm text-blue-600">+12% from last month</p>
      </div>
      
      <div className="bg-green-50 p-4 rounded-lg">
        <h3 className="font-semibold text-green-900">Conversion Rate</h3>
        <p className="text-2xl font-bold text-green-700">3.2%</p>
        <p className="text-sm text-green-600">+0.8% from last month</p>
      </div>
      
      <div className="bg-purple-50 p-4 rounded-lg">
        <h3 className="font-semibold text-purple-900">Revenue</h3>
        <p className="text-2xl font-bold text-purple-700">$45,231</p>
        <p className="text-sm text-purple-600">+20% from last month</p>
      </div>
      
      <div className="text-sm text-gray-600 mt-4">
        <p>📊 Real-time analytics data</p>
        <p>🔄 Updates every 30 seconds</p>
      </div>
    </div>
  );
} 