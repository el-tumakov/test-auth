import { useEffect, useMemo, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useTheme } from 'next-themes';
import LogoLight from '../../../../public/logo-light.svg';
import LogoDark from '../../../../public/logo-dark.svg';

const Logo = () => {
  const [mounted, setMounted] = useState(false);
  const { theme, systemTheme } = useTheme();

  const currentTheme = useMemo(() => {
    if (theme === 'system') {
      return systemTheme;
    }

    return theme;
  }, [systemTheme, theme]);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return <div style={{ width: 200, height: 100 }} />;
  }

  return (
    <Link href="/">
      <Image
        src={currentTheme === 'light' ? LogoLight : LogoDark}
        alt="Tumakov logo"
        width={200}
        height={100}
        priority
      />
    </Link>
  );
};

export default Logo;
