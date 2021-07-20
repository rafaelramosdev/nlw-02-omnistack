import { TextareaHTMLAttributes } from 'react';

import './styles.scss';

interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label: string;
  name: string;
}

export function Textarea({ label, name, ...rest }: TextareaProps) {
  return (
    <div className="textarea-block">
      <label htmlFor={name}>{label}</label>
      <textarea id={name} {...rest} />
    </div>
  );
}