import "./Footer.v2.style.css";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer__wrapper">
        <div className="footer__menu">Menu</div>
        <div className="footer__copyright">
          © 3int UK {new Date().getFullYear()} <span>|</span> developed by{" "}
          <span>digitalcowboys</span>
        </div>
      </div>
    </footer>
  );
}
