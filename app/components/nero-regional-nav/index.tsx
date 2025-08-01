import type {ComponentProps, ReactNode} from "react";
import type {Crumb} from "~/components/crumbly";

import Crumbly from "~/components/crumbly";


export interface RegionalNavProps
  extends ComponentProps<"div"> {
  crumbs: Crumb[];
  promotion?: ReactNode;
}

export default function NeroRegionalNav(props: RegionalNavProps) {
  const {crumbs, promotion} = props;

  return (
    <>
      <Crumbly crumbs={crumbs} />
      <div className="flex grow justify-end">
        {promotion}
      </div>
    </>
  )
}