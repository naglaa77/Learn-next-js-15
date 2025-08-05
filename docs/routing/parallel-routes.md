# Episode 18: Parallel Routes in Next.js 15

## Overview

Parallel Routes allow you to simultaneously or conditionally render one or more pages within the same layout. They are particularly useful for highly dynamic sections of an app, such as dashboards and feeds on social sites.

## What are Parallel Routes?

Parallel Routes enable you to render multiple pages at the same time in the same layout. Each route is independent and can have its own loading and error states.

## File Structure Convention

Parallel routes are created using named slots with the `@folder` convention:

```
app/
├── dashboard/
│   ├── layout.tsx          # Parent layout that receives slot props
│   ├── page.tsx            # Main content (children slot)
│   ├── @analytics/
│   │   └── page.tsx        # Analytics slot
│   └── @team/
│       └── page.tsx        # Team slot
```

## Key Concepts

### 1. Slots
- Slots are defined with the `@folder` convention
- Each slot becomes a prop in the parent layout
- The `children` prop is an implicit slot (equivalent to `@children`)

### 2. Layout Props
The parent layout receives all slot components as props:

```typescript
export default function DashboardLayout({
  children,    // Main content (implicit slot)
  analytics,   // @analytics slot
  team,        // @team slot
}: {
  children: React.ReactNode;
  analytics: React.ReactNode;
  team: React.ReactNode;
}) {
  return (
    <div>
      {children}    {/* Main content area */}
      {analytics}   {/* Analytics section */}
      {team}        {/* Team section */}
    </div>
  );
}
```

### 3. URL Structure
- Slots do NOT affect the URL structure
- For `/dashboard/@analytics/views`, the URL remains `/dashboard/views`
- Slots are combined with regular pages to form the final route

## Implementation in Our Example

### Dashboard Layout (`app/dashboard/layout.tsx`)
```typescript
export default function DashboardLayout({
  children,
  analytics,
  team,
}: {
  children: React.ReactNode;
  analytics: React.ReactNode;
  team: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto p-6">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Dashboard</h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main content area */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-semibold text-gray-800 mb-4">Main Content</h2>
              {children}
            </div>
          </div>
          
          {/* Analytics slot */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-semibold text-gray-800 mb-4">Analytics</h2>
              {analytics}
            </div>
          </div>
        </div>
        
        {/* Team slot - full width below */}
        <div className="mt-6">
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Team</h2>
            {team}
          </div>
        </div>
      </div>
    </div>
  );
}
```

### Analytics Slot (`app/dashboard/@analytics/page.tsx`)
```typescript
export default function AnalyticsPage() {
  return (
    <div className="space-y-4">
      <div className="bg-blue-50 p-4 rounded-lg">
        <h3 className="font-semibold text-blue-900">Page Views</h3>
        <p className="text-2xl font-bold text-blue-700">12,847</p>
        <p className="text-sm text-blue-600">+12% from last month</p>
      </div>
      {/* More analytics widgets... */}
    </div>
  );
}
```

### Team Slot (`app/dashboard/@team/page.tsx`)
```typescript
export default function TeamPage() {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="font-semibold text-gray-900">Team Members</h3>
        <span className="text-sm text-gray-500">4 members</span>
      </div>
      {/* Team member list... */}
    </div>
  );
}
```

## Benefits of Parallel Routes

1. **Independent Loading**: Each slot can have its own loading state
2. **Conditional Rendering**: Slots can be conditionally rendered based on user permissions or other logic
3. **Better UX**: Users see content as it loads, rather than waiting for everything
4. **Modularity**: Each section can be developed and maintained independently

## Important Notes

- **URL Structure**: Slots don't affect the URL - they're purely for layout organization
- **Dynamic Slots**: If one slot is dynamic, all slots at that level must be dynamic
- **Children Slot**: The `children` prop is an implicit slot that doesn't need a folder
- **Performance**: Each slot can be loaded independently, improving perceived performance

## Use Cases

1. **Dashboards**: Analytics, team status, notifications
2. **Social Feeds**: Posts, trending topics, user suggestions
3. **E-commerce**: Product details, reviews, related items
4. **Admin Panels**: Multiple data views, user management, system status

## Next Steps

In the next episode, we'll explore:
- Conditional rendering of slots
- Loading and error states for parallel routes
- Advanced slot patterns and best practices 