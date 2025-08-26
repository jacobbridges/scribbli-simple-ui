import type { ComponentProps } from "react";

import { camelCase, omit } from "lodash";

export interface InputTextProps
  extends ComponentProps<"input"> {
  label: string;
  name?: string;
  placeholder?: string;
  helperText?: string;
  errorText?: string;
  containerClass?: string;
  labelClass?: string;
  inputClass?: string;
  helperTextClass?: string;
  errorTextClass?: string;
}

export default function InputText(props: InputTextProps) {
  const {
    label,
    name = camelCase(label),
    placeholder = "",
    helperText,
    errorText,
    containerClass,
    labelClass,
    inputClass,
    helperTextClass,
    errorTextClass,
  } = props;
  const inputProps = omit(props, [
    "label",
    "name",
    "placeholder",
    "helperText",
    "errorText",
    "containerClass",
    "labelClass",
    "inputClass",
    "helperTextClass",
    "errorTextClass",
  ]);

  return (
    <div className={containerClass || "space-y-2"}>
      <label
        htmlFor={name}
        className={labelClass || "block text-sm font-semibold tracking-wider text-gray-700 uppercase"}
      >
        {label}
      </label>
      <input
        {...inputProps}
        id={name}
        name={name}
        type="text"
        placeholder={placeholder}
        className={inputClass || "w-full border border-gray-300 bg-gray-50 px-4 py-3 text-lg transition-colors focus:border-gray-400 focus:bg-white focus:ring-2 focus:ring-gray-400"}
      />
      {helperText && <div className={helperTextClass || "block text-xs"}>
        {helperText}
      </div>}
      {errorText && <div className={errorTextClass || "block text-xs text-red-700"}>
        {errorText}
      </div>}
    </div>
  )
}