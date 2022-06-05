import { EyeIcon, EyeOffIcon } from '@heroicons/react/outline';
import { PropsWithChildren, useState } from 'react';
import TextField, { TextFieldProps } from '../TextField/TextField';

export type PasswordFieldProps = TextFieldProps;

const PasswordField = ({
  children,
  ...props
}: PropsWithChildren<PasswordFieldProps>) => {
  const [passwordVisible, setPasswordVisible] = useState(false);

  return (
    <TextField
      {...props}
      type={passwordVisible ? 'text' : 'password'}
    >
      <TextField.InnerRight
        width={20}
        onClick={() => {
          setPasswordVisible((prev) => !prev);
        }}
      >
        {
          passwordVisible ? (
            <EyeOffIcon
              className='h-5 w-5 cursor-pointer'
            />
          ) : (
            <EyeIcon
              className='h-5 w-5 cursor-pointer'
            />
          )
        }
      </TextField.InnerRight>
      {children}
    </TextField>
  );
};

export default Object.assign(PasswordField, {
  InnerLeft: TextField.InnerLeft,
  Addon: TextField.Addon
});
