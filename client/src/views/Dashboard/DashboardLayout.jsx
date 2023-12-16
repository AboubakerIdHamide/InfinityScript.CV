import { Outlet } from "react-router-dom";
import { Sidebar } from 'flowbite-react';
import {
  HiChartPie,
} from 'react-icons/hi';

const Dashboard = () => {
  return (
    <>
      <Sidebar aria-label="Sidebar with content separator example">
        <Sidebar.Items>
          <Sidebar.ItemGroup>
            <Sidebar.Item href="#" icon={HiChartPie}>
              Dashboard
            </Sidebar.Item>
          </Sidebar.ItemGroup>
        </Sidebar.Items>
      </Sidebar>
      {<Outlet/>}
    </>
  )
}

export default Dashboard


'use client';