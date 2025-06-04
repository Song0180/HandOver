import {
  type RouteConfig,
  index,
  layout,
  route,
} from "@react-router/dev/routes";

export default [
  layout("./layout/layout.tsx", [
    index("./routes/dashboard.tsx"),
    route("/tasks/new", "./routes/tasks/new.tsx"),
    route("/tasks/:id", "./routes/tasks/[id].tsx"),
  ]),
] satisfies RouteConfig;
