export default function Flag({ src, alt }: { src: string; alt: string }) {
  return (
    <img src={src} alt={alt} className="block max-w-5 rounded-xs border" />
  );
}
