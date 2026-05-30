"use client";

import { useState } from "react";
import { useSearchParams } from "next/navigation";
import { createClient } from "@/lib/supabase";
import { SERVICE_OPTIONS } from "@/lib/data";

export default function ContactForm() {
  const searchParams = useSearchParams();
  const prefillService = searchParams.get("service") || "";

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    service: prefillService,
    message: "",
  });
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">(
    "idle"
  );
  const [errorMessage, setErrorMessage] = useState("");

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    setErrorMessage("");

    const supabase = createClient();

    const { error } = await supabase.from("contact_requests").insert({
      name: form.name,
      email: form.email,
      phone: form.phone || null,
      service: form.service,
      message: form.message,
    });

    if (error) {
      setStatus("error");
      setErrorMessage(
        "Something went wrong submitting your request. Please try again or call us directly."
      );
      return;
    }

    try {
      await fetch("/api/send-notification", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
    } catch {
      // Form saved to DB even if email fails
    }

    setStatus("success");
    setForm({ name: "", email: "", phone: "", service: "", message: "" });
  };

  if (status === "success") {
    return (
      <div
        className="rounded-2xl border border-green-200 bg-green-50 p-8 text-center"
        role="status"
      >
        <p className="text-lg font-bold text-green-800">
          Thanks! We&apos;ll be in touch within 24 hours.
        </p>
        <button
          type="button"
          onClick={() => setStatus("idle")}
          className="mt-4 text-sm font-semibold text-brand-orange hover:underline focus-ring rounded"
        >
          Send another request
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5" noValidate>
      <div>
        <label htmlFor="name" className="mb-1.5 block text-sm font-semibold">
          Full Name <span className="text-brand-orange">*</span>
        </label>
        <input
          type="text"
          id="name"
          name="name"
          required
          value={form.name}
          onChange={handleChange}
          className="w-full min-h-[44px] rounded-lg border border-gray-200 px-4 py-3 text-sm transition-colors focus:border-brand-orange focus:outline-none focus:ring-2 focus:ring-brand-orange/20"
          placeholder="Your full name"
        />
      </div>

      <div>
        <label htmlFor="email" className="mb-1.5 block text-sm font-semibold">
          Email Address <span className="text-brand-orange">*</span>
        </label>
        <input
          type="email"
          id="email"
          name="email"
          required
          value={form.email}
          onChange={handleChange}
          className="w-full min-h-[44px] rounded-lg border border-gray-200 px-4 py-3 text-sm transition-colors focus:border-brand-orange focus:outline-none focus:ring-2 focus:ring-brand-orange/20"
          placeholder="you@example.com"
        />
      </div>

      <div>
        <label htmlFor="phone" className="mb-1.5 block text-sm font-semibold">
          Phone Number
        </label>
        <input
          type="tel"
          id="phone"
          name="phone"
          value={form.phone}
          onChange={handleChange}
          className="w-full min-h-[44px] rounded-lg border border-gray-200 px-4 py-3 text-sm transition-colors focus:border-brand-orange focus:outline-none focus:ring-2 focus:ring-brand-orange/20"
          placeholder="+44 7XXX XXXXXX"
        />
      </div>

      <div>
        <label htmlFor="service" className="mb-1.5 block text-sm font-semibold">
          Service Type <span className="text-brand-orange">*</span>
        </label>
        <select
          id="service"
          name="service"
          required
          value={form.service}
          onChange={handleChange}
          className="w-full min-h-[44px] rounded-lg border border-gray-200 px-4 py-3 text-sm transition-colors focus:border-brand-orange focus:outline-none focus:ring-2 focus:ring-brand-orange/20"
        >
          <option value="">Select a service</option>
          {SERVICE_OPTIONS.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label htmlFor="message" className="mb-1.5 block text-sm font-semibold">
          Message / Job Description{" "}
          <span className="text-brand-orange">*</span>
        </label>
        <textarea
          id="message"
          name="message"
          required
          rows={5}
          value={form.message}
          onChange={handleChange}
          className="w-full min-h-[44px] rounded-lg border border-gray-200 px-4 py-3 text-sm transition-colors focus:border-brand-orange focus:outline-none focus:ring-2 focus:ring-brand-orange/20"
          placeholder="Describe the job you need help with..."
        />
      </div>

      {status === "error" && (
        <p className="rounded-lg bg-red-50 px-4 py-3 text-sm text-red-700" role="alert">
          {errorMessage}
        </p>
      )}

      <button
        type="submit"
        disabled={status === "loading"}
        className="w-full min-h-[44px] rounded-lg bg-brand-orange px-6 py-3.5 text-base font-bold text-white transition-all hover:bg-orange-600 hover:shadow-lg disabled:cursor-not-allowed disabled:opacity-60 focus-ring"
      >
        {status === "loading" ? "Sending..." : "Send Request"}
      </button>
    </form>
  );
}
