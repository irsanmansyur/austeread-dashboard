import { lastId } from "./utils.form";
import React from "react";
import { twMerge } from "tailwind-merge";
import InputError from "./InputError";
interface Props extends React.DetailedHTMLProps<React.SelectHTMLAttributes<HTMLSelectElement>, HTMLSelectElement> {
  options?: { value: string | number; label: string }[];
  label?: string;
  error?: string;
  classParent?: string;
}
export function SelectCustom({ className = "", label = "", classParent = "", options = [], id, error, ...props }: Props) {
  const idCustom = lastId(id ?? "select-");
  return (
    <div className={twMerge("mb-3 last:mb-1", classParent)}>
      <label htmlFor={idCustom} className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
        {label}
      </label>
      <select
        {...props}
        id={idCustom}
        className={twMerge(
          "form-select appearance-none block w-full px-3 py-2 text-base font-normal text-gray-700 bg-white bg-clip-padding bg-no-repeat border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-primary focus:outline-none",
          className
        )}
        aria-label={label}
      >
        <option>Pilih</option>
        {options.map((opt, i) => (
          <option key={i} selected={props.value == opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
      <InputError message={error} />
    </div>
  );
}

export default SelectCustom;
