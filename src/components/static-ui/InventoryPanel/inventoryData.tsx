/* =============================================================
 * inventoryData — types and mock data for InventoryPanel
 * ============================================================= */

import type { ReactNode } from 'react';
import { AllItemsIcon } from '../../../icons/AllItemsIcon';
import { BackpackIcon } from '../../../icons/BackpackIcon';
import { PortalsBuildToolsIcon } from '../../../icons/PortalsBuildToolsIcon';
import { FurnitureIcon } from '../../../icons/FurnitureIcon';
import { BuildingsIcon } from '../../../icons/BuildingsIcon';
import { ObstacleCourseIcon } from '../../../icons/ObstacleCourseIcon';
import { HalloweenIcon } from '../../../icons/HalloweenIcon';
import { PlantsIcon } from '../../../icons/PlantsIcon';
import { FireballsIcon } from '../../../icons/FireballsIcon';
import { ParticlesIcon } from '../../../icons/ParticlesIcon';

export interface InventoryItem {
  id: string;
  name: string;
  thumbnail: string;
}

export interface InventoryCategory {
  id: string;
  name: string;
  itemCount: number;
  subcategories: string[];
  items: InventoryItem[];
}

/* ── Grid entry union for default mode (items + dividers) ──── */

export type GridEntry =
  | { type: 'item'; id: string; name: string; thumbnail: string }
  | { type: 'divider'; label: string };

/* ── Thumbnail pool (cycles for all items) ─────────────────── */

const THUMBNAILS = [
  '/images/inventory/480px-TotK_Acorn_Jar_Model.png',
  '/images/inventory/Charged_Headdress_-_TotK_icon.png',
  "/images/inventory/TotK_Ancient_Hero's_Aspect_Icon.png",
  '/images/inventory/TotK_Apple_Pie_Icon.png',
  '/images/inventory/TotK_Archaic_Tunic_Purple_Icon.png',
  '/images/inventory/TotK_Big_Battery_Icon.png',
  '/images/inventory/TotK_Big_Wheel_Icon.png',
  '/images/inventory/TotK_Black_Lizalfos_Tail_Icon.png',
  '/images/inventory/TotK_Blue-Maned_Lynel_Saber_Horn_Icon.png',
  '/images/inventory/TotK_Bokoblin_Mask_Icon.png',
  '/images/inventory/TotK_Light_Icon.png',
  '/images/inventory/TotK_Nostalgic_Fabric_Icon.png',
  '/images/inventory/TotK_Old_Map_Icon.png',
  '/images/inventory/TotK_Stamina_Vessel_Icon.png',
  '/images/inventory/TotK_Stone_Talus_Monster_Medal_Icon.png',
  '/images/inventory/TotK_Zonai_Charge_Icon.png',
  '/images/inventory/armor_180_upper-e86a768a.png',
  '/images/inventory/item_cook_b_06-632a1d5d.png',
  '/images/inventory/obj_heartutuwa_a_01-76ee9c55.png',
  '/images/inventory/purah_pad_key_item_zelda_tears_of_the_kingdom_wiki_guide_200px.png',
  '/images/inventory/totk-amber-icon.avif',
  '/images/inventory/totk-champions-leathers-icon.avif',
  '/images/inventory/totk-dark-hood-icon.avif',
  '/images/inventory/totk-diamond-icon.avif',
  '/images/inventory/totk-glide-shirt-icon.avif',
  '/images/inventory/totk-miners-top-icon.avif',
  '/images/inventory/totk-opal-icon.avif',
  '/images/inventory/totk-sticky-frog-icon.avif',
  '/images/inventory/totk-tingles-hood-icon.avif',
  '/images/inventory/totk-tunic-of-the-wind-icon.avif',
  '/images/inventory/totk-zonaite-icon.avif',
  '/images/inventory/totk_gerudo_fabric.png',
];

function getThumbnail(index: number): string {
  return THUMBNAILS[index % THUMBNAILS.length];
}

/* ── Placeholder item names (cycles for all items) ────────── */

const ITEM_NAMES = [
  'acorn jar', 'charged headdress', 'ancient aspect', 'apple pie',
  'archaic tunic', 'big battery', 'big wheel', 'lizalfos tail',
  'lynel horn', 'bokoblin mask', 'light orb', 'nostalgic fabric',
  'old map', 'stamina vessel', 'monster medal', 'zonai charge',
  'royal armor', 'cooked meal', 'heart container', 'purah pad',
  'amber stone', 'champion leathers', 'dark hood', 'diamond',
  'glide shirt', 'miners top', 'opal gem', 'sticky frog',
  'tingles hood', 'tunic of wind', 'zonaite shard', 'gerudo fabric',
];

function getItemName(index: number): string {
  return ITEM_NAMES[index % ITEM_NAMES.length];
}

/* ── Seed categories ──────────────────────────────────────── */

