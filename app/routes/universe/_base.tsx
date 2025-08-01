import {Outlet} from 'react-router';

import GlobalHeader from "~/components/global-header/global-header";

export default function UniverseRoute() {
  return (
    <>
      <GlobalHeader></GlobalHeader>

      <div className="main-container">
        <Outlet />
      </div>
    </>
  )
}
