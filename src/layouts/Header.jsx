import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import styles from "../stylecss/Header.module.css"; // ✅ Import CSS as a module
import homeimage from "../assets/images/hypertech.png";
import { FaSearch, FaShoppingCart, FaUser, FaBars } from "react-icons/fa";

const HeaderComponent = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  const [activeDropdown, setActiveDropdown] = useState(""); // 🔄 Shared dropdown state

  const navigate = useNavigate();

  const mobileBrands = ["Samsung", "Apple", "OnePlus", "Motorola", "Google Pixel", "Xiaomi", "Realme", "Oppo", "Vivo", "Nokia", "Asus", "Sony", "Huawei", "Lenovo", "Honor"];
  const laptopBrands = ["DELL", "HP", "LENOVO", "ASUS", "ACER", "Apple", "Microsoft", "Surface"];

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
      if (window.innerWidth > 768) setDrawerOpen(false);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleBrandClick = (brand) => {
    navigate(`/mobiles/${brand.toLowerCase()}`);
    setDrawerOpen(false);
  };

  const toggleDropdown = (menu) => {
    setActiveDropdown(activeDropdown === menu ? "" : menu);
  };

  return (
    <>
      {/* ✅ Start Header Section */}
      {/* 🔹 Upper Header */}

      <div className={styles.upperHeader}>
        <div className={styles.headerLeft}>
          {isMobile && <FaBars className={styles.menuButton} onClick={() => setDrawerOpen(true)} />}
          <div className={styles.logo}>
            <Link to="/"><img src={homeimage} alt="HYPERTECH" /></Link>
          </div>
        </div>

        <div className={styles.headerRight}>



          <div className={styles.searchContainer}>
            <div className={styles.searchBox}>
              <input type="text" placeholder="Search..." className={styles.searchInput} />
              <button type="submit" className={styles.searchButton}><FaSearch /></button>
            </div>
          </div>
          <Link to="userdetails"><button className={styles.loginBtn}><FaUser /></button></Link>
          <Link to="cart"><button className={styles.cartBtn}><FaShoppingCart /></button></Link>
        </div>
      </div>

      {/* ✅ End Upper Header & Start Lower Header Section */}
      {/* 🔹 Lower Header (if Desktop) */}
      {!isMobile && (
        <nav className={styles.lowerHeader}>
          <ul className={styles.lowerHeaderUl}>
            <li><Link to="/">HOME</Link></li>

            <li className={styles.dropdownContainer} onMouseEnter={() => setActiveDropdown("mobile")} onMouseLeave={() => setActiveDropdown("")}>
              <Link to="/mobiles">MOBILE PHONES ▼</Link>
              {activeDropdown === "mobile" && (
                <ul className={styles.dropdownMenu}>
                  {mobileBrands.map((brand) => (
                    <li key={brand}><Link to={`/mobiles/${brand.toLowerCase()}`}>{brand}</Link></li>
                  ))}
                </ul>
              )}
            </li>
            <li className={styles.dropdownContainer} onMouseEnter={() => setActiveDropdown("laptop")} onMouseLeave={() => setActiveDropdown("")}>
              <Link to="/laptops">LAPTOPS ▼</Link>
              {activeDropdown === "laptop" && (
                <ul className={styles.dropdownMenu}>
                  {laptopBrands.map((brand) => (
                    <li key={brand}><Link to={`/laptops/${brand.toLowerCase()}`}>{brand}</Link></li>
                  ))}
                </ul>
              )}
            </li>
            <li><Link to="/chromebooks">CHROMEBOOKS</Link></li>
            <li><Link to="/smartwatches">SMARTWATCHES</Link></li>
            <li className={styles.dropdownContainer} onMouseEnter={() => setActiveDropdown("accessories")} onMouseLeave={() => setActiveDropdown("")}>
              <Link to="/accessories">ACCESSORIES ▼</Link>
              {activeDropdown === "accessories" && (
                <ul className={styles.dropdownMenu}>
                  <li className={styles.submenuTitle}><Link to="/accessories/computer/">Computer Accessories</Link></li>
                  <ul className={styles.submenu}>
                    <li><Link to="/accessories/computer/laptop-bags">Laptop Bags</Link></li>
                    <li><Link to="/accessories/computer/laptop-chargers">Laptop Chargers</Link></li>
                  </ul>
                  <li className={styles.submenuTitle}><Link to="/accessories/mobile/">Mobile Accessories</Link></li>
                  <ul className={styles.submenu}>
                    <li><Link to="/accessories/mobile/power-banks">Power Banks</Link></li>
                    <li><Link to="/accessories/mobile/cables-chargers">Cables & Chargers</Link></li>
                  </ul>
                </ul>
              )}
            </li>
            <li><Link to="/reviews">REVIEWS</Link></li>
          </ul>
        </nav>
      )}
      {/* ✅ End Lower Header Section */}

      {/* ✅ Start Drawer Menu (Mobile) */}
      {/* 🔹 Drawer Menu (Mobile) */}
      {isMobile && (
        <div className={`${styles.drawer} ${drawerOpen ? styles.open : ""}`}>
          <button className={styles.closeBtn} onClick={() => setDrawerOpen(false)}>✖</button>
          <ul className={styles.drawerLinks}>
            <li><Link to="/" onClick={() => setDrawerOpen(false)}>Home</Link></li>
            <li onClick={() => toggleDropdown("mobile")}><Link to="/mobiles">Mobiles ▼</Link></li>
            {activeDropdown === "mobile" && mobileBrands.map((brand) => (
              <li key={brand} onClick={() => handleBrandClick(brand)}>
                <Link to={`/mobiles/${brand.toLowerCase()}`}>{brand}</Link>
              </li>
            ))}
            <li onClick={() => toggleDropdown("laptop")}><Link to="/laptops">Laptops ▼</Link></li>
            {activeDropdown === "laptop" && laptopBrands.map((brand) => (
              <li key={brand} onClick={() => setDrawerOpen(false)}>
                <Link to={`/laptops/${brand.toLowerCase()}`}>{brand}</Link>
              </li>
            ))}
            <li><Link to="/chromebooks" onClick={() => setDrawerOpen(false)}>Chromebooks</Link></li>
            <li><Link to="/smartwatches" onClick={() => setDrawerOpen(false)}>Smartwatches</Link></li>

            <li onClick={() => toggleDropdown("accessories")}><Link to="/accessories">Accessories ▼</Link></li>
            {activeDropdown === "accessories" && (
              <>
                <li className={styles.submenuTitle}>Computer Accessories</li>
                <ul className={styles.submenu}>
                  <li><Link to="/accessories/computer/laptop-bags">Laptop Bags</Link></li>
                  <li><Link to="/accessories/computer/laptop-chargers">Laptop Chargers</Link></li>
                  <li><Link to="/accessories/computer/keyboards">Keyboards</Link></li>
                </ul>
                <li className={styles.submenuTitle}>Mobile Accessories</li>
                <ul className={styles.submenu}>
                  <li><Link to="/accessories/mobile/power-banks">Power Banks</Link></li>
                  <li><Link to="/accessories/mobile/cables-chargers">Cables & Chargers</Link></li>
                </ul>
              </>
            )}

            <li><Link to="/reviews" onClick={() => setDrawerOpen(false)}>Reviews</Link></li>
          </ul>
        </div>
      )}
      {/* ✅ End of Drawer Menu (Mobile) */}
    </>
  );
};

export default HeaderComponent;
