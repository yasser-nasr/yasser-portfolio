import CaseStudy from "@/components/case-study/A1DatesCaseStudy";
import ProjectPage, { projectMetadata, requireProject } from "@/components/case-study/ProjectPage";

const slug = "a1-dates";

export function generateMetadata() {
  return projectMetadata(slug);
}

export default function Page() {
  const project = requireProject(slug);
  return <ProjectPage project={project}><CaseStudy project={project} /></ProjectPage>;
}
