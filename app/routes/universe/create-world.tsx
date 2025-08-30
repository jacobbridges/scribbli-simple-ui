import type { World } from "~/types"

import { useLayoutEffect } from "react"

import { useLayout } from "~/contexts/layout-context";
import WorldCreateForm from "~/routes/(shared)/world-create-form";

interface WorldCreateInput {
  name: string;
  access: 'owner' | 'shared' | 'public';
  tags: string[];
  description: string;
}

export default function UniverseCreateWorldRoute() {

  const {setPageTitle, setPromotion, setCrumbs} = useLayout();
  useLayoutEffect(() => {
    setPageTitle("Create New World");
    setPromotion(<></>);
    setCrumbs([
      {title: "Universe", to: "/universe"},
      {title: "Create New World", to: "/universe/create-world"},
    ])
  }, []);

  const onSubmit = (data) => {
    console.log(data);
  }

  return (
    <>
      <div className="flex-grow-1 flex-col">

        <div className="w-400px max-w-2xl p-6">
          <WorldCreateForm onSubmit={onSubmit}/>
        </div>
      </div>
    </>
  )
}