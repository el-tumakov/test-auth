import { useContext } from 'react';
import { BaseFieldProps } from '@/types';
import { FieldContext } from '../Field';
import FieldWrap from '../FieldWrap';
import Input from '../../Input';
import { InputPasswordProps } from '../../Input/InputPassword/InputPassword';

interface FieldPasswordProps extends BaseFieldProps<InputPasswordProps> {}

const FieldPassword: React.FC<FieldPasswordProps> = ({
  children,
  label,
  description,
  ...props
}) => {
  const { input, meta, formName, id } = useContext(FieldContext);

  return (
    <FieldWrap id={id} label={label} description={description} meta={meta}>
      <Input.Password
        id={id}
        aria-describedby={description ? `${id}-description` : undefined}
        isError={meta.touched && meta.error}
        {...input}
        {...props}
      />
    </FieldWrap>
  );
};

export default FieldPassword;
