import type { ComponentProps } from "react";

import { camelCase, omit } from "lodash";

export interface InputTextareaProps
  extends ComponentProps<"textarea"> {
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

  maxLength?: number;
  rows?: number;
}

export default function InputTextarea(props: InputTextareaProps) {
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
    maxLength = 300,
    rows = 3,
  } = props;
  const textareaProps = omit(props, [
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
        className={labelClass || "block text-sm font-semibold text-gray-700 uppercase tracking-wider"}
      >
        {label}
      </label>
      <textarea
        {...textareaProps}
        id={name}
        name={name}
        maxLength={maxLength}
        rows={rows}
        placeholder={placeholder}
        className={inputClass || "w-full px-4 py-3 border border-gray-300 rounded-sm focus:ring-2 focus:ring-gray-400 focus:border-gray-400 transition-colors text-lg bg-gray-50 focus:bg-white resize-none"}
      />
      <div className={helperTextClass || "text-sm test-gray-500 italic"}>
        <p>
          {helperText}
        </p>
        <span className="text-sm text-gray-400">0/{maxLength}</span>
      </div>
      {errorText && <div className={errorTextClass || "block text-xs text-red-700"}>
        {errorText}
      </div>}
    </div>
  )
}