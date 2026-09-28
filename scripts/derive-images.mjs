/**
 * AURELIA — ডেমো ইমেজ জেনারেটর
 *
 * assets/source/ ফোল্ডারের মূল ছবিগুলো থেকে ক্রপ, জুম ও টোন পরিবর্তন করে
 * ক্যাটালগের সব ইমেজ (public/products, public/categories, public/collections, public/sets)
 * তৈরি করে। প্রকৃত প্রজেক্টে এই ফাইলগুলোর জায়গায় আসল পণ্যের ছবি বসবে।
 *
 * চালানোর নিয়ম:  node scripts/derive-images.mjs
 */
import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

const ROOT = path.resolve(import.meta.dirname, "..");
const SRC = path.join(ROOT, "assets/source");
const OUT = path.join(ROOT, "public");

const S = {
  ring: "ring.jpg",
  hand: "ring-hand.jpg",
  neck: "necklace-neck.jpg",
  ear: "earring-model.jpg",
  bridal: "bridal.jpg",
  care: "care.jpg",
  pack1: "pack1.jpg",
  pack2: "pack2.jpg",
  hero: "hero.jpg",
  about: "about.jpg",
};

/** ক্রপ: [সোর্স, left%, top%, width%, height%] */
const C = {
  ringFull: [S.ring, 0.05, 0.07, 0.9, 0.9],
  ringMacro: [S.ring, 0.26, 0.2, 0.46, 0.46],
  ringSide: [S.ring, 0.18, 0.32, 0.64, 0.64],
  handRing: [S.hand, 0.33, 0.17, 0.65, 0.65],
  handTight: [S.hand, 0.5, 0.31, 0.38, 0.38],
  neckFull: [S.neck, 0.06, 0.08, 0.88, 0.88],
  pendant: [S.neck, 0.33, 0.58, 0.32, 0.32],
  chainDetail: [S.neck, 0.54, 0.26, 0.34, 0.34],
  earFull: [S.ear, 0.26, 0.15, 0.63, 0.63],
  jhumka: [S.ear, 0.4, 0.34, 0.3, 0.3],
  nosePin: [S.ear, 0.01, 0.17, 0.26, 0.26],
  noseWide: [S.ear, 0.0, 0.1, 0.4, 0.4],
  bridalSet: [S.bridal, 0.12, 0.22, 0.26, 0.48],
  bridalWide: [S.bridal, 0.02, 0.02, 0.46, 0.96],
  bangles: [S.bridal, 0.12, 0.58, 0.26, 0.4],
  banglesTight: [S.bridal, 0.15, 0.66, 0.18, 0.3],
  boxNecklace: [S.care, 0.21, 0.03, 0.3, 0.8],
  chainCoil: [S.care, 0.39, 0.56, 0.23, 0.42],
  chainTight: [S.care, 0.42, 0.62, 0.17, 0.3],
  careWide: [S.care, 0.08, 0.0, 0.84, 1.0],
  boxWide: [S.care, 0.14, 0.0, 0.46, 1.0],
  pack1Full: [S.pack1, 0.03, 0.03, 0.94, 0.94],
  pack1Tight: [S.pack1, 0.16, 0.16, 0.66, 0.66],
  pack2Full: [S.pack2, 0.03, 0.03, 0.94, 0.94],
  pack2Tight: [S.pack2, 0.16, 0.16, 0.66, 0.66],
  heroWide: [S.hero, 0.02, 0.02, 0.96, 0.96],
  heroRight: [S.hero, 0.35, 0.05, 0.6, 0.9],
  aboutWide: [S.about, 0.02, 0.02, 0.96, 0.96],
};

/** ম্যাটেরিয়াল অনুযায়ী টোন */
const TONES = {
  gold: { saturation: 1.04, brightness: 1.0 },
  silver: { saturation: 0.14, brightness: 1.09 },
  rose: { saturation: 1.12, brightness: 1.02, hue: -12 },
  pearl: { saturation: 0.72, brightness: 1.07 },
  diamond: { saturation: 0.86, brightness: 1.05 },
  mens: { saturation: 0.82, brightness: 0.95 },
};

