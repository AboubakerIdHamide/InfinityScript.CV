import { Outlet } from "react-router-dom";
import { NavBar, SideBar} from '../../components/dashboard';
import { useState } from "react";

const Dashboard = () => {
  const [isOpen, setIsOpen] = useState(true);
  return (
    <>
      <NavBar setIsOpen={setIsOpen} isOpen={isOpen} />
    <div className="flex w-100 h-[90vh]">
        <SideBar isOpen={isOpen} />
        <div className={`${isOpen ? "translate-x-64 w-[calc(100vw-16rem)]" : ""} bg-gentle-sky p-[20px] w-full`}>
          {<Outlet/>}
        </div>
    </div>
    </>
  )
}

export default Dashboard
