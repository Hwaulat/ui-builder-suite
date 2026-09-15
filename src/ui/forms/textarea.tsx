import { cn } from '@/utils/cn';
import { Label } from './label';
import { useState } from 'react';

type TextareaProps = {
  label?: string;
  maxAmount?: number;
  disabled?: boolean;
  error?: boolean;
  className?: string;
  containerClassName?: string;
  readonly?: boolean;
} & React.TextareaHTMLAttributes<HTMLTextAreaElement>;

const Textarea = ({
  label,
  maxAmount = 500,
  disabled = false,
  error = false,
  className,
  containerClassName,
  readonly,
  ...props
}: TextareaProps) => {

  const textAreaHandler = (maxAmount: number) => {
    const [text, setText] = useState('');

    const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      const value = e.target.value;

      if (value.length <= maxAmount) {
        setText(value);
      }
    };

    return { text, setText, handleChange };
  };

  const { text, handleChange } = textAreaHandler(maxAmount);

  const isError = error || text.length >= maxAmount;

  return (
    <div className={cn('flex flex-col gap-y-2', containerClassName)}>
      <Label className="text-sm">{label}</Label>
      <textarea
        placeholder="Type your message..."
        value={text}
        readOnly={readonly}
        onChange={handleChange}
        disabled={disabled}
        className={cn(
          `text-sm bg-white border border-gray-200 dark:border-gray-700 dark:bg-gray-800 p-3 rounded-lg w-full focus:outline-none`,
          disabled ? 'bg-gray-200' : 'bg-neutral-5',
          isError ? 'border-red-500 border bg-transparent' : null,
          className,
        )}
        {...props}
      />
      <div
        className={cn(
          'flex justify-between',
          disabled
            ? 'text-neutral-9'
            : text
              ? 'text-neutral-9'
              : 'text-neutral-6',
        )}
      >
        <p className={`text-xs text-gray-700 px-1`}>
          {text.length}/{maxAmount}
        </p>
      </div>
    </div>
  );
};

export default Textarea;
