import React, { useState, useRef, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import styles from "./Navbar.module.css";
import { useAuth } from "../../hooks/useAuth";
import { useOnClickOutside } from "../../hooks/useOnClickOutside";

const Navbar: React.FC = () => {
  const { isAuthenticated, user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const mobileMenuRef = useRef<HTMLDivElement>(null);
  const hamburgerButtonRef = useRef<HTMLButtonElement>(null);

  useOnClickOutside(mobileMenuRef, (event) => {
    if (
      hamburgerButtonRef.current &&
      !hamburgerButtonRef.current.contains(event.target as Node)
    ) {
      setIsMobileMenuOpen(false);
    }
  });

  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location]);

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <header className={styles.header}>
      <nav className={styles.navbar}>
        <div className={styles.logo}>
          <Link to={isAuthenticated ? "/dashboard" : "/"}>Subscribe</Link>
        </div>

        <div className={styles.desktopMenu}>
          <Link to="/pricing" className={styles.navLink}>
            Pricing
          </Link>
          {isAuthenticated && user?.role === "ADMIN" && (
            <Link to="/admin" className={styles.navLink}>
              Admin
            </Link>
          )}
        </div>

        <div className={styles.userActions}>
          {isAuthenticated ? (
            <span className={styles.userInfo}>{user?.email}</span>
          ) : (
            <div className={styles.desktopAuthLinks}>
              <Link to="/login" className={styles.navLink}>
                Log In
              </Link>
              <Link to="/register" className={styles.navLink}>
                Register
              </Link>
            </div>
          )}
          {isAuthenticated && (
            <button onClick={handleLogout} className={styles.logoutButton}>
              Logout
            </button>
          )}
        </div>

        <button
          ref={hamburgerButtonRef}
          className={`${styles.hamburger} ${
            isMobileMenuOpen ? styles.hamburgerActive : ""
          }`}
          onClick={() => setIsMobileMenuOpen((prev) => !prev)}
          aria-label="Toggle navigation"
        >
          <span className={styles.hamburgerBar}></span>
          <span className={styles.hamburgerBar}></span>
          <span className={styles.hamburgerBar}></span>
        </button>
      </nav>

      <div
        ref={mobileMenuRef as React.RefObject<HTMLDivElement>}
        className={`${styles.mobileMenu} ${
          isMobileMenuOpen ? styles.mobileMenuOpen : ""
        }`}
      >
        <div className={styles.mobileMenuContent}>
          {isAuthenticated && (
            <div className={styles.mobileUserInfo}>{user?.email}</div>
          )}
          <Link to="/pricing" onClick={() => setIsMobileMenuOpen(false)}>
            Pricing
          </Link>
          {isAuthenticated && user?.role === "ADMIN" && (
            <Link to="/admin" onClick={() => setIsMobileMenuOpen(false)}>
              Admin
            </Link>
          )}
          {!isAuthenticated && (
            <>
              <Link to="/login" onClick={() => setIsMobileMenuOpen(false)}>
                Log In
              </Link>
              <Link to="/register" onClick={() => setIsMobileMenuOpen(false)}>
                Register
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
};

export default Navbar;
