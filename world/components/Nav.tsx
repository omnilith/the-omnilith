import React from "react";
import Link from "next/link";
import styles from "./Nav.module.css";
import { createClient } from "@core/core/utils/supabase/server";

const navItems = [
  { label: "Home", href: "/" },
  { label: "Blog", href: "/view/view-postListView" },
];

export default async function Nav() {
  const supabase = await createClient();

  const { data, error } = await supabase.auth.getUser();
  console.log("User data:", data, "Error:", error);

  return (
    <nav className={styles.mainNav}>
      <div>
        <Link href="/" className={styles.mainLogo}>
          <span>Omnilith</span>
        </Link>
        {/* {data?.user ? data.user.email : "Not logged in"} */}
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
}
