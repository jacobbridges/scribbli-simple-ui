import type {ReactNode} from "react";
import {OpenSidebarIcon} from "~/components/icons";

export type SidebarNavItem = {
  title: string;
  url: string;
  isActive?: boolean;
}

export type SidebarNavSection = {
  title: string;
  items: SidebarNavItem[];
}

export type SidebarProps = {
  activeSubsite: string;
  sections: SidebarNavSection[];
}

export default function NeroSidebar(props: SidebarProps) {
  const {activeSubsite, sections} = props;

  let subsiteTitle = "???";
  switch (activeSubsite) {
    case "universe":
      subsiteTitle = "Universe";
      break;
    default:
  }

  return (
    <>
      <div className="h-full w-full border-r border-r-gray-200 bg-white">
        <div className="border-b-2 border-b-gray-300 p-5 text-2xl font-bold">
          <span>Site :: </span>
          <span>{subsiteTitle}</span>
        </div>
        {sections.map((section) => (
          <SidebarSection key={section.title} {...section} />
        ))}
      </div>
    </>
  );
}

function SidebarSection(props: SidebarNavSection) {
  const {
    title,
    items,
  } = props;

  return (
    <div className="pt-6">
      <div className="px-5 pb-3 text-base font-light tracking-wider text-gray-500 uppercase">
        <span>{title}</span>
      </div>
      <div className="text-gray-700">
        <ul>
          {items.map((item, index) => (
            <li
              key={item.title}
              className="w-full"
            >
              <a
                href={item.url}
                className="relative block px-5 py-2 font-medium duration-300 ease-linear hover:cursor-pointer hover:bg-gray-100 hover:text-gray-800"
              >
                <span>{item.title}</span>
              </a>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}