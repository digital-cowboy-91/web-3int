import "./Footer.style.css";

export default function Footer() {
  return (
    <footer className="footer main-gradient--footer">
      <div className="footer--menu">Menu</div>
      <div className="footer--copyright">
        <div>
          © 3INT {new Date().getFullYear()} <span>|</span> developed by{" "}
          <span>digitalcowboys</span>
        </div>
      </div>
    </footer>
  );
}
