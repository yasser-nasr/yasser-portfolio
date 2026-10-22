import { featuredProjects } from "@/data/projects";
import SelectedWorkGridClient from "@/components/SelectedWorkGridClient";

export default function SelectedWorkGrid({ className = "" }: { className?: string }) {
  const projects = featuredProjects.map(({
    slug, title, subtitle, category, market, location, statement, tags,
    image, imageAlt, imageFit, imagePosition, imageBackground,
  }) => ({
    slug, title, subtitle, category, market, location, statement, tags,
    image, imageAlt, imageFit, imagePosition, imageBackground,
  }));

  return <SelectedWorkGridClient projects={projects} className={className} />;
}
