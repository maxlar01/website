"use client";

import { useEffect, useMemo, useState } from "react";
import { useTheme } from "next-themes";
import Particles, { initParticlesEngine } from "@tsparticles/react";
import { loadSlim } from "@tsparticles/slim";
import type { ISourceOptions } from "@tsparticles/engine";

export function ParticlesBackground() {
  const { resolvedTheme } = useTheme();
  const [ready, setReady] = useState(false);

  useEffect(() => {
    initParticlesEngine(async (engine) => {
      await loadSlim(engine);
    }).then(() => {
      setReady(true);
    });
  }, []);

  const isDark = resolvedTheme === "dark";

  const options: ISourceOptions = useMemo(
    () => ({
      fullScreen: false,
      fpsLimit: 60,
      particles: {
        number: {
          value: 60,
          density: {
            enable: true,
          },
        },
        color: {
          value: isDark ? "#ffffff" : "#000000",
        },
        links: {
          enable: true,
          distance: 150,
          color: isDark ? "#ffffff" : "#000000",
          opacity: isDark ? 0.15 : 0.1,
          width: 1,
        },
        move: {
          enable: true,
          speed: 1.2,
          direction: "none" as const,
          random: false,
          straight: false,
          outModes: {
            default: "out" as const,
          },
        },
        opacity: {
          value: isDark ? 0.3 : 0.2,
        },
        size: {
          value: { min: 1, max: 3 },
        },
        collisions: {
          enable: false,
        },
        shape: {
          type: "circle",
        },
      },
      interactivity: {
        events: {
          onHover: {
            enable: true,
            mode: "grab",
          },
          onClick: {
            enable: true,
            mode: "push",
          },
        },
        modes: {
          grab: {
            distance: 140,
            links: {
              opacity: isDark ? 0.4 : 0.3,
            },
          },
          push: {
            quantity: 3,
          },
        },
      },
      detectRetina: true,
    }),
    [isDark]
  );

  if (!ready) return null;

  return (
    <Particles
      className="fixed inset-0 -z-10"
      id="tsparticles"
      options={options}
    />
  );
}
