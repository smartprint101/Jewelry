/**
 * AURELIA — ক্যাটালগ ইমেজ জেনারেটর
 *
 * assets/source/ ফোল্ডারের স্টুডিও ও লাইফস্টাইল ছবি থেকে ক্রপ, জুম ও টোন পরিবর্তন করে
 * public/products, public/categories, public/collections ও public/sets এর সব ইমেজ তৈরি করে।
 *
 * প্রতিটি পণ্যের তিনটি ফ্রেম:
 *   ১. স্টুডিও শট (প্রধান)   ২. বিকল্প অ্যাঙ্গেল বা পরিহিত অবস্থার ছবি   ৩. প্যাকেজিং
 *
 * চালানোর নিয়ম:  node scripts/derive-images.mjs
 */
import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

const ROOT = path.resolve(import.meta.dirname, "..");
const SRC = path.join(ROOT, "assets/source");
const OUT = path.join(ROOT, "public");

/** মূল ছবিগুলো */
const S = {
  // স্টুডিও প্যাকশট
  ring: "ring.jpg",
  diamondRing: "diamond-ring.jpg",
  necklace: "gold-necklace.jpg",
  pearlNecklace: "pearl-necklace.jpg",
  jhumka: "jhumka.jpg",
  stud: "stud-earring.jpg",
  bracelet: "bracelet.jpg",
  bangle: "bangle.jpg",
  pendant: "pendant.jpg",
  set: "bridal-set.jpg",
  nosePin: "nose-pin.jpg",
  mensChain: "mens-chain.jpg",
  mensBracelet: "mens-bracelet.jpg",
  signetRing: "signet-ring.jpg",
  coupleRings: "couple-rings.jpg",
  hoopEarring: "hoop-earring.jpg",
  anklet: "anklet.jpg",
  layeredNecklace: "layered-necklace.jpg",
  heartPendant: "heart-pendant.jpg",
  pearlBracelet: "pearl-bracelet.jpg",
  bangleSet: "bangle-set.jpg",
  // লাইফস্টাইল / ব্র্যান্ড
  hand: "ring-hand.jpg",
  neck: "necklace-neck.jpg",
  ear: "earring-model.jpg",
  bridal: "bridal.jpg",
  care: "care.jpg",
  pack1: "pack1.jpg",
  pack2: "pack2.jpg",
  hero: "hero.jpg",
};

