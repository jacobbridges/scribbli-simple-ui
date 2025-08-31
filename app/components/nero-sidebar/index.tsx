import type {ReactNode} from "react";
import {OpenSidebarIcon} from "~/components/icons";

export type SidebarNavItem = {
  title: string;
  url: string;
  active?: boolean;
}

export type SidebarNavSection = {
  title: string;
  items: SidebarNavItem[];
  highlight?: boolean;
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
        <div className="border-b-2 border-b-gray-300 text-xl font-bold h-[74px] flex items-center justify-center gap-2 font-serif">
          <span>Scribbli</span>
          <span>::</span>
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
    highlight = false,
  } = props;

  return (
    <div className={`pt-6 ${highlight && "bg-purple-50"}`}>
      <div className={`px-5 pb-3 text-base font-light tracking-wider text-gray-500 uppercase`}>
        <span>{title}</span>
      </div>
      <div className={`text-gray-700`}>
        <ul>
          {items.map((item, index) => (
            <li
              key={item.title}
              className="w-full"
            >
              <a
                href={item.url}
                className={`relative block px-5 py-2 font-medium cursor-pointer ${item.active ? 'bg-blue-100 text-blue-700' : 'text-gray-700 hover:bg-gray-100 hover:text-gray-800'} duration-300 ease-linear`}
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