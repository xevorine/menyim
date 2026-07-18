"use strict";
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/data/finalBouquetLayout.ts
var finalBouquetLayout_exports = {};
__export(finalBouquetLayout_exports, {
  phase1Flowers: () => phase1Flowers,
  phase2Flowers: () => phase2Flowers,
  phase3Flowers: () => phase3Flowers
});
module.exports = __toCommonJS(finalBouquetLayout_exports);

// src/data/flowerDecorations.ts
var finalBouquetFlowers = [
  // Super thick base foliage (radiating outwards from center)
  { id: "fb-0a", asset: "fern.svg", x: 10, y: 35, size: 300, rotation: -45, opacity: 0.8, depth: "background", delay: 0 },
  { id: "fb-0b", asset: "fern.svg", x: 65, y: 30, size: 320, rotation: 35, opacity: 0.8, depth: "background", delay: 0 },
  { id: "fb-0c", asset: "eucalyptus.svg", x: 15, y: 55, size: 280, rotation: -25, opacity: 0.75, depth: "background", delay: 0 },
  { id: "fb-0d", asset: "eucalyptus.svg", x: 60, y: 50, size: 290, rotation: 30, opacity: 0.75, depth: "background", delay: 0 },
  { id: "fb-0e", asset: "leaf-dark.svg", x: 25, y: 20, size: 250, rotation: -60, opacity: 0.85, depth: "background", delay: 0 },
  { id: "fb-0f", asset: "leaf-light.svg", x: 55, y: 15, size: 240, rotation: 55, opacity: 0.85, depth: "background", delay: 0 },
  // Core bouquet center (huge flowers tightly packed behind the card)
  { id: "fb-01", asset: "peony.svg", x: 35, y: 30, size: 280, rotation: -10, opacity: 0.98, depth: "foreground", delay: 0 },
  { id: "fb-02", asset: "rose-burgundy.svg", x: 48, y: 28, size: 260, rotation: 15, opacity: 0.98, depth: "foreground", delay: 0.05 },
  { id: "fb-03", asset: "rose-pink.svg", x: 28, y: 45, size: 240, rotation: -25, opacity: 0.98, depth: "foreground", delay: 0.08 },
  { id: "fb-04", asset: "rose-cream.svg", x: 55, y: 42, size: 250, rotation: 20, opacity: 0.95, depth: "middle", delay: 0.1 },
  { id: "fb-05", asset: "daisy.svg", x: 22, y: 35, size: 200, rotation: -15, opacity: 0.92, depth: "middle", delay: 0.12 },
  { id: "fb-06", asset: "daisy-white.svg", x: 62, y: 32, size: 210, rotation: 25, opacity: 0.92, depth: "middle", delay: 0.12 },
  { id: "fb-07", asset: "daisy-pink.svg", x: 42, y: 55, size: 190, rotation: 0, opacity: 0.9, depth: "middle", delay: 0.15 },
  { id: "fb-08", asset: "tulip-pink.svg", x: 58, y: 52, size: 220, rotation: 15, opacity: 0.92, depth: "middle", delay: 0.1 },
  { id: "fb-09", asset: "tulip-white.svg", x: 25, y: 58, size: 210, rotation: -28, opacity: 0.9, depth: "middle", delay: 0.15 },
  { id: "fb-10", asset: "hydrangea.svg", x: 68, y: 45, size: 230, rotation: 10, opacity: 0.88, depth: "middle", delay: 0.08 },
  { id: "fb-11", asset: "hydrangea.svg", x: 18, y: 48, size: 220, rotation: -18, opacity: 0.85, depth: "middle", delay: 0.12 },
  // Filler & baby's breath (very dense)
  { id: "fb-17", asset: "babys-breath.svg", x: 42, y: 22, size: 180, rotation: 5, opacity: 0.85, depth: "middle", delay: 0.15 },
  { id: "fb-18", asset: "babys-breath.svg", x: 25, y: 28, size: 170, rotation: -15, opacity: 0.8, depth: "middle", delay: 0.18 },
  { id: "fb-19", asset: "babys-breath.svg", x: 60, y: 25, size: 175, rotation: 20, opacity: 0.82, depth: "middle", delay: 0.18 },
  { id: "fb-12", asset: "small-blossom.svg", x: 38, y: 65, size: 110, rotation: 12, opacity: 0.88, depth: "foreground", delay: 0.18 },
  { id: "fb-13", asset: "small-blossom.svg", x: 55, y: 62, size: 105, rotation: -15, opacity: 0.85, depth: "foreground", delay: 0.2 },
  { id: "fb-14", asset: "small-blossom.svg", x: 30, y: 68, size: 100, rotation: 22, opacity: 0.82, depth: "foreground", delay: 0.22 },
  // Petals scattered everywhere
  { id: "fb-26", asset: "loose-petal.svg", x: 40, y: 75, size: 55, rotation: 25, opacity: 0.8, depth: "foreground", delay: 0.3 },
  { id: "fb-27", asset: "loose-petal.svg", x: 65, y: 70, size: 50, rotation: -35, opacity: 0.75, depth: "foreground", delay: 0.35 },
  { id: "fb-28", asset: "loose-petal.svg", x: 48, y: 80, size: 52, rotation: 12, opacity: 0.72, depth: "foreground", delay: 0.4 },
  { id: "fb-29", asset: "loose-petal.svg", x: 25, y: 72, size: 48, rotation: -18, opacity: 0.7, depth: "foreground", delay: 0.4 },
  { id: "fb-30", asset: "loose-petal.svg", x: 72, y: 65, size: 52, rotation: 28, opacity: 0.7, depth: "foreground", delay: 0.45 },
  { id: "fb-31", asset: "loose-petal.svg", x: 55, y: 85, size: 45, rotation: -8, opacity: 0.65, depth: "foreground", delay: 0.5 },
  // Ribbon (huge and beautiful at the base, directly under the card)
  { id: "fb-32", asset: "ribbon.svg", x: 40, y: 70, size: 260, rotation: 0, opacity: 0.98, depth: "foreground", delay: 0.5 },
  // Extra mascots scattered around the final bouquet
  { id: "fb-peng-3", asset: "../decorations/penguin-sticker.svg", x: 22, y: 65, size: 130, rotation: -20, opacity: 1, depth: "foreground", delay: 0.4 },
  { id: "fb-ax-4", asset: "../decorations/axolotl-sticker.svg", x: 72, y: 55, size: 140, rotation: 30, opacity: 1, depth: "foreground", delay: 0.4 }
];

// src/data/finalBouquetLayout.ts
var phase1Flowers = finalBouquetFlowers.filter(
  (f) => f.asset.includes("fern") || f.asset.includes("eucalyptus") || f.asset.includes("leaf") || f.id.match(/^fb-0[1-5]$/)
  // First few central flowers (peony, roses, etc)
);
var phase2Flowers = finalBouquetFlowers.filter(
  (f) => f.id.match(/^fb-(0[6-9]|10|11)$/)
  // The rest of the large flowers (daisy, tulips, hydrangea)
);
var phase3Flowers = finalBouquetFlowers.filter(
  (f) => !phase1Flowers.includes(f) && !phase2Flowers.includes(f)
);
