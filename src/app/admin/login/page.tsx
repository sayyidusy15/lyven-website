import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";
import { getAdminUser, isAdminAuthConfigured } from "../../../lib/admin-auth";
import LoginForm from "./LoginForm";
import styles from "./login.module.css";

export const metadata: Metadata = {
  title: "Admin Sign In | Lyven",
  description: "Private Lyven admin sign-in.",
  robots: { index: false, follow: false },
};

export const dynamic = "force-dynamic";

export default async function AdminLoginPage() {
  if (await getAdminUser()) redirect("/admin");

  return <main className={styles.page}>
    <div className={styles.orbit} aria-hidden="true" />
    <div className={styles.shell}>
      <Link href="/" className={styles.brand} aria-label="Lyven website home">
        <Image src="/assets/img/logo-lyven-primary.svg" alt="Lyven" width={110} height={32} priority />
      </Link>
      <section className={styles.card} aria-labelledby="login-title">
        <div className={styles.icon}><i className="bi bi-shield-lock" aria-hidden="true" /></div>
        <p className={styles.eyebrow}>PRIVATE WORKSPACE</p>
        <h1 id="login-title">Welcome back<span>.</span></h1>
        <p className={styles.intro}>Sign in with your Lyven admin account to manage projects, articles, media, and inquiries.</p>
        <LoginForm configured={isAdminAuthConfigured()} />
      </section>
      <Link href="/" className={styles.back}><i className="bi bi-arrow-left" aria-hidden="true" /> Back to website</Link>
    </div>
  </main>;
}