/** ক্রপ: [সোর্স, left%, top%, width%, height%] */
const C = {
  // রিং
  ringFull: [S.ring, 0.05, 0.07, 0.9, 0.9],
  ringMacro: [S.ring, 0.26, 0.2, 0.46, 0.46],
  ringSide: [S.ring, 0.18, 0.32, 0.64, 0.64],
  dRingFull: [S.diamondRing, 0.04, 0.04, 0.92, 0.92],
  dRingMacro: [S.diamondRing, 0.22, 0.14, 0.5, 0.5],
  dRingSide: [S.diamondRing, 0.16, 0.3, 0.66, 0.66],

  // নেকলেস
  necklaceFull: [S.necklace, 0.03, 0.03, 0.94, 0.94],
  necklaceZoom: [S.necklace, 0.08, 0.08, 0.6, 0.6],
  necklaceTight: [S.necklace, 0.12, 0.14, 0.44, 0.44],
  pearlFull: [S.pearlNecklace, 0.03, 0.03, 0.94, 0.94],
  pearlZoom: [S.pearlNecklace, 0.16, 0.14, 0.58, 0.58],
  pearlTight: [S.pearlNecklace, 0.26, 0.24, 0.42, 0.42],

  // ইয়াররিং
  jhumkaFull: [S.jhumka, 0.04, 0.04, 0.92, 0.92],
  jhumkaZoom: [S.jhumka, 0.16, 0.08, 0.64, 0.64],
  jhumkaTight: [S.jhumka, 0.26, 0.28, 0.46, 0.46],
  studFull: [S.stud, 0.04, 0.04, 0.92, 0.92],
  studZoom: [S.stud, 0.18, 0.16, 0.6, 0.6],
  studTight: [S.stud, 0.3, 0.28, 0.42, 0.42],

  // ব্রেসলেট ও চুড়ি
  braceletFull: [S.bracelet, 0.03, 0.03, 0.94, 0.94],
  braceletZoom: [S.bracelet, 0.1, 0.1, 0.62, 0.62],
  braceletTight: [S.bracelet, 0.2, 0.34, 0.46, 0.46],
  bangleFull: [S.bangle, 0.04, 0.04, 0.92, 0.92],
  bangleZoom: [S.bangle, 0.12, 0.16, 0.62, 0.62],
  bangleTight: [S.bangle, 0.3, 0.26, 0.44, 0.44],

  // পেনডেন্ট
  pendantFull: [S.pendant, 0.03, 0.03, 0.94, 0.94],
  pendantZoom: [S.pendant, 0.18, 0.16, 0.58, 0.58],
  pendantTight: [S.pendant, 0.3, 0.28, 0.4, 0.4],

  // সেট
  setFull: [S.set, 0.02, 0.02, 0.96, 0.96],
  setNecklace: [S.set, 0.06, 0.34, 0.66, 0.66],
  setEarring: [S.set, 0.5, 0.06, 0.44, 0.44],

  // নোজ পিন
  nosePinFull: [S.nosePin, 0.04, 0.04, 0.92, 0.92],
  nosePinZoom: [S.nosePin, 0.16, 0.2, 0.56, 0.56],

  // মেনস, কাপল ও অন্যান্য
  mensChainFull: [S.mensChain, 0.04, 0.04, 0.92, 0.92],
  mensChainZoom: [S.mensChain, 0.14, 0.14, 0.58, 0.58],
  mensBraceletFull: [S.mensBracelet, 0.03, 0.03, 0.94, 0.94],
  mensBraceletZoom: [S.mensBracelet, 0.12, 0.18, 0.58, 0.58],
  signetFull: [S.signetRing, 0.04, 0.04, 0.92, 0.92],
  signetMacro: [S.signetRing, 0.22, 0.14, 0.5, 0.5],
  coupleFull: [S.coupleRings, 0.04, 0.06, 0.92, 0.92],
  coupleZoom: [S.coupleRings, 0.16, 0.14, 0.6, 0.6],
  hoopFull: [S.hoopEarring, 0.04, 0.04, 0.92, 0.92],
  hoopZoom: [S.hoopEarring, 0.14, 0.18, 0.6, 0.6],
  ankletFull: [S.anklet, 0.03, 0.03, 0.94, 0.94],
  ankletZoom: [S.anklet, 0.14, 0.16, 0.58, 0.58],
  layeredFull: [S.layeredNecklace, 0.03, 0.03, 0.94, 0.94],
  layeredZoom: [S.layeredNecklace, 0.12, 0.14, 0.6, 0.6],
  heartFull: [S.heartPendant, 0.04, 0.04, 0.92, 0.92],
  heartZoom: [S.heartPendant, 0.2, 0.22, 0.5, 0.5],
  pearlBraceletFull: [S.pearlBracelet, 0.03, 0.03, 0.94, 0.94],
  pearlBraceletZoom: [S.pearlBracelet, 0.14, 0.16, 0.58, 0.58],
  bangleSetFull: [S.bangleSet, 0.03, 0.03, 0.94, 0.94],
  bangleSetZoom: [S.bangleSet, 0.14, 0.2, 0.58, 0.58],

  // পরিহিত অবস্থা (লাইফস্টাইল)
  handRing: [S.hand, 0.33, 0.17, 0.65, 0.65],
  handTight: [S.hand, 0.5, 0.31, 0.38, 0.38],
  neckWorn: [S.neck, 0.06, 0.08, 0.88, 0.88],
  neckPendant: [S.neck, 0.33, 0.58, 0.32, 0.32],
  neckChain: [S.neck, 0.54, 0.26, 0.34, 0.34],
  earWorn: [S.ear, 0.26, 0.15, 0.63, 0.63],
  earJhumka: [S.ear, 0.4, 0.34, 0.3, 0.3],
  noseWorn: [S.ear, 0.01, 0.17, 0.26, 0.26],
  noseWornWide: [S.ear, 0.0, 0.1, 0.4, 0.4],
  bridalWorn: [S.bridal, 0.12, 0.22, 0.26, 0.48],
  bridalWide: [S.bridal, 0.02, 0.02, 0.46, 0.96],
  bridalScene: [S.bridal, 0.02, 0.06, 0.62, 0.9],
  banglesWorn: [S.bridal, 0.12, 0.58, 0.26, 0.4],

  // বক্স ও প্যাকেজিং
  boxNecklace: [S.care, 0.21, 0.03, 0.3, 0.8],
  careWide: [S.care, 0.08, 0.0, 0.84, 1.0],
  boxWide: [S.care, 0.14, 0.0, 0.46, 1.0],
  pack1Full: [S.pack1, 0.03, 0.03, 0.94, 0.94],
  pack1Tight: [S.pack1, 0.16, 0.16, 0.66, 0.66],
  pack2Full: [S.pack2, 0.03, 0.03, 0.94, 0.94],
  pack2Tight: [S.pack2, 0.16, 0.16, 0.66, 0.66],
  heroRight: [S.hero, 0.35, 0.05, 0.6, 0.9],
  heroWide: [S.hero, 0.0, 0.03, 1.0, 0.94],
};

