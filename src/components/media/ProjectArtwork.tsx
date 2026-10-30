import ZoomableCaseStudyImage from "@/components/media/ZoomableCaseStudyImage";

/** Default for new case-study gallery artwork; heroes use CaseStudyImage. */
export default function ProjectArtwork({ src, alt, width, height, sizes, className, preloadDistance }: {
  src: string;
  alt: string;
  width: number;
  height: number;
  sizes: string;
  className?: string;
  preloadDistance?: number;
}) {
  return <ZoomableCaseStudyImage
    src={src} alt={alt} label={alt} width={width} height={height}
    sizes={sizes} className={className}
    compact showLabel={false} viewportOnly responsiveLightbox preloadDistance={preloadDistance}
  />;
}
