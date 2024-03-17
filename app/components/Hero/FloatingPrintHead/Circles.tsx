export default function Circles({ className }: { className?: string }) {
  return (
    <svg
      width="600px"
      height="600px"
      className={`stroke-1 stroke-dark fill-none opacity-20 ${className}`}
    >
      <circle r="298" cx="300" cy="300" />
      <circle r="250" cx="300" cy="300" />
      <path d="M50 50 L550 550" />
    </svg>
  );
}
