import { ChangeEvent, FocusEvent, useCallback, useContext, useMemo } from 'react';
import { FieldRenderProps } from 'react-final-form';
import cn from 'classnames';
import { FormContext } from '../../Form';
import { FieldContext } from '../Field';
import styles from './FieldItem.module.css';

interface FieldItemProps extends FieldRenderProps<any, HTMLInputElement> {
  children: React.ReactNode | React.ReactNode[];
  className?: string;
  onChange?: (value: any, evt: ChangeEvent<HTMLInputElement>) => any;
  onFocus?: (value: any, evt: FocusEvent<HTMLInputElement, Element>) => any;
  onBlur?: (value: any, evt: FocusEvent<HTMLInputElement, Element>) => any;
}

const FieldItem: React.FC<FieldItemProps> = ({
  input,
  meta,
  children,
  className,
  onChange,
  onFocus,
  onBlur,
}) => {
  const { formName } = useContext(FormContext);

  const id = useMemo(() => {
    return `${formName}-${input.name}`;
  }, [formName, input.name]);

  const handleChange = useCallback(
    (evt: ChangeEvent<HTMLInputElement>) => {
      input.onChange(evt);

      if (onChange) {
        onChange(evt.target.value, evt);
      }
    },
    [input, onChange]
  );

  const handleFocus = useCallback(
    (evt: any) => {
      input.onFocus(evt);

      if (onFocus) {
        onFocus(evt.target.value, evt);
      }
    },
    [input, onFocus]
  );

  const handleBlur = useCallback(
    (evt: any) => {
      input.onBlur(evt);

      if (onBlur) {
        onBlur(evt.target.value, evt);
      }
    },
    [input, onBlur]
  );

  const inputProps = useMemo(() => {
    return { ...input, onChange: handleChange, onFocus: handleFocus, onBlur: handleBlur };
  }, [handleBlur, handleChange, handleFocus, input]);

  return (
    <FieldContext.Provider value={{ input: inputProps, meta, formName, id }}>
      <div className={cn(styles.wrap, className)} role="group">
        {children}
      </div>
    </FieldContext.Provider>
  );
};

export default FieldItem;
