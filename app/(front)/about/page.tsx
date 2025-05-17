import Link from "next/link";

export default function AboutPage() {


  return (
    <div>
      <Link href="/" className="text-blue-600 block mt-4">
        Return to Home Page{" "}
      </Link>
      <p className="text-2xl text-green-700 mt-10">About Page</p>
    </div>
  );
}
