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
        <div className={`${isOpen ? "translate-x-[200px] w-[calc(100vw-200px)]" : "w-full"} bg-gentle-sky p-[20px]`}>
          {<Outlet/>}
        </div>
    </div>
    </>
  )
}

export default Dashboard
