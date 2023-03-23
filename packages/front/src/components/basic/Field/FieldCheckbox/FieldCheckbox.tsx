import { useContext } from 'react';
import { BaseFieldProps } from '@/types';
import { FieldContext } from '../Field';
import Input from '../../Input';
import { InputCheckboxProps } from '../../Input/InputCheckbox';

interface FieldPasswordProps
  extends Omit<BaseFieldProps<InputCheckboxProps>, 'label' | 'description'> {}

const FieldCheckbox: React.FC<FieldPasswordProps> = ({ children, ...props }) => {
  const { input, id } = useContext(FieldContext);

  return (
    <Input.Checkbox id={id} {...input} {...props}>
      {children}
    </Input.Checkbox>
  );
};

export default FieldCheckbox;
