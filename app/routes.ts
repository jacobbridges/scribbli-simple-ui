import {
    type RouteConfig,
    route,
    index,
    layout,
    prefix,
} from "@react-router/dev/routes";

export default [
    index("routes/home.tsx"),
    route("universe", "routes/universe/_base.tsx", [
      index('routes/universe/index.tsx'),
      route("create-world", "routes/universe/create-world.tsx"),
      route("world/:worldId", "routes/universe/universe-world-detail.tsx"),
    ]),
    route("nero", "routes/nero/index.tsx"),
] satisfies RouteConfig;
