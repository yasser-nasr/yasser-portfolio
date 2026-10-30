import ZoomableCaseStudyImage from "@/components/media/ZoomableCaseStudyImage";

/** Default for new case-study gallery artwork; heroes use CaseStudyImage. */
export default function ProjectArtwork({ src, alt, width, height, sizes, className }: {
  src: string;
  alt: string;
  width: number;
  height: number;
  sizes: string;
  className?: string;
}) {
  return <ZoomableCaseStudyImage
    src={src} alt={alt} label={alt} width={width} height={height}
    sizes={sizes} className={className}
    compact showLabel={false} viewportOnly responsiveLightbox
  />;
}
