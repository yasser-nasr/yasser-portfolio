import NextImage, { type ImageProps } from "next/image";
import { optimizedMediaSrc } from "@/lib/optimized-media";

/** Change only the verified media URL; preserve every existing Image prop. */
export default function OptimizedImage(props: ImageProps) {
  return <NextImage {...props} src={optimizedMediaSrc(props.src)} />;
}
