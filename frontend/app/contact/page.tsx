"use client";

import { useState } from "react";
import type { FormEvent } from "react";
import Image from "next/image";
import Link from "next/link";
import HeaderNavigation from "../../components/HeaderNavigation";
import SiteFooter from "../../components/SiteFooter";

function ArrowIcon({ diagonal = false }: { diagonal?: boolean }) {
  return (
    <svg
      aria-hidden="true"
      className={diagonal ? "arrow-icon arrow-icon-diagonal" : "arrow-icon"}
      viewBox="0 0 20 20"
      fill="none"
    >
      <path d="M3.5 10h12m-5-5 5 5-5 5" />
    </svg>
  );
}

export default function ContactPage() {
  const [status, setStatus] = useState("");
  const [statusType, setStatusType] = useState<"idle" | "sending" | "success" | "error">("idle");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const submitInquiry = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (isSubmitting) return;

    const formElement = event.currentTarget;
    const form = new FormData(formElement);
    const name = String(form.get("name") || "");
    const email = String(form.get("email") || "");
    const company = String(form.get("company") || "");
    const service = String(form.get("service") || "");
    const message = String(form.get("message") || "");
    const website = String(form.get("website") || "");

    setIsSubmitting(true);
    setStatusType("sending");
    setStatus("Sending your inquiry...");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, company, service, message, website }),
      });
      const result = await response.json();

      if (!response.ok) throw new Error(result.error || "Could not send your inquiry.");

      setStatusType("success");
      setStatus("Your inquiry has been sent successfully. We’ll get back to you soon.");
      formElement.reset();
    } catch (error) {
      setStatusType("error");
      setStatus(error instanceof Error ? error.message : "Could not send your inquiry.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className="contact-page">
      <header className="site-header">
        <Link className="brand" href="/" aria-label="Draxvane Technologies home">
          <span className="brand-mark">
            <Image
              src="/draxvane-logo.webp"
              alt="Draxvane Technologies"
              width={2090}
              height={375}
              sizes="(max-width: 700px) 172px, 210px"
              decoding="async"
              fetchPriority="high"
              preload
              unoptimized
            />
          </span>
        </Link>
        <HeaderNavigation />
      </header>

      <section className="contact-page-hero section-shell">
        <div className="contact-page-copy">
          <div className="eyebrow">
            <span className="eyebrow-line" /> Start a conversation
          </div>
          <h1>Let&apos;s make<br /><span>it happen.</span></h1>
          <p>
            Share what you&apos;re planning. We&apos;ll review the details and help
            you find the clearest next step.
          </p>
        </div>

        <aside className="contact-details" aria-label="Contact details">
          <figure className="contact-aside-image">
            <Image
              src="/images/design-review.webp"
              alt="Draxvane team reviewing a project together"
              fill
              sizes="260px"
              decoding="async"
            />
          </figure>
          <div>
            <span>Email</span>
            <a href="mailto:company@draxvane.com">company@draxvane.com</a>
          </div>
          <div>
            <span>Typical response</span>
            <p>Within 1–2 hours</p>
          </div>
        </aside>
      </section>

      <section className="contact-form-section section-shell">
        <form className="contact-form" onSubmit={submitInquiry}>
          <div className="contact-form-heading">
            <span>Tell us about your project</span>
            <p>Required fields are marked with *</p>
          </div>

          <input
            className="contact-honeypot"
            name="website"
            type="text"
            tabIndex={-1}
            autoComplete="off"
            aria-hidden="true"
          />

          <div className="contact-field-grid">
            <label>
              <span>Your name *</span>
              <input name="name" type="text" placeholder="John Smith" required />
            </label>
            <label>
              <span>Email address *</span>
              <input name="email" type="email" placeholder="john@company.com" required />
            </label>
            <label>
              <span>Company</span>
              <input name="company" type="text" placeholder="Your company" />
            </label>
            <label>
              <span>What do you need? *</span>
              <select name="service" required defaultValue="">
                <option value="" disabled>Select a service</option>
                <option>Custom software</option>
                <option>Website or e-commerce</option>
                <option>Mobile app</option>
                <option>Game development</option>
                <option>Graphic design or branding</option>
                <option>AI or automation</option>
                <option>AI pictures or videos</option>
                <option>Data entry or digital operations</option>
                <option>Something else</option>
              </select>
            </label>
          </div>

          <label>
            <span>Project details *</span>
            <textarea
              name="message"
              rows={7}
              placeholder="What are you building, improving, or looking to solve?"
              required
            />
          </label>

          <div className="contact-form-footer">
            <p className={`contact-form-status ${statusType}`} role="status" aria-live="polite">
              {status || "We usually reply within 1–2 business days."}
            </p>
            <button className="button button-primary" type="submit" disabled={isSubmitting}>
              {isSubmitting ? "Sending..." : "Send inquiry"} <ArrowIcon />
            </button>
          </div>
        </form>
      </section>

      <SiteFooter />
    </main>
  );
}
