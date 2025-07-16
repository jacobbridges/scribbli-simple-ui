import {
    type RouteConfig,
    route,
    index,
    layout,
    prefix,
} from "@react-router/dev/routes";

export default [
    index("routes/home.tsx"),
    route("universe", "routes/universe/universe-route.tsx", [
      index('routes/universe/universe-index-route.tsx'),
      route("world/:worldId", "routes/universe/universe-world-detail.tsx"),
    ]),
] satisfies RouteConfig;
