import { useRef, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import "./CustomersCarousel.css";

const slides = [
  [
    { name: "چینی زرین ایران", logo: "/images (1).jpg", description: "معتبرترین تولیدکننده ظروف چینی در خاورمیانه و یکی از مدرن ترین کارخانجات این صنعت در جهان است." },
    { name: "گروه صنعتی سولیکو کاله", logo: "/images.png", description: "یکی از بزرگ ترین و متنوع ترین مجموعه‌های صنایع غذایی در خاورمیانه و آسیا است." },
    { name: "معدن طلای زرشوران", logo: "/images.jpg", description: "یکی از بزرگ ترین معادن طلای روباز خاورمیانه و به عنوان بزرگ ترین معدن طلای ایران است." },
    { name: "صباباتری", logo: "/pigzq2dk.jpg", description: "از شرکت های تولید کننده داخلی باطری ماشین است که ده‌ها سال در ایران و جهان او را می شناسند." },
  ],
  [
    { name: "کارخانه سنگستان محلات", logo: "/images (1).png", description: "با هدف تولید سنگ‌های ساختمانی با کیفیت بالا و به عنوان بزرگ ترین کارخانه سنگ تأسیس شد." },
    { name: "شرکت کاشی و سرامیک ایفاسرام", logo: "/AnyConv.com__Logo.webp", description: "با بهره گیری از آخرین فن آوری روز دنیا ماشین آلات ایتالیایی، چاپ دیجیتال در صنعت کاشی و سرامیک است." },
    { name: "شرکت ماموت خودرو،", logo: "/images (2).jpg", description: "نماینده رسمی فولکس واگن در ایران، عرضه کننده انواع خودروهای فولکس واگن می باشد." },
  ],
];

export default function CustomersCarousel() {
  const [activeSlide, setActiveSlide] = useState(0);
  const touchStart = useRef(null);
  const move = (offset) => setActiveSlide((current) => (current + offset + slides.length) % slides.length);

  return (
    <section className="customers-section" dir="rtl" aria-labelledby="customers-heading" aria-roledescription="carousel">
      <h2 id="customers-heading">برندها و مشتریان طرف قرارداد</h2>
      <p className="customers-intro">
        از شروع فعالیت دنافنون، سعی کرده ایم بهترین محصولات را با بهترین قیمت، ضمانت کالا برای شما فراهم کنیم، از اینکه
        <br />به ما اعتماد کرده اید، از شما سپاسگزاریم.
      </p>
      <div className="customers-carousel" tabIndex={0}
        aria-label="کارت‌های مشتریان؛ با کلیدهای جهت‌نما اسلاید را تغییر دهید"
        onKeyDown={(event) => {
          if (event.key === "ArrowLeft" || event.key === "ArrowRight") {
            event.preventDefault();
            move(event.key === "ArrowLeft" ? 1 : -1);
          }
        }}
        onTouchStart={(event) => { touchStart.current = event.touches[0].clientX; }}
        onTouchEnd={(event) => {
          if (touchStart.current === null) return;
          const distance = event.changedTouches[0].clientX - touchStart.current;
          if (Math.abs(distance) > 50) move(distance < 0 ? 1 : -1);
          touchStart.current = null;
        }}>
        <div className="customers-viewport">
          <div className="customers-track" style={{ transform: `translateX(-${activeSlide * 100}%)` }}>
            {slides.map((customers, index) => (
              <div className="customers-slide" key={index} dir="rtl" role="group"
                aria-roledescription="slide" aria-label={`${index + 1} از ${slides.length}`}
                aria-hidden={activeSlide !== index} inert={activeSlide !== index}>
                {customers.map((customer) => (
                  <article className="customer-card" key={customer.name}>
                    <div className="customer-logo"><img src={customer.logo} alt={customer.name} /></div>
                    <h3>{customer.name}</h3>
                    <p>{customer.description}</p>
                  </article>
                ))}
              </div>
            ))}
          </div>
        </div>
        <button className="customers-arrow customers-next" type="button" onClick={() => move(1)} aria-label="اسلاید بعدی"><ChevronLeft aria-hidden="true" /></button>
        <button className="customers-arrow customers-previous" type="button" onClick={() => move(-1)} aria-label="اسلاید قبلی"><ChevronRight aria-hidden="true" /></button>
      </div>
      <p className="customers-tagline">دنافنون همراه با شما از ابتدا تا سرانجام کار</p>
      <div className="customers-dots" aria-label="انتخاب اسلاید">
        {slides.map((_, index) => <button key={index} type="button" aria-label={`اسلاید ${index + 1}`} aria-pressed={activeSlide === index} onClick={() => setActiveSlide(index)} />)}
      </div>
      <span className="customers-status" aria-live="polite">اسلاید {activeSlide + 1} از {slides.length}</span>
    </section>
  );
}
