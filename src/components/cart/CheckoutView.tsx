"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useMemo, useState } from "react";
import { Button } from "@/components/ui/Button";
import { EmptyState } from "@/components/ui/EmptyState";
import { Icon } from "@/components/ui/Icon";
import { siteConfig } from "@/config/site";
import { dhakaCityAreas, divisions, getDistricts, isInsideDhaka } from "@/data/locations";
import { formatPrice, generateOrderId, isValidBdPhone, toBnDigits, toEnDigits } from "@/lib/format";
import { saveOrder } from "@/lib/orders";
import { cn } from "@/lib/utils";
import { useCart } from "@/store/cart-context";
import { useToast } from "@/store/toast-context";
import type { CustomerOrder } from "@/types";

interface FormState {
  name: string;
  phone: string;
  address: string;
  division: string;
  district: string;
  area: string;
  note: string;
}

type FieldErrors = Partial<Record<keyof FormState, string>>;

const initialForm: FormState = {
  name: "",
  phone: "",
  address: "",
  division: "",
  district: "",
  area: "",
  note: "",
};

export function CheckoutView() {
  const { items, subtotal, hydrated, clearCart } = useCart();
  const { toast } = useToast();
  const router = useRouter();

  const [form, setForm] = useState<FormState>(initialForm);
  const [errors, setErrors] = useState<FieldErrors>({});
  const [zone, setZone] = useState<"inside" | "outside">("inside");
  const [zoneTouched, setZoneTouched] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const districts = useMemo(() => getDistricts(form.division), [form.division]);
  const deliveryCharge =
    zone === "inside" ? siteConfig.delivery.insideDhaka : siteConfig.delivery.outsideDhaka;
  const freeDelivery = subtotal >= siteConfig.delivery.freeDeliveryAbove;
  const payableDelivery = freeDelivery ? 0 : deliveryCharge;
  const total = subtotal + payableDelivery;

  const update = (field: keyof FormState, value: string) => {
    setForm((current) => ({ ...current, [field]: value }));
    setErrors((current) => ({ ...current, [field]: undefined }));
  };

  const onDivisionChange = (value: string) => {
    setForm((current) => ({ ...current, division: value, district: "", area: "" }));
    setErrors((current) => ({ ...current, division: undefined, district: undefined }));
  };

  const onDistrictChange = (value: string) => {
    setForm((current) => ({ ...current, district: value, area: "" }));
    setErrors((current) => ({ ...current, district: undefined }));
    if (!zoneTouched) setZone(isInsideDhaka(value) ? "inside" : "outside");
  };

  const validate = (): FieldErrors => {
    const next: FieldErrors = {};
    if (form.name.trim().length < 3) next.name = "সম্পূর্ণ নাম লিখুন (কমপক্ষে ৩ অক্ষর)।";
    if (!isValidBdPhone(form.phone)) next.phone = "সঠিক মোবাইল নম্বর দিন। যেমন: 01712345678";
    if (form.address.trim().length < 10)
      next.address = "বাসা/রোড/গ্রামসহ বিস্তারিত ঠিকানা লিখুন।";
    if (!form.division) next.division = "বিভাগ নির্বাচন করুন।";
    if (!form.district) next.district = "জেলা নির্বাচন করুন।";
    if (form.area.trim().length < 2) next.area = "এলাকা/থানার নাম লিখুন।";
    return next;
  };

  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const found = validate();
    setErrors(found);

    const firstError = Object.keys(found)[0];
    if (firstError) {
      toast("অনুগ্রহ করে প্রয়োজনীয় তথ্যগুলো ঠিকভাবে পূরণ করুন।", "error");
      document.getElementById(`field-${firstError}`)?.focus();
      return;
    }

    setSubmitting(true);
    const order: CustomerOrder = {
      id: generateOrderId(),
      createdAt: new Date().toISOString(),
      name: form.name.trim(),
      phone: toEnDigits(form.phone).replace(/[\s-]/g, ""),
      address: form.address.trim(),
      division: form.division,
      district: form.district,
      area: form.area.trim(),
      note: form.note.trim() || undefined,
      deliveryZone: zone,
      deliveryCharge: payableDelivery,
      subtotal,
      total,
      items,
      paymentMethod: siteConfig.policy.codLabel,
      status: "নিশ্চিত হয়েছে",
    };

    saveOrder(order);
    clearCart();
    toast("আপনার অর্ডারটি সফলভাবে গ্রহণ করা হয়েছে।", "success");
    router.push(`/order/${order.id}`);
  };

  if (!hydrated) {
    return (
      <div className="container-x py-16 text-center text-sm text-muted">চেকআউট প্রস্তুত হচ্ছে…</div>
    );
  }

  if (items.length === 0) {
    return (
      <EmptyState
        icon="bag"
        title="চেকআউট করার মতো কোনো পণ্য নেই"
        description="কার্টে পণ্য যোগ করলে এখান থেকে ক্যাশ অন ডেলিভারিতে অর্ডার সম্পন্ন করতে পারবেন।"
        actionLabel="গয়না দেখুন"
        actionHref="/shop"
        secondaryLabel="কার্টে ফিরে যান"
        secondaryHref="/cart"
      />
    );
  }

  const inputClass = (field: keyof FormState) =>
    cn(
      "w-full rounded-sm border bg-white px-3.5 py-2.5 text-[14px] text-ink outline-none transition placeholder:text-muted/70 focus:border-gold focus:ring-2 focus:ring-gold/20",
      errors[field] ? "border-maroon" : "border-sand",
    );

  return (
    <form onSubmit={onSubmit} className="container-x py-7 md:py-10" noValidate>
      <div className="grid gap-6 lg:grid-cols-[1fr_360px] lg:gap-8">
        {/* ফর্ম */}
        <div className="space-y-5">
          <fieldset className="rounded-sm border border-line bg-white p-5">
            <legend className="px-1 text-[15px] font-semibold text-ink">
              ডেলিভারি তথ্য
            </legend>
            <p className="mb-4 text-[12.5px] text-muted">
              অর্ডার করতে অ্যাকাউন্ট খোলার প্রয়োজন নেই—শুধু নিচের তথ্যগুলো দিন।
            </p>

            <div className="grid gap-4 sm:grid-cols-2">
              <div className="sm:col-span-1">
                <label htmlFor="field-name" className="mb-1.5 block text-[13px] font-medium text-ink">
                  আপনার নাম <span className="text-maroon">*</span>
                </label>
                <input
                  id="field-name"
                  name="name"
                  type="text"
                  autoComplete="name"
                  placeholder="যেমন: নুসরাত জাহান"
                  value={form.name}
                  onChange={(event) => update("name", event.target.value)}
                  aria-invalid={Boolean(errors.name)}
                  aria-describedby={errors.name ? "error-name" : undefined}
                  className={inputClass("name")}
                />
                {errors.name && (
                  <p id="error-name" className="mt-1 text-[12px] text-maroon">
                    {errors.name}
                  </p>
                )}
              </div>

              <div className="sm:col-span-1">
                <label htmlFor="field-phone" className="mb-1.5 block text-[13px] font-medium text-ink">
                  মোবাইল নম্বর <span className="text-maroon">*</span>
                </label>
                <input
                  id="field-phone"
                  name="phone"
                  type="tel"
                  inputMode="tel"
                  autoComplete="tel"
                  placeholder="01XXXXXXXXX"
                  value={form.phone}
                  onChange={(event) => update("phone", event.target.value)}
                  aria-invalid={Boolean(errors.phone)}
                  aria-describedby={errors.phone ? "error-phone" : "hint-phone"}
                  className={inputClass("phone")}
                />
                {errors.phone ? (
                  <p id="error-phone" className="mt-1 text-[12px] text-maroon">
                    {errors.phone}
                  </p>
                ) : (
                  <p id="hint-phone" className="mt-1 text-[12px] text-muted">
                    ডেলিভারির আগে এই নম্বরে কল করা হবে।
                  </p>
                )}
              </div>

              <div className="sm:col-span-2">
                <label
                  htmlFor="field-address"
                  className="mb-1.5 block text-[13px] font-medium text-ink"
                >
                  সম্পূর্ণ ঠিকানা <span className="text-maroon">*</span>
                </label>
                <textarea
                  id="field-address"
                  name="address"
                  rows={3}
                  autoComplete="street-address"
                  placeholder="বাসা/হোল্ডিং নম্বর, রোড, গ্রাম/মহল্লা, ডাকঘর"
                  value={form.address}
                  onChange={(event) => update("address", event.target.value)}
                  aria-invalid={Boolean(errors.address)}
                  aria-describedby={errors.address ? "error-address" : undefined}
                  className={cn(inputClass("address"), "resize-y")}
                />
                {errors.address && (
                  <p id="error-address" className="mt-1 text-[12px] text-maroon">
                    {errors.address}
                  </p>
                )}
              </div>

              <div>
                <label
                  htmlFor="field-division"
                  className="mb-1.5 block text-[13px] font-medium text-ink"
                >
                  বিভাগ <span className="text-maroon">*</span>
                </label>
                <select
                  id="field-division"
                  name="division"
                  value={form.division}
                  onChange={(event) => onDivisionChange(event.target.value)}
                  aria-invalid={Boolean(errors.division)}
                  className={inputClass("division")}
                >
                  <option value="">বিভাগ নির্বাচন করুন</option>
                  {divisions.map((division) => (
                    <option key={division.name} value={division.name}>
                      {division.name}
                    </option>
                  ))}
                </select>
                {errors.division && (
                  <p className="mt-1 text-[12px] text-maroon">{errors.division}</p>
                )}
              </div>

              <div>
                <label
                  htmlFor="field-district"
                  className="mb-1.5 block text-[13px] font-medium text-ink"
                >
                  জেলা <span className="text-maroon">*</span>
                </label>
                <select
                  id="field-district"
                  name="district"
                  value={form.district}
                  disabled={!form.division}
                  onChange={(event) => onDistrictChange(event.target.value)}
                  aria-invalid={Boolean(errors.district)}
                  className={cn(inputClass("district"), !form.division && "opacity-60")}
                >
                  <option value="">
                    {form.division ? "জেলা নির্বাচন করুন" : "আগে বিভাগ নির্বাচন করুন"}
                  </option>
                  {districts.map((district) => (
                    <option key={district} value={district}>
                      {district}
                    </option>
                  ))}
                </select>
                {errors.district && (
                  <p className="mt-1 text-[12px] text-maroon">{errors.district}</p>
                )}
              </div>

              <div className="sm:col-span-2">
                <label htmlFor="field-area" className="mb-1.5 block text-[13px] font-medium text-ink">
                  এলাকা / থানা <span className="text-maroon">*</span>
                </label>
                <input
                  id="field-area"
                  name="area"
                  type="text"
                  list={isInsideDhaka(form.district) ? "dhaka-areas" : undefined}
                  placeholder={
                    isInsideDhaka(form.district) ? "যেমন: ধানমন্ডি" : "যেমন: সদর, বাজার রোড"
                  }
                  value={form.area}
                  onChange={(event) => update("area", event.target.value)}
                  aria-invalid={Boolean(errors.area)}
                  className={inputClass("area")}
                />
                {isInsideDhaka(form.district) && (
                  <datalist id="dhaka-areas">
                    {dhakaCityAreas.map((area) => (
                      <option key={area} value={area} />
                    ))}
                  </datalist>
                )}
                {errors.area && <p className="mt-1 text-[12px] text-maroon">{errors.area}</p>}
              </div>

              <div className="sm:col-span-2">
                <label htmlFor="field-note" className="mb-1.5 block text-[13px] font-medium text-ink">
                  অতিরিক্ত নির্দেশনা <span className="text-muted">(ঐচ্ছিক)</span>
                </label>
                <textarea
                  id="field-note"
                  name="note"
                  rows={2}
                  placeholder="যেমন: সাইজ পরিবর্তনের অনুরোধ, গিফট র‍্যাপিং, ডেলিভারির পছন্দের সময়"
                  value={form.note}
                  onChange={(event) => update("note", event.target.value)}
                  className={cn(inputClass("note"), "resize-y")}
                />
              </div>
            </div>
          </fieldset>

          {/* ডেলিভারি এরিয়া */}
          <fieldset className="rounded-sm border border-line bg-white p-5">
            <legend className="px-1 text-[15px] font-semibold text-ink">ডেলিভারি এলাকা</legend>
            <div className="mt-2 grid gap-2.5 sm:grid-cols-2">
              {(
                [
                  {
                    id: "inside" as const,
                    label: siteConfig.delivery.insideDhakaLabel,
                    charge: siteConfig.delivery.insideDhaka,
                    time: siteConfig.delivery.insideDhakaTime,
                  },
                  {
                    id: "outside" as const,
                    label: siteConfig.delivery.outsideDhakaLabel,
                    charge: siteConfig.delivery.outsideDhaka,
                    time: siteConfig.delivery.outsideDhakaTime,
                  },
                ]
              ).map((option) => (
                <label
                  key={option.id}
                  className={cn(
                    "flex cursor-pointer items-start gap-3 rounded-sm border p-3.5 transition",
                    zone === option.id
                      ? "border-gold bg-gold-tint"
                      : "border-sand hover:border-gold/50",
                  )}
                >
                  <input
                    type="radio"
                    name="zone"
                    value={option.id}
                    checked={zone === option.id}
                    onChange={() => {
                      setZone(option.id);
                      setZoneTouched(true);
                    }}
                    className="mt-0.5 size-4 accent-[#a97c3f]"
                  />
                  <span>
                    <span className="block text-[13.5px] font-medium text-ink">{option.label}</span>
                    <span className="block text-[12px] text-muted">
                      ৳{toBnDigits(option.charge)} • {option.time}
                    </span>
                  </span>
                </label>
              ))}
            </div>
          </fieldset>

          {/* পেমেন্ট */}
          <fieldset className="rounded-sm border border-line bg-white p-5">
            <legend className="px-1 text-[15px] font-semibold text-ink">পেমেন্ট পদ্ধতি</legend>
            <div className="mt-2 flex items-start gap-3 rounded-sm border border-gold bg-gold-tint p-3.5">
              <input
                type="radio"
                name="payment"
                checked
                readOnly
                className="mt-0.5 size-4 accent-[#a97c3f]"
                aria-label={siteConfig.policy.codLabel}
              />
              <span>
                <span className="block text-[13.5px] font-medium text-ink">
                  {siteConfig.policy.codLabel} (COD)
                </span>
                <span className="block text-[12px] text-muted">
                  পণ্য হাতে পেয়ে, দেখে নিয়ে তারপর মূল্য পরিশোধ করুন।
                </span>
              </span>
            </div>
            <p className="mt-3 flex items-start gap-2 text-[12px] text-muted">
              <Icon name="info" size={14} className="mt-0.5 shrink-0" />
              এটি একটি ডেমো ওয়েবসাইট—কোনো অনলাইন পেমেন্ট গেটওয়ে যুক্ত নেই এবং কোনো প্রকৃত অর্ডার
              তৈরি হবে না।
            </p>
          </fieldset>
        </div>

        {/* সারাংশ */}
        <aside className="lg:sticky lg:top-[100px] lg:self-start">
          <div className="rounded-sm border border-line bg-white p-5">
            <h2 className="text-[16px] font-semibold text-ink">আপনার অর্ডার</h2>

            <ul className="mt-4 space-y-3 border-b border-line pb-4">
              {items.map((item) => (
                <li key={item.key} className="flex gap-3">
                  <span className="relative size-14 shrink-0 overflow-hidden rounded-sm border border-line bg-ivory-deep">
                    <Image src={item.image} alt="" fill sizes="56px" className="object-cover" />
                    <span className="absolute -right-1 -top-1 grid size-5 place-items-center rounded-full bg-ink text-[10px] font-semibold text-ivory">
                      {toBnDigits(item.quantity)}
                    </span>
                  </span>
                  <span className="min-w-0 flex-1">
                    <Link
                      href={`/product/${item.slug}`}
                      className="line-clamp-2-bn text-[13px] leading-snug text-ink transition hover:text-gold"
                    >
                      {item.name}
                    </Link>
                    {(item.variant || item.size) && (
                      <span className="mt-0.5 block text-[11px] text-muted">
                        {[item.variant, item.size && `সাইজ ${toBnDigits(item.size)}`]
                          .filter(Boolean)
                          .join(" • ")}
                      </span>
                    )}
                  </span>
                  <span className="shrink-0 text-[13px] font-medium text-ink">
                    {formatPrice(item.price * item.quantity)}
                  </span>
                </li>
              ))}
            </ul>

            <dl className="mt-4 space-y-2.5 text-[13.5px]">
              <div className="flex items-center justify-between">
                <dt className="text-muted">সাবটোটাল</dt>
                <dd className="font-medium text-ink">{formatPrice(subtotal)}</dd>
              </div>
              <div className="flex items-center justify-between">
                <dt className="text-muted">
                  ডেলিভারি চার্জ
                  <span className="block text-[11.5px]">
                    {zone === "inside"
                      ? siteConfig.delivery.insideDhakaLabel
                      : siteConfig.delivery.outsideDhakaLabel}
                  </span>
                </dt>
                <dd className="font-medium text-ink">
                  {freeDelivery ? (
                    <span className="text-leaf">ফ্রি</span>
                  ) : (
                    formatPrice(payableDelivery)
                  )}
                </dd>
              </div>
              <div className="flex items-center justify-between border-t border-line pt-3 text-[17px]">
                <dt className="font-semibold text-ink">সর্বমোট</dt>
                <dd className="font-semibold text-gold-dark">{formatPrice(total)}</dd>
              </div>
            </dl>

            <Button type="submit" size="lg" fullWidth className="mt-5" disabled={submitting}>
              {submitting ? "অর্ডার নেওয়া হচ্ছে…" : "অর্ডার নিশ্চিত করুন"}
            </Button>

            <p className="mt-2.5 text-center text-[11.5px] leading-relaxed text-muted">
              অর্ডার নিশ্চিত করলে আপনি আমাদের{" "}
              <Link href="/info/returns" className="text-gold underline underline-offset-2">
                রিটার্ন নীতিমালা
              </Link>{" "}
              মেনে নিচ্ছেন।
            </p>

            <Link
              href="/cart"
              className="mt-3 flex items-center justify-center gap-1.5 text-[13px] font-medium text-ink transition hover:text-gold"
            >
              <Icon name="chevron-left" size={14} />
              কার্টে ফিরে যান
            </Link>
          </div>
        </aside>
      </div>
    </form>
  );
}
