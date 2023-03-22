import { DetailedHTMLProps, HTMLAttributes } from 'react';
import Head from 'next/head';
import { Inter } from 'next/font/google';
import cn from 'classnames';
import styles from './MainLayout.module.css';

const inter = Inter({ subsets: ['cyrillic', 'latin'] });

interface MainLayoutProps extends DetailedHTMLProps<HTMLAttributes<HTMLElement>, HTMLElement> {
  title: string;
  description?: string;
}

const MainLayout: React.FC<MainLayoutProps> = ({
  title,
  description,
  className,
  children,
  ...props
}) => {
  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="description" content={description} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={cn(inter.className, styles.main, className)} {...props}>
        {children}
      </main>
    </>
  );
};

export default MainLayout;
