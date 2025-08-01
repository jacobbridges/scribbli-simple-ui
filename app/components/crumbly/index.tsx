import {type ComponentProps} from "react";

import {Link} from "react-router";
import {
  Breadcrumb,
  BreadcrumbEllipsis,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "~/components/ui/breadcrumb";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "~/components/ui/dropdown-menu";

export interface Crumb {
  title: string;
  to: string;
}

export interface CrumblyProps
  extends ComponentProps<"nav"> {
  // The last item in the array should be the current page.
  crumbs: Crumb[];
}

export default function Crumbly(props: CrumblyProps) {
  const {crumbs} = props;

  return (
    <Breadcrumb>
      <BreadcrumbList>
        <BreadcrumbItem>
          {crumbs.length === 1 ? (
            crumbs[0].title
          ) : (
            <BreadcrumbLink asChild>
              <Link to={crumbs[0].to}>{crumbs[0].title}</Link>
            </BreadcrumbLink>
          )}
        </BreadcrumbItem>
        {crumbs.length > 3 && (
          <>
            <BreadcrumbSeparator/>
            <BreadcrumbItem>
              <DropdownMenu>
                <DropdownMenuTrigger className="flex items-center gap-1">
                  <BreadcrumbEllipsis className="size-4"/>
                  <span className="sr-only">Toggle menu</span>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="start">
                  {crumbs.slice(1, -1).map((crumb) => {
                    return <DropdownMenuItem key={crumb.title}>{crumb.title}</DropdownMenuItem>
                  })}
                </DropdownMenuContent>
              </DropdownMenu>
            </BreadcrumbItem>
          </>
        )}
        {(crumbs.length === 3) && (
          <>
            <BreadcrumbSeparator/>
            <BreadcrumbItem>
              <BreadcrumbLink asChild>
                <Link to={crumbs[1].to}>{crumbs[1].title}</Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
          </>
        )}
        {(crumbs.length > 1) && (
          <>
            <BreadcrumbSeparator/>
            <BreadcrumbItem>
              {crumbs[crumbs.length - 1].title}
            </BreadcrumbItem>
          </>
        )}
      </BreadcrumbList>
    </Breadcrumb>
  )
}
