import type {Route} from "../../../.react-router/types/app/routes/universe/+types";
import type {World} from "~/types";

import {useLayoutEffect} from "react";
import {Form, useSearchParams, useNavigation} from "react-router"

import { apiMock } from "~/services/api/client";
import WorldTile from "~/components/world-tile/world-tile";
import {useLayout} from "~/contexts/layout-context";
import SimplePromotionalText from "~/components/simple-promotional-text";
import {cull} from "~/utils";


interface WorldListArgs {
  needle?: string;
  sortBy?: string;
  quickFilters?: string[];
}

export async function clientLoader(args: Route.ClientLoaderArgs) {
  // const res = await apiMock.getAll("world", {limit: 10});
  const url = new URL(args.request.url);
  const needle = url.searchParams.get("needle") || undefined;
  const sortBy = url.searchParams.get("sortBy") || "createdAt";

  const listArgs = cull({needle, sortBy});
  return await searchFakeWorlds(listArgs)
}

export default function UniverseIndexRoute(args: Route.ComponentProps) {

  const {setPageTitle, setPromotion, setCrumbs} = useLayout();
  useLayoutEffect(() => {
    setPageTitle("Worlds");
    setPromotion((
      <SimplePromotionalText text="The Yogg is devouring the Overflowing Expanse.." linkTo="/" />
    ));
    setCrumbs([
      {title: "Universe", to: "/universe"},
    ]);
  }, []);

  const worlds = args.loaderData as World[];
  const navigation = useNavigation();
  const isLoading = navigation.state === 'loading';

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-lg">Loading worlds...</div>
      </div>
    );
  }

  return (
    <div className="flex p-6 gap-6">
      <ListControl />
      <MainContent isLoading={isLoading} worlds={worlds} error={null} />
    </div>
  )
}


function ListControl() {
  const [searchParams] = useSearchParams();
  const currentSort = searchParams.get('sortBy') || 'createdAt';

  return (
    <div className="min-w-[160px]">
      <div className="flex flex-col p-4 border-gray-100 bg-gray-50">
        <Form method="get" action="." className="">
          {/*Search Box*/}
          <div className="flex items-center max-w-sm mx-auto">
            <label htmlFor="default-search"
                   className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">Search</label>
            <div className="relative w-full">
              <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true"
                     xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                  <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                        d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
                </svg>
              </div>
              <input type="search" id="default-search"
                     name="needle"
                     className="block w-full p-1 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                     placeholder="Search worlds"/>
            </div>
            <button type="submit"></button>
            {/*Dedicated search button*/}
            {/*<button type="submit"*/}
            {/*        className="p-1 ms-2 text-sm font-medium text-white bg-blue-700 rounded-lg border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">*/}
            {/*  <svg className="w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none"*/}
            {/*       viewBox="0 0 20 20">*/}
            {/*    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"*/}
            {/*          d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>*/}
            {/*  </svg>*/}
            {/*  <span className="sr-only">Search</span>*/}
            {/*</button>*/}
          </div>

          {/*Filters*/}
          <div className="pt-6 w-full">
            <h3 className="text-xs font-extrabold tracking-tight">Filters</h3>
            <ul>
              <li className="w-full px-5 py-2 hover:cursor-pointer hover:bg-gray-100">My Worlds</li>
              <li className="w-full px-5 py-2 hover:cursor-pointer hover:bg-gray-100">Active Today</li>
            </ul>
          </div>

          {/*Sorts*/}
          <div className="pt-6 w-full">
            <h3 className="text-xs font-extrabold tracking-tight">Order By</h3>
            <ul>
              <SortByListItem label="Newest" name="sortBy" value="createdAt" currentSort={currentSort} />
              <SortByListItem label="Oldest" name="sortBy" value="-createdAt" currentSort={currentSort} />
              <SortByListItem label="Active" name="sortBy" value="lastActive" currentSort={currentSort} />
              <SortByListItem label="Dormant" name="sortBy" value="-lastActive" currentSort={currentSort} />
            </ul>
          </div>
        </Form>
      </div>
    </div>
  )
}


