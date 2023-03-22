import { InputBaseProps } from '@/components/basic/Input/InputBase';

export type BaseFieldProps<T = InputBaseProps> = Omit<
  T,
  'id' | 'onBlur' | 'onChange' | 'onFocus'
> & {
  label?: React.ReactNode;
  description?: React.ReactNode;
};
