import React, {type ReactNode, useState} from 'react';
import './sidebar-augustus.css'

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
  title: string;
  sections: SidebarNavSection[];
  subtitle?: string;
  topActionSection?: ReactNode;
  lowActionSection?: ReactNode;
}

const SidebarAugustus = (props: SidebarProps) => {
  const {
    title,
    sections,
    subtitle,
    topActionSection,
    lowActionSection,
  } = props;
  return (
    <aside className="sidebar-augustus flex flex-col">

      {/*Title*/}
      <div className="sidebar-section world-selector">
        <div className="world-name">{ title }</div>
        {subtitle && <div className="world-status">{ subtitle }</div>}
      </div>

      {/*Top Actions*/}
      {topActionSection && <div className="sidebar-section search">
        {topActionSection}
      </div>}

      {/*Navigation Items*/}
        <div className="flex flex-col flex-grow-1">
        {sections.map((section) => (
          <div className="sidebar-section">
            <h3 className="sidebar-title">{section.title}</h3>
            {section.items.map((item) => (
              <a className="nav-item" key={item.url} href={item.url}>{item.title}</a>
            ))}
          </div>
        ))}
      </div>

      {/*Low Actions*/}
      {lowActionSection && <div className="sidebar-section">
        {lowActionSection}
      </div>}

    </aside>
  )
}


export default SidebarAugustus












