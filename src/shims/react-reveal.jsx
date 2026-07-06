/**
 * Minimal React-18-safe replacement for the abandoned `react-reveal` package.
 *
 * Only implements the subset this codebase uses:
 *   <Fade top|bottom|left|right duration={ms} distance="20px">…</Fade>
 *   <Flip left duration={ms}>…</Flip>
 *
 * Elements start hidden and animate in once when they enter the viewport
 * (IntersectionObserver, trigger-once), matching react-reveal's behavior.
 * Wired up via the `react-reveal` alias in vite.config.js.
 */
import React, { useEffect, useRef, useState } from "react";

function useRevealOnce() {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return undefined;
    if (typeof IntersectionObserver === "undefined") {
      setVisible(true);
      return undefined;
    }
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return [ref, visible];
}

function offset({ top, bottom, left, right, distance }) {
  const d = distance || "0px";
  if (left) return `translate3d(-${d}, 0, 0)`;
  if (right) return `translate3d(${d}, 0, 0)`;
  if (top) return `translate3d(0, -${d}, 0)`;
  if (bottom) return `translate3d(0, ${d}, 0)`;
  return "none";
}

export function Fade({
  top,
  bottom,
  left,
  right,
  duration = 1000,
  delay = 0,
  distance,
  children,
}) {
  const [ref, visible] = useRevealOnce();
  const style = {
    transition: `opacity ${duration}ms ease-out ${delay}ms, transform ${duration}ms ease-out ${delay}ms`,
    opacity: visible ? 1 : 0,
    transform: visible ? "none" : offset({ top, bottom, left, right, distance }),
    willChange: "opacity, transform",
  };
  return (
    <div ref={ref} style={style}>
      {children}
    </div>
  );
}

export function Flip({ top, bottom, left, right, duration = 1000, delay = 0, children }) {
  const [ref, visible] = useRevealOnce();
  const axisRotate = top || bottom ? "rotateX" : "rotateY";
  const sign = left || top ? "-" : "";
  const style = {
    transition: `opacity ${duration}ms ease-out ${delay}ms, transform ${duration}ms ease-out ${delay}ms`,
    opacity: visible ? 1 : 0,
    transform: visible ? "none" : `perspective(800px) ${axisRotate}(${sign}90deg)`,
    transformStyle: "preserve-3d",
    willChange: "opacity, transform",
  };
  return (
    <div ref={ref} style={style}>
      {children}
    </div>
  );
}

export default { Fade, Flip };
