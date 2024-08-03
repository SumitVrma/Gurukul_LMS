import Sidebar from "./Sidebar";
import MainPage from "./MainPage";
import SearchView from "./SearchView";
import AddCourse from "./AddCourse";
import { Outlet } from "react-router-dom";

const Dashboard = () => {
  return (
    <div className="flex ">
      <div className="w-[800px] ">
        {/* <Sidebar /> */}
      </div>
      <div className="">
        {/* <SearchView />
        <MainPage /> */}
        <div>
          <Outlet />
        </div>
        {/* <AddCourse/> */}
      </div>
    </div>
  );
};

export default Dashboard;
