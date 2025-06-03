import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
  index("./routes/dashboard.tsx"),
  route("/tasks/new", "./routes/tasks/new.tsx"),
  route("/tasks/:id", "./routes/tasks/[id].tsx"),
] satisfies RouteConfig;
