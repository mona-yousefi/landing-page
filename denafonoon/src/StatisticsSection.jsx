import "./StatisticsSection.css";

// Values transcribed from the supplied design; not connected to live sales data.
const progressItems = [
  { label: "درصد محصولات موجود شده", value: 81 },
  { label: "در حال به روز رسانی", value: 72 },
  { label: "فروش ها آماده ارسال", value: 82 },
  { label: "رضایت پشتیبانی", value: 94 },
];
const totals = [
  { label: "تعداد محصولات", value: 10 },
  { label: "تعداد پرسنل", value: 40 },
  { label: "فروش ها", value: 1143 },
  { label: "رضایتمندی", value: 100 },
];
const persianNumber = new Intl.NumberFormat("fa-IR", { useGrouping: false });

export default function StatisticsSection() {
  return (
    <section className="statistics-section" aria-labelledby="statistics-heading" dir="rtl">
      <div className="statistics-chart">
        <h2 id="statistics-heading">نمودار فروش و آمار</h2>
        <div className="statistics-progress-list">
          {progressItems.map(({ label, value }) => (
            <div className="statistics-progress-item" key={label}>
              <div className="statistics-progress-caption">
                <span dir="rtl">{label}</span>
                <span className="statistics-percent">{persianNumber.format(value)}٪</span>
              </div>
              <div className="statistics-progress-track" role="progressbar" aria-label={label} aria-valuenow={value} aria-valuemin={0} aria-valuemax={100}>
                <div className="statistics-progress-fill" style={{ width: `${value}%` }} />
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="statistics-band">
        <dl className="statistics-totals">
          {totals.map(({ label, value }) => (
            <div className="statistics-total" key={label}>
              <dt>{label}</dt>
              <dd>{persianNumber.format(value)}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
