import { Route } from "react-router-dom";
import { HomePage } from "./Home";

export function HomeRoutes() {
  return [<Route key="home" path="/home" element={<HomePage />} />];
}
