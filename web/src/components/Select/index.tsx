import { SelectHTMLAttributes } from 'react';

import './styles.scss';

type Option = {
  value: string;
  label: string;
}

interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  label: string;
  name: string;
  options: Option[];
}

export function Select({ label, name, options, ...rest }: SelectProps) {
  return (
    <div className="select-block">
      <label htmlFor={name}>{label}</label>

      <select value="" id={name} {...rest} >
        <option value="" disabled hidden>Selecione uma opção</option>
        
        {options.map(option => {
          return <option key={option.value} value={option.value}>{option.label}</option>
        })}
      </select>
    </div>
  );
}