/** ম্যাটেরিয়াল অনুযায়ী টোন */
const TONES = {
  gold: { saturation: 1.04, brightness: 1.0 },
  silver: { saturation: 0.22, brightness: 1.035 },
  rose: { saturation: 1.12, brightness: 1.02, hue: -12 },
  pearl: { saturation: 0.74, brightness: 1.06 },
  diamond: { saturation: 0.88, brightness: 1.04 },
  mens: { saturation: 0.8, brightness: 0.95 },
};

function toneFor(slug) {
  if (slug.includes("silver")) return TONES.silver;
  if (slug.includes("rose")) return TONES.rose;
  if (slug.includes("pearl")) return TONES.pearl;
  if (slug.includes("diamond")) return TONES.diamond;
  if (slug.includes("mens") || slug.includes("signet")) return TONES.mens;
  return TONES.gold;
}

const metaCache = new Map();
async function metaOf(file) {
  if (!metaCache.has(file)) {
    metaCache.set(file, await sharp(path.join(SRC, file)).metadata());
  }
  return metaCache.get(file);
}

async function make(rel, crop, opts = {}) {
  const [file, l, t, w, h] = crop;
  const meta = await metaOf(file);
  const left = Math.round(meta.width * l);
  const top = Math.round(meta.height * t);
  const width = Math.round(meta.width * w);
  const height = Math.round(meta.height * h);

  const outW = opts.width ?? 760;
  const outH = opts.height ?? outW;
  const scale = Math.max(outW / width, outH / height);
  const tone = opts.tone ?? TONES.gold;
  const jitter = opts.jitter ?? 0;

  let pipeline = sharp(path.join(SRC, file))
    .extract({ left, top, width, height })
    .resize(outW, outH, { fit: "cover", position: "centre", kernel: "lanczos3" });

  if (opts.flop) pipeline = pipeline.flop();

  pipeline = pipeline.modulate({
    brightness: (tone.brightness ?? 1) * (1 + jitter),
    saturation: tone.saturation ?? 1,
    ...(tone.hue ? { hue: tone.hue } : {}),
  });

  if (scale > 1.4) pipeline = pipeline.sharpen({ sigma: 0.7 });

  const target = path.join(OUT, rel);
  await mkdir(path.dirname(target), { recursive: true });
  const buffer = await pipeline.jpeg({ quality: 80, mozjpeg: true, progressive: true }).toBuffer();
  await writeFile(target, buffer);
  return buffer.length;
}

