import './global-header-styles.css'
import { iconStringMap } from '~/components/icons/index'
import {NavLink, useLocation} from "react-router";
import React from 'react';

interface NavItem {
  url: string;
  label: string;
  icon?: keyof typeof iconStringMap;
}

export default function GlobalHeader() {

  const worldNavItems: NavItem[] = [
    {label: "Home", url: "/worlds/home", icon: "home"},
    {label: "Explore Universe", url: "/worlds/explore", icon: "globe_alt"},
    {label: "Help", url: "/worlds/help"},
  ]

  const storyNavItems: NavItem[] = [
    {label: "Home",  url: "/stories/home"},
    {label: "Browse", url: "/stories/browse"},
    {label: "Help", url: "/stories/help"},
  ]

  const { pathname } = useLocation();
  let navItems: NavItem[] = [];
  if (pathname.startsWith("/worlds")) {
    navItems = worldNavItems;
  }
  if (pathname.startsWith("/stories")) {
    navItems = storyNavItems;
  }

  return (
    <header className={"global-header"}>
      <div className={"logo"}>Scribbli :: Worlds</div>

      <nav className="site-nav">
        {navItems.map(navItem => {
          return (
            <NavLink to={navItem.url} key={navItem.url} className={"flex items-center text-sm font-medium px-3 py-2"}>
              {navItem.icon !== undefined ? React.createElement(iconStringMap[navItem.icon], {sizeClass:"size-5"}) : ''} {navItem.label}
            </NavLink>
          )
        })}
      </nav>

      <nav className="user-menu">
        <button className="dark-mode-toggle" title={"Toggle Dark Mode"}>◐</button>
        <a href="#" className="btn">Export</a>
        <a href="#" className="btn">Settings</a>
        <a href="#" className="btn btn-primary">Export</a>
      </nav>
    </header>
  )
}