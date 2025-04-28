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


######################################################################################################################
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


###########################################################################################################################