interface SortByListItemProps {
  currentSort: string;
  name: string;
  value: string;
  label: string;
}
function SortByListItem({label, name, value, currentSort}: SortByListItemProps) {
  return (
    <li className="w-full">
      <button
        type="submit"
        name={name}
        value={value}
        disabled={currentSort === value}
        className={`w-full px-5 py-2 text-left ${currentSort === value ? 'underline' : 'hover:cursor-pointer hover:bg-gray-100'}`}
      >
        {label}
      </button>
    </li>
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

  const {worlds} = props;
  return (
    <div className="flex-1">

      {worlds.length === 0 ? (
        <div className="text-gray-500">
          You stare at an empty universe. Create the first world.
        </div>
      ) : (
        <div className={"grid grid-cols-3 gap-4 justify-items-start"}>
          {worlds.map((world: World) => (
            <WorldTile world={world} key={world.id}/>
          ))}
        </div>
      )}
    </div>
  )
}

function loadFakeWorlds(): World[] {
  console.log("loadFakeWorlds called")
  return [
    {
      id: '1',
      name: 'Aetherville',
      authorName: 'Gruff McDwarf',
      lastEdited: (new Date()).toDateString(),
      createdAt: 1241412,
      access: 'public',
      tags: ['high-fantasy'],
      description: 'Vel dolorum galisum vel sunt voluptatem in quaerat dolor hic doloremque voluptatem. Hic optio possimus eos consequatur aperiam aut nulla doloremque sit assumenda galisum et optio dolor.',
    },
    {
      id: '2',
      name: 'New Jersey',
      authorName: 'GingerTea',
      lastEdited: (new Date()).toDateString(),
      createdAt: 125152,
      access: 'public',
      tags: ['real-life', '18+'],
      description: 'Est asperiores commodi ut ullam reprehenderit eum culpa nobis ut odio dicta. Eos animi optio a placeat dolores qui totam galisum. Sed culpa quisquam eos reprehenderit provident aut maxime consequuntur.',
    },
    {
      id: '3',
      name: 'Tatooine',
      authorName: 'Nivix Zixer',
      lastEdited: (new Date()).toDateString(),
      createdAt: 128558,
      access: 'public',
      tags: ['sci-fi'],
      description: 'Et asperiores beatae cum adipisci provident nam molestias voluptas quo consequatur ipsam quo quia quos. Hic similique nulla ut ullam ipsum ut totam cupiditate ut omnis architecto vel fugiat provident.',
    },
    {
      id: '4',
      name: 'Earth-8CG',
      authorName: 'hmmTUBMAN',
      lastEdited: (new Date()).toDateString(),
      createdAt: 12436322,
      access: 'public',
      tags: ['sci-fi', 'grim'],
      description: 'Aut beatae recusandae qui rerum vitae et galisum repudiandae eum vitae ullam eos dicta nihil et tempora porro. Est repellendus omnis cum similique enim qui dolorum enim eos soluta magni. Sit voluptatem ipsa eos architecto nostrum vel molestiae voluptate. Vel dolorum voluptatibus ut expedita optio est magnam voluptas est modi quas et ipsa architecto ut laboriosam officia.',
    },
  ]
}

async function searchFakeWorlds(args: WorldListArgs): Promise<World[]> {
  let worlds = loadFakeWorlds();

  if ('needle' in args && typeof args.needle === 'string') {
    const needle: string = args.needle.toLowerCase();
    worlds = worlds.filter((value: World, index: number) => {
      return value.name.toLowerCase().includes(needle) || value.description.toLowerCase().includes(needle);
    })
  }

  return worlds.sort((a, b) => {
    switch(args.sortBy) {
      case "createdAt":
        return (a.createdAt < b.createdAt) ? 1 : -1
      case "-createdAt":
        return (a.createdAt > b.createdAt) ? 1 : -1
      default:
        return 1
    }
  })
}
