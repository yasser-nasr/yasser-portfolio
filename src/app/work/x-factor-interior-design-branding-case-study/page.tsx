import CaseStudy from "@/components/case-study/XFactorCaseStudy";
import ProjectPage, { projectMetadata, requireProject } from "@/components/case-study/ProjectPage";

const slug = "x-factor-interior-design-branding-case-study";

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
