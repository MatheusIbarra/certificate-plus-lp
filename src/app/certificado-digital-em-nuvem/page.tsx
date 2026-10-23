import type { Metadata } from "next";
import GuideLayout, { guideMetadata } from "@/components/GuideLayout";
import { getGuide } from "@/guides";

const guide = getGuide("certificado-digital-em-nuvem");

export const metadata: Metadata = guideMetadata(guide);

export default function Page() {
  return <GuideLayout guide={guide} />;
}
