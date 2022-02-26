import React from "react";
import { AiOutlineHome } from "react-icons/ai";
import { AiOutlineCalendar } from "react-icons/ai";
import { MdPeopleOutline } from "react-icons/md";
import { ImStack } from "react-icons/im";
import { HiOutlineMail } from "react-icons/hi";

export const SidebarData = [
  {
    title: "Loads",
    path: "/loads",
    icon: <ImStack />,
    cName: "nav-text",
    userRole: [
      "admin",
      "customerRep",
      "Carrier Operations",
      "After Hour Operations",
      "Operations Manager",
      "Customer Operations",
    ], //Means everyone has permission to view this. Else role should be 2
  },
  {
    title: "Customers",
    path: "/customers",
    icon: <MdPeopleOutline />,
    cName: "nav-text",
    userRole: [
      "admin",
      "customerRep",
      "Carrier Operations",
      "After Hour Operations",
      "Operations Manager",
      "Customer Operations",
    ], //Means everyone has permission to view this. Else role should be 2
  },
  {
    title: "Customer Reps",
    path: "/customer-reps",
    icon: <HiOutlineMail />,
    cName: "nav-text",
    userRole: [
      "admin",
      "Carrier Operations",
      "After Hour Operations",
      "Operations Manager",
      "Customer Operations",
    ], //Means customer Reps with role==2 do not have permission to view this
  },
  {
    title: "Operations Reps",
    path: "/operations-reps",
    icon: <AiOutlineCalendar />,
    cName: "nav-text",
    userRole: ["admin", "customerRep"], //Means everyone has permission to view this. Else role should be 2
  },
  // {
  //   title: "Dashboard",
  //   path: "/dashboard",
  //   icon: <AiOutlineHome />,
  //   cName: "nav-text",
  //   userRole: 1, //Means everyone has permission to view this. Else role should be 2
  // },
  // {
  //   title: "Invoices",
  //   path: "/invoices",
  //   icon: <HiOutlineMail />,
  //   cName: "nav-text",
  //   userRole: 1, //Means everyone has permission to view this. Else role should be 2
  // },
  // {
  //   title: "Carriers",
  //   path: "/carriers",
  //   icon: <HiOutlineMail />,
  //   cName: "nav-text",
  //   userRole: 1, //Means everyone has permission to view this. Else role should be 2
  // },
];
