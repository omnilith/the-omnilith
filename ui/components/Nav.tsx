import React from "react";
import Link from "next/link";
import styles from "./Nav.module.css";
// import { createClient } from "@adapters/supabase/server";
// import LogoutButton from "./LogoutButton";

const navItems = [
  // { label: "Home", href: "/" },
  { label: "Blog", href: "/view/view-postListView" },
  { label: "About", href: "/about" },
];

export default async function Nav() {
  // const supabase = await createClient();
  // const { data } = await supabase.auth.getUser();

  return (
    <nav className={styles.mainNav}>
      <div>
        <Link href="/" className={styles.mainLogo}>
          <span>Lucidness</span>
        </Link>
      </div>
      <div style={{ display: "flex", alignItems: "center" }}>
        {navItems.map((item) => (
          <Link key={item.href} href={item.href} className={styles.rightLink}>
            {item.label}
          </Link>
        ))}
        {/* {data?.user ? (
          <LogoutButton />
        ) : (
          <Link href="/login" className={styles.rightLink}>
            Login
          </Link>
        )} */}
      </div>
    </nav>
  );
}
