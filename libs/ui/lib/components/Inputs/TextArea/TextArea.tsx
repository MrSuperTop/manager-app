import classNames from 'classnames';
import { useField } from 'formik';
import { ComponentPropsWithoutRef, useRef } from 'react';
import useChildrenWithProps from '../../../hooks/useChildrenWithProps';
import ErrorText from '../shared/ErrorText';
import Label from '../shared/Label';
import { InnerProps } from '../shared/withInner/withInner';
import { defaultTextFieldClasses } from '../TextField/TextField';
import InnerLeft from './InnerLeft';

export const resizeVariants = ['resize', 'resize-x', 'resize-y'] as const;
export const defaultResize: TextAreaProps['resize'] = 'resize';

export interface TextAreaProps extends ComponentPropsWithoutRef<'textarea'> {
  name: string,
  label?: string,
  className?: string,
  resize?: typeof resizeVariants[number]
};

const TextArea: React.FC<TextAreaProps> = ({
  name,
  label,
  className,
  children,
  resize = defaultResize,
  ...props
}) => {
  const [field] = useField(name);
  const textAreaRef = useRef<HTMLTextAreaElement>(null);
  const childrenWithRef = useChildrenWithProps<InnerProps>(children, {
    parentRef: textAreaRef
  });

  return (
    <div
      className='w-full'
    >
      <Label>
        {label}
      </Label>

      <div className='relative w-full'>
        {childrenWithRef}
        <textarea
          {...field}
          {...props}
          ref={textAreaRef}
          className={classNames(
            className,
            resize,
            defaultTextFieldClasses
          )}
        />
      </div>

      <ErrorText
        name={name}
      />
    </div>
  );
};

export default Object.assign(TextArea, {
  InnerLeft
});
