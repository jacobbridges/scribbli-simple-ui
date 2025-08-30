import type { World } from '~/types.ts';
import { Link } from 'react-router';
import Tag from "~/components/tag/tag";

type WorldTileProps = {
  world: World;
};


export default function WorldTile(props: WorldTileProps) {
  const { world } = props;
  return (
    <Link
      to={`world/${world.id}`}
      className="p-6 lg border flex flex-col h-280px w-400px max-w-[400px] group"
    >
      <h3 className="text-2xl font-serif font-bold mb-2">{world.name}</h3>
      <p className="text-sm text-brand-text-dim mb-4">by {world?.authorName || "Unknown"}</p>
      <p className="flex-grow text-brand-text mb-6 line-clamp-4">{world.summary}</p>
      <div className="flex flex-wrap gap-2 mt-auto pt-4 border-t border-gray-500/10">
        {(world?.tags || []).map(tag => (
          <Tag key={tag}>{tag}</Tag>
        ))}
      </div>
    </Link>
  );
}