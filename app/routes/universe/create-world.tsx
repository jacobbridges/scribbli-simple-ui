import React, { useState, useLayoutEffect } from "react"
import { useNavigate } from "react-router";
import { debounce } from "lodash";

import { useLayout } from "~/contexts/layout-context";
import WorldCreateForm from "~/routes/(shared)/world-create-form";
import { apiMock } from "~/services/api/client";
import WorldTile from "~/components/world-tile/world-tile";

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

  return (
    <MainContent />
  )
}


function MainContent() {
  const navigate = useNavigate();
  const [formData,  setFormData] = useState()

  const onSubmit = (data) => {
    apiMock
      .create("world", data)
      .then((response) => navigate(`/universe/world/${response.data.id}`))
      .catch((err) => console.error(err));
  }
  const onChange = debounce((data) => {
    console.log(data);
    setFormData(data);
  }, 300);

  return (
    <>
      <div className="flex gap-10 p-6">
        <div className="block w-xl">
          <WorldCreateForm onSubmit={onSubmit} onChange={onChange}/>
        </div>
        <div className="block min-w-[400px]">
          <h2 className="text-xl font-bold mb-2">How your world will look in the world list:</h2>
          {formData?.name ? <WorldTile world={formData} /> : <></>}
        </div>
      </div>
    </>
  )
}