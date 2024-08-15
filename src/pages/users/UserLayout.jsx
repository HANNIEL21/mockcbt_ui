import { Outlet } from "react-router-dom";
import Authenticate from "../../components/Authenticate";

export default function UserLayout() {
  return (
    <Authenticate>
      <Outlet />
    </Authenticate>
  );
}
