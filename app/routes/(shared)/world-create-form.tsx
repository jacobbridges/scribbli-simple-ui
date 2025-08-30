import type { ComponentProps } from "react";

import React from 'react';
import { useForm } from 'react-hook-form';

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
}

const WorldCreateForm = ({ onSubmit }: WorldCreateFormProps) => {
  const {register, handleSubmit} = useForm();

  return (
    <form onSubmit={handleSubmit(onSubmit)}>

      {/* World Name */}
      <TextInput
        label="World Name"
        {...register("name")}
      />

      {/* World Heading */}
      <TextareaInput
        label="Headline"
        helperText="Short description shown on the universe page."
        {...register("summary")}
      />

      {/* Audience Choice */}
      <InputChoiceBlocks
        label="Audience"
        choices={AUDIENCE_CHOICES}
        registerFunc={register}
      />

      <input
        type="submit"
        value="Submit"
      />

    </form>
  )
}

export { WorldCreateForm as default };