export default function DotsAnimation() {
  return (
    <div className="mt-4 flex justify-center space-x-2 pt-6">
      <div className="bg-primary/30 h-2 w-2 animate-bounce rounded-full"></div>
      <div
        className="bg-primary/50 h-2 w-2 animate-bounce rounded-full"
        style={{ animationDelay: "0.1s" }}
      ></div>
      <div
        className="bg-primary/70 h-2 w-2 animate-bounce rounded-full"
        style={{ animationDelay: "0.2s" }}
      ></div>
    </div>
  );
}
