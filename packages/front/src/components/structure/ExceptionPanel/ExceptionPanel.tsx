import Link from 'next/link';
import styles from './ExceptionPanel.module.css';

interface ExceptionPanelProps {
  statusCode: number;
  title: string;
  description: string;
}

const ExceptionPanel: React.FC<ExceptionPanelProps> = ({ statusCode, title, description }) => {
  return (
    <section className={styles.wrap}>
      <p className={styles.number}>{statusCode}</p>
      <h1 className={styles.title}>{title}</h1>
      <p className={styles.description}>{description}</p>
      <Link className={styles.button} href="/">
        Back to Homepage
      </Link>
    </section>
  );
};

export default ExceptionPanel;
