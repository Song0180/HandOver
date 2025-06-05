import {
  type RouteConfig,
  index,
  layout,
  prefix,
  route,
} from "@react-router/dev/routes";

export default [
  layout("./layout/layout.tsx", [
    index("./routes/dashboard.tsx"),
    ...prefix("tasks", [
      index("./routes/tasks/index.tsx"),
      route("new", "./routes/tasks/new.tsx"),
      route(":id", "./routes/tasks/[id].tsx"),
    ]),
  ]),
] satisfies RouteConfig;
