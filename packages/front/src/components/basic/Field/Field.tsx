import { ChangeEvent, createContext, FocusEvent } from 'react';
import { Field as FinalField, FieldRenderProps, UseFieldConfig } from 'react-final-form';
import FieldItem from './FieldItem';
import FieldText from './FieldText';

interface FieldProps extends UseFieldConfig<any> {
  name: string;
  children: React.ReactNode | React.ReactNode[];
  onChange?: (value: any, evt: ChangeEvent<HTMLInputElement>) => any;
  onFocus?: (value: any, evt: FocusEvent<HTMLInputElement, Element>) => any;
  onBlur?: (value: any, evt: FocusEvent<HTMLInputElement, Element>) => any;
}

export interface FieldContextType extends FieldRenderProps<any> {
  formName: string;
  id: string;
}

export const FieldContext = createContext<FieldContextType>({
  input: {
    name: '',
    onBlur: () => {},
    onChange: () => {},
    onFocus: () => {},
    value: null,
  },
  meta: {},
  formName: '',
  id: '',
});

const Field: React.FC<FieldProps> & { Text: typeof FieldText } = ({
  name,
  children,
  onChange,
  onFocus,
  onBlur,
  ...props
}) => {
  return (
    <FinalField name={name} {...props}>
      {({ input, meta }: FieldRenderProps<any>) => {
        return (
          <FieldItem
            input={input}
            meta={meta}
            onChange={onChange}
            onFocus={onFocus}
            onBlur={onBlur}
          >
            {children}
          </FieldItem>
        );
      }}
    </FinalField>
  );
};

Field.Text = FieldText;

export default Field;
