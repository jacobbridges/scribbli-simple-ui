import type {PropsWithChildren, ReactNode, ComponentProps} from "react";

export interface NeroLayoutProps
  extends ComponentProps<"div"> {
  leftSidebar: ReactNode;
  globalNavBar: ReactNode;
  regionalNavBar: ReactNode;
}

export default function NeroLayout(props: NeroLayoutProps) {
  return (
    <NeroBFD>
      <NeroLeftSidebarContainer>{props.leftSidebar}</NeroLeftSidebarContainer>
      <NeroRightContentContainer>
        <NeroGlobalNavBarContainer>{props.globalNavBar}</NeroGlobalNavBarContainer>
        <NeroRegionalNavBarContainer>{props.regionalNavBar}</NeroRegionalNavBarContainer>
        <NeroMainContentContainer>{props.children}</NeroMainContentContainer>
      </NeroRightContentContainer>
    </NeroBFD>
  )
}

export function NeroBFD(props: PropsWithChildren) {
  return (
    <div className="flex justify-center bg-gray-700">
      <div
        id="bfd"
        className="flex h-screen w-full overflow-hidden border border-gray-200 bg-white font-serif shadow-xl"
      >
        {props.children}
      </div>
    </div>
  )
}

export function NeroLeftSidebarContainer(props: PropsWithChildren) {
  return (
    <div
      id="left-sidebar"
      className="min-w-[200px] md:min-w-[280px]"
    >
      {props.children}
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
  return (
    <div
      id="global-nav-bar"
      className="w-full border-b-2 border-b-gray-600"
    >
      <div className="relative flex w-full items-center px-6 py-5">
        {props.children}
      </div>
    </div>
  )
}

export function NeroRegionalNavBarContainer(props: PropsWithChildren) {
  return (
    <div
      id="regional-nav-bar"
      className="w-full border-b border-b-gray-200"
    >
      <div className="relative flex w-full items-center px-6 py-2">
        {props.children}
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