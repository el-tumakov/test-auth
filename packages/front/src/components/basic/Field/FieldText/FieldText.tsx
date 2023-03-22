import { useContext } from 'react';
import { FieldContext } from '../Field';
import FieldBase from '../FieldBase';
import Input from '../../Input';
import { InputBaseProps } from '../../Input/InputBase';

interface FieldTextProps extends Omit<InputBaseProps, 'id' | 'onBlur' | 'onChange' | 'onFocus'> {
  label?: React.ReactNode;
  description?: React.ReactNode;
}

const FieldText: React.FC<FieldTextProps> = ({ children, label, description, ...props }) => {
  const { input, meta, formName, id } = useContext(FieldContext);

  return (
    <FieldBase id={id} label={label} description={description} meta={meta}>
      <Input
        id={id}
        aria-describedby={description ? `${id}:description` : undefined}
        isError={meta.touched && meta.error}
        {...input}
        {...props}
      />
    </FieldBase>
  );
};

export default FieldText;
