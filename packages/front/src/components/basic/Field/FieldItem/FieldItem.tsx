import { ChangeEvent, FocusEvent, useCallback, useContext, useMemo } from 'react';
import { FieldRenderProps } from 'react-final-form';
import { FormContext } from '../../Form';
import { FieldContext } from '../Field';

interface FieldItemProps extends FieldRenderProps<any> {
  children: React.ReactNode | React.ReactNode[];
  onChange?: (value: any, evt: ChangeEvent<HTMLInputElement>) => any;
  onFocus?: (value: any, evt: FocusEvent<HTMLInputElement, Element>) => any;
  onBlur?: (value: any, evt: FocusEvent<HTMLInputElement, Element>) => any;
}

const FieldItem: React.FC<FieldItemProps> = ({
  input,
  meta,
  children,
  onChange,
  onFocus,
  onBlur,
}) => {
  const { formName } = useContext(FormContext);

  const id = useMemo(() => {
    return `${formName}:${input.name}`;
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
    (evt: FocusEvent<HTMLInputElement, Element>) => {
      input.onFocus(evt);

      if (onFocus) {
        onFocus(evt.target.value, evt);
      }
    },
    [input, onFocus]
  );

  const handleBlur = useCallback(
    (evt: FocusEvent<HTMLInputElement, Element>) => {
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
      {children}
    </FieldContext.Provider>
  );
};

export default FieldItem;
