# Routing Examples

This directory contains examples and documentation for Next.js 15 routing features.

## Episode 18: Parallel Routes

### How to Test

1. **Start the development server**:
   ```bash
   npm run dev
   ```

2. **Navigate to the dashboard**:
   - Go to `http://localhost:3000/dashboard`
   - Or click "Dashboard" in the navigation bar

3. **What you'll see**:
   - **Main Content Area**: Welcome message, quick actions, and explanation of parallel routes
   - **Analytics Section**: Real-time metrics (page views, conversion rate, revenue)
   - **Team Section**: Team members with online status and last active times

### Key Features Demonstrated

- **Parallel Rendering**: All three sections (main, analytics, team) render simultaneously
- **Independent Layout**: Each section has its own styling and content
- **Responsive Design**: Layout adapts to different screen sizes
- **Slot Props**: The layout receives `children`, `analytics`, and `team` as props

### File Structure

```
app/dashboard/
├── layout.tsx              # Receives slot props and renders them
├── page.tsx                # Main content (children slot)
├── @analytics/
│   └── page.tsx            # Analytics slot content
└── @team/
    └── page.tsx            # Team slot content
```

### Understanding the Code

1. **Layout Component**: `app/dashboard/layout.tsx` receives three props:
   - `children`: The main dashboard content
   - `analytics`: Content from `@analytics/page.tsx`
   - `team`: Content from `@team/page.tsx`

2. **Slot Components**: Each slot (`@analytics` and `@team`) has its own page component that renders independently.

3. **URL Structure**: The URL remains `/dashboard` - the slots don't affect the URL structure.

### Benefits Shown

- **Modularity**: Each section can be developed independently
- **Performance**: Content loads in parallel
- **Maintainability**: Clear separation of concerns
- **User Experience**: Users see content as it becomes available

### Next Steps

In the next episode, we'll explore:
- Conditional rendering of slots
- Loading states for parallel routes
- Error boundaries for slots
- Advanced slot patterns 