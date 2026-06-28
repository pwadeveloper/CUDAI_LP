"use client";

import { useRef } from "react";
import { DragDropProvider, useDraggable } from "@dnd-kit/react";
import { useTheme, type Theme } from "@/lib/theme";
import { playSwitch } from "@/lib/clickSound";

function Sun() {
  return (
    <svg viewBox="0 0 24 24" className="h-4 w-4" aria-hidden>
      <circle cx="12" cy="12" r="4.2" fill="currentColor" />
      <g
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        fill="none"
      >
        <path d="M12 2.5v2.6M12 18.9v2.6M2.5 12h2.6M18.9 12h2.6M5.2 5.2l1.8 1.8M17 17l1.8 1.8M18.8 5.2L17 7M7 17l-1.8 1.8" />
      </g>
    </svg>
  );
}

function Moon() {
  return (
    <svg viewBox="0 0 24 24" className="h-4 w-4" aria-hidden>
      <path
        d="M20 14.2A8 8 0 0 1 9.8 4 7 7 0 1 0 20 14.2Z"
        fill="currentColor"
      />
    </svg>
  );
}

function Knob({ dark }: { dark: boolean }) {
  const { ref, isDragging } = useDraggable({ id: "theme-knob" });
  return (
    <span
      ref={ref}
      className={`pointer-events-auto absolute top-[calc(50%-0.875rem)] grid h-7 w-7 cursor-grab touch-none select-none place-items-center rounded-full bg-on-dark text-on-light shadow-[0_2px_8px_rgba(0,0,0,0.35)] transition-[left,transform] duration-300 ease-[var(--ease-out-expo)] active:cursor-grabbing ${
        dark ? "left-[calc(100%-1.875rem)]" : "left-1"
      } ${isDragging ? "scale-110" : ""}`}
    >
      {dark ? <Moon /> : <Sun />}
    </span>
  );
}

export default function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const dark = theme === "dark";
  const draggedRef = useRef(false);

  const change = (next: Theme) => {
    setTheme(next);
    playSwitch(next === "dark");
  };

  return (
    <DragDropProvider
      onDragEnd={(event) => {
        const dx = event.operation.transform.x;
        draggedRef.current = true;
        window.setTimeout(() => (draggedRef.current = false), 320);
        if (Math.abs(dx) > 16) {
          const next: Theme = dx > 0 ? "dark" : "light";
          if (next !== theme) change(next);
        } else {
          change(dark ? "light" : "dark");
        }
      }}
    >
      <button
        type="button"
        role="switch"
        aria-checked={dark}
        aria-label="Toggle dark mode"
        onClick={() => {
          if (draggedRef.current) return;
          change(dark ? "light" : "dark");
        }}
        className="relative h-8 w-14 shrink-0 rounded-full border border-line bg-ink/[0.06] transition-colors duration-300"
      >
        {/* faint track icons */}
        <span className="pointer-events-none absolute inset-0 flex items-center justify-between px-1.5 text-muted">
          <Sun />
          <Moon />
        </span>
        <Knob dark={dark} />
      </button>
    </DragDropProvider>
  );
}
