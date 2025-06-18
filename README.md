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

# ## 🎬 Episode 05 - Solving Hydration Mismatch Caused by Browser Extensions in Next.js


Introduction 🎥

Today, we're tackling a common and confusing error you might see when working with Next.js:
hydration mismatch caused by browser extensions.

I'll explain exactly why it happens, and show you a clean and professional way to fix it. Let's dive right in!"*

Part 1: Understanding the Problem 🎥
"So picture this:
You just created a fresh Next.js project, you open it in your browser, and boom — you get this error:

Hydration failed because the server rendered HTML didn't match the client.

*But wait… you haven't even written any code yet!
What's going on?

Well, the real problem isn't your code.
It's usually caused by a browser extension — things like ColorZilla, Grammarly, or even a password manager.

These extensions can inject extra attributes into your page before React has a chance to load.

For example, you might find something weird like:*


<body cz-shortcut-listen="true">\

This attribute wasn't sent from your server.
But on the client side, it's there — and when React tries to "hydrate" — meaning match the server and client HTML — it spots the mismatch and throws an error."

Part 2: Why Is It a Problem? 🎥
*"Now, why should we care?

Well, in development, it's just annoying.
But in production, it can slow down your app or even break critical features if the mismatches get worse.

Hydration errors are not something you want to ignore — especially if you're building a professional, reliable app."*

Part 3: How to Solve It Professionally 🎥
*"Alright, let's fix this the right way.

✅ First, we don't want to ask developers to disable their extensions while working.
✅ Second, we need a solution that automatically cleans up the page only in production — without touching our real app code.

Here's the clean approach:

Create a small React hook that checks the <body> after hydration and removes any unwanted attributes.

Create a tiny Client Component that calls that hook.

Place the component inside your layout's <body> tag.

This way, you keep everything safe, server components still work, and you don't break anything important."*

Part 4: Example Code 🎥
"Let's see the real code — clean, simple, and production-ready."

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

