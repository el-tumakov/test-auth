import cn from 'classnames';
import { createContext } from 'react';
import { Form as FinalForm, FormProps as FinalFormProps } from 'react-final-form';
import createDecorator from 'final-form-focus';
import styles from './Form.module.css';

export interface FormProps extends FinalFormProps {
  name: string;
  children: React.ReactNode | React.ReactNode[];
  className?: string;
}

export interface FormContextType {
  formName: string;
}

export const FormContext = createContext<FormContextType>({
  formName: '',
});

const focusOnError = createDecorator();

const Form: React.FC<FormProps> = ({ name, className, children, ...props }) => {
  return (
    <FinalForm
      {...props}
      decorators={[focusOnError]}
      render={({ handleSubmit }) => {
        return (
          <form className={cn(styles.form, className)} onSubmit={handleSubmit}>
            <FormContext.Provider value={{ formName: name }}>{children}</FormContext.Provider>
          </form>
        );
      }}
    />
  );
};

export default Form;
