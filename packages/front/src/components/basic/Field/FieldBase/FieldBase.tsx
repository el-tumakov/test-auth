import { useMemo } from 'react';
import { FieldMetaState } from 'react-final-form';
import Input from '../../Input';

interface FieldTextProps {
  id: string;
  children: React.ReactNode | React.ReactNode[];
  meta: FieldMetaState<any>;
  label?: React.ReactNode;
  description?: React.ReactNode;
}

const FieldBase: React.FC<FieldTextProps> = ({ id, label, description, meta, children }) => {
  const isError = useMemo(() => {
    return meta.touched && meta.error;
  }, [meta.error, meta.touched]);

  const inputDescription = useMemo(() => {
    if (isError) {
      return meta.error;
    }

    return description;
  }, [description, isError, meta.error]);

  return (
    <>
      {label ? <Input.Label htmlFor={id}>{label}</Input.Label> : null}
      {children}
      {inputDescription ? (
        <Input.Description id={`${id}:description`} isError={isError}>
          {inputDescription}
        </Input.Description>
      ) : null}
    </>
  );
};

export default FieldBase;
