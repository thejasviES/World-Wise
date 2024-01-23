// import AppNav from "../components/AppNav";
// import { Outlet } from "react-router-dom";
import Map from "../components/Map";
import Sidebar from "../components/Sidebar";
import User from "../components/User";
import styles from "./AppLayout.module.css";

import { useAuth } from "../contexts/FakeAuthContext";
import Message from "../components/Message";

function AppLayout({ cities }) {
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) return <Message message="please login first"></Message>;
  // console.log(cities[0]);
  return (
    <div className={styles.app}>
      <Sidebar />
      <Map />
      <User />
    </div>
  );
}

export default AppLayout;