/** পণ্য → [স্টুডিও শট, বিকল্প ছবি, প্যাকেজিং] */
const PRODUCTS = {
  // রিং
  "noor-gold-ring": [C.ringFull, C.handRing, C.pack1Full],
  "arisha-diamond-ring": [C.dRingFull, C.dRingMacro, C.pack2Full],
  "tasnim-rose-gold-ring": [C.ringFull, C.handTight, C.pack1Tight],
  "mehjabin-silver-ring": [C.dRingSide, C.dRingFull, C.pack2Full],
  "afrin-pearl-ring": [C.ringMacro, C.handRing, C.pack1Full],
  "saba-gold-plated-ring": [C.ringSide, C.handTight, C.pack2Tight],

  // নেকলেস
  "meher-necklace": [C.necklaceFull, C.neckWorn, C.pack1Full],
  "zara-diamond-necklace": [C.pendantFull, C.neckPendant, C.pack2Full],
  "rubaiya-pearl-necklace": [C.pearlFull, C.pearlZoom, C.pack1Tight],
  "nilima-silver-necklace": [C.necklaceZoom, C.necklaceFull, C.pack2Tight],
  "aditi-choker": [C.setNecklace, C.bridalWorn, C.pack1Full],
  "suraiya-layered-necklace": [C.layeredFull, C.layeredZoom, C.pack2Full],

  // ইয়াররিং
  "zara-pearl-earring": [C.studFull, C.studZoom, C.pack1Full],
  "nowshin-jhumka": [C.jhumkaFull, C.earWorn, C.pack2Full],
  "ilma-diamond-stud": [C.studZoom, C.studTight, C.pack1Tight],
  "tanisha-hoop-earring": [C.hoopFull, C.hoopZoom, C.pack2Tight],
  "priya-silver-earring": [C.jhumkaZoom, C.jhumkaTight, C.pack1Full],

  // ব্রেসলেট
  "nabila-bracelet": [C.braceletFull, C.braceletZoom, C.pack1Full],
  "raisa-diamond-bracelet": [C.braceletZoom, C.braceletTight, C.pack2Full],
  "aroni-silver-bracelet": [C.braceletFull, C.braceletTight, C.pack1Tight],
  "maya-pearl-bracelet": [C.pearlBraceletFull, C.pearlBraceletZoom, C.pack2Tight],

  // চুড়ি
  "konok-gold-bangle": [C.bangleFull, C.banglesWorn, C.pack1Full],
  "shreya-bangle-set": [C.bangleSetFull, C.banglesWorn, C.pack2Full],
  "rupali-silver-bangle": [C.bangleFull, C.bangleTight, C.pack1Tight],
  "joyita-kada": [C.bangleZoom, C.bangleSetZoom, C.pack2Tight],

  // পেনডেন্ট
  "ruhi-pendant-set": [C.pendantFull, C.neckPendant, C.pack1Full],
  "ayesha-diamond-pendant": [C.pendantZoom, C.pendantTight, C.pack2Full],
  "lamia-heart-pendant": [C.heartFull, C.heartZoom, C.pack1Tight],
  "tuba-silver-pendant": [C.pendantFull, C.pendantZoom, C.pack2Tight],

  // নোজ পিন
  "ananya-gold-nose-pin": [C.nosePinFull, C.noseWorn, C.pack1Full],
  "mithila-diamond-nose-pin": [C.nosePinZoom, C.noseWornWide, C.pack2Full],
  "riya-silver-nose-pin": [C.nosePinFull, C.nosePinZoom, C.pack1Tight],

  // অ্যাঙ্কলেট
  "payel-silver-anklet": [C.ankletFull, C.ankletZoom, C.pack2Full],
  "nupur-gold-anklet": [C.braceletTight, C.braceletFull, C.pack1Full],
  "tithi-pearl-anklet": [C.pearlBraceletZoom, C.ankletFull, C.pack2Tight],

  // মেনস
  "mahir-mens-ring": [C.coupleZoom, C.handRing, C.pack1Full],
  "arian-mens-chain": [C.mensChainFull, C.mensChainZoom, C.pack2Full],
  "rayhan-mens-bracelet": [C.mensBraceletFull, C.mensBraceletZoom, C.pack1Tight],
  "zubayer-signet-ring": [C.signetFull, C.signetMacro, C.pack2Tight],

  // কাপল
  "onuvob-couple-ring": [C.coupleFull, C.coupleZoom, C.pack1Full],
  "bondhon-couple-bracelet": [C.braceletZoom, C.mensBraceletZoom, C.pack2Full],
  "protishruti-couple-pendant": [C.heartZoom, C.neckPendant, C.pack1Tight],

  // সেট
  "rajkonna-bridal-set": [C.setFull, C.bridalWorn, C.pack1Full],
  "nandini-necklace-set": [C.setNecklace, C.setEarring, C.pack2Full],
  "hemontika-gift-set": [C.boxNecklace, C.pack1Full, C.pack2Full],
  "mukta-pearl-bridal-set": [C.pearlFull, C.neckWorn, C.pack1Tight],
};

