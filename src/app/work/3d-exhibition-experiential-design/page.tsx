import CaseStudy from "@/components/case-study/ThreeDExhibitionCaseStudy";
import ProjectPage, { projectMetadata, requireProject } from "@/components/case-study/ProjectPage";

const slug = "3d-exhibition-experiential-design";

export function generateMetadata() {
  return projectMetadata(slug);
}

export default function Page() {
  const project = requireProject(slug);
  return (
    <ProjectPage project={project}>
      <CaseStudy />
    </ProjectPage>
  );
}
