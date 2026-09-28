"use client";

import { useState } from "react";
import { Button } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icon";
import { isValidBdPhone } from "@/lib/format";
import { cn } from "@/lib/utils";
import { useToast } from "@/store/toast-context";

interface FormState {
  name: string;
  phone: string;
  subject: string;
  message: string;
}

const subjects = [
  "পণ্য সম্পর্কে জানতে চাই",
  "অর্ডার সম্পর্কিত সহায়তা",
  "সাইজ পরিবর্তন / এক্সচেঞ্জ",
  "কাস্টম ডিজাইন অর্ডার",
  "পাইকারি / রিসেলার",
  "অন্যান্য",
];

const empty: FormState = { name: "", phone: "", subject: subjects[0], message: "" };

export function ContactForm() {
  const [form, setForm] = useState<FormState>(empty);
  const [errors, setErrors] = useState<Partial<Record<keyof FormState, string>>>({});
  const [sent, setSent] = useState(false);
  const { toast } = useToast();

  const update = (field: keyof FormState, value: string) => {
    setForm((current) => ({ ...current, [field]: value }));
    setErrors((current) => ({ ...current, [field]: undefined }));
  };

  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const found: Partial<Record<keyof FormState, string>> = {};
    if (form.name.trim().length < 3) found.name = "আপনার নাম লিখুন।";
    if (!isValidBdPhone(form.phone)) found.phone = "সঠিক মোবাইল নম্বর দিন।";
    if (form.message.trim().length < 10) found.message = "অন্তত ১০ অক্ষরের বার্তা লিখুন।";
    setErrors(found);

    const first = Object.keys(found)[0];
    if (first) {
      toast("অনুগ্রহ করে তথ্যগুলো ঠিকভাবে পূরণ করুন।", "error");
      document.getElementById(`contact-${first}`)?.focus();
      return;
    }

    setSent(true);
    setForm(empty);
    toast("আপনার বার্তা পাঠানো হয়েছে। শীঘ্রই যোগাযোগ করা হবে।", "success");
  };

  const inputClass = (field: keyof FormState) =>
    cn(
      "w-full rounded-sm border bg-white px-3.5 py-2.5 text-[14px] text-ink outline-none transition placeholder:text-muted/70 focus:border-gold focus:ring-2 focus:ring-gold/20",
      errors[field] ? "border-maroon" : "border-sand",
    );

  if (sent) {
    return (
      <div className="rounded-sm border border-leaf/25 bg-leaf-soft p-6 text-center md:p-8">
        <span className="mx-auto grid size-12 place-items-center rounded-full bg-leaf text-white">
          <Icon name="check" size={24} />
        </span>
        <h3 className="mt-4 text-[17px] text-ink">আপনার বার্তা পেয়েছি</h3>
        <p className="mt-2 text-[13.5px] leading-relaxed text-ink-soft">
          সাধারণত ১ কর্মদিবসের মধ্যে আমরা যোগাযোগ করি। জরুরি প্রয়োজনে WhatsApp-এ মেসেজ দিতে পারেন।
        </p>
        <button
          type="button"
          onClick={() => setSent(false)}
          className="mt-4 text-[13px] font-medium text-gold underline underline-offset-4"
        >
          আরেকটি বার্তা পাঠান
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} noValidate className="rounded-sm border border-line bg-white p-5 md:p-6">
      <h2 className="text-[17px] font-semibold text-ink">বার্তা পাঠান</h2>
      <p className="mt-1 text-[12.5px] text-muted">
        ফর্মটি পূরণ করুন—আমাদের টিম আপনার সাথে যোগাযোগ করবে। (ডেমো ফর্ম, তথ্য কোথাও সংরক্ষণ হয় না)
      </p>

      <div className="mt-5 grid gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="contact-name" className="mb-1.5 block text-[13px] font-medium text-ink">
            আপনার নাম <span className="text-maroon">*</span>
          </label>
          <input
            id="contact-name"
            type="text"
            autoComplete="name"
            placeholder="পূর্ণ নাম"
            value={form.name}
            onChange={(event) => update("name", event.target.value)}
            aria-invalid={Boolean(errors.name)}
            className={inputClass("name")}
          />
          {errors.name && <p className="mt-1 text-[12px] text-maroon">{errors.name}</p>}
        </div>

        <div>
          <label htmlFor="contact-phone" className="mb-1.5 block text-[13px] font-medium text-ink">
            মোবাইল নম্বর <span className="text-maroon">*</span>
          </label>
          <input
            id="contact-phone"
            type="tel"
            inputMode="tel"
            autoComplete="tel"
            placeholder="01XXXXXXXXX"
            value={form.phone}
            onChange={(event) => update("phone", event.target.value)}
            aria-invalid={Boolean(errors.phone)}
            className={inputClass("phone")}
          />
          {errors.phone && <p className="mt-1 text-[12px] text-maroon">{errors.phone}</p>}
        </div>

        <div className="sm:col-span-2">
          <label htmlFor="contact-subject" className="mb-1.5 block text-[13px] font-medium text-ink">
            বিষয়
          </label>
          <select
            id="contact-subject"
            value={form.subject}
            onChange={(event) => update("subject", event.target.value)}
            className={inputClass("subject")}
          >
            {subjects.map((subject) => (
              <option key={subject} value={subject}>
                {subject}
              </option>
            ))}
          </select>
        </div>

        <div className="sm:col-span-2">
          <label htmlFor="contact-message" className="mb-1.5 block text-[13px] font-medium text-ink">
            আপনার বার্তা <span className="text-maroon">*</span>
          </label>
          <textarea
            id="contact-message"
            rows={5}
            placeholder="কীভাবে সাহায্য করতে পারি তা লিখুন…"
            value={form.message}
            onChange={(event) => update("message", event.target.value)}
            aria-invalid={Boolean(errors.message)}
            className={cn(inputClass("message"), "resize-y")}
          />
          {errors.message && <p className="mt-1 text-[12px] text-maroon">{errors.message}</p>}
        </div>
      </div>

      <Button type="submit" size="lg" className="mt-5" fullWidth>
        বার্তা পাঠান
      </Button>
    </form>
  );
}
