"use client";

import { useParams } from "next/navigation";

const COPY: Record<string, { t: string; x: string; r: string }> = {
  en: { t: "Something went wrong", x: "An unexpected error occurred. You can try again or go back to a working page.", r: "Try again" },
  tr: { t: "Bir şeyler ters gitti", x: "Beklenmedik bir hata oluştu. Yeniden deneyebilir veya çalışan bir sayfaya dönebilirsiniz.", r: "Yeniden dene" },
  ar: { t: "حدث خطأ ما", x: "وقع خطأ غير متوقع. يمكنك المحاولة مرة أخرى أو العودة إلى صفحة تعمل.", r: "حاول مرة أخرى" },
  es: { t: "Algo salió mal", x: "Se produjo un error inesperado. Puedes intentarlo de nuevo o volver a una página que funcione.", r: "Intentar de nuevo" },
};

export default function ErrorPage({ reset }: { error: Error & { digest?: string }; reset: () => void }) {
  const { locale } = useParams<{ locale: string }>();
  const c = COPY[(locale ?? "en").split("-")[0]] ?? COPY.en;
  return (
    <div className="container center-page" role="alert">
      <div className="measure">
        <h1>{c.t}</h1>
        <p className="lead">{c.x}</p>
        <button type="button" className="btn btn--primary" onClick={reset}>{c.r}</button>
      </div>
    </div>
  );
}
