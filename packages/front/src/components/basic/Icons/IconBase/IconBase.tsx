import { DetailedHTMLProps, HTMLAttributes } from 'react';
import cn from 'classnames';
import styles from './IconBase.module.css';

export interface IconBaseProps
  extends DetailedHTMLProps<HTMLAttributes<HTMLSpanElement>, HTMLSpanElement> {}

const IconBase: React.FC<IconBaseProps> = ({ className, children, ...props }) => {
  return (
    <span className={cn(styles.icon, className)} {...props}>
      {children}
    </span>
  );
};

export default IconBase;
