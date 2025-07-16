import { Outlet } from 'react-router';

import GlobalHeader from "~/components/global-header/global-header";
import LeftSidebar from "~/components/left-sidebar/left-sidebar";

export default function UniverseRoute() {
    return (
      <>
          <GlobalHeader></GlobalHeader>

          <div className="main-container">
              <LeftSidebar></LeftSidebar>

              <Outlet />
          </div>
      </>
    )
}
