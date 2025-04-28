This is a Next.js project bootstrapped with create-next-app.

Getting Started
First, run the development server:

npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
Open http://localhost:3000 with your browser to see the result.

You can start editing the page by modifying app/page.tsx. The page auto-updates as you edit the file.

This project uses next/font to automatically optimize and load Geist, a new font family for Vercel.

#########################################################################

🎬 05_Solving Hydration Mismatch Caused by Browser Extensions in Next.js


Introduction 🎥

Today, we’re tackling a common and confusing error you might see when working with Next.js:
hydration mismatch caused by browser extensions.

I'll explain exactly why it happens, and show you a clean and professional way to fix it. Let’s dive right in!"*

Part 1: Understanding the Problem 🎥
"So picture this:
You just created a fresh Next.js project, you open it in your browser, and boom — you get this error:

Hydration failed because the server rendered HTML didn't match the client.

*But wait… you haven't even written any code yet!
What’s going on?

Well, the real problem isn’t your code.
It's usually caused by a browser extension — things like ColorZilla, Grammarly, or even a password manager.

These extensions can inject extra attributes into your page before React has a chance to load.

For example, you might find something weird like:*

html
Copier
Modifier
<body cz-shortcut-listen="true">
This attribute wasn't sent from your server.
But on the client side, it’s there — and when React tries to "hydrate" — meaning match the server and client HTML — it spots the mismatch and throws an error."

Part 2: Why Is It a Problem? 🎥
*"Now, why should we care?

Well, in development, it’s just annoying.
But in production, it can slow down your app or even break critical features if the mismatches get worse.

Hydration errors are not something you want to ignore — especially if you're building a professional, reliable app."*

Part 3: How to Solve It Professionally 🎥
*"Alright, let’s fix this the right way.

✅ First, we don't want to ask developers to disable their extensions while working.
✅ Second, we need a solution that automatically cleans up the page only in production — without touching our real app code.

Here’s the clean approach:

Create a small React hook that checks the <body> after hydration and removes any unwanted attributes.

Create a tiny Client Component that calls that hook.

Place the component inside your layout's <body> tag.

This way, you keep everything safe, server components still work, and you don’t break anything important."*

Part 4: Example Code 🎥
"Let’s see the real code — clean, simple, and production-ready."

🔹 First, the hook:
File: utils/useCleanUnexpectedBodyAttributes.ts

```
'use client';

import { useEffect } from "react";

export const useCleanUnexpectedBodyAttributes = () => {
  useEffect(() => {
    if (typeof window === 'undefined') return;
    if (process.env.NODE_ENV !== 'production') return;

    const body = document.body;
    const attributesToRemove = ["cz-shortcut-listen"];

    attributesToRemove.forEach((attr) => {
      if (body.hasAttribute(attr)) {
        body.removeAttribute(attr);
        console.warn(`🚫 Removed unexpected attribute: ${attr}`);
      }
    });
  }, []);
};
```
🔹 Second, the component:
File: components/BodyCleaner.tsx

```
'use client';

import { useCleanUnexpectedBodyAttributes } from "@/utils/useCleanUnexpectedBodyAttributes";

export function BodyCleaner() {
  useCleanUnexpectedBodyAttributes();
  return null;
}
🔹 Finally, use it inside your layout.tsx:

tsx
Copier
Modifier
import { BodyCleaner } from "@/components/BodyCleaner";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="...">
        <BodyCleaner />
        {children}
      </body>
    </html>
  );
}
```
Part 5: Final Tips 🎥
*"With this setup:

✅ In development, nothing changes — you keep your fast and smooth debugging.
✅ In production, your app is clean, fast, and safe from browser extension interference.

It's:

Professional

Easy to maintain

100% clean React structure

And you never have to think about it again!"*

Outro 🎥
*"Alright, I hope this helped you understand hydration mismatches better — especially those sneaky ones caused by browser extensions!


##########################################################################


📚 Episode 06 - How to Create Routes and Navigate Between Pages in Next.js 15

In this episode, we will learn:

How to create new routes in Next.js 15

How layouts and pages work together

How to navigate between pages using client-side navigation

🛠️ Creating a New Route
In the app folder, you don't create a .tsx file directly.
Instead, you create a folder to define a route.

Example: Create a product route
Inside the app/ folder, create a folder called product/.

Inside product/, create a file named page.tsx.

Important: The file must be named page.tsx so that Next.js recognizes it as a route.

Here’s what the page.tsx file looks like:

tsx
Copier
Modifier
export default function ProductPage() {
return <h1>Hello from the Product page!</h1>;
}
Now, if you navigate to:

bash
Copier
Modifier
http://localhost:3000/product
You will see:

Hello from the Product page!

The layout (if you have one) stays the same, and only the children are updated.

📦 Another Example: Creating a user Route
In the app/ folder, create a folder named user/.

Inside user/, create a page.tsx file.

Example:

```
export default function UserPage() {
return <h1>Hello from the User page!</h1>;
}
```

Now, if you navigate to:
http://localhost:3000/user
You'll see the content from the User page, while the layout remains persistent.

🔗 Navigating Between Pages
To navigate between pages, we use the Link component from Next.js.
It provides client-side navigation, which is faster and preloads pages automatically.

In your index.tsx (home page), update the content:

```
import Link from 'next/link';

export default function HomePage() {
return (
<div>
<h1>Hello from the index page!</h1>
<Link href="/product">Go to Product</Link>
<br />
<Link href="/user">Go to User</Link>
</div>
);
}
```
❓ Why Not Use <a> Tags Directly?
If you use a standard <a> tag, Next.js will perform a hard refresh (the whole page reloads).
Using the Link component enables:

✅ Client-side navigation

✅ Prefetching routes automatically

✅ Better user experience

✅ Faster navigation

💡 Quick Summary
Create a folder for each route.

Add a page.tsx inside each folder.

Use layouts to wrap pages and keep persistent UI.

Use Link from next/link for smooth client-side navigation.

That's all for Episode 05! 🎬
Now you know how to create routes and navigate between pages in Next.js 15.

👉 In the next episode, we'll cover dynamic routes and fetching data inside pages!


######################################################################