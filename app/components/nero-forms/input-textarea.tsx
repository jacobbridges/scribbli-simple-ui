import type { ComponentProps } from "react";
import { useState } from 'react';

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
    onChange,
  } = props;
  const textareaProps = omit(props, [
    "label",
    "placeholder",
    "helperText",
    "errorText",
    "containerClass",
    "labelClass",
    "inputClass",
    "helperTextClass",
    "errorTextClass",
    "onChange",
  ]);

  const [textLength, setTextLength] = useState(0);
  const overrideOnChange = (e) => {
    setTextLength(e.target.value.length);
    onChange(e);
  }

  return (
    <div className={containerClass || "space-y-2"}>
      <label
        htmlFor={camelCase(label)}
        className={labelClass || "block text-sm font-semibold text-gray-700 uppercase tracking-wider"}
      >
        {label}
      </label>
      <textarea
        {...textareaProps}
        id={camelCase(label)}
        maxLength={maxLength}
        rows={rows}
        placeholder={placeholder}
        className={inputClass || "w-full px-4 py-3 border border-gray-300 rounded-sm focus:ring-2 focus:ring-gray-400 focus:border-gray-400 transition-colors text-lg bg-gray-50 focus:bg-white resize-none"}
        onChange={overrideOnChange}
      />
      <div className="flex justify-between items-center">
        <p className={helperTextClass || "text-sm text-gray-500 italic"}>
          {helperText}
        </p>
        <span className="text-sm text-gray-400">{textLength}/{maxLength}</span>
      </div>
      {errorText && <div className={errorTextClass || "block text-xs text-red-700"}>
        {errorText}
      </div>}
    </div>
  )
}