import { Menu } from "@/types/menu";

const menuData: Menu[] = [
  {
    id: 1,
    title: "Home",
    path: "/",
    newTab: false,
  },
  {
    id: 2,
    title: "About",
    path: "/about",
    newTab: false,
  },
  {
    id: 3,
    title: "Services",
    newTab: false,
    submenu: [
      {
        id: 31,
        title: "Care",
        path: "/about",
        newTab: false,
      },
      {
        id: 32,
        title: "Pharmacy",
        path: "/contact",
        newTab: false,
      },
      {
        id: 33,
        title: "Traveling clinic",
        path: "/blog",
        newTab: false,
      },
      {
        id: 34,
        title: "Power supply & accessories",
        path: "/blog-sidebar",
        newTab: false,
      },
      {
        id: 35,
        title: "Accounting & Management",
        path: "/blog-details",
        newTab: false,
      },
      {
        id: 36,
        title: "Project study",
        path: "/signin",
        newTab: false,
      },
      {
        id: 37,
        title: "Security",
        path: "/signup",
        newTab: false,
      },
    ],
  },
];
export default menuData;
