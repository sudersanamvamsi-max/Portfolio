import ProjectPage from "@/components/ProjectPage";
import { disc } from "@/content/research";
import { pageMetadata } from "@/lib/meta";

export const metadata = pageMetadata("MRI normalization for disc degeneration classification", "Benchmarked MRI normalization strategies so radiomics features hold up across sites and scanners.", "/research/disc-degeneration");

export default function DiscPage() {
  return <ProjectPage project={disc} />;
}