function toneFor(slug, override) {
  if (override) return TONES[override];
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

/**
 * একটি আউটপুট ইমেজ তৈরি করে।
 * @param {string} rel      public/ এর ভিতরে পাথ
 * @param {Array}  crop     C থেকে নেওয়া ক্রপ
 * @param {object} opts     { tone, flop, width, height, jitter }
 */
async function make(rel, crop, opts = {}) {
  const [file, l, t, w, h] = crop;
  const meta = await metaOf(file);
  const left = Math.round(meta.width * l);
  const top = Math.round(meta.height * t);
  const width = Math.round(meta.width * w);
  const height = Math.round(meta.height * h);

  const outW = opts.width ?? 720;
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
  const buffer = await pipeline.jpeg({ quality: 78, mozjpeg: true, progressive: true }).toBuffer();
  await writeFile(target, buffer);
  return buffer.length;
}

/** প্রতিটি পণ্যের তিনটি ছবি: [প্রধান, বিকল্প, প্যাকেজিং] */
const PRODUCTS = {
  // রিং
  "noor-gold-ring": [C.ringFull, C.handRing, C.pack1Full],
  "arisha-diamond-ring": [C.ringMacro, C.ringFull, C.pack2Full],
  "tasnim-rose-gold-ring": [C.ringFull, C.handTight, C.pack1Tight],
  "mehjabin-silver-ring": [C.ringFull, C.ringMacro, C.pack2Full],
  "afrin-pearl-ring": [C.ringMacro, C.handRing, C.pack1Full],
  "saba-gold-plated-ring": [C.ringSide, C.handTight, C.pack2Tight],

  // নেকলেস
  "meher-necklace": [C.neckFull, C.boxNecklace, C.pack1Full],
  "zara-diamond-necklace": [C.boxNecklace, C.neckFull, C.pack2Full],
  "rubaiya-pearl-necklace": [C.neckFull, C.chainDetail, C.pack1Tight],
  "nilima-silver-necklace": [C.boxNecklace, C.neckFull, C.pack2Tight],
  "aditi-choker": [C.chainDetail, C.neckFull, C.pack1Full],
  "suraiya-layered-necklace": [C.neckFull, C.boxNecklace, C.pack2Full],

  // ইয়াররিং
  "zara-pearl-earring": [C.earFull, C.jhumka, C.pack1Full],
  "nowshin-jhumka": [C.jhumka, C.earFull, C.pack2Full],
  "ilma-diamond-stud": [C.earFull, C.jhumka, C.pack1Tight],
  "tanisha-hoop-earring": [C.earFull, C.jhumka, C.pack2Tight],
  "priya-silver-earring": [C.jhumka, C.earFull, C.pack1Full],

  // ব্রেসলেট
  "nabila-bracelet": [C.chainCoil, C.chainDetail, C.pack1Full],
  "raisa-diamond-bracelet": [C.chainCoil, C.chainDetail, C.pack2Full],
  "aroni-silver-bracelet": [C.chainCoil, C.chainTight, C.pack1Tight],
  "maya-pearl-bracelet": [C.chainDetail, C.chainCoil, C.pack2Tight],

  // চুড়ি
  "konok-gold-bangle": [C.bangles, C.banglesTight, C.pack1Full],
  "shreya-bangle-set": [C.banglesTight, C.bangles, C.pack2Full],
  "rupali-silver-bangle": [C.bangles, C.banglesTight, C.pack1Tight],
  "joyita-kada": [C.banglesTight, C.bangles, C.pack2Tight],

  // পেনডেন্ট
  "ruhi-pendant-set": [C.pendant, C.neckFull, C.pack1Full],
  "ayesha-diamond-pendant": [C.pendant, C.boxNecklace, C.pack2Full],
  "lamia-heart-pendant": [C.pendant, C.chainDetail, C.pack1Tight],
  "tuba-silver-pendant": [C.pendant, C.neckFull, C.pack2Tight],

  // নোজ পিন
  "ananya-gold-nose-pin": [C.nosePin, C.noseWide, C.pack1Full],
  "mithila-diamond-nose-pin": [C.nosePin, C.ringMacro, C.pack2Full],
  "riya-silver-nose-pin": [C.nosePin, C.noseWide, C.pack1Tight],

  // অ্যাঙ্কলেট
  "payel-silver-anklet": [C.chainCoil, C.chainDetail, C.pack2Full],
  "nupur-gold-anklet": [C.chainCoil, C.chainTight, C.pack1Full],
  "tithi-pearl-anklet": [C.chainDetail, C.chainCoil, C.pack2Tight],

  // মেনস
  "mahir-mens-ring": [C.ringSide, C.ringFull, C.pack1Full],
  "arian-mens-chain": [C.chainCoil, C.boxNecklace, C.pack2Full],
  "rayhan-mens-bracelet": [C.chainCoil, C.chainDetail, C.pack1Tight],
  "zubayer-signet-ring": [C.ringMacro, C.handRing, C.pack2Tight],

  // কাপল
  "onuvob-couple-ring": [C.ringFull, C.ringSide, C.pack1Full],
  "bondhon-couple-bracelet": [C.chainCoil, C.chainTight, C.pack2Full],
  "protishruti-couple-pendant": [C.pendant, C.boxNecklace, C.pack1Tight],

  // সেট
  "rajkonna-bridal-set": [C.bridalSet, C.bridalWide, C.pack1Full],
  "nandini-necklace-set": [C.bridalSet, C.boxNecklace, C.pack2Full],
  "hemontika-gift-set": [C.boxNecklace, C.pack1Full, C.pack2Full],
  "mukta-pearl-bridal-set": [C.bridalSet, C.neckFull, C.pack1Tight],
};

/** ভ্যারিয়েন্ট ইমেজ: ফাইল → [ক্রপ, টোন] */
const VARIANTS = {
  "tasnim-rose-gold-ring-gold": [C.ringSide, "gold"],
  "tasnim-rose-gold-ring-silver": [C.ringSide, "silver"],
  "suraiya-layered-necklace-silver": [C.boxNecklace, "silver"],
  "tanisha-hoop-earring-silver": [C.earFull, "silver"],
  "nabila-bracelet-rose": [C.chainCoil, "rose"],
  "lamia-heart-pendant-gold": [C.pendant, "gold"],
  "rayhan-mens-bracelet-silver": [C.chainTight, "silver"],
};

const CATEGORIES = {
  ring: [C.ringFull, "gold"],
  necklace: [C.neckFull, "gold"],
  earring: [C.earFull, "gold"],
  bracelet: [C.chainCoil, "gold"],
  bangle: [C.bangles, "gold"],
  pendant: [C.pendant, "gold"],
  "nose-pin": [C.noseWide, "gold"],
  anklet: [C.chainTight, "silver"],
  mens: [C.ringSide, "mens"],
  couple: [C.handRing, "gold"],
  set: [C.bridalSet, "gold"],
};

const COLLECTIONS = {
  "new-arrival": [C.careWide, "gold"],
  "best-seller": [C.heroRight, "gold"],
  everyday: [C.neckFull, "gold"],
  occasion: [C.bridalWide, "gold"],
  "gift-set": [C.boxWide, "gold"],
};

const SETS = {
  "necklace-earring": [C.bridalSet, "gold"],
  "ring-bracelet": [C.handRing, "gold"],
  "bridal-set": [C.bridalWide, "gold"],
  "gift-set": [C.pack1Full, "gold"],
};

async function run() {
  let files = 0;
  let bytes = 0;
  const tasks = [];

  Object.entries(PRODUCTS).forEach(([slug, crops], index) => {
    const tone = toneFor(slug);
    crops.forEach((crop, i) => {
      const name = i === 0 ? `${slug}.jpg` : `${slug}-${i + 1}.jpg`;
      const isPack = crop[0] === S.pack1 || crop[0] === S.pack2;
      tasks.push(
        make(`products/${name}`, crop, {
          tone: isPack ? TONES.gold : tone,
          flop: i === 1 && index % 2 === 0 && !isPack,
          jitter: ((index % 5) - 2) * 0.012,
          width: 720,
        }),
      );
    });
  });

  Object.entries(VARIANTS).forEach(([name, [crop, tone]]) => {
    tasks.push(make(`products/${name}.jpg`, crop, { tone: TONES[tone], width: 720 }));
  });

  Object.entries(CATEGORIES).forEach(([name, [crop, tone]]) => {
    tasks.push(
      make(`categories/${name}.jpg`, crop, { tone: TONES[tone], width: 900, height: 675 }),
    );
  });

  Object.entries(COLLECTIONS).forEach(([name, [crop, tone]]) => {
    tasks.push(
      make(`collections/${name}.jpg`, crop, { tone: TONES[tone], width: 1200, height: 675 }),
    );
  });

  Object.entries(SETS).forEach(([name, [crop, tone]]) => {
    tasks.push(make(`sets/${name}.jpg`, crop, { tone: TONES[tone], width: 900, height: 675 }));
  });

  const sizes = await Promise.all(tasks);
  sizes.forEach((size) => {
    files += 1;
    bytes += size;
  });

  console.log(`✓ ${files}টি ইমেজ তৈরি হয়েছে — মোট ${(bytes / 1024 / 1024).toFixed(1)} MB`);
}

run().catch((error) => {
  console.error(error);
  process.exit(1);
});
