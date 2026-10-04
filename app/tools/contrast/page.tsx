import type { Metadata } from "next";
import PageIntro from "@/components/ui/PageIntro";
import ContrastChecker from "@/components/tools/ContrastChecker";

export const metadata: Metadata = {
  title: "Contrast checker",
  description: "Check text and background colour pairings against Westbridge's contrast standard.",
};

export default function ContrastPage() {
  return (
    <>
      <PageIntro title="Contrast checker">
        <p>Check whether a text colour and background colour can be read by everyone.</p>
      </PageIntro>
      <div className="container-page py-8">
        <ContrastChecker />
      </div>
    </>
  );
}
