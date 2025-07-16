import {useEffect, useState} from "react";
import { apiMock } from "~/services/api/client";
import type {World} from "~/types";

export default function UniverseIndexRoute() {

  const [worlds, setWorlds] = useState<World[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadWorlds();
  }, [])

  const loadWorlds = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await apiMock.getAll('worlds', {
        sortBy: 'name',
        sortOrder: 'asc'
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
    <div className="p-6">
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {error}
        </div>
      )}

      <div>
        <h2>Worlds</h2>
      </div>

      {worlds.length === 0 ? (
        <div className="text-gray-500">
          You stare at an empty universe. Create the first world.
        </div>
      ) : (
        <ul>
          {worlds.map((world: World) => (
            <li>{world.name}</li>
          ))}
        </ul>
      )}
    </div>
  )
}
