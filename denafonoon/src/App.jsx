import { useEffect, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
const quarryImg = "/design/hero.jpg";
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
  { title: "کنترل کیفی", src: "/letter.png" },
  { title: "ضمانت محصولات", src: "/settings.png" },
  { title: "ایده‌های هوشمند", src: "/lightbulb.png" },
  { title: "همیشه در کنار شما", src: "/building.png" },
];
const navigation = [
  { id: "home", label: "خانه" },
  { id: "about", label: "درباره ما" },
  { id: "resume", label: "رزومه", pending: true },
  { id: "products", label: "محصولات" },
  { id: "catalog", label: "کاتالوگ", pending: true },
  { id: "gallery", label: "گالری تصاویر", pending: true },
  { id: "blog", label: "وبلاگ", pending: true },
  { id: "contact", label: "اطلاعات تماس" },
];

const heroSlides = [
  { src: quarryImg, alt: labels.stoneMineView },
  { src: "/second-pic.jpg", alt: labels.stoneMineView },
];

const aboutParagraph = "شرکت دنافنون در سال ۱۳۶۸ توسط افرادی با سابقه‌های فنی و مهندسی و مدیریت‌های اجرایی در زمینه ساخت و تولید، تأسیس گردید و با هدف کم کردن وابستگی صنایع معدنی به بازارهای خارجی و استفاده از تولیدات با کیفیت و پیشرفته ساخت داخل ادامه به فعالیت داد.";
const aboutHistory = "شرکت دنافنون با پشت سر گذاشتن فراز و نشیب‌های فراوان موفق گردیده است تا کنون متجاوز از تعداد ۲۰۰۰ دستگاه در زمینه بهره‌برداری معادن سنگ ساختمانی و دیگر صنایع وابسته، تولید و به بازارهای داخل و خارج از کشور تحویل نماید.";
const products = [
  { title: "سیم برش", image: "/design/wire.jpg" },
  { title: "مولتی وایر", image: "/design/multiwire.jpg" },
  { title: "فیلتر پرس", image: "/design/filter.jpg" },
];

const productDescription =
  "مولتی وایر جدیدترین نسل دستگاه‌های برش سنگ است که با بهره‌گیری از سیم الماسه، کوپ سنگ را با دقت بالا به اسلب تبدیل می‌کند.";

function App() {
  const [activeSlide, setActiveSlide] = useState(0);
  const [activeSection, setActiveSection] = useState("home");
  useEffect(() => {
    const updateSection = () => {
      const marker = window.innerHeight * 0.35;
      let current = "home";
      navigation.forEach(({ id }) => {
        if (document.getElementById(id)?.getBoundingClientRect().top <= marker) current = id;
      });
      setActiveSection(current);
    };
    updateSection();
    window.addEventListener("scroll", updateSection, { passive: true });
    window.addEventListener("hashchange", updateSection);
    return () => {
      window.removeEventListener("scroll", updateSection);
      window.removeEventListener("hashchange", updateSection);
    };
  }, []);

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
        <img src="/design/brand.jpg" alt={labels.brand} />
      </aside>

      <div className="composition">
        <div className="top-band" />

        <nav className="main-nav" aria-label={labels.main}>
          {navigation.map(({ id, label, pending }) => pending ? (
            <button className="nav-pending" key={id} type="button"
              aria-pressed={activeSection === id} onClick={() => setActiveSection(id)}
              title="این صفحه هنوز آماده نشده است">{label}</button>
          ) : (
            <a key={id} href={`#${id}`} aria-current={activeSection === id ? "location" : undefined}
              onClick={() => setActiveSection(id)}>{label}</a>
          ))}
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
              src="/design/about.jpg"
              alt="نمای ورودی شرکت صنعتی و دانش بنیان دنافنون"
            />
          </div>
        </div>

        <div className="about-copy">
          <span className="about-accent" aria-hidden="true" />
          <div className="about-text">
            <h2>درباره شرکت صنعتی و دانش بنیان دنافنون</h2>
            <p>{aboutParagraph}</p>
            <p>{aboutHistory}</p>
          </div>
        </div>
      </section>
      {/* third section */}
      {[
        { id: "industrial-products", title: "محصولات مربوط به تصفیه صنعتی" },
        { id: "products", title: "محصولات مربوط به برش سنگ" },
      ].map((category) => (
      <section className="products-section" id={category.id} key={category.id} dir="rtl">
        <div className="products-heading">
          <h2>{category.title}</h2>
          <span aria-hidden="true" />
          <span aria-hidden="true" />
        </div>

        <div className="products-grid">
          {products.map((product, index) => (
            <article className="product-card" key={`${product.title}-${index}`}>
              <div className="product-image-crop">
                <img
                  src={product.image}
                  alt={product.title}
                />
              </div>
              <div className="product-card-body">
                <h3>{product.title}</h3>
                <p>{productDescription}</p>
                <a href="#contact">
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
      ))}
      <StatisticsSection />
      <CustomersCarousel />
      <ContactSection />
      <LocationSection />
    </main>
  );
}

export default App;
import "./DesignReference.css";
