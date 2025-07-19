import { login, signup } from "./actions";
import styles from "./page.module.css";

export default function LoginPage() {
  return (
    <form className={styles.cyberForm}>
      <label htmlFor="email" className={styles.cyberLabel}>
        Email:
      </label>
      <input
        id="email"
        name="email"
        type="email"
        required
        className={styles.cyberInput}
      />
      <label htmlFor="password" className={styles.cyberLabel}>
        Password:
      </label>
      <input
        id="password"
        name="password"
        type="password"
        required
        className={styles.cyberInput}
      />
      <div className={styles.buttonRow}>
        <button formAction={login} className={styles.cyberButton}>
          Log in
        </button>
        <button formAction={signup} className={styles.cyberButtonAlt}>
          Sign up
        </button>
      </div>
    </form>
  );
}
