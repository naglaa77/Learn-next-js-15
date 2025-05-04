import Link from "next/link";

export default function Home() {
  return (
    <div>
      hell from index page
      <Link href="/about">Go to About</Link>
    </div>
  );
}
