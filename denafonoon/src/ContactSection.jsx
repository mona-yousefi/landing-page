import "./ContactSection.css";

const phone = <a href="tel:+983133803936"><bdi>۰۳۱-۳۳۸۰۳۹۳۶</bdi></a>;

export default function ContactSection() {
  return (
    <section className="contact-section" id="contact" dir="rtl" aria-label="ارتباط با دنافنون">
      <div className="contact-panels">
        <article className="contact-panel">
          <img className="contact-icon" src="/contact-support.png" alt="" />
          <h2>پشتیبانی</h2>
          <p>در صورت وجود هر سوال و مشکل قبل از خرید در سایت و مشکلات پشتیبانی، می توانید با شماره تلفن پشتیبانی و فروش شرکت {phone} در تماس باشید.</p>
        </article>
        <article className="contact-panel">
          <img className="contact-icon" src="/contact-mail.png" alt="" />
          <h2>درخواست همکاری</h2>
          <p>برای ارسال درخواست خرید دستگاه و مشاوره های قبل از خرید، می توانید در ساعات اداری با شماره تلفن های شرکت در تماس باشید. همیشه کنار شما هستیم.</p>
        </article>
        <article className="contact-panel">
          <img className="contact-icon contact-icon-map" src="/contact-location.png" alt="" />
          <h2>اطلاعات تماس دنافنون</h2>
          <p>آدرس کارخانه: اصفهان، کیلومتر ۸ جاده تهران، خیابان ۳۲، شرکت دنافنون<br />کدپستی: <bdi>۸۱۶۱۱۹۹۸۷۵</bdi><br />تلفن: {phone}</p>
        </article>
      </div>
    </section>
  );
}
