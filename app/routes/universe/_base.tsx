import {Outlet} from 'react-router';
import NeroLayoutWithContext from "~/layouts/nero/with-context";


export default function UniverseBase() {

  return (
    <NeroLayoutWithContext>
      <Outlet />
    </NeroLayoutWithContext>
  );
}
