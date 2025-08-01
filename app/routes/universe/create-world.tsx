import type {World} from "~/types"

import type {SubmitHandler} from 'react-hook-form';
import {useForm} from "react-hook-form";
import {Link} from "react-router";

interface WorldCreateInput {
  name: string;
  access: 'owner' | 'shared' | 'public';
  tags: string[];
  description: string;
}

export default function UniverseCreateWorldRoute() {

  return (
    <>
      <div className="flex-grow-1 flex-col">

      <div className="toolbar">
        <h2 className="text-xl font-bold text-gray-900">
          Create New World
        </h2>
        <nav className="breadcrumb">
          <Link to={"/universe"}>Universe</Link> / <span>Create New World</span>
        </nav>
      </div>

      <div className="w-400px max-w-2xl p-6">

        {/*Header*/}
        {/*<div className="text-center mb-8 border-b border-gray-300 pb-6">*/}
        {/*  <h2 className="text-3xl font-bold text-gray-900 mb-2 tracking-wide">*/}
        {/*    Create New World*/}
        {/*  </h2>*/}
        {/*</div>*/}

        {/*Form*/}
        <FormComponent />
      </div>
      </div>
    </>
  )
}

function FormComponent() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<WorldCreateInput>();
  const onSubmit: SubmitHandler<WorldCreateInput> = (data) => console.log(data);

  return (
    <form onSubmit={handleSubmit(onSubmit)}
          className="bg-white border border-gray-200"
    >
      <div className="p-8 space-y-8">

        {/*Name Field*/}
        <div className="space-y-2">
          <label htmlFor="name" className={"block text-sm font-semibold text-gray-700 uppercase tracking-wider"}>
            Name
          </label>
          <input
            id={"name"}
            type={"text"}
            name={"name"}
            placeholder={"Enter the name..."}
            className={"w-full px-4 py-3 border border-gray-300 sm focus:ring-2 focus:ring-gray-400 focus:border-gray-400 transition-colors text-lg bg-gray-50 focus:bg-white"}
          />
        </div>

        {/*Headline Field*/}
        <div className="space-y-2">
          <label htmlFor="headline" className={"block text-sm font-semibold text-gray-700 uppercase tracking-wider"}>
            Headline
          </label>
          <textarea
            id={"headline"}
            name={"headline"}
            maxLength={300}
            rows={3}
            placeholder={"Write a short description..."}
            className={"w-full px-4 py-3 border border-gray-300 rounded-sm focus:ring-2 focus:ring-gray-400 focus:border-gray-400 transition-colors text-lg bg-gray-50 focus:bg-white resize-none"}
          />
          <div className="flex justify-between items-center">
            <p className="text-sm test-gray-500 italic">This will be the blurb on the Universe list page.</p>
            <span id={"char-count"} className={"text-sm text-gray-400"}>0/300</span>
          </div>
        </div>

        {/*Tags Section*/}
        <div className="space-y-4">
          <label className="block text-sm font-semibold text-gray-700 uppercase tracking-wider">
            Tags
          </label>

          {/*New Tag Input*/}
          <div className="flex gap-2">
            <input
              type={"text"}
              id={"tag-input"}
              placeholder={"Add a tag..."}
              className={"flex-1 px-4 py-2 border border-gray-300 rounded-sm focus:ring-2 focus:ring-gray-400 focus:border-gray-400 transition-colors bg-gray-50 focus:bg-white"}
            />
            <button
              type={"button"}
              onClick={() => "Add Tag"}
              className={"px-4 py-2 bg-gray-800 text-white rounded-sm hover:bg-gray-700 transition-colors font-medium text-sm"}
            >
              Add
            </button>
          </div>

          {/*Selected Tags Display*/}
          <div className="space-y-2" id="selected-tags">
            <p className="text-sm text-gray-600">Selected tags:</p>
            <div id="tags-container" className={"flex flex-wrap gap-2 min-h-[2rem] p-2 border border-gray-200 rounded-sm bg-gray-50"}>
              {/*Tags should be added here dynamically.*/}
            </div>
          </div>
        </div>

        {/*Access Level*/}
        <div className="space-y-4">
          <label className="relative cursor-pointer">
            <input
              type={"radio"}
              name={"access"}
              value={"public"}
              checked
              className={"sr-only peer"}
            />
            <div className="p-4 border-2 border-gray-300 rounded-sm peer-checked:border-gray-600 peer-checked:bg-gray-50 transition-all hover:border-gray-400">
              <div className="text-center">
                <div className="text-lg font-semibold text-gray-900 mb-1">Public</div>
                <div className="text-sm text-gray-600">Visible to everyone</div>
                <div className="text-xs text-gray-500 mt-2 italic">Anyone can discover and read this entry</div>
              </div>
            </div>
          </label>
          <label className="relative cursor-pointer">
            <input
              type={"radio"}
              name={"access"}
              value={"private"}
              className={"sr-only peer"}
            />
            <div
              className="p-4 border-2 border-gray-300 rounded-sm peer-checked:border-gray-600 peer-checked:bg-gray-50 transition-all hover:border-gray-400">
              <div className="text-center">
                <div className="text-lg font-semibold text-gray-900 mb-1">Private</div>
                <div className="text-sm text-gray-600">Only visible to you</div>
                <div className="text-xs text-gray-500 mt-2 italic">Keep this entry in your personal collection</div>
              </div>
            </div>
          </label>
        </div>

        {/*Form Actions*/}
        <div className="px-8 py-6 bg-gray-50 border-t border-gray-200 flex justify-between items-center">
          <button
            type="button"
            className={"px-6 py-2 text-gray-600 hover:text-gray-800 transition-colors font-medium"}
          >
            Cancel
          </button>
          <button
            type="submit"
            className={"px-8 py-2 bg-gray-900 text-white rounded-sm hover:bg-gray-800 transition-colors font-medium"}
          >
            Create
          </button>
        </div>
      </div>
    </form>
  )

}