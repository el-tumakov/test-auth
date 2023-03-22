import {
  ButtonHTMLAttributes,
  DetailedHTMLProps,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from 'react';
import { useTheme } from 'next-themes';
import cn from 'classnames';
import { DarkModeOutlined, LightModeOutlined } from '../Icons';
import styles from './ThemeToggle.module.css';

interface ThemeToggleProps
  extends DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement> {}

const ThemeToggle: React.FC<ThemeToggleProps> = ({ className, ...props }) => {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme, systemTheme } = useTheme();

  const currentTheme = useMemo(() => {
    if (theme === 'system') {
      return systemTheme;
    }

    return theme;
  }, [systemTheme, theme]);

  const onToggle = useCallback(() => {
    setTheme(currentTheme === 'dark' ? 'light' : 'dark');
  }, [currentTheme, setTheme]);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <button
      className={cn(
        styles.toggle,
        {
          [styles.isDark]: currentTheme === 'dark',
        },
        className
      )}
      type="button"
      onClick={onToggle}
      title="Toggles light & dark"
      aria-label={currentTheme + ' mode'}
      aria-live="polite"
      {...props}
    >
      <LightModeOutlined className={cn({ [styles.lightIcon]: currentTheme === 'light' })} />
      <DarkModeOutlined className={cn({ [styles.nightIcon]: currentTheme === 'dark' })} />
    </button>
  );
};

export default ThemeToggle;
