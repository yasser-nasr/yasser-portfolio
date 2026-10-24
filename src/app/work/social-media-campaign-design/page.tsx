import CaseStudy from "@/components/case-study/SocialMediaCampaignCaseStudy";
import ProjectPage, { projectMetadata, requireProject } from "@/components/case-study/ProjectPage";

const slug = "social-media-campaign-design";

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
