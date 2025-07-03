import React from "react";
import Link from "next/link";
import styles from "./Nav.module.css";

const navItems = [
  { label: "Home", href: "/" },
  { label: "Blog", href: "/view/view-postListView" },
];

const Nav: React.FC = () => (
  <nav className={styles.mainNav}>
    <div>
      <Link href="/" className={styles.mainLogo}>
        <span>Omnilith</span>
      </Link>
    </div>
    <div>
      {navItems.map((item) => (
        <Link key={item.href} href={item.href} className={styles.rightLink}>
          {item.label}
        </Link>
      ))}
    </div>
  </nav>
);

export default Nav;
