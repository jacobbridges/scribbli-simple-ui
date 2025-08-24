import { useState } from "react";

import { apiMock } from "~/services/api/client";

export default function AdminDevDbRoute() {
  return (
    <div className="m-auto w-5xl bg-green-100">
      <nav className="border-gray-200 bg-white dark:bg-gray-900">
        <div className="mx-auto flex max-w-screen-xl flex-wrap items-center justify-between p-4">
          <a href="/admin" className="flex items-center space-x-3 rtl:space-x-reverse">
            <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">Admin</span>
          </a>
          <button data-collapse-toggle="navbar-default" type="button"
                  className="inline-flex h-10 w-10 items-center justify-center rounded-lg p-2 text-sm text-gray-500 hover:bg-gray-100 focus:ring-2 focus:ring-gray-200 focus:outline-none md:hidden dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
                  aria-controls="navbar-default" aria-expanded="false">
            <span className="sr-only">Open main menu</span>
            <svg className="h-5 w-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none"
                 viewBox="0 0 17 14">
              <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                    d="M1 1h15M1 7h15M1 13h15"/>
            </svg>
          </button>
          <div className="hidden w-full md:block md:w-auto" id="navbar-default">
            <ul
              className="mt-4 flex flex-col rounded-lg border border-gray-100 bg-gray-50 p-4 font-medium md:mt-0 md:flex-row md:space-x-8 md:border-0 md:bg-white md:p-0 rtl:space-x-reverse dark:border-gray-700 dark:bg-gray-800 md:dark:bg-gray-900">
              <li>
                <span className="block rounded-sm bg-blue-700 px-3 py-2 text-white md:bg-transparent md:p-0 md:text-blue-700 dark:text-white md:dark:text-blue-500"
                      aria-current="page">Dev Database</span>
              </li>
              <li>
                <a href="#"
                   className="block rounded-sm px-3 py-2 text-gray-900 hover:bg-gray-100 md:border-0 md:p-0 md:hover:bg-transparent md:hover:text-blue-700 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent md:dark:hover:text-blue-500">About</a>
              </li>
            </ul>
          </div>
        </div>
      </nav>

      <div className="flex gap-6">
        <aside className="w-[150px]">
          <div className="p-2">
            <ul>
              <li className="p-2">
                <button>test</button>
              </li>
            </ul>
          </div>
        </aside>
        <main className="grow">
          <div className="p-4">
            <TableActionContainer tableName={"world"} />
          </div>
        </main>
      </div>
    </div>
  )
}

interface TableActionContainerProps {
  tableName: string;
}

function TableActionContainer({tableName} : TableActionContainerProps) {
  const [activeContainer, setActiveContainer] = useState("text");
  const [text, setText] = useState(" ");

  const getAll = () => {
    setActiveContainer("text");
    apiMock
      .getAll(tableName)
      .then((response) => {
        setText(JSON.stringify(response, null, 2));
      })
      .catch(console.error)
  }

  const resetCollection = () => {
    setActiveContainer("text");
    apiMock
      .clearCollection(tableName)
      .then(r => getAll())
      .catch(console.error)
  }

  const addOne = () => {
    setActiveContainer("new");
  }

  const handleNewSubmit = (data: any) => {
    apiMock
      .create(tableName, data)
      .then((response) => {
        setText(JSON.stringify(response, null, 2));
      })
      .catch(console.error)
      .finally(() => setActiveContainer("text"))
  }

  return (
    <div className="grid grid-cols-4 gap-4">
      <div>
        <ul>
          <li className="mb-2">
            <button type="button"
                    className="w-full bg-blue-700 px-3 py-2 text-center text-xs font-medium text-white hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 focus:outline-none dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                    onClick={getAll}
            >
              Select All
            </button>
          </li>
          <li className="mb-2">
            <button type="button"
                    className="w-full bg-blue-700 px-3 py-2 text-center text-xs font-medium text-white hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 focus:outline-none dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                    onClick={addOne}
            >
              Add One
            </button>
          </li>
          <li className="mb-2">
            <button type="button"
                    className="w-full bg-red-700 px-3 py-2 text-center text-xs font-medium text-white hover:bg-red-800 focus:ring-4 focus:ring-red-300 focus:outline-none dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800"
                    onClick={resetCollection}
            >
              Reset
            </button>
          </li>
        </ul>
      </div>
      <div className="col-span-3 border border-gray-500 p-2">
        {activeContainer === "text" && <div className="w-full bg-gray-100">
            <pre>{text}</pre>
        </div>}
        {activeContainer === "new" && tableName == "world" && <NewWorldForm handleSubmit={handleNewSubmit} />}
      </div>
    </div>
  )
}


interface NewWorldFormProps {
  handleSubmit: (data: any) => void;
}

function NewWorldForm({ handleSubmit }: NewWorldFormProps) {
  const [name, setName] = useState("");

  const onSubmit = () => {
    handleSubmit({name});
  }

  return (
    <div>
      <label htmlFor="world-name">World Name</label>
      <input id="world-name" type="text" onChange={e => setName(e.target.value)} />
      <button onClick={onSubmit}>Submit</button>
    </div>
  )
}