for more detail about hydration error : [https://nextjs.org/docs/messages/react-hydration-error#solution-1-using-useeffect-to-run-on-the-client-only] 


##########################################################################

## 🎬 Episode 06 – A Professional Fix for Hydration Mismatch in Next.js (Browser Extension Issue)

In the **previous episode**, we used `useEffect` to remove an unwanted attribute (`cz-shortcut-listen`) added by a browser extension like ColorZilla. This worked — but **only after a page refresh** because `useEffect` runs **after hydration**, and the mismatch had already occurred.

In this episode, we apply a **professional and permanent solution** that avoids the error on **first load**, without relying on page refreshes.

---

Why the Error Disappears on Refresh in Your Solution
The behavior you're seeing occurs because of the sequence of events during Next.js hydration and how browser extensions interact with this process. Here's the detailed explanation:

What's Happening in Your Current Solution
First Load (with error):

Server sends clean HTML without cz-shortcut-listen

Browser receives HTML and starts parsing

ColorZilla extension injects the attribute

React begins hydration, sees the attribute mismatch → error

Your useEffect cleanup runs and removes the attribute

Error appears in console

Page Refresh (no error):

Browser already has React hydrated in memory

The "hard" refresh doesn't trigger full rehydration

Your cleanup runs before React checks the DOM

No mismatch detected → no error

The Key Timing Issues
First Render Hydration:

React compares server-rendered snapshot with current DOM

The comparison happens before your useEffect runs

Mismatch detected → hydration error

Subsequent Updates:

React is already hydrated

Changes to DOM don't trigger hydration checks

Your cleanup works as expected

Why This Matters for Your Solution
Your current approach with useEffect has these characteristics:

Runs after component mounts (too late for hydration)

Only affects future renders, not initial hydration

Works on refreshes because hydration is already complete

How to Properly Fix This:

1. Create the Hydration Fix Component (TypeScript version)

```
// components/HydrationFix.tsx
"use client";
import React from "react";
export function HydrationFix(): React.JSX.Element {
  return (
    <script
      id="hydration-fix"
      dangerouslySetInnerHTML={{
        __html: `
          // Check and remove immediately
          if (document.body.hasAttribute('cz-shortcut-listen')) {
            document.body.removeAttribute('cz-shortcut-listen');
          }
          
          // Set up mutation observer to prevent re-addition
          const observer = new MutationObserver((mutations) => {
            mutations.forEach((mutation) => {
              if (mutation.type === 'attributes' && 
                  mutation.attributeName === 'cz-shortcut-listen') {
                document.body.removeAttribute('cz-shortcut-listen');
              }
            });
          });
          
          observer.observe(document.body, {
            attributes: true,
            attributeFilter: ['cz-shortcut-listen']
          });
        `,
      }}
    />
  );
}
```
2. Create components/ClientLayout.tsx

```
'use client';

import { HydrationFix } from './HydrationFix';

export default function ClientLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <HydrationFix />
      <p>navbar from layout</p>
      {children}
    </>
  );
}
```
3. Update your layout.tsx to use ClientLayout

```
import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import ClientLayout from '@/components/ClientLayout';

const geistSans = Geist({ variable: '--font-geist-sans', subsets: ['latin'] });
const geistMono = Geist_Mono({ variable: '--font-geist-mono', subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Learn Next.js 15',
  description: 'A comprehensive guide to learning Next.js 15',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <ClientLayout>{children}</ClientLayout>
      </body>
    </html>
  );
}
```

🤔 Why Keep the Previous useEffect Episode?
We don't delete the earlier solution because:

It helps explain how hydration works in React

It's useful for beginners learning useEffect and DOM timing

It sets the stage for understanding why this script-based fix is necessary

🧠 Takeaway
This professional approach:

Solves hydration mismatch on first load

Prevents reappearance of the issue using MutationObserver

Keeps your layout.tsx as a server component for better SEO and performance

✅ Clean DOM
✅ No flickering
✅ No hydration warnings
✅ Ready for production

##########################################################################


# ## 🎬 Episode 07 - How to Create Routes in Next.js 15

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

Here's what the page.tsx file looks like:

```
export default function ProductPage() {
return <h1>Hello from the Product page!</h1>;
}
```

Now, if you navigate to:

http://localhost:3000/product
You will see:

Hello from the Product page!

The layout (if you have one) stays the same, and only the children are updated.

📦 Another Example: Creating a user Route
In the app/ folder, create a folder named user/.

Inside user/, create a page.tsx file.

Example:

```
export default function AboutPage() {
return <h1>Hello from the User page!</h1>;
}
```

Now, if you navigate to:
http://localhost:3000/about
You'll see the content from the User page, while the layout remains persistent.

🔗 Navigating Between Pages
To navigate between pages, we use the Link component from Next.js.
It provides client-side navigation, which is faster and preloads pages automatically.

In your index.tsx (home page), update the content:





######################################################################

# ## 🎬 Episode 08 - Nested Routes & Group Routes in Next.js 15

In this episode, we explain how to use **Nested Routes** and **Group Routes** in Next.js 15 to build a well-structured and scalable application.

### 🔹 What are Nested Routes?
Nested routes in Next.js are created by using folders inside the `app/` directory. 
### 🔹 What are Group Routes?
Group routes use parentheses in folder names, like `(auth)`, to **group related pages** without affecting the URL. 

📽️ Watch the full episode to see it all in action!

######################################################################


# ## 🎬 Episode 09 – Server vs Client Components (React Server Components – RSC)

## 📌 Introduction

Before we dive into routing in Next.js, there's one powerful concept we need to master first — and that's **React Server Components**, or **RSC** for short.

## 🧠 What is RSC?

**React Server Components (RSC)** is a modern architecture introduced by the React team. It allows us to run some components **only on the server**. This improves performance, SEO, and reduces the JavaScript bundle size.

Next.js (especially with the App Router) adopted RSC by default.

In this model, components are categorized into two types:

- **Server Components**  
- **Client Components**

---

## 🔷 Server Components (default)

In a Next.js App Router setup:

- All components are **Server Components by default**.
- These components are rendered on the **server only**.
- They can:
  - Fetch data directly
  - Access databases or the file system
  - Improve SEO
  - Reduce client-side bundle size

**❌ Limitations:**

- Cannot use React hooks (`useState`, `useEffect`, etc.)
- Cannot access browser APIs (`window`, `document`, etc.)
- No interactivity

### ✅ Example: Server Component

```tsx
// app/about/page.tsx
export default function AboutPage() {
  console.log("About Server Component");
  return <h1>About Page</h1>;
}

🔶 Client Components
To create a Client Component, you must add the directive:

```tsx

"use client";

```

This tells Next.js to run this component in the browser.

Client Components can:

- Use React hooks

- Handle interactivity

- Access browser APIs (e.g., localStorage, window, etc.)

✅ Example: Client Component

```tsx
// app/products/page.tsx
"use client";
import { useState } from "react";

export default function ProductsPage() {
  const [search, setSearch] = useState("");

  return (
    <div>
      <h1>Products Page</h1>
      <input value={search} onChange={(e) => setSearch(e.target.value)} />
      <p>Hello {search}</p>
    </div>
  );
}

📋 Summary
✅ Components in Next.js App Router are Server Components by default.

✍️ Add "use client" to make a component run in the browser.

🔐 Server Components are great for performance, data access, and SEO.

🧠 Client Components are required for interactivity and state management.


######################################################################


# ## 🎬 Episode 10 –  Linking and Navigating in Next.js (App Router)

## 🔗 1. Using the `<Link />` Component (Recommended)

The `<Link />` component from `next/link` enables **client-side navigation** with automatic prefetching in production.

### ✅ Example

```tsx
import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="bg-white shadow-md p-4">
      <div className="container mx-auto flex justify-between items-center">
        <Link href="/" className="text-xl font-bold">
          My App
        </Link>

        <div className="space-x-4">
          <a href="/dashboard" className="text-blue-600 hover:text-blue-800">
            Dashboard
          </a>
          <Link href="/about" className="text-blue-600 hover:text-blue-800">
            About
          </Link>
          <Link href="/products" className="text-blue-600 hover:text-blue-800">
            Products
          </Link>
        </div>
      </div>
    </nav>
  );
}
```
✅ Works in Server Components

✅ Supports prefetching

✅ SEO-friendly and accessible

✅ Automatically renders as an <a> tag


⚡ 2. Prefetching in Next.js
Next.js uses prefetching to load routes in the background before the user clicks, which results in faster navigation.

📌 How It Works
By default, only the shared layout and components above the first loading.js file are prefetched.

Prefetching is only active in production mode.

🧠 Programmatic Prefetching with useRouter


Use useRouter() for programmatic navigation, such as buttons or dynamic logic in Client Components.

✅ Example
```tsx
"use client";
import { useState } from "react";
//import Link from "next/link";
import { useRouter } from "next/navigation";

export default function ProductsPage() {
  const [search, setSearch] = useState("");

  const router = useRouter();

  return (
    <div className="p-4">
      {/* <Link href="/" className="text-blue-600 underline">
        Return to Home Page
      </Link> */}
      <button
        type="button"
        className="underline cursor-pointer"
        onClick={() => {
          console.log("form useRouter");
          router.push("/");
        }}
      >
        Home Page
      </button>
      <h1 className="text-2xl text-green-700 mt-4">Products Page</h1>
      <input value={search} onChange={(e) => setSearch(e.target.value)} />
      <p>Hello {search}</p>
    </div>
  );
}
```


# ## 🎬 Episode 11 –  Dynamic Routes and Static Generation in Next.js(App Router)


## 🎯 Dynamic Routes with `[id]`

Dynamic routes in Next.js allow you to create pages for content where the URL segments (like product IDs) aren't known in advance.

### 📁 File Structure
```
app/
├── products/
│   ├── page.tsx         # Products list page
│   └── [id]/
│       └── page.tsx     # Dynamic product detail page
```

### 🔑 Key Features

1. **Dynamic Route Definition**
   - Use square brackets `[id]` to create dynamic segments
   - Access parameters via `params` prop in page components

### 🔗 products/page.tsx (Server Component)
```tsx
import Link from "next/link";
import { products } from "@/data/products";

export default function ProductsPage() {
  return (
    <div className="p-4">
      <Link href="/" className="underline text-blue-600">Home Page</Link>
      <h1 className="text-2xl text-green-700 mt-4">Products Page</h1>
      <ul className="mt-6 space-y-4">
        {products.map((product) => (
          <li key={product.id}>
            <Link
              href={`/products/${product.id}`}
              className="block border p-4 hover:bg-gray-100"
            >
              <h2 className="text-xl font-semibold">{product.name}</h2>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
```

### 🔑 Dynamic Product Detail Page (Without Static Generation)

```typescript
// app/products/[id]/page.tsx
export default async function ProductPageDetail({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const product = products.find((p) => p.id === id);

  if (!product) {
    return (
      <div className="p-4">
        <h1 className="text-2xl font-bold text-red-600">Product not found</h1>
      </div>
    );
  }

  return (
    <div>
      <Link href="/products" className="underline text-blue-600">
        Products Page
      </Link>
      <div className="p-4">
        <h1 className="text-2xl font-bold">{product.name}</h1>
        <p className="mt-2 text-gray-700">{product.description}</p>
      </div>
    </div>
  );
}
```

### 🔑 Dynamic Product Detail Page (With Static Generation)

```typescript
// app/products/[id]/page.tsx
import Link from "next/link";
import { notFound } from "next/navigation";
import { products } from "@/data/products";

export async function generateStaticParams() {
  return products.map((product) => ({
    id: product.id,
  }));
}

export default function ProductPageDetail({
  params,
}: {
  params: { id: string };
}) {
  const product = products.find((p) => p.id === params.id);

  if (!product) {
    notFound();
  }

  return (
    <div className="p-4">
      <Link href="/products" className="underline text-blue-600">
        ← Back to Products
      </Link>
      <div className="mt-6 border p-4">
        <h1 className="text-2xl font-bold">{product.name}</h1>
        <p className="mt-2 text-gray-700">{product.description}</p>
      </div>
    </div>
  );
}
```
⚙️ 3. Understanding Static Generation
Using generateStaticParams() in a dynamic route tells Next.js to generate the pages at build time.

✅ What happens:

/products/1, /products/2, /products/3 are pre-rendered

Delivered instantly as static HTML

Improves SEO, performance, and user experience

### 🚀 Benefits

| Feature | Without Static Generation | With Static Generation |
|---------|--------------------------|------------------------|
| Initial Load | Slower (on-demand) | Instant (pre-rendered) |
| SEO | Weaker | Excellent |
| Server Load | Higher | Lower |
| Best For | Dynamic Data | Static Content |

### 📝 Example Implementation

```typescript
// app/products/[id]/page.tsx
import Link from "next/link";
import { notFound } from "next/navigation";
import { products } from "@/data/products";

export async function generateStaticParams() {
  return products.map((product) => ({
    id: product.id,
  }));
}

export default function ProductPageDetail({
  params,
}: {
  params: { id: string };
}) {
  const product = products.find((p) => p.id === params.id);

  if (!product) {
    notFound();
  }

  return (
    <div className="p-4">
      <Link href="/products" className="underline text-blue-600">
        ← Back to Products
      </Link>
      <div className="mt-6 border p-4">
        <h1 className="text-2xl font-bold">{product.name}</h1>
        <p className="mt-2 text-gray-700">{product.description}</p>
      </div>
    </div>
  );
}
```

### 🎯 Best Practices

1. **Use Static Generation When:**
   - Content is static or rarely changes
   - SEO is important
   - Performance is critical

2. **Use Dynamic Routes When:**
   - Content changes frequently
   - Data is user-specific
   - Real-time updates are needed
### 🔍 Build Output
```
Route (app)                                 Size  First Load JS
└ ● /products/[id]                         181 B         105 kB
    ├ /products/1
    ├ /products/2
    └ /products/3
```
- `●` indicates static generation
- Pages are pre-rendered at build time
- Instant delivery to users
```

# ## 🎬 Episode 12: Nested Dynamic Routes with Async Params

In this episode, we dive deeper into nested dynamic routes using the Next.js App Router. You'll learn how to display a product review using a route like:

```bash
/products/1/comments/2
```

This requires handling two dynamic segments:
- `id` → for the product
- `commentId` → for the specific comment

## 📁 Folder Structure
```
app/
├── products/
│   ├── [id]/
│   │   ├── comments/
│   │   │   ├── [commentId]/
│   │   │   │   └── page.tsx ← handles the comment
│   │   │   └── page.tsx         ← handles the product
```

## ⚛️ Code: app/products/[id]/comments/[commentId]/page.tsx
```typescript
export default async function ProductReview({
  params,
}: {
  params: Promise<{ productId: string; commentId: string }>;
}) {
  const { id, commentId } = await params;
  return (
    <h1>
      Comment {commentId} for product {id}
    </h1>
  );
}
```

## 🧠 Explanation

| Line | Purpose |
|------|---------|
| `async function ProductReview` | This is an async Server Component. |
| `params: Promise<{ productId; commentId }>` | Next.js passes route params as a Promise. |
| `await params` | You wait to access productId and commentId. |
| `return (...)` | The UI shows the comment ID and its related product ID. |

## 🧪 Test It!
Visit:
```bash
http://localhost:3000/products/1/comments/2
```

You'll see:
```
Comment 2 for product 1
```

✅ You can change the numbers to test other IDs in real-time.

##########################################################################

## 🎬 Episode 13 - Understanding Catch-all and Optional Catch-all Segments in Next.js

In this episode, we'll explore two powerful routing features in Next.js 15: catch-all segments and optional catch-all segments. These features allow you to create dynamic routes that can handle multiple URL segments.

### Catch-all Segments (`[...slug]`)

Catch-all segments allow you to match dynamic routes with multiple segments. They are denoted by using `[...paramName]` in the folder name.

#### Example Structure
```
app/shop/[...slug]/page.tsx
```

#### How it Works
- The `[...slug]` syntax will match any number of segments after `/shop/`
- The matched segments will be available in the `params` object as an array
- For example:
  - `/shop/clothes` → `params.slug = ['clothes']`
  - `/shop/clothes/shirts` → `params.slug = ['clothes', 'shirts']`
  - `/shop/clothes/shirts/casual` → `params.slug = ['clothes', 'shirts', 'casual']`

#### Implementation Example
```typescript
export default async function Page({ params }: { params: { slug: string[] } }) {
  return (
    <div>
      <h1>You&apos;re viewing: {params.slug.join(" / ")}</h1>
    </div>
  );
}
```

### Optional Catch-all Segments (`[[...slug]]`)

Optional catch-all segments are similar to catch-all segments but can match zero or more segments. They are denoted by using `[[...paramName]]` in the folder name.

#### Example Structure
```
app/shop/[[...slug]]/page.tsx
```

#### How it Works
- The `[[...slug]]` syntax will match any number of segments after `/shop/`, including no segments
- The matched segments will be available in the `params` object as an optional array
- For example:
  - `/shop` → `params.slug = undefined`
  - `/shop/clothes` → `params.slug = ['clothes']`
  - `/shop/clothes/shirts` → `params.slug = ['clothes', 'shirts']`

#### Implementation Example
```typescript
interface PageProps {
  params: {
    slug?: string[];
  };
}

export default async function Page({ params }: PageProps) {
  // Handle the case when slug is undefined (root /shop route)
  if (!params.slug) {
    return (
      <div>
        <h1>Welcome to our Shop</h1>
        <p>Browse our categories or use the search bar above.</p>
      </div>
    );
  }

  // Handle the case when we have slug segments
  return (
    <div>
      <h1>You&apos;re viewing: {params.slug.join(" / ")}</h1>
      <p>Category path: {params.slug.join(" > ")}</p>
    </div>
  );
}
```

### Key Differences

1. **Catch-all Segments (`[...slug]`)**
   - Must match at least one segment
   - `params.slug` is always an array
   - Will not match the parent route

2. **Optional Catch-all Segments (`[[...slug]]`)**
   - Can match zero or more segments
   - `params.slug` is optional (can be undefined)
   - Will match the parent route

### Best Practices

1. Use catch-all segments when you need to ensure at least one segment is present
2. Use optional catch-all segments when you want to handle both the parent route and its children
3. Always handle the case where `params.slug` might be undefined when using optional catch-all segments
4. Consider using TypeScript to properly type your params object

For more information about dynamic routes in Next.js, visit the [official documentation](https://nextjs.org/docs/app/building-your-application/routing/dynamic-routes).

##########################################################################

# 🎬 Episode 14: Creating a Custom 404 Page with Next.js App Router

## 🎙️ Intro
Hey everyone! In this episode, we'll explore how to create a custom 404 page using the App Router in Next.js, and how to trigger it programmatically — all with a real-world example from our product page.

## 🧱 Step 1 – Creating not-found.jsx
Let's first replace the boring default 404 page with a custom styled one.

Inside your `/app` directory, create a file named:
👉 `not-found.jsx`

This is a special filename in Next.js — it tells the framework to use this file whenever a route isn't found.

Here's what I added inside:

```jsx
export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="text-center p-8 bg-white rounded-lg shadow-lg">
        <h1 className="text-6xl font-bold text-gray-800 mb-4">404</h1>
        <h2 className="text-2xl font-semibold text-gray-600 mb-4">Page Not Found</h2>
        <p className="text-gray-500 mb-6">
          Sorry, the page you are looking for does not exist.
        </p>
        <a
          href="/"
          className="inline-block bg-blue-500 text-white px-6 py-2 rounded-md hover:bg-blue-600 transition-colors"
        >
          Go Back Home
        </a>
      </div>
    </div>
  );
}
```

✅ This layout is clean, centered, and matches the rest of my site's design using Tailwind CSS.

## 🚨 Step 2 – Triggering 404 for Invalid Product ID
Now let's make it functional.
In my project, I have dynamic product pages like: `/products/1`, `/products/2`, etc.

Let's say I want to show the 404 page if someone types an invalid product ID.

So, in `app/products/[id]/page.tsx`, I'll import the `notFound` function from Next.js:

```tsx
import { notFound } from "next/navigation";
```

Here's my updated ProductPageDetail component:

```tsx
import Link from "next/link";
import { notFound } from "next/navigation";
import { products } from "@/data/products";

export async function generateStaticParams() {
  console.log("Generating static pages for products...");
  return products.map((product) => ({
    id: product.id,
  }));
}

export default async function ProductPageDetail({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const product = products.find((p) => p.id === id);

  if (!product) {
    notFound(); // ⛔ Show 404 if product doesn't exist
  }

  return (
    <div>
      <Link href="/products" className="underline text-blue-600">
        Products Page
      </Link>
      <div className="p-4">
        <h1 className="text-2xl font-bold">{product.name}</h1>
        <p className="mt-2 text-gray-700">{product.description}</p>
      </div>
    </div>
  );
}
```

## 🎯 Step 3 – Creating a Product-Specific 404 Page
We can also create a custom 404 page specifically for products. Create a new file at `app/(front)/products/[id]/not-found.jsx`:

```jsx
"use client";

import { usePathname } from "next/navigation";

export default function NotFound() {
  const path = usePathname();
  const segments  = path.split("/");
  const productId = segments[2];

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="text-center p-8 bg-white rounded-lg shadow-lg">
        <h1 className="text-6xl font-bold text-gray-800 mb-4">404</h1>
        <h2 className="text-2xl font-semibold text-gray-600 mb-4">
          Page Not Found for this product: {productId}
        </h2>
        <p className="text-gray-500 mb-6">
          Sorry, the page you are looking for
        </p>
        <a
          href="/products"
          className="inline-block bg-blue-500 text-white px-6 py-2 rounded-md hover:bg-blue-600 transition-colors"
        >
          Go Back products page
        </a>
      </div>
    </div>
  );
}
```

This product-specific 404 page:
- Uses the `usePathname` hook to get the current URL
- Extracts the product ID from the URL
- Shows a custom message mentioning the specific product ID that wasn't found
- Maintains the same clean design as our main 404 page

🧠 So instead of showing a fallback message like "Product not found," we now automatically redirect to our custom 404 page.

## ✅ Recap
- 🧩 We created a `not-found.jsx` page with a custom design.
- ⚙️ We used `notFound()` to trigger that page programmatically when the product ID is invalid.
- 🎯 We added a product-specific 404 page that shows which product ID wasn't found.
- 💡 This approach keeps your UX clean and consistent with the rest of your app

