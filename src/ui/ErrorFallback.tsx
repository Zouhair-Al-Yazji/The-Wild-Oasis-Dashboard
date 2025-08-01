import { Button } from "@/components/ui/button";
import { FallbackProps } from "react-error-boundary";
import DotsAnimation from "./DotsAnimation";

export default function ErrorFallback({
  error,
  resetErrorBoundary,
}: FallbackProps) {
  return (
    <main className="bg-background grid min-h-screen place-items-center px-6 py-24 sm:py-32 lg:px-8">
      <div className="bg-sidebar/50 border-border w-full max-w-2xl rounded-xl border p-8 text-center shadow-lg backdrop-blur-sm transition-all duration-300 hover:shadow-xl md:px-16">
        <div>
          <p className="text-primary text-5xl font-bold">⚠️</p>
        </div>
        <h1 className="text-foreground mt-6 text-3xl font-bold tracking-tight sm:text-4xl">
          Something went wrong
        </h1>
        <div className="text-muted-foreground bg-destructive/10 mt-6 rounded-lg p-4 text-left">
          <p className="text-destructive font-medium">Error details:</p>
          <p className="mt-2 text-sm leading-6">{error.message}</p>
        </div>
        <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <Button
            onClick={resetErrorBoundary}
            className="bg-primary hover:bg-primary/90 text-primary-foreground focus-visible:outline-ring transform rounded-lg px-6 py-3 text-base font-medium shadow-sm transition-all focus-visible:outline-2 focus-visible:outline-offset-2"
          >
            Try again
          </Button>
        </div>
        <DotsAnimation />
      </div>
    </main>
  );
}
