import type { Route } from "./+types/universe-world-detail";
import type { World } from "~/types";

import { useLayoutEffect } from "react";

import { useLayout } from "~/contexts/layout-context";
import SimplePromotionalText from "~/components/simple-promotional-text";
import {
  IconUsers,
  IconMapPin,
  IconBookOpen,
  IconScrollText,
} from "~/components/icons";
import { apiMock } from "~/services/api/client";


export async function clientLoader({ params }: Route.ClientLoaderArgs) {
  try {
    const response = await apiMock.getById("world", params.worldId);

    if (response.success && response.data) {
      const world: World = response.data as World;
      return { world, error: null };
    } else {
      return { world: null, error: response.error || 'Failed to load world.' };
    }
  } catch (err) {
    console.error(err);
    return { world: null, error: 'An unexpected error occurred' };
  }
}

export default function UniverseWorldDetail({ loaderData }: Route.ComponentProps) {

  if (loaderData.error)
    return (
      <div>{loaderData.error}</div>
    )

  const { world } = loaderData;
  const {setPageTitle, setPromotion, setCrumbs} = useLayout();
  useLayoutEffect(() => {
    setPageTitle(world?.name || "Not Found");
    setPromotion((
      <SimplePromotionalText text="Promotional text about something happening right now!" linkTo="#" />
    ));
    setCrumbs(
      world
        ? [
            {title: "Universe", to: "/universe"},
            {title: world.name, to: `/universe/world/${world.id}`},
            {title: "Overview", to: ""},
        ]
        : [
          {title: "Universe", to: "/universe"},
          {title: "404", to: ""},
        ]
    );
  }, [world]);

  return (
    <div className="flex bg-gray-50">
      {world
        ? <MainContent world={world} />
        : <div>No world matching that id.</div>
      }
    </div>
  )

}


type MainContentProps = {
  world: World;
}

function MainContent({ world }: MainContentProps) {

  // TODO (model): Design a data model for world stats.
  // TODO (api): Create an API endpoint which loads stats for a world.
  // TODO (page): Load world stats with clientLoader.
  const worldStats = [
    { name: "Characters", value: 142, icon: 'IconUsers' },
    { name: "Locations", value: 89, icon: 'IconMapPin' },
    { name: "Stories", value: 12, icon: 'IconBookOpen' },
    { name: "Codex Pages", value: 478, icon: 'IconScrollText' },
  ];

  // TODO (model): Design a data model for codex pages.
  // TODO (api): Create an API endpoint which lists recently active codex pages for a world.
  // TODO (page): Load the list of recently active codex pages with clientLoader.
  const recentCodexPages = [
    { title: "The Sundering", category: "Event", updated: "2 hours ago" },
    { title: "Aeridor, the Sky-Capital", category: "Location", updated: "5 hours ago" },
    { title: "Shadow Stalkers", category: "Fauna", updated: "1 day ago" },
    { title: "Lyra Blackthorn", category: "Character", updated: "2 days ago" },
    { title: "The Sunfire Blade", category: "Artifact", updated: "3 days ago" },
  ];

  // TODO (model): Design a data model for stories.
  // TODO (api): Create an API endpoint which lists recently active stories for a world.
  // TODO (page): Load the list of recently active stories with clientLoader.
  const activeStories = [
    { title: "The Fall of Valdris", participants: 5, lastPost: "15 minutes ago" },
    { title: "Whispers in the Wastes", participants: 3, lastPost: "1 hour ago" },
    { title: "The Sunken City's Secret", participants: 4, lastPost: "8 hours ago" },
  ];

  const StatIcon = ({ name }: { name: string }) => {
    const iconProps = { className: "h-6 w-6" };
    switch (name) {
      case 'IconUsers': return <IconUsers {...iconProps} />;
      case 'IconMapPin': return <IconMapPin {...iconProps} />;
      case 'IconBookOpen': return <IconBookOpen {...iconProps} />;
      case 'IconScrollText': return <IconScrollText {...iconProps} />;
      default: return null;
    }
  };

  return (
    <>
      <div className="flex-1 p-8">
        {/* World Description */}
        <section className="bg-white p-6 rounded-lg border border-gray-200 mb-8 shadow-xs">
          <h2 className="font-serif text-2xl font-bold text-gray-900 mb-2">Welcome to {world.name}</h2>
          <p className="text-gray-600 leading-relaxed">{world.summary}</p>
        </section>

        {/* Stats */}
        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {worldStats.map(stat => (
            <div key={stat.name} className="bg-white p-5 rounded-lg border border-gray-200 flex items-center space-x-4 shadow-xs">
              <div className="bg-blue-100 text-blue-600 p-3 rounded-full">
                <StatIcon name={stat.icon} />
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                <p className="text-sm font-medium text-gray-500">{stat.name}</p>
              </div>
            </div>
          ))}
        </section>

        {/* Recent Codex Updates */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <section>
            <h3 className="font-serif text-xl font-bold text-gray-800 mb-4">Recent Codex Activity</h3>
            <div className="bg-white rounded-lg border border-gray-200 shadow-xs">
              <ul className="divide-y divide-gray-200">
                {recentCodexPages.map((article, index) => (
                  <li key={article.title} className={`p-4 flex justify-between items-center hover:bg-gray-50 ${index === 0 ? 'rounded-t-lg' : ''} ${index === recentCodexPages.length - 1 ? 'rounded-b-lg' : ''}`}>
                    <div>
                      <p className="font-semibold text-blue-600 hover:underline cursor-pointer">{article.title}</p>
                      <p className="text-xs text-gray-500 uppercase tracking-wider">{article.category}</p>
                    </div>
                    <p className="text-sm text-gray-500 shrink-0 ml-4">{article.updated}</p>
                  </li>
                ))}
              </ul>
            </div>
          </section>

          {/* Active Stories */}
          <section>
            <h3 className="font-serif text-xl font-bold text-gray-800 mb-4">Active Stories</h3>
            <div className="bg-white rounded-lg border border-gray-200 shadow-xs">
              <ul className="divide-y divide-gray-200">
                {activeStories.map((story, index) => (
                  <li key={story.title} className={`p-4 flex justify-between items-center hover:bg-gray-50 ${index === 0 ? 'rounded-t-lg' : ''} ${index === activeStories.length - 1 ? 'rounded-b-lg' : ''}`}>
                    <div>
                      <p className="font-semibold text-blue-600 hover:underline cursor-pointer">{story.title}</p>
                      <p className="text-sm text-gray-500">{story.participants} participants</p>
                    </div>
                    <p className="text-sm text-gray-500 shrink-0 ml-4">{story.lastPost}</p>
                  </li>
                ))}
              </ul>
            </div>
          </section>
        </div>
      </div>
      <div className="pt-8 pr-8 shrink-0">
        <div className="bg-white rounded-lg border border-gray-200 shadow-xs">
          <RightSidebar />
        </div>
      </div>
    </>
  )

}


const RightSidebar = () => (
  <div className="w-80 p-6 flex flex-col min-h-64">
    {/*<div className="flex border-b border-gray-200 mb-4">*/}
    {/*  <button className="flex-1 p-2 text-sm font-bold border-b-2 border-blue-600 text-blue-600">Search</button>*/}
    {/*  <button className="flex-1 p-2 text-sm font-bold text-gray-500 hover:text-gray-800">AI Assistant</button>*/}
    {/*</div>*/}
    <div>
      <h4 className="font-serif font-bold mb-2">Codex Search</h4>
      <input type="text" placeholder="Search for 'the Heart'..." className="w-full border border-gray-300 rounded-md px-2 py-1.5 mb-4 text-sm" />
      <ul className="space-y-1 text-sm">
        <li className="p-2 flex gap-[1rem] justify-between items-center hover:bg-gray-50 rounded-t-lg">
          <span className="font-bold text-blue-600 hover:underline cursor-pointer">The Dragon's Heart</span>
          <span className="text-xs text-gray-500 uppercase tracking-wider">Artifact</span>
        </li>
        <li className="p-2 flex gap-[1rem] justify-between items-center hover:bg-gray-50">
          <span className="font-bold text-blue-600 hover:underline cursor-pointer">Jim, the guy with a ridiculously long name for testing the UI</span>
          <span className="text-xs text-gray-500 uppercase tracking-wider">Figure</span>
        </li>
        <li className="p-2 flex gap-[1rem] justify-between items-center hover:bg-gray-50 rounded-b-lg">
          <span className="font-bold text-blue-600 hover:underline cursor-pointer">Heart of the Mountain</span>
          <span className="text-xs text-gray-500 uppercase tracking-wider">Location</span>
        </li>
      </ul>
    </div>
  </div>
);
