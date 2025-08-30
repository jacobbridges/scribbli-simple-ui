import type { ComponentProps } from "react";

import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from "react-router";
import { debounce, has } from "lodash";

import {
  TextInput,
  TextareaInput,
  InputChoiceBlocks,
} from '~/components/nero-forms';


const AUDIENCE_CHOICES = [
  {
    value: "public",
    heading: "Public",
    subheading: "Visible to everyone",
    description: "Anyone can discover your world.",
    selected: true,
  },
  {
    value: "private",
    heading: "Private",
    subheading: "Only visible to you",
    description: "You can invite other members.",
    selected: false,
  }
]


interface WorldCreateFormProps
  extends ComponentProps<"form"> {
  onCancel?: () => void;
  onChange?: (data) => void;
}

const WorldCreateForm = ({onSubmit, ...props}: WorldCreateFormProps) => {
  const {register, handleSubmit, watch} = useForm();
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();
  const onCancel = has(props, "onCancel") ? props.onCancel : () => {
    navigate(-1)
  }

  if (has(props, "onChange")) {
    props.onChange(watch())
  }

  const overrideOnSubmit = async (data) => {
    setIsLoading(true);
    onSubmit(data);
    setIsLoading(false);
  }

  return (
    <form onSubmit={handleSubmit(overrideOnSubmit)}>

      {/* World Name */}
      <TextInput
        label="World Name"
        placeholder="Enter the name..."
        containerClass="pb-2"
        {...register("name")}
      />

      {/* World Heading */}
      <TextareaInput
        label="Headline"
        helperText="Short description shown on the universe page."
        containerClass="py-2"
        maxLength={140}
        {...register("summary")}
      />

      {/* Audience Choice */}
      <InputChoiceBlocks
        label="Audience"
        choices={AUDIENCE_CHOICES}
        containerClass="pt-2 pb-4"
        registerFunc={register}
      />

      {/* Form Actions */}
      <div className="px-8 py-6 bg-gray-50 border-t border-gray-200 flex justify-between items-center">
        <button
          onClick={onCancel}
          type="button"
          className="px-6 py-2 text-gray-600 hover:text-gray-800 transition-colors font-medium hover:cursor-pointer"
        >
          Cancel
        </button>
        <input
          type="submit"
          value={isLoading ? "Submitting..." : "Create"}
          disabled={isLoading}
          className={"px-8 py-2 bg-gray-900 text-white rounded-sm hover:bg-gray-800 transition-colors font-medium " + (
            isLoading ? "cursor-not-allowed" : "cursor-pointer"
          )}
        />
      </div>

    </form>
  )
}

export { WorldCreateForm as default };