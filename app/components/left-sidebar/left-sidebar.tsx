import React, { useState } from 'react';
import type { World } from '~/types.ts';
import { GlobeIcon, ChevronDownIcon, BookOpenIcon } from '~/components/icons/index';
import './left-sidebar-styles.css'

const LeftSidebar1 = ({ view, setView, world, onDeselectWorld }: { view: 'Worlds' | 'Stories', setView: (v: 'Worlds' | 'Stories') => void, world: World | null, onDeselectWorld: () => void }) => {
  const isWorlds = view === 'Worlds';
  const [openSections, setOpenSections] = useState({ encyclopedia: true, tools: true });

  const worldSpecificNav = {
    overview: [{ name: 'World Map' }, { name: 'Timeline' }, { name: 'Graph View' }],
    encyclopedia: { name: 'Encyclopedia', children: [{ name: 'Characters' }, { name: 'Locations' }, { name: 'Organizations' }, { name: 'Artifacts' }, { name: 'Events' }] },
    tools: { name: 'Tools', children: [{ name: 'Story Integration' }, { name: 'Name Generator' }, { name: 'Random Tables' }] }
  };

  const storiesNav = [{ name: 'My Stories' }, { name: 'Discover' }, { name: 'Character Vault' }];

  const NavItem = ({ item }: { item: any }) => (
    <li
      onClick={item.action}
      className={`font-semibold text-sm rounded-md cursor-pointer ${item.name === 'Characters' && world ? 'bg-blue-100 text-blue-700' : 'text-gray-700 hover:bg-gray-200'}`}
    >
      <a className="block p-2">{item.name}</a>
    </li>
  );

  return (
    <div className="w-64 bg-white border-r border-gray-200 p-4 flex flex-col shrink-0">
      <div className="px-2 mb-2">
        <h1 className="font-serif text-xl font-bold mb-1 truncate">{world?.name ?? "WORLDFORGE"}</h1>
        {isWorlds && world && <p className="text-xs text-gray-500">Last edited {world.lastEdited}</p>}
      </div>

      <div className="bg-gray-100 rounded-lg p-1 flex my-4">
        <button onClick={() => setView('Worlds')} className={`w-1/2 rounded-md py-1.5 text-sm font-semibold flex items-center justify-center gap-2 transition-colors ${isWorlds ? 'bg-white shadow text-gray-900' : 'text-gray-600 hover:bg-gray-200'}`}><GlobeIcon /> Worlds</button>
        <button onClick={() => setView('Stories')} className={`w-1/2 rounded-md py-1.5 text-sm font-semibold flex items-center justify-center gap-2 transition-colors ${!isWorlds ? 'bg-white shadow text-gray-900' : 'text-gray-600 hover:bg-gray-200'}`}><BookOpenIcon /> Stories</button>
      </div>

      <nav className="flex-1 space-y-4 overflow-y-auto">
        {isWorlds ? (
          <div>
            {world ? (
              <>
                <h3 className="px-2 text-xs font-bold text-gray-500 uppercase tracking-wider">Overview</h3>
                <ul className="space-y-1 mt-2">
                  <NavItem key="dashboard-back" item={{ name: 'Dashboard', action: onDeselectWorld }} />
                  {worldSpecificNav.overview.map(item => <NavItem key={item.name} item={item} />)}
                </ul>

                <h3 className="px-2 mt-4 text-xs font-bold text-gray-500 uppercase tracking-wider flex justify-between items-center cursor-pointer" onClick={() => setOpenSections(s => ({...s, encyclopedia: !s.encyclopedia}))}>
                  <span>{worldSpecificNav.encyclopedia.name}</span>
                  <ChevronDownIcon />
                </h3>
                {openSections.encyclopedia && (
                  <ul className="space-y-1 mt-2">
                    {worldSpecificNav.encyclopedia.children.map(item => <NavItem key={item.name} item={item} />)}
                  </ul>
                )}

                <h3 className="px-2 mt-4 text-xs font-bold text-gray-500 uppercase tracking-wider flex justify-between items-center cursor-pointer" onClick={() => setOpenSections(s => ({...s, tools: !s.tools}))}>
                  <span>{worldSpecificNav.tools.name}</span>
                  <ChevronDownIcon />
                </h3>
                {openSections.tools && (
                  <ul className="space-y-1 mt-2">
                    {worldSpecificNav.tools.children.map(item => <NavItem key={item.name} item={item} />)}
                  </ul>
                )}
              </>
            ) : (
              <>
                <h3 className="px-2 text-xs font-bold text-gray-500 uppercase tracking-wider">Universe</h3>
                <ul className="space-y-1 mt-2">
                  <li className="font-semibold text-sm rounded-md bg-blue-100 text-blue-700">
                    <a className="block p-2">Dashboard</a>
                  </li>
                  <li className="font-semibold text-sm rounded-md cursor-pointer text-gray-700 hover:bg-gray-200">
                    <a className="block p-2">Create New World</a>
                  </li>
                </ul>
              </>
            )}
          </div>
        ) : (
          <ul className="space-y-1">{storiesNav.map(item => <NavItem key={item.name} item={item} />)}</ul>
        )}
      </nav>
    </div>
  );
};


const LeftSidebar = () => {
  return (
    <aside className={"sidebar"}>

      <div className="sidebar-section world-selector">
        <div className="world-name">The Shattered Realm</div>
        <div className="world-status">Last edited 2 hours ago</div>
      </div>

      <div className="sidebar-section">
        <h3 className="sidebar-title">Overview</h3>
        <a href="#" className="nav-item active">Dashboard</a>
        <a href="#" className="nav-item">World Map</a>
        <a href="#" className="nav-item">Timeline</a>
        <a href="#" className="nav-item">Graph View</a>
      </div>

      <div className="sidebar-section">
        <h3 className="sidebar-title">Archives</h3>
        <a href="#" className="nav-item">Characters</a>
        <a href="#" className="nav-item">Locations</a>
        <a href="#" className="nav-item">Organizations</a>
        <a href="#" className="nav-item">Artifacts</a>
        <a href="#" className="nav-item">Events</a>
      </div>

      <div className="sidebar-section">
        <h3 className="sidebar-title">Tools</h3>
        <a href="#" className="nav-item">Story Integration</a>
        <a href="#" className="nav-item">Name Generator</a>
        <a href="#" className="nav-item">Random Tables</a>
        <a href="#" className="nav-item">Import/Export</a>
      </div>

    </aside>
  )
};


export default LeftSidebar;























