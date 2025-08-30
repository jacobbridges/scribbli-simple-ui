import React from "react";

import { camelCase } from "lodash";


interface Choice {
  value: string;
  heading: string;
  subheading: string;
  description: string;
  selected: boolean;
}


interface InputChoiceBlocksProps {
  label: string;
  choices: Choice[];
  registerFunc: (n: string) => any;
  name?: string;
}

const InputChoiceBlocks = (props: InputChoiceBlocksProps) => {
  const {
    label,
    name = camelCase(props.label),
    choices,
    registerFunc,
  } = props;

  return (
    <div className="space-y-4">
      <label className="block text-sm font-semibold text-gray-700 uppercase tracking-wider">
        {label}
      </label>
      <div className={`grid grid-cols-${choices.length} gap-4`}>
        {choices.map(block => <InputChoiceBlock key={block.value} choice={block} registerFunc={registerFunc} name={name} />)}
      </div>
    </div>
  )
}

interface InputChoiceBlockProps {
  choice: Choice;
  name: string;
  registerFunc: (n: string) => any;
}

const InputChoiceBlock = ({ choice, name, registerFunc }: InputChoiceBlockProps) => {
  return (
    <label className="relative cursor-pointer">
      <input
        type="radio"
        value={choice.value}
        className="sr-only peer"
        defaultChecked={choice.selected}
        {...registerFunc(name)}
      />
      <div className="p-4 border-2 border-gray-300 rounded-sm peer-checked:border-gray-600 peer-checked:bg-gray-50 transition-all hover:border-gray-400">
        <div className="text-center">
          <div className="text-lg font-semibold text-gray-900 mb-1">{choice.heading}</div>
          <div className="text-sm text-gray-600">{choice.subheading}</div>
          <div className="text-xs text-gray-500 mt-2 italic">{choice.description}</div>
        </div>
      </div>
    </label>
  )
}


export { InputChoiceBlocks as default };