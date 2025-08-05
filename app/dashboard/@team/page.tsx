const teamMembers = [
  {
    id: 1,
    name: "Sarah Johnson",
    role: "Product Manager",
    avatar: "👩‍💼",
    status: "online",
    lastActive: "2 min ago"
  },
  {
    id: 2,
    name: "Mike Chen",
    role: "Frontend Developer",
    avatar: "👨‍💻",
    status: "online",
    lastActive: "5 min ago"
  },
  {
    id: 3,
    name: "Emily Davis",
    role: "UX Designer",
    avatar: "👩‍🎨",
    status: "away",
    lastActive: "15 min ago"
  },
  {
    id: 4,
    name: "Alex Rodriguez",
    role: "Backend Developer",
    avatar: "👨‍🔧",
    status: "offline",
    lastActive: "1 hour ago"
  }
];

export default function TeamPage() {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="font-semibold text-gray-900">Team Members</h3>
        <span className="text-sm text-gray-500">{teamMembers.length} members</span>
      </div>
      
      <div className="space-y-3">
        {teamMembers.map((member) => (
          <div key={member.id} className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
            <div className="text-2xl">{member.avatar}</div>
            <div className="flex-1">
              <div className="flex items-center space-x-2">
                <h4 className="font-medium text-gray-900">{member.name}</h4>
                <span className={`inline-block w-2 h-2 rounded-full ${
                  member.status === 'online' ? 'bg-green-500' : 
                  member.status === 'away' ? 'bg-yellow-500' : 'bg-gray-400'
                }`}></span>
              </div>
              <p className="text-sm text-gray-600">{member.role}</p>
              <p className="text-xs text-gray-500">Last active: {member.lastActive}</p>
            </div>
          </div>
        ))}
      </div>
      
      <div className="mt-4 p-3 bg-blue-50 rounded-lg">
        <p className="text-sm text-blue-800">
          💬 Team chat available
        </p>
        <p className="text-xs text-blue-600 mt-1">
          Click on any member to start a conversation
        </p>
      </div>
    </div>
  );
} 