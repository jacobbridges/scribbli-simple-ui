import type {PropsWithChildren, ReactNode, ComponentProps} from "react";

import {LayoutProvider, useLayout} from "~/contexts/layout-context";
import NeroSidebar from "~/components/nero-sidebar";
import NeroGlobalNav from "~/components/nero-global-nav";
import NeroRegionalNav from "~/components/nero-regional-nav";


export interface NeroLayoutProps
  extends ComponentProps<"div"> {
}

export default function NeroLayoutWithContext(props: NeroLayoutProps) {

  const leftSidebarSections = [
    {
      title: "General",
      items: [
        {url: "universe", title: "Universe"},
        {url: "help", title: "Help"},
        {url: "talk", title: "Talk"},
      ],
    },
  ];

  return (
    <LayoutProvider defaultLeftSidebarSections={leftSidebarSections}>
      <NeroBFD>
        <NeroLeftSidebarContainer />
        <NeroRightContentContainer>
          <NeroGlobalNavBarContainer />
          <NeroRegionalNavBarContainer />
          <NeroMainContentContainer>{props.children}</NeroMainContentContainer>
        </NeroRightContentContainer>
      </NeroBFD>
    </LayoutProvider>
  )
}

export function NeroBFD(props: PropsWithChildren) {
  return (
    <div className="flex justify-center bg-gray-700">
      <div
        id="bfd"
        className="flex h-screen w-full overflow-hidden border border-gray-200 bg-white shadow-xl"
      >
        {props.children}
      </div>
    </div>
  )
}

export function NeroLeftSidebarContainer(props: PropsWithChildren) {
  const { leftSidebarSections } = useLayout();
  return (
    <div
      id="left-sidebar"
      className="w-64"
    >
      {/*TODO: Make activeSubsite a variable that is passed in.*/}
      <NeroSidebar activeSubsite="universe" sections={leftSidebarSections} />
    </div>
  )
}

export function NeroRightContentContainer(props: PropsWithChildren) {
  return (
    <div id="right-content-container" className="flex grow flex-col">
      {props.children}
    </div>
  )
}

export function NeroGlobalNavBarContainer(props: PropsWithChildren) {
  const { pageTitle } = useLayout();
  return (
    <div
      id="global-nav-bar"
      className="w-full border-b-2 border-b-gray-600"
    >
      <div className="relative flex w-full items-center px-6 py-5">
        <NeroGlobalNav pageTitle={pageTitle} />
      </div>
    </div>
  )
}

export function NeroRegionalNavBarContainer(props: PropsWithChildren) {
  const { promotion, crumbs } = useLayout();
  return (
    <div
      id="regional-nav-bar"
      className="w-full border-b border-b-gray-200"
    >
      <div className="relative flex w-full items-center px-6 py-2">
        <NeroRegionalNav crumbs={crumbs} promotion={promotion} />
      </div>
    </div>
  )
}

export function NeroMainContentContainer(props: PropsWithChildren) {
  return (
    <div
      id="main-content"
      className="h-full w-full overflow-y-scroll"
    >
      {props.children}
    </div>
  )
}