export const INVENTORY_CATEGORIES: InventoryCategory[] = [
  {
    id: 'all-items',
    name: 'all items',
    itemCount: 989,
    subcategories: [],
    items: Array.from({ length: 60 }, (_, i) => ({ id: `all-${i}`, name: getItemName(i), thumbnail: getThumbnail(i) })),
  },
  {
    id: 'backpack',
    name: 'backpack',
    itemCount: 42,
    subcategories: [],
    items: Array.from({ length: 42 }, (_, i) => ({ id: `bp-${i}`, name: getItemName(i + 3), thumbnail: getThumbnail(i + 3) })),
  },
  {
    id: 'portals-build-tools',
    name: 'portals build tools',
    itemCount: 156,
    subcategories: ['foundations', 'ramps', 'platforms', 'bridges'],
    items: Array.from({ length: 60 }, (_, i) => ({ id: `pbt-${i}`, name: getItemName(i + 6), thumbnail: getThumbnail(i + 6) })),
  },
  {
    id: 'furniture',
    name: 'furniture',
    itemCount: 78,
    subcategories: ['chairs', 'tables', 'beds', 'storage'],
    items: Array.from({ length: 60 }, (_, i) => ({ id: `fur-${i}`, name: getItemName(i + 9), thumbnail: getThumbnail(i + 9) })),
  },
  {
    id: 'buildings',
    name: 'buildings',
    itemCount: 64,
    subcategories: ['walls', 'columns & archways', 'roofs', 'doors & windows'],
    items: Array.from({ length: 60 }, (_, i) => ({ id: `bld-${i}`, name: getItemName(i + 12), thumbnail: getThumbnail(i + 12) })),
  },
  {
    id: 'obstacle-course',
    name: 'obstacle course',
    itemCount: 45,
    subcategories: ['hurdles', 'trampolines', 'slides'],
    items: Array.from({ length: 45 }, (_, i) => ({ id: `obs-${i}`, name: getItemName(i + 15), thumbnail: getThumbnail(i + 15) })),
  },
  {
    id: 'halloween',
    name: 'halloween',
    itemCount: 33,
    subcategories: ['decorations', 'costumes', 'effects'],
    items: Array.from({ length: 33 }, (_, i) => ({ id: `hal-${i}`, name: getItemName(i + 18), thumbnail: getThumbnail(i + 18) })),
  },
  {
    id: 'plants-foliage',
    name: 'plants & foliage',
    itemCount: 89,
    subcategories: ['trees', 'plants', 'flowers', 'grass'],
    items: Array.from({ length: 60 }, (_, i) => ({ id: `pla-${i}`, name: getItemName(i + 21), thumbnail: getThumbnail(i + 21) })),
  },
  {
    id: 'fireballs-squashers',
    name: 'fireballs & squashers',
    itemCount: 27,
    subcategories: ['projectiles', 'traps'],
    items: Array.from({ length: 27 }, (_, i) => ({ id: `fbs-${i}`, name: getItemName(i + 24), thumbnail: getThumbnail(i + 24) })),
  },
  {
    id: 'particles',
    name: 'particles',
    itemCount: 52,
    subcategories: ['ambient', 'effects', 'weather'],
    items: Array.from({ length: 52 }, (_, i) => ({ id: `ptc-${i}`, name: getItemName(i + 27), thumbnail: getThumbnail(i + 27) })),
  },
];

/* ── Category icon map ────────────────────────────────────── */

const CATEGORY_ICON_MAP: Record<string, ReactNode> = {
  'all-items': <AllItemsIcon size={20} />,
  'backpack': <BackpackIcon size={20} />,
  'portals-build-tools': <PortalsBuildToolsIcon size={20} />,
  'furniture': <FurnitureIcon size={20} />,
  'buildings': <BuildingsIcon size={20} />,
  'obstacle-course': <ObstacleCourseIcon size={20} />,
  'halloween': <HalloweenIcon size={20} />,
  'plants-foliage': <PlantsIcon size={20} />,
  'fireballs-squashers': <FireballsIcon size={20} />,
  'particles': <ParticlesIcon size={20} />,
};

/* ── Dropdown options (derived) ───────────────────────────── */

export const CATEGORY_OPTIONS = INVENTORY_CATEGORIES.map((c) => ({
  value: c.id,
  label: c.name,
  icon: CATEGORY_ICON_MAP[c.id],
}));

/* ── Default mode: items with sporadic p3 dividers ────────── */

const DIVIDER_LABELS = [
  'portals build tools',
  'furniture',
  'buildings',
  'obstacle course',
  'halloween',
  'plants & foliage',
  'fireballs & squashers',
  'particles',
];

export function getDefaultGridEntries(categoryId: string): GridEntry[] {
  const cat = INVENTORY_CATEGORIES.find((c) => c.id === categoryId);
  if (!cat) return [];

  const entries: GridEntry[] = [];
  let dividerIdx = 0;

  for (let i = 0; i < cat.items.length; i++) {
    // Insert a divider every 8-12 items (at 8, 20, 30, 42...)
    if (i > 0 && i % 10 === 8 && dividerIdx < DIVIDER_LABELS.length) {
      entries.push({ type: 'divider', label: DIVIDER_LABELS[dividerIdx] });
      dividerIdx++;
    }
    entries.push({ type: 'item', id: cat.items[i].id, name: cat.items[i].name, thumbnail: cat.items[i].thumbnail });
  }

  return entries;
}

/* ── Expanded mode: larger item set for the selected category ─ */

export function getExpandedItems(categoryId: string): InventoryItem[] {
  const cat = INVENTORY_CATEGORIES.find((c) => c.id === categoryId);
  if (!cat) return [];
  // Generate more items to fill the expanded grid
  return Array.from({ length: cat.itemCount > 108 ? 108 : cat.itemCount }, (_, i) => ({
    id: `${categoryId}-exp-${i}`,
    name: getItemName(i),
    thumbnail: getThumbnail(i),
  }));
}
