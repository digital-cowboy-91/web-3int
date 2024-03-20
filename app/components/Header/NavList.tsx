import "./NavList.style.css";

const menuItems = ["Gallery / Store", "Services", "FAQ"];

export default function NavList({ className }: { className?: string }) {
  return (
    <ul id="NavList" className={className}>
      <li>Home</li>
      {menuItems.map((item, index) => (
        <li key={index}>{item}</li>
      ))}
    </ul>
  );
}
