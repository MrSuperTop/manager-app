import { useField } from 'formik';

export interface ErrorTextProps {
  name: string
};


const ErrorText: React.VFC<ErrorTextProps> = ({
  name
}) => {
  const { error, touched } = useField(name)[1];
  const errorText = (error && touched) ? error : '';

  if (!errorText) {
    return null;
  }

  return (
    <div
      className='ml-1 mt-1 text-base text-red-400'
    >
      {errorText}
    </div>
  );
};

export default ErrorText;
