import ProjectPage from "@/components/ProjectPage";
import { niv } from "@/content/research";
import { pageMetadata } from "@/lib/meta";

export const metadata = pageMetadata("Predicting failure of non-invasive respiratory support", "Survival models that predict, at the start of non-invasive support, which ICU patients will need a ventilator within 72 hours.", "/research/niv");

export default function NivPage() {
  return <ProjectPage project={niv} />;
}
