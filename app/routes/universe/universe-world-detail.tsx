import type { Route } from "./+types/universe-world-detail";
import type { World } from "~/types";

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

  return (
    <div>Hello {loaderData.world?.name}</div>
  )

}
