"use client";

import { useEffect } from "react";

/** Revela [data-reveal] ao entrar na tela e alimenta a barra de progresso da rolagem. Um único observador para a página. */
export default function Motion() {
  useEffect(() => {
    const root = document.documentElement;
    const els = Array.from(document.querySelectorAll<HTMLElement>("[data-reveal]"));
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let io: IntersectionObserver | undefined;
    if (reduced || !("IntersectionObserver" in window)) {
      els.forEach((e) => e.setAttribute("data-in", ""));
    } else {
      io = new IntersectionObserver(
        (entries) => {
          for (const en of entries) {
            if (!en.isIntersecting) continue;
            en.target.setAttribute("data-in", "");
            io?.unobserve(en.target);
          }
        },
        { rootMargin: "0px 0px -8% 0px", threshold: 0.08 },
      );
      els.forEach((e) => io!.observe(e));
    }

    let raf = 0;
    const update = () => {
      raf = 0;
      const max = root.scrollHeight - window.innerHeight;
      root.style.setProperty("--p", String(max > 0 ? Math.min(1, window.scrollY / max) : 0));
    };
    const onScroll = () => { if (!raf) raf = requestAnimationFrame(update); };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
    return () => {
      io?.disconnect();
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  return <div aria-hidden className="scroll-bar pointer-events-none fixed inset-x-0 top-0 z-40 h-0.5 bg-gradient-to-r from-teal-500 to-teal-300" />;
}
