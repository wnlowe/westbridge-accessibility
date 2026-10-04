import type { Metadata } from "next";
import ReferenceClient from "./ReferenceClient";

export const metadata: Metadata = {
  title: "Quick Reference",
  description: "A searchable checklist of Westbridge's digital content accessibility guidelines.",
};

export default function ReferencePage() {
  return <ReferenceClient />;
}
