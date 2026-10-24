import CaseStudy from "@/components/case-study/PresentationsCaseStudy";
import ProjectPage, { projectMetadata, requireProject } from "@/components/case-study/ProjectPage";

const slug = "presentations-pitch-decks-reports";

export function generateMetadata() {
  return projectMetadata(slug);
}

export default function Page() {
  const project = requireProject(slug);
  return (
    <ProjectPage project={project}>
      <CaseStudy project={project} />
    </ProjectPage>
  );
}
