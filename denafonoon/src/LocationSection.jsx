import "./LocationSection.css";

const locationQuery = "شرکت دنافنون، اصفهان، شهرک صنعتی محمودآباد، خیابان ۳۲";
const mapQuery = encodeURIComponent(locationQuery);

export default function LocationSection() {
  return (
    <section className="location-section" id="location" dir="rtl" aria-label="موقعیت شرکت دنافنون">
      <div className="location-layout">
        <div className="location-map">
          <iframe
            title="نقشه موقعیت شرکت دنافنون در اصفهان"
            src={`https://maps.google.com/maps?q=${mapQuery}&output=embed&hl=fa`}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            allowFullScreen
          />
          <a className="location-map-link" href={`https://www.google.com/maps/search/?api=1&query=${mapQuery}`} target="_blank" rel="noopener noreferrer">
            مشاهده در نقشه
          </a>
        </div>
        <p className="location-description">
          دنافنون در شهرک صنعتی محمودآباد اصفهان واقع شده است. این مجموعه با حدود ۷۰۰۰ مترمربع مساحت، بیش از ۳۰۰۰ مترمربع سالن سرپوشیده و تیمی متشکل از حدود ۴۰ نفر مهندس، تکنسین و نیروی ماهر، به طراحی و ساخت تجهیزات صنعتی و معدنی می‌پردازد.
        </p>
      </div>
      <div className="location-divider" aria-hidden="true" />
    </section>
  );
}
