import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import quarryImg from "./assets/quarry.jpg";
import "./App.css";
import CustomersCarousel from "./CustomersCarousel";
import StatisticsSection from "./StatisticsSection";
import ContactSection from "./ContactSection";
import LocationSection from "./LocationSection";

const labels = {
  brand: "دنافنون",
  main: "اصلی",
  home: "خانه",
  contact: "ارتباط با ما",
  mineView: "نمای معدن",
  stoneMineView: "نمای معدن سنگ",
  social: "شبکه‌های اجتماعی",
  services: "خدمات",
};

const socials = [
  { label: "Bale", src: "/bale.png" },
  { label: "Instagram", src: "/instagram.png" },
  { label: "YouTube", src: "/youtube.png" },
  { label: "Aparat", src: "/aparat.png" },
];

const services = [
  { title: "واحد فروش", src: "/building.png" },
  { title: "ضمانت محصول", src: "/lightbulb.png" },
  { title: "ایده‌های هوشمند", src: "/settings.png" },
  { title: "همیشه در کنار شما", src: "/letter.png" },
];

const heroSlides = [
  { src: quarryImg, alt: labels.stoneMineView },
  { src: "/second-pic.jpg", alt: labels.stoneMineView },
];

const aboutParagraph =
  "مولتی وایر جدیدترین نسل دستگاه‌های برش سنگ است که با بهره‌گیری از سیم الماسه، کوپ سنگ را با دقت بالا به اسلب تبدیل می‌کند.";

const products = [
  { title: "فیلتر پرس", imageLeft: "-395.8%" },
  { title: "سیم برش", imageLeft: "-276.6%" },
  { title: "مولتی وایر", imageLeft: "-158.6%" },
  { title: "فیلتر پرس", imageLeft: "-39.3%" },
];

const productDescription =
  "مولتی وایر جدیدترین نسل دستگاه‌های برش سنگ است که با بهره‌گیری از سیم الماسه، کوپ سنگ را با دقت بالا به اسلب تبدیل می‌کند.";

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
      {/* first section */}
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
      {/* second section */}
      <section className="about-section" id="about" dir="rtl">
        <div className="about-photo-stack">
          <div className="about-photo-backdrop" aria-hidden="true" />
          <div className="about-photo-crop">
            <img
              src="/about-reference.jpg"
              alt="نمای ورودی شرکت صنعتی و دانش بنیان دنافنون"
            />
          </div>
        </div>

        <div className="about-copy">
          <span className="about-accent" aria-hidden="true" />
          <div className="about-text">
            <h2>درباره شرکت صنعتی و دانش بنیان دنافنون</h2>
            <p>{aboutParagraph}</p>
            <p>{aboutParagraph}</p>
          </div>
        </div>
      </section>
      {/* third section */}
      <section className="products-section" id="products" dir="rtl">
        <div className="products-heading">
          <h2>محصولات مربوط به برش سنگ</h2>
          <span aria-hidden="true" />
          <span aria-hidden="true" />
        </div>

        <div className="products-grid">
          {products.map((product, index) => (
            <article className="product-card" key={`${product.title}-${index}`}>
              <div className="product-image-crop">
                <img
                  src="/products-reference.jpg"
                  alt={product.title}
                  style={{ "--image-left": product.imageLeft }}
                />
              </div>
              <div className="product-card-body">
                <h3>{product.title}</h3>
                <p>{productDescription}</p>
                <a href="#product-details">
                  <span>سازه</span>
                  <span className="product-arrow" aria-hidden="true">
                    ←
                  </span>
                </a>
              </div>
            </article>
          ))}
        </div>
      </section>
      <StatisticsSection />
      <CustomersCarousel />
      <ContactSection />
      <LocationSection />
    </main>
  );
}

export default App;
