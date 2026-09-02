import WorkFilter from "@/components/WorkFilter";
import { developmentWorkProjects, publishedWorkProjects } from "@/data/work";

export default function WorkGrid({ className = "" }: { className?: string }) {
  const projects =
    process.env.NODE_ENV === "development"
      ? developmentWorkProjects
      : publishedWorkProjects;

  return <WorkFilter projects={projects} className={className} />;
}
