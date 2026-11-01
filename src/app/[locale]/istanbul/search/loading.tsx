export default function Loading() {
  return (
    <div className="container section" role="status" aria-live="polite" aria-busy="true">
      <span className="visually-hidden">Loading…</span>
      <div className="skeleton" style={{ height: 40, width: "50%", marginBlockEnd: 16 }} />
      <div className="skeleton" style={{ height: 18, width: "80%", marginBlockEnd: 10 }} />
      <div className="skeleton" style={{ height: 18, width: "65%", marginBlockEnd: 28 }} />
      <div className="grid grid--3">
        <div className="skeleton" style={{ height: 160 }} />
        <div className="skeleton" style={{ height: 160 }} />
        <div className="skeleton" style={{ height: 160 }} />
      </div>
    </div>
  );
}
