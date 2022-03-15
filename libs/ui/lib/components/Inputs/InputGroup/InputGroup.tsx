import Label from '../shared/Label';

export const inputGroupItemClasses = 'deep-group-item:border-l-0 deep-group-item:border-r deep-group-item:rounded-none';
export interface InputGroupProps {
  label?: string
}

const InputGroup: React.FC<InputGroupProps> = ({
  label,
  children
}) => {
  return (
    <>
      <Label>{label}</Label>
      <div className='components-group flex flex-row relative'>
        {children}
      </div>
    </>
  );
};

export default InputGroup;
