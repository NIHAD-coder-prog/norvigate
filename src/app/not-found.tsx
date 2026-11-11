import "./globals.css";

/** Global fallback for URLs outside any locale (rare: middleware normally redirects to /{locale}). */
export default function GlobalNotFound() {
  return (
    <html lang="en" dir="ltr">
      <body>
        <div className="container center-page">
          <div className="measure">
            <p className="code-tag">404</p>
            <h1>Page not found</h1>
            <p className="lead">The page you were looking for does not exist or has moved.</p>
            <a className="btn btn--primary" href="/">Back to home</a>
          </div>
        </div>
      </body>
    </html>
  );
}
