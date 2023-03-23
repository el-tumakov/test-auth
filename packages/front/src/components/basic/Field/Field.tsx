import { ChangeEvent, createContext, FocusEvent } from 'react';
import { Field as FinalField, FieldRenderProps, UseFieldConfig } from 'react-final-form';
import FieldCheckbox from './FieldCheckbox';
import FieldItem from './FieldItem';
import FieldPassword from './FieldPassword';
import FieldText from './FieldText';

interface FieldProps extends UseFieldConfig<any> {
  name: string;
  children: React.ReactNode | React.ReactNode[];
  onChange?: (value: any, evt: ChangeEvent<HTMLInputElement>) => any;
  onFocus?: (value: any, evt: FocusEvent<HTMLInputElement, Element>) => any;
  onBlur?: (value: any, evt: FocusEvent<HTMLInputElement, Element>) => any;
  noMargin?: boolean;
}

export interface FieldContextType extends FieldRenderProps<any> {
  formName: string;
  id: string;
  isError: boolean;
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
  isError: false,
});

const Field: React.FC<FieldProps> & {
  Text: typeof FieldText;
  Password: typeof FieldPassword;
  Checkbox: typeof FieldCheckbox;
} = ({ name, children, onChange, onFocus, onBlur, noMargin = false, ...props }) => {
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
            noMargin={noMargin}
          >
            {children}
          </FieldItem>
        );
      }}
    </FinalField>
  );
};

Field.Text = FieldText;
Field.Password = FieldPassword;
Field.Checkbox = FieldCheckbox;

export default Field;
