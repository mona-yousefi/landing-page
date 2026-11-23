import { useEffect, useEffectEvent } from "react";

export default function useCarouselAutoplay(carousel, activeSlide, advance) {
  const advanceSlide = useEffectEvent(advance);

  useEffect(() => {
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const timer = window.setInterval(() => {
      const element = carousel.current;
      if (element && !document.hidden && !reducedMotion.matches && !element.matches(":hover, :focus-within")) {
        advanceSlide();
      }
    }, 5500);

    return () => window.clearInterval(timer);
  }, [carousel, activeSlide]);
}