/** ভ্যারিয়েন্ট ইমেজ: ফাইলের নাম → [ক্রপ, টোন] */
const VARIANTS = {
  "tasnim-rose-gold-ring-gold": [C.ringSide, "gold"],
  "tasnim-rose-gold-ring-silver": [C.dRingSide, "silver"],
  "suraiya-layered-necklace-silver": [C.layeredFull, "silver"],
  "tanisha-hoop-earring-silver": [C.hoopZoom, "silver"],
  "nabila-bracelet-rose": [C.braceletFull, "rose"],
  "lamia-heart-pendant-gold": [C.heartZoom, "gold"],
  "rayhan-mens-bracelet-silver": [C.mensBraceletFull, "silver"],
};

/** ক্যাটাগরি টাইল — ৪:৫ পোর্ট্রেট */
const CATEGORIES = {
  ring: [C.ringFull, "gold"],
  necklace: [C.neckWorn, "gold"],
  earring: [C.jhumkaFull, "gold"],
  bracelet: [C.braceletFull, "gold"],
  bangle: [C.bangleFull, "gold"],
  pendant: [C.neckPendant, "gold"],
  "nose-pin": [C.nosePinFull, "gold"],
  anklet: [C.ankletFull, "silver"],
  mens: [C.mensChainFull, "mens"],
  couple: [C.coupleFull, "gold"],
  set: [C.bridalWide, "gold"],
};

/** কালেকশন ব্যানার — ১৬:৯ */
const COLLECTIONS = {
  "new-arrival": [C.careWide, "gold"],
  "best-seller": [C.heroRight, "gold"],
  everyday: [C.necklaceFull, "gold"],
  occasion: [C.bridalScene, "gold"],
  "gift-set": [C.boxWide, "gold"],
};

/** সেট কার্ড — ৪:৫ পোর্ট্রেট */
const SETS = {
  "necklace-earring": [C.setFull, "gold"],
  "ring-bracelet": [C.coupleFull, "gold"],
  "bridal-set": [C.bridalWide, "gold"],
  "gift-set": [C.pack1Full, "gold"],
};

const PACK_SOURCES = new Set([S.pack1, S.pack2, S.care]);

async function run() {
  const tasks = [];

  Object.entries(PRODUCTS).forEach(([slug, crops], index) => {
    const tone = toneFor(slug);
    crops.forEach((crop, i) => {
      const name = i === 0 ? `${slug}.jpg` : `${slug}-${i + 1}.jpg`;
      const isPack = PACK_SOURCES.has(crop[0]);
      tasks.push(
        make(`products/${name}`, crop, {
          tone: isPack ? TONES.gold : tone,
          flop: i === 1 && index % 3 === 0 && !isPack,
          jitter: ((index % 5) - 2) * 0.01,
          width: 760,
        }),
      );
    });
  });

  Object.entries(VARIANTS).forEach(([name, [crop, tone]]) => {
    tasks.push(make(`products/${name}.jpg`, crop, { tone: TONES[tone], width: 760 }));
  });

  Object.entries(CATEGORIES).forEach(([name, [crop, tone]]) => {
    tasks.push(
      make(`categories/${name}.jpg`, crop, { tone: TONES[tone], width: 800, height: 1000 }),
    );
  });

  Object.entries(COLLECTIONS).forEach(([name, [crop, tone]]) => {
    tasks.push(
      make(`collections/${name}.jpg`, crop, { tone: TONES[tone], width: 1200, height: 675 }),
    );
  });

  Object.entries(SETS).forEach(([name, [crop, tone]]) => {
    tasks.push(make(`sets/${name}.jpg`, crop, { tone: TONES[tone], width: 800, height: 1000 }));
  });

  // সোশ্যাল শেয়ার (Open Graph) ইমেজ
  tasks.push(make("brand/og.jpg", C.heroWide, { tone: TONES.gold, width: 1200, height: 630 }));

  const sizes = await Promise.all(tasks);
  const bytes = sizes.reduce((sum, size) => sum + size, 0);
  console.log(`✓ ${sizes.length}টি ইমেজ তৈরি হয়েছে — মোট ${(bytes / 1024 / 1024).toFixed(1)} MB`);
}

run().catch((error) => {
  console.error(error);
  process.exit(1);
});
