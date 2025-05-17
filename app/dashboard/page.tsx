import Link from "next/link";

export default function DashboardPage() {
  return (
    <div>
      <Link href="/" className="text-blue-600 underline">
        Return to Home Page
      </Link>
      <p>Dashboard Page</p>
    </div>
  );
}
