import type {Route} from "../../../.react-router/types/app/routes/universe/+types";
import type {World} from "~/types";

import {useEffect, useState} from "react";

import { apiMock } from "~/services/api/client";
import WorldTile from "~/components/world-tile/world-tile";
import Sidebar, {type SidebarNavSection} from "~/components/sidebar-augustus/sidebar-augustus"
import {GlobeAltIcon, SearchIcon} from "~/components/icons";
import {Link} from "react-router";


export async function clientLoader(args: Route.ClientLoaderArgs) {
  // const res = await apiMock.getAll("world", {limit: 10});
  return loadFakeWorlds();
}

export default function UniverseIndexRoute(args: Route.ComponentProps) {

  const [worlds, setWorlds] = useState<World[]>(args.loaderData as World[]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>('');

  // useEffect(() => {
  //   // loadWorlds();
  //
  //   const throttleTimer = setTimeout(() => {
  //     setWorlds(loadFakeWorlds().filter(world => !searchQuery ? true : world.name.toLowerCase().includes(searchQuery.toLowerCase())));
  //   }, 600);
  //
  //   return () => {
  //     clearTimeout(throttleTimer);
  //   }
  // }, [searchQuery])

  const loadWorlds = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await apiMock.getAll('worlds', {
        sortBy: 'name',
        sortOrder: 'asc',
      });

      if (response.success && response.data) {
        setWorlds(response.data as World[]);
      } else {
        setError(response.error || 'Failed to load users');
      }
    } catch (err) {
      setError('An unexpected error occurred');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-lg">Loading worlds...</div>
      </div>
    );
  }

  return (
    <>
      <LeftSidebar searchQuery={searchQuery} onSearchInput={setSearchQuery} />
      <MainContent isLoading={loading} worlds={worlds} error={error} />
    </>
  )
}


type LeftSidebarProps = {
  onSearchInput: (query: string) => void;
  searchQuery: string;
}

function LeftSidebar(props: LeftSidebarProps) {

  const sections: SidebarNavSection[] = [
    {
      title: "Section",
      items: [
        {
          title: "Yay",
          url: "#",
        },
        {
          title: "Nay",
          url: "#",
        }
      ]
    }
  ]

  const searchComponent = (
    <div className="relative mt-4 max-w-lg">
      <input
        type="text"
        placeholder="Search "
        value={props.searchQuery}
        onChange={e => props.onSearchInput(e.target.value)}
        className={"w-full border text-sm py-2 pl-8 pr-4 focus:ring-1 focus:outline-none"}
      />
      <SearchIcon className={"absolute left-2 top-1/2 -translate-y-1/2 w-5 h-5 text-brand-text-dim"}/>
    </div>
  )

  const createWorldButton = (
    <div className="relative mt-4 max-w-lg">
      <Link type="button"
            className="w-full text-white bg-[#050708] hover:bg-[#050708]/80 focus:ring-4 focus:outline-none hover:cursor-pointer focus:ring-[#050708]/50 font-medium text-sm px-5 py-2.5 text-center inline-flex items-center justify-evenly dark:hover:bg-[#050708]/40 dark:focus:ring-gray-600"
            to={"create-world"}
      >
        <GlobeAltIcon />
        Create New World
      </Link>
    </div>
  )

  return (
    <Sidebar title={"Universe"}
             sections={sections}
             topActionSection={searchComponent}
             lowActionSection={createWorldButton}
    ></Sidebar>
  )
}


type MainContentProps = {
  isLoading: boolean;
  worlds: World[];
  error: string | null;
}

function MainContent(props: MainContentProps) {

  if (props.error)
    return (
      <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
        {props.error}
      </div>
    );

  if (props.isLoading)
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-lg">Loading worlds...</div>
      </div>
    );

  const { worlds } = props;
  return (
    <div className="p-6 flex-1">

      {/*<h2 className={"text-4xl font-bold dark:text-white"}>Worlds</h2>*/}

      {worlds.length === 0 ? (
        <div className="text-gray-500">
          You stare at an empty universe. Create the first world.
        </div>
      ) : (
        <div className={"grid grid-cols-3 gap-4 justify-items-start"}>
          {worlds.map((world: World) => (
            <WorldTile world={world} key={world.id} />
          ))}
        </div>
      )}
    </div>
  )
}

function loadFakeWorlds(): World[] {
  return [
    {
      id: '1',
      name: 'Aetherville',
      authorName: 'Gruff McDwarf',
      lastEdited: (new Date()).toDateString(),
      access: 'public',
      tags: ['high-fantasy'],
      description: 'Vel dolorum galisum vel sunt voluptatem in quaerat dolor hic doloremque voluptatem. Hic optio possimus eos consequatur aperiam aut nulla doloremque sit assumenda galisum et optio dolor.',
    },
    {
      id: '2',
      name: 'New Jersey',
      authorName: 'GingerTea',
      lastEdited: (new Date()).toDateString(),
      access: 'public',
      tags: ['real-life', '18+'],
      description: 'Est asperiores commodi ut ullam reprehenderit eum culpa nobis ut odio dicta. Eos animi optio a placeat dolores qui totam galisum. Sed culpa quisquam eos reprehenderit provident aut maxime consequuntur.',
    },
    {
      id: '3',
      name: 'Tatooine',
      authorName: 'Nivix Zixer',
      lastEdited: (new Date()).toDateString(),
      access: 'public',
      tags: ['sci-fi'],
      description: 'Et asperiores beatae cum adipisci provident nam molestias voluptas quo consequatur ipsam quo quia quos. Hic similique nulla ut ullam ipsum ut totam cupiditate ut omnis architecto vel fugiat provident.',
    },
    {
      id: '4',
      name: 'Earth-8CG',
      authorName: 'hmmTUBMAN',
      lastEdited: (new Date()).toDateString(),
      access: 'public',
      tags: ['sci-fi', 'grim'],
      description: 'Aut beatae recusandae qui rerum vitae et galisum repudiandae eum vitae ullam eos dicta nihil et tempora porro. Est repellendus omnis cum similique enim qui dolorum enim eos soluta magni. Sit voluptatem ipsa eos architecto nostrum vel molestiae voluptate. Vel dolorum voluptatibus ut expedita optio est magnam voluptas est modi quas et ipsa architecto ut laboriosam officia.',
    },
  ]
}
