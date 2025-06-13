// export default async function Page({ params }: { params: { slug: string[] } }) {
//   return (
//     <div>
//       <h1>You&apos;re viewing: {params.slug.join(" / ")}</h1>
//     </div>
//   );
// }

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
