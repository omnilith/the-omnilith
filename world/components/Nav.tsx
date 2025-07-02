import React from "react";
import Link from "next/link";
import styles from "./Nav.module.css";

const navItems = [
  { label: "Home", href: "/" },
  { label: "Blog", href: "/view/view-BlogsListView" },
];

const Nav: React.FC = () => (
  <nav className={styles.nav}>
    <div className={styles.navInner}>
      <span className={styles.logo}>Omnilith</span>
      <ul className={styles.navList}>
        {navItems.map((item) => (
          <li key={item.href} className={styles.navItem}>
            <Link href={item.href} className={styles.navLink}>
              {item.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  </nav>
);

export default Nav;
