import { useContext, useMemo } from 'react';
import { FieldContext } from '../Field';
import Input from '../../Input';
import { InputBaseProps } from '../../Input/InputBase';

interface FieldTextProps extends Omit<InputBaseProps, 'id' | 'onBlur' | 'onChange' | 'onFocus'> {
  label?: React.ReactNode;
  description?: React.ReactNode;
}

const FieldText: React.FC<FieldTextProps> = ({ children, label, description, ...props }) => {
  const { input, meta, formName, id } = useContext(FieldContext);

  return (
    <>
      {label ? <Input.Label htmlFor={id}>{label}</Input.Label> : null}
      <Input id={id} aria-describedby={`${id}:description`} {...input} {...props} />
      {description ? (
        <Input.Description id={`${id}:description`}>{description}</Input.Description>
      ) : null}
    </>
  );
};

export default FieldText;
