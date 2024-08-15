import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

export default function Authenticate({ children }) {
  const user = useSelector((state) => state.user.userDetails);

  if (!user?.username) return <Navigate to="/" replace />;

  return children;
}
