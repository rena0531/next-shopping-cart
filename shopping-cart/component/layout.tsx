import styles from "./layout.module.css";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className={styles.container}>
      <h1>shopping cart</h1>
      <main>{children}</main>
    </div>
  );
}
