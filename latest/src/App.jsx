import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import quarryImg from "./assets/quarry.jpg";
import "./App.css";

const labels = {
  brand: "دنا فنون",
  main: "اصلی",
  home: "خانه",
  contact: "ارتباط با ما",
  mineView: "نمای معدن",
  stoneMineView: "نمای معدن سنگ",
  social: "شبکه های اجتماعی",
  services: "خدمات",
};

const socials = [
  { label: "Bale", src: "/bale.png" },
  { label: "Instagram", src: "/instagram.png" },
  { label: "YouTube", src: "/youtube.png" },
  { label: "Aparat", src: "/aparat.png" },
];

const services = [
  {
    title: "واحد فروش",
    src: "/building.png",
  },
  {
    title: "ضمانت محصول",
    src: "/lightbulb.png",
  },
  {
    title: "ایده های هوشمند",
    src: "/settings.png",
  },
  {
    title: "همیشه در کنار شما",
    src: "/letter.png",
  },
];

const heroSlides = [
  { src: quarryImg, alt: labels.stoneMineView },
  { src: "/marble.jpg", alt: labels.stoneMineView },
];

function App() {
  const [activeSlide, setActiveSlide] = useState(0);

  const showPreviousSlide = () => {
    setActiveSlide(
      (currentSlide) =>
        (currentSlide - 1 + heroSlides.length) % heroSlides.length,
    );
  };

  const showNextSlide = () => {
    setActiveSlide((currentSlide) => (currentSlide + 1) % heroSlides.length);
  };

  return (
    <main className="landing" dir="ltr">
      <aside className="brand-panel" aria-label={labels.brand}>
        <img src="/logo.png" alt={labels.brand} />
        <span>{labels.brand}</span>
      </aside>

      <div className="composition">
        <div className="top-band" />

        <nav className="main-nav" aria-label={labels.main}>
          <a href="#contact">{labels.contact}</a>
          <a href="#home">{labels.home}</a>
        </nav>

        <div className="middle-band" />

        <section className="hero-frame" id="home" aria-label={labels.mineView}>
          <div
            className="hero-track"
            style={{ transform: `translateX(-${activeSlide * 100}%)` }}
          >
            {heroSlides.map((slide) => (
              <img src={slide.src} alt={slide.alt} key={slide.src} />
            ))}
          </div>
          <button
            className="slider-arrow slider-arrow-prev"
            type="button"
            onClick={showPreviousSlide}
            aria-label="Previous slide"
          >
            <ChevronLeft aria-hidden="true" />
          </button>
          <button
            className="slider-arrow slider-arrow-next"
            type="button"
            onClick={showNextSlide}
            aria-label="Next slide"
          >
            <ChevronRight aria-hidden="true" />
          </button>
          <div className="slider-dots" aria-label="Hero slides">
            {heroSlides.map((slide, index) => (
              <button
                className={index === activeSlide ? "is-active" : undefined}
                type="button"
                key={slide.src}
                onClick={() => setActiveSlide(index)}
                aria-label={`Show slide ${index + 1}`}
                aria-pressed={index === activeSlide}
              />
            ))}
          </div>
        </section>

        <aside className="social-rail" aria-label={labels.social}>
          {socials.map(({ label, src }) => (
            <a
              className="social-link"
              href="#social"
              key={label}
              aria-label={label}
            >
              <img className="social-logo" src={src} alt="" />
            </a>
          ))}
        </aside>

        <section className="service-strip" aria-label={labels.services}>
          {services.map(({ src, title }) => (
            <a href="#services" className="service-card" key={title}>
              <img className="service-icon" src={src} alt="" />
              <span>{title}</span>
            </a>
          ))}
        </section>
      </div>
    </main>
  );
}

export default App;
