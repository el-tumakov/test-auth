import { useContext } from 'react';
import { BaseFieldProps } from '@/types';
import { FieldContext } from '../Field';
import FieldWrap from '../FieldWrap';
import Input from '../../Input';

interface FieldTextProps extends BaseFieldProps {}

const FieldText: React.FC<FieldTextProps> = ({ children, label, description, ...props }) => {
  const { input, meta, formName, id } = useContext(FieldContext);

  return (
    <FieldWrap id={id} label={label} description={description} meta={meta}>
      <Input
        id={id}
        aria-describedby={description ? `${id}-description` : undefined}
        isError={meta.touched && meta.error}
        {...input}
        {...props}
      />
    </FieldWrap>
  );
};

export default FieldText;
