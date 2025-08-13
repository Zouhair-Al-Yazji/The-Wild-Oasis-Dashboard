import { cn } from "@/lib/utils";
import { ComponentPropsWithoutRef, CSSProperties, useRef } from "react";

interface GlowAreaProps extends ComponentPropsWithoutRef<"div"> {
  size?: number;
}

export function GlowArea(props: GlowAreaProps) {
  const element = useRef<HTMLDivElement | null>(null);
  const { size = 300, className, ...rest } = props;
  const latestCords = useRef<{ x: number; y: number } | null>(null);
  const frameId = useRef<number | null>(null);

  function updateGlow() {
    if (latestCords.current && element.current) {
      element.current.style.setProperty(
        "--glow-x",
        `${latestCords.current.x}px`,
      );
      element.current.style.setProperty(
        "--glow-y",
        `${latestCords.current.y}px`,
      );
      frameId.current = null;
    }
  }

  function handleMouseMove(e: React.MouseEvent<HTMLDivElement>) {
    const bounds = e.currentTarget.getBoundingClientRect();
    latestCords.current = {
      y: e.clientY - bounds.top,
      x: e.clientX - bounds.left,
    };
    if (!frameId.current) {
      frameId.current = requestAnimationFrame(() => updateGlow());
    }
  }

  function handleMouseLeave(e: React.MouseEvent<HTMLDivElement>) {
    e.currentTarget.style.removeProperty("--glow-x");
    e.currentTarget.style.removeProperty("--glow-y");
  }

  return (
    <div
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={cn(className, "relative")}
      style={
        {
          "--glow-size": `${size}px`,
        } as CSSProperties
      }
      ref={element}
      {...rest}
    ></div>
  );
}

interface GlowProps extends ComponentPropsWithoutRef<"div"> {
  color?: string;
}

export function Glow(props: GlowProps) {
  const element = useRef<HTMLDivElement | null>(null);
  const { className, color = "blue", children, ...rest } = props;
  return (
    <div className={cn(className, "relative")} {...rest} ref={element}>
      <div
        style={{
          backgroundImage: `radial-gradient(
            var(--glow-size) var(--glow-size) at calc(var(--glow-x, -99999px) - var(--glow-left, 0px))
            calc(var(--glow-y, -99999px) - var(--glow-top, 0px)),
            ${color} 0%,
            transparent 100%
          )`,
        }}
        className={cn(
          className,
          "after:bg-background/90 pointer-events-none absolute inset-0 mix-blend-multiply after:absolute after:inset-0.25 after:rounded-[inherit] after:content-[''] dark:mix-blend-lighten",
        )}
      ></div>
      {children}
    </div>
  );
}
