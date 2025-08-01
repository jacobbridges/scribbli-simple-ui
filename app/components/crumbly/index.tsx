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

export interface CrumblyProps extends ComponentProps<"nav"> {
  // The last item in the array should be the current page.
  crumbs: Crumb[];
}

export default function Crumbly({ crumbs, ...navProps }: CrumblyProps) {
  const renderCrumbItem = (crumb: Crumb, isLast: boolean, isClickable: boolean = true) => (
    <BreadcrumbItem key={crumb.title}>
      {isClickable && !isLast ? (
        <BreadcrumbLink asChild>
          <Link to={crumb.to}>{crumb.title}</Link>
        </BreadcrumbLink>
      ) : (
        crumb.title
      )}
    </BreadcrumbItem>
  );

  const renderCollapsedItems = () => (
    <>
      <BreadcrumbSeparator />
      <BreadcrumbItem>
        <DropdownMenu>
          <DropdownMenuTrigger className="flex items-center gap-1">
            <BreadcrumbEllipsis className="size-4" />
            <span className="sr-only">Toggle menu</span>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="start">
            {crumbs.slice(1, -1).map((crumb) => (
              <DropdownMenuItem key={crumb.title}>
                <Link to={crumb.to}>{crumb.title}</Link>
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </BreadcrumbItem>
    </>
  );

  const renderBreadcrumbs = () => {
    const [firstCrumb, ...restCrumbs] = crumbs;
    const lastCrumb = restCrumbs[restCrumbs.length - 1];
    const middleCrumbs = restCrumbs.slice(0, -1);

    return (
      <>
        {/* First crumb - always shown */}
        {renderCrumbItem(firstCrumb, crumbs.length === 1)}

        {/* Handle middle crumbs based on total count */}
        {crumbs.length > 3 ? (
          // Show collapsed dropdown for 4+ crumbs
          renderCollapsedItems()
        ) : crumbs.length === 3 ? (
          // Show middle crumb directly for exactly 3 crumbs
          <>
            <BreadcrumbSeparator />
            {renderCrumbItem(middleCrumbs[0], false)}
          </>
        ) : null}

        {/* Last crumb - always non-clickable current page */}
        {crumbs.length > 1 && (
          <>
            <BreadcrumbSeparator />
            {renderCrumbItem(lastCrumb, true, false)}
          </>
        )}
      </>
    );
  };

  return (
    <Breadcrumb {...navProps}>
      <BreadcrumbList>
        {renderBreadcrumbs()}
      </BreadcrumbList>
    </Breadcrumb>
  );
}
