import Link from "next/link";
import PageIntro from "@/components/ui/PageIntro";

export default function NotFound() {
  return (
    <>
      <PageIntro title="Page not found">
        <p>That page doesn&rsquo;t exist.</p>
      </PageIntro>
      <div className="container-page py-8">
        <Link href="/" className="btn-primary">
          Go to the home page
        </Link>
      </div>
    </>
  );
}
