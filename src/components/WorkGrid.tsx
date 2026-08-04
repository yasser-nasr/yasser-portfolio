import WorkCard from "@/components/WorkCard";
import { developmentWorkProjects, publishedWorkProjects } from "@/data/work";

export default function WorkGrid({ className = "" }: { className?: string }) {
  const projects =
    process.env.NODE_ENV === "development"
      ? developmentWorkProjects
      : publishedWorkProjects;

  return (
    <div className={`space-y-20 md:space-y-28 ${className}`}>
      {projects.map((project, index) => (
        <WorkCard key={project.slug} project={project} index={index} />
      ))}
    </div>
  );
}
