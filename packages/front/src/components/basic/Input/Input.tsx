import InputBase, { InputBaseProps } from './InputBase';
import InputDescription from './InputDescription';
import InputLabel from './InputLabel';

const Input: React.FC<InputBaseProps> & {
  Label: typeof InputLabel;
  Description: typeof InputDescription;
} = (props) => {
  return <InputBase {...props} />;
};

Input.Label = InputLabel;
Input.Description = InputDescription;

export default Input;
