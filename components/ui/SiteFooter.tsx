import { DOC_OWNER, DOC_REF, DOC_TITLE } from "@/lib/siteConfig";

export default function SiteFooter() {
  return (
    <footer className="border-t-4 border-growth bg-mist text-sm">
      <div className="container-page py-6">
        <p>
          Based on Westbridge University&rsquo;s <cite>{DOC_TITLE}</cite> ({DOC_OWNER}, ref. {DOC_REF}).
        </p>
      </div>
    </footer>
  );
}
