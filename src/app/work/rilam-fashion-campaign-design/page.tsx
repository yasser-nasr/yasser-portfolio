import CaseStudy from "@/components/case-study/RilamCaseStudy";
import ProjectPage, { projectMetadata, requireProject } from "@/components/case-study/ProjectPage";

const slug = "rilam-fashion-campaign-design";

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
