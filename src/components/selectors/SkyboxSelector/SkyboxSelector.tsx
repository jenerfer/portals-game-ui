import styles from './SkyboxSelector.module.css';

export interface SkyboxOption {
  id: string;
  label: string;
  subtitle: string;
  thumbnail: string;
}

export interface SkyboxSelectorProps {
  options: SkyboxOption[];
  activeIndex: number;
  onChange: (index: number) => void;
}

export function SkyboxSelector({ options, activeIndex, onChange }: SkyboxSelectorProps) {
  const current = options[activeIndex];
  if (!current) return null;

  const goPrev = () => onChange(activeIndex > 0 ? activeIndex - 1 : options.length - 1);
  const goNext = () => onChange(activeIndex < options.length - 1 ? activeIndex + 1 : 0);

  return (
    <div className={styles.selector}>
      <img
        src={current.thumbnail}
        alt={current.label}
        className={styles.thumbnail}
      />
      <div className={styles.details}>
        <span className={styles.subtitle}>{current.subtitle}</span>
        <span className={styles.label}>{current.label}</span>
        <div className={styles.nav}>
          <button type="button" className={styles.navBtn} onClick={goPrev}>
            <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
              <path d="M10 12L6 8l4-4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none" />
            </svg>
          </button>
          <button type="button" className={styles.navBtn} onClick={goNext}>
            <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
              <path d="M6 4l4 4-4 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}
