import { useMemo } from 'react';
import { FieldMetaState } from 'react-final-form';
import Input from '../../Input';

interface FieldWrapProps {
  id: string;
  children: React.ReactNode | React.ReactNode[];
  meta: FieldMetaState<any>;
  label?: React.ReactNode;
  description?: React.ReactNode;
  isError: boolean;
}

const FieldWrap: React.FC<FieldWrapProps> = ({
  id,
  label,
  description,
  meta,
  children,
  isError = false,
}) => {
  const inputDescription = useMemo(() => {
    if (isError) {
      return meta.error || meta.submitError;
    }

    return description;
  }, [description, isError, meta.error, meta.submitError]);

  return (
    <>
      {label ? <Input.Label htmlFor={id}>{label}</Input.Label> : null}
      {children}
      {inputDescription ? (
        <Input.Description id={`${id}-description`} isError={isError}>
          {inputDescription}
        </Input.Description>
      ) : null}
    </>
  );
};

export default FieldWrap;
