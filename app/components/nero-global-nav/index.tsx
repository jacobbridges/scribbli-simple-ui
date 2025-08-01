import type {ComponentProps, ReactNode} from "react";
import type {User} from "~/types";

export interface GlobalNavProps
  extends ComponentProps<"div"> {
  pageTitle: string;
  user?: User;
}

export default function NeroGlobalNav(props: GlobalNavProps) {
  const { pageTitle, user } = props;

  const userComponent = user
    ? (
      <>
        <div className="text-sm font-semibold">Nivix Zixer</div>
        <div className="text-sm font-light tracking-wider">Profile</div>
      </>
    )
    : (
      <>
        <div className="text-sm font-light tracking-wider self-center justify-self-center grow pt-[6px]">
          <a href="#">Sign In</a>
        </div>
      </>
    )

  return (
    <>
      <div>
        <h1 className="text-2xl font-bold tracking-wider">{pageTitle}</h1>
      </div>
      <div className="flex grow justify-end gap-4">
        <div className="flex items-center text-gray-600">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
               stroke="currentColor" className="size-7">
            <path stroke-linecap="round" stroke-linejoin="round"
                  d="M14.857 17.082a23.848 23.848 0 0 0 5.454-1.31A8.967 8.967 0 0 1 18 9.75V9A6 6 0 0 0 6 9v.75a8.967 8.967 0 0 1-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 0 1-5.714 0m5.714 0a3 3 0 1 1-5.714 0"/>
          </svg>
        </div>
        <div className="item flex">
          <div className="relative h-8 w-8 overflow-hidden rounded-full bg-gray-100 dark:bg-gray-600">
            <svg className="absolute -left-1 h-8 w-8 text-gray-400" fill="currentColor" viewBox="0 0 15 18"
                 xmlns="http://www.w3.org/2000/svg">
              <path fill-rule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                    clip-rule="evenodd"></path>
            </svg>
          </div>
        </div>
        <div className="flex flex-col">
          {userComponent}
        </div>
      </div>
    </>
  )
}