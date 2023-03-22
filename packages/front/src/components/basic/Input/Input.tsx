import InputBase, { InputBaseProps } from './InputBase';
import InputDescription from './InputDescription';
import InputLabel from './InputLabel';
import InputPassword from './InputPassword';

const Input: React.FC<InputBaseProps> & {
  Label: typeof InputLabel;
  Description: typeof InputDescription;
  Password: typeof InputPassword;
} = (props) => {
  return <InputBase {...props} />;
};

Input.Label = InputLabel;
Input.Description = InputDescription;
Input.Password = InputPassword;

export default Input;
