import { RouteConfig } from "react-router-config";

export default interface AppRouteConfig extends RouteConfig {
  settings?: object;
  auth?: string[];
}
