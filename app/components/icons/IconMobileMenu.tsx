export default function IconMobileMenu({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 32 32"
      version="1.1"
      style={{
        strokeLinecap: "round",
      }}
      className={className}
    >
      <path d="M6,8 L18,8" />
      <path d="M6,16 L26,16" />
      <path d="M14,24 L26,24" />
    </svg>
  );
}
