/**
 * Generic, decorative city skyline (domes, minarets, a tower). Illustrative artwork only:
 * it is not a real photograph and does not depict any specific building. Always aria-hidden.
 */
export function Skyline({ className, fill = "currentColor" }: { className?: string; fill?: string }) {
  return (
    <svg className={className} viewBox="0 0 800 260" preserveAspectRatio="xMidYMax meet" aria-hidden="true" focusable="false">
      <g fill={fill}>
        <path d="M250 236v-60a90 90 0 0 1 180 0v60z" />
        <rect x="232" y="90" width="12" height="146" />
        <path d="m232 90 6-30 6 30z" />
        <rect x="436" y="90" width="12" height="146" />
        <path d="m436 90 6-30 6 30z" />
        <rect x="168" y="130" width="10" height="106" />
        <path d="m168 130 5-24 5 24z" />
        <rect x="502" y="130" width="10" height="106" />
        <path d="m502 130 5-24 5 24z" />
        <path d="M290 140a50 50 0 0 1 98 0z" opacity=".6" />
        <rect x="600" y="120" width="26" height="116" />
        <path d="M596 120h34l-17-40z" />
        <path d="M60 236v-40h60v40zM96 196a30 24 0 0 0-60 0z" opacity=".7" />
        <path d="M660 236v-30h90v30z" opacity=".7" />
      </g>
    </svg>
  );
}
