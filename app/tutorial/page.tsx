import type { Metadata } from "next";
import TutorialClient from "./TutorialClient";

export const metadata: Metadata = {
  title: "Tutorial",
  description: "Accessibility training to complete before developing your brand.",
};

export default function TutorialPage() {
  return <TutorialClient />;
}
