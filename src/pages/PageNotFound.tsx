import { Button } from "@/components/ui/button";
import { useMoveBack } from "@/hooks/useMoveBack";
import DotsAnimation from "@/ui/DotsAnimation";
import { useNavigate } from "react-router-dom";

export default function PageNotFound() {
  const moveBack = useMoveBack();
  const navigate = useNavigate();

  return (
    <main className="bg-background grid min-h-screen place-items-center px-6 py-24 sm:py-32 lg:px-8">
      <div className="bg-sidebar/50 border-border w-full max-w-2xl rounded-xl border p-8 text-center shadow-lg backdrop-blur-sm transition-all duration-300 hover:shadow-xl md:px-16">
        <div>
          <p className="text-primary text-5xl font-bold">404</p>
        </div>
        <h1 className="text-foreground mt-6 text-4xl font-bold tracking-tight sm:text-5xl">
          Page not found
        </h1>
        <p className="text-muted-foreground mt-4 text-lg leading-7">
          Sorry, we couldn't find the page you're looking for.
          <br className="hidden sm:block" />
          It might have been moved or deleted.
        </p>
        <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <Button
            onClick={moveBack}
            className="bg-primary hover:bg-primary/90 text-primary-foreground focus-visible:outline-ring transform rounded-lg px-6 py-3 text-base font-medium shadow-sm transition-all focus-visible:outline-2 focus-visible:outline-offset-2"
          >
            Go back
          </Button>

          <Button
            variant="outline"
            className="border-border hover:bg-accent transform rounded-lg px-6 py-3 text-base font-medium shadow-sm transition-all"
            onClick={() => navigate("/dashboard")}
          >
            Return home
          </Button>
        </div>
        <DotsAnimation />
      </div>
    </main>
  );
}
