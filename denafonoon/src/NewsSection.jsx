import { useCallback, useLayoutEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import "./NewsSection.css";
import useCarouselAutoplay from "./useCarouselAutoplay";

const article = {
  title: "تصفیه پساب و فاضلاب پتروشیمی / روش‌ها، مراحل، چالش‌ها و تجهیزات",
  summary: "تصفیه پساب و فاضلاب پتروشیمی با استفاده از فرایندهای تخصصی و تجهیزاتی مانند کلاریفایر و فیلتر پرس، در حذف آلاینده‌ها، مدیریت لجن و بازچرخانی آب نقش دارد.",
  detail: "انتخاب مراحل تصفیه به ترکیب پساب و هدف استفاده مجدد از آب بستگی دارد. کلاریفایر ذرات ته‌نشین‌شدنی را جدا می‌کند و فیلتر پرس برای آب‌گیری لجن به کار می‌رود.",
};

const projectPhotos = [
  "/design/filter.jpg",
  "/design/filter-press-cloth.jpg",
  "/design/multiwire.jpg",
];

const slideTiming = { duration: 680, easing: "cubic-bezier(0.4, 0, 0.2, 1)" };

export default function NewsSection() {
  const viewport = useRef(null);
  const carousel = useRef(null);
  const previousLayout = useRef(null);
  const outgoingCard = useRef(null);
  const [first, setFirst] = useState(0);
  const orderedPhotos = [...projectPhotos.slice(first), ...projectPhotos.slice(0, first)];

  const move = useCallback((direction) => {
    outgoingCard.current?.remove();
    outgoingCard.current = null;
    const cards = Array.from(viewport.current.children);
    for (const card of cards) {
      card.getAnimations().forEach((animation) => animation.cancel());
    }
    const wrappingCard = cards[direction === 1 ? 0 : cards.length - 1];
    const cardBounds = wrappingCard.getBoundingClientRect();
    const gridBounds = viewport.current.getBoundingClientRect();
    previousLayout.current = {
      direction,
      positions: new Map(cards.map((card) => [card, card.offsetLeft])),
      step: Math.abs(cards[0].offsetLeft - cards[1].offsetLeft),
      wrappingCard,
      left: cardBounds.left - gridBounds.left,
      top: cardBounds.top - gridBounds.top,
      width: cardBounds.width,
      visible: getComputedStyle(wrappingCard).visibility === "visible",
    };
    setFirst((current) => (current + direction + projectPhotos.length) % projectPhotos.length);
  }, []);

  useCarouselAutoplay(carousel, first, () => move(1));

  useLayoutEffect(() => {
    const layout = previousLayout.current;
    previousLayout.current = null;
    if (!layout || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    for (const card of viewport.current.children) {
      const distance = layout.positions.get(card) - card.offsetLeft;
      const shift = Math.abs(distance) > layout.step + 2
        ? -layout.direction * layout.step
        : distance;
      card.animate(
        [{ transform: `translateX(${shift}px)` }, { transform: "translateX(0)" }],
        slideTiming,
      );
    }

    if (layout.visible) {
      const copy = layout.wrappingCard.cloneNode(true);
      copy.inert = true;
      copy.setAttribute("aria-hidden", "true");
      Object.assign(copy.style, {
        position: "absolute",
        left: `${layout.left}px`,
        top: `${layout.top}px`,
        width: `${layout.width}px`,
        visibility: "visible",
        pointerEvents: "none",
      });
      viewport.current.append(copy);
      outgoingCard.current = copy;
      const animation = copy.animate(
        [{ transform: "translateX(0)" }, { transform: `translateX(${layout.direction * layout.step}px)` }],
        slideTiming,
      );
      animation.onfinish = () => {
        copy.remove();
        if (outgoingCard.current === copy) outgoingCard.current = null;
      };
    }
  }, [first]);
  return (
    <section id="blog" className="news-section" dir="rtl" aria-labelledby="news-heading">
      <h2 id="news-heading">آخرین اخبار و مقالات</h2>
      <p className="news-intro">
        در این بخش سعی داریم با ارائه مقالات آموزشی، معرفی دستگاه‌ها و خدمات دنافنون و انتشار اخبار و اطلاعیه‌های شرکت،
        شما را در خرید و استفاده از دستگاه‌ها و تولیدات دنافنون یاری کنیم.
      </p>
      <div
        className="news-carousel"
        ref={carousel}
        role="group"
        tabIndex={0}
        aria-label="کارت‌های مقالات؛ با کلیدهای جهت‌نما اسلاید را تغییر دهید"
        onKeyDown={(event) => {
          if (event.key === "ArrowLeft" || event.key === "ArrowRight") {
            event.preventDefault();
            move(event.key === "ArrowLeft" ? 1 : -1);
          }
        }}
      >
        <div className="news-grid" id="news-slider" ref={viewport}>
          {orderedPhotos.map((image) => (
            <article className="news-card" key={image}>
              <h3>{article.title}</h3>
              <p>{article.summary}</p>
              <img className="news-photo" src={image} alt="" loading="lazy" />
              <details className="news-details">
                <summary aria-label={`اطلاعات بیشتر درباره ${article.title}`}>اطلاعات بیشتر</summary>
                <p>{article.detail}</p>
              </details>
            </article>
          ))}
        </div>
        <button className="customers-arrow customers-previous" type="button" aria-controls="news-slider" aria-label="مقاله قبلی" onClick={() => move(-1)}>
          <ChevronRight aria-hidden="true" />
        </button>
        <button className="customers-arrow customers-next" type="button" aria-controls="news-slider" aria-label="مقاله بعدی" onClick={() => move(1)}>
          <ChevronLeft aria-hidden="true" />
        </button>
      </div>
    </section>
  );
}
