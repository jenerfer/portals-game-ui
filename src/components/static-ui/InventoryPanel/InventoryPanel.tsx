import { useState, useMemo } from 'react';
import { Panel } from '@/components/layout/Panel';
import { PanelHeader } from '@/components/layout/PanelHeader';
import { TabNav } from '@/components/navigation/TabNav';
import { Dropdown } from '@/components/inputs/Dropdown';
import { TextEntry } from '@/components/inputs/TextEntry';
import { Button } from '@/components/primitives/Button';
import { Text } from '@/components/primitives/Text';
import { MultiTagSelector } from '@/components/selectors/MultiTagSelector';
import { CloseIcon } from '@/icons/CloseIcon';
import { CollapseIcon } from '@/icons/CollapseIcon';
import { SearchIcon } from '@/icons/SearchIcon';
import {
  INVENTORY_CATEGORIES,
  CATEGORY_OPTIONS,
  getExpandedItems,
  getDefaultGridEntries,
} from './inventoryData';
import styles from './InventoryPanel.module.css';

/* ── Types ─────────────────────────────────────────────────── */

export interface InventoryPanelProps {
  expanded?: boolean;
  onExpand?: () => void;
  onCollapse?: () => void;
  onClose?: () => void;
}

const EXPANDED_TABS = [
  { id: 'inventory', label: 'inventory' },
  { id: 'blueprints', label: 'purchased items' },
];

/* ── Component ─────────────────────────────────────────────── */

export function InventoryPanel({
  expanded = false,
  onExpand,
  onCollapse,
  onClose,
}: InventoryPanelProps) {
  const [selectedCategory, setSelectedCategory] = useState(CATEGORY_OPTIONS[0].value);
  const [activeTab, setActiveTab] = useState('inventory');
  const [activeSubs, setActiveSubs] = useState<Set<string>>(new Set());
  const [searchQuery, setSearchQuery] = useState('');

  /* ── Derived data ──────────────────────────────────────── */

  const currentCategory = useMemo(
    () => INVENTORY_CATEGORIES.find((c) => c.id === selectedCategory) ?? INVENTORY_CATEGORIES[0],
    [selectedCategory],
  );

  const defaultGridEntries = useMemo(
    () => getDefaultGridEntries(selectedCategory),
    [selectedCategory],
  );

  const expandedItems = useMemo(
    () => getExpandedItems(selectedCategory),
    [selectedCategory],
  );

  const toggleSub = (sub: string) => {
    setActiveSubs((prev) => {
      const next = new Set(prev);
      if (next.has(sub)) next.delete(sub);
      else next.add(sub);
      return next;
    });
  };

  /* ── Default (compact) mode ────────────────────────────── */

  if (!expanded) {
    return (
      <Panel className={styles.defaultPanel}>
        <PanelHeader title="inventory" onExpand={onExpand} onClose={onClose} />

        <Dropdown
          options={CATEGORY_OPTIONS}
          value={selectedCategory}
          onChange={setSelectedCategory}
          placeholder="select category"
        />

        <div className={styles.categorySection}>
          <div className={styles.categoryHeader}>
            <Text variant="h2" color="primary">{currentCategory.name}</Text>
            <Text variant="p3" color="muted">{currentCategory.itemCount} items</Text>
          </div>
          <div className={styles.itemGrid}>
            {defaultGridEntries.map((entry) =>
              entry.type === 'divider' ? (
                <div key={`div-${entry.label}`} className={styles.gridDivider}>
                  <Text variant="p3" color="muted">{entry.label}</Text>
                </div>
              ) : (
                <div key={entry.id} className={styles.itemCell}>
                  <img src={entry.thumbnail} alt="" className={styles.itemThumb} />
                  <span className={styles.itemTooltip}>{entry.name}</span>
                </div>
              ),
            )}
          </div>
        </div>
      </Panel>
    );
  }

  /* ── Expanded mode ─────────────────────────────────────── */

  return (
    <div className={styles.expandedPanel}>
      {/* ── Top bar: tabs + action icons ──────────────── */}
      <div className={styles.expandedTopBar}>
        <TabNav
          items={EXPANDED_TABS}
          activeId={activeTab}
          onChange={setActiveTab}
          size="h1"
        />
        <div className={styles.expandedActions}>
          <button
            type="button"
            className={styles.headerIconButton}
            onClick={onCollapse}
            aria-label="Collapse panel"
          >
            <CollapseIcon size={18} />
          </button>
          <button
            type="button"
            className={styles.headerIconButton}
            onClick={onClose}
            aria-label="Close panel"
          >
            <CloseIcon size={24} />
          </button>
        </div>
      </div>

      {/* ── Controls row ─────────────────────────────── */}
      <div className={styles.controlsRow}>
        <div className={styles.dropdownWrap}>
          <Dropdown
            options={CATEGORY_OPTIONS}
            value={selectedCategory}
            onChange={setSelectedCategory}
            placeholder="select category"
          />
        </div>
        <Button variant="primary-blue">create</Button>
        <Button variant="secondary-white">upload custom</Button>
        <div className={styles.searchWrap}>
          <TextEntry
            value={searchQuery}
            onChange={setSearchQuery}
            placeholder="search items"
            endAddon={<SearchIcon size={16} />}
          />
        </div>
      </div>

      {/* ── Category header ──────────────────────────── */}
      <div className={styles.categoryHeader}>
        <Text variant="h2" color="primary">{currentCategory.name}</Text>
        <Text variant="p3" color="muted">{currentCategory.itemCount} items</Text>
      </div>

      {/* ── Subcategory badges ───────────────────────── */}
      <div className={styles.subcategoryRow}>
        {currentCategory.subcategories.map((sub) => (
          <MultiTagSelector
            key={sub}
            label={sub}
            selected={activeSubs.has(sub)}
            onClick={() => toggleSub(sub)}
          />
        ))}
      </div>

      {/* ── Item grid (scrollable, fills remaining space) */}
      <div className={styles.expandedItemGrid}>
        {expandedItems.map((item) => (
          <div key={item.id} className={styles.itemCell}>
            <img src={item.thumbnail} alt="" className={styles.itemThumb} />
            <span className={styles.itemTooltip}>{item.name}</span>
          </div>
        ))}
        {/* Invisible fillers so the last row doesn't stretch */}
        {Array.from({ length: 20 }, (_, i) => (
          <div key={`filler-${i}`} className={styles.gridFiller} aria-hidden />
        ))}
      </div>
    </div>
  );
}
