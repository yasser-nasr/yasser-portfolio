import NextImage, { type ImageProps } from "next/image";

export default function CaseStudyImage(props: ImageProps) {
  return <NextImage {...props} unoptimized />;
}
