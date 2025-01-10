"use client";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import ThemeToggler from "./ThemeToggler";
import Language from "@/components/Header/Language";
import { signOut } from "next-auth/react";
import { Menu } from "@/types/menu";
import axios from "axios";
import React, { useEffect, useState } from "react";

interface UserState {
  name: string;
  description: string;
  services: string[];
}

const fetchProfiles = async (): Promise<UserState[]> => {
  try {
    const response = await axios.get("/api/auth/access");
    console.log("Profiles fetched:", response.data);
    return response.data.data;
  } catch (error) {
    console.error("Error fetching profiles", error);
    return [];
  }
};

const initialMenuData: Menu[] = [
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
    submenu: [],
  },
];


const Nav: React.FC<{ profileName: string }> = ({ profileName }) => {

  const [menuData, setMenuData] = useState<Menu[]>(initialMenuData);

  useEffect(() => {
    const updateMenu = async () => {
      const profiles = await fetchProfiles();
      const selectedProfile = profiles.find((profile) => profile.name === profileName);
  
      let updatedMenu = initialMenuData;
  
      if (profileName === "user") {
        // Supprimer l'élément "Services" si le profil est "user"
        updatedMenu = updatedMenu.filter((item) => item.title !== "Services");
      } else if (selectedProfile) {
        const filteredServices = selectedProfile.services;
  
        updatedMenu = updatedMenu.map((item) => {
          if (item.title === "Services") {
            return {
              ...item,
              submenu: filteredServices.map((service, index) => ({
                id: 30 + index,
                title: service,
                path: `/services/${service.toLowerCase().replace(/\s+/g, "-")}`,
                newTab: false,
              })),
            };
          }
          return item;
        });
      }
  
      setMenuData(updatedMenu);
    };
  
    updateMenu();
  }, [profileName]);

  // Navbar toggle
  const [navbarOpen, setNavbarOpen] = useState(false);
  const navbarToggleHandler = () => {
    setNavbarOpen(!navbarOpen);
  };

  // Sticky Navbar
  const [sticky, setSticky] = useState(false);
  const handleStickyNavbar = () => {
    if (window.scrollY >= 80) {
      setSticky(true);
    } else {
      setSticky(false);
    }
  };
  useEffect(() => {
    window.addEventListener("scroll", handleStickyNavbar);
  });

  // submenu handler
  const [openIndex, setOpenIndex] = useState(-1);
  const handleSubmenu = (index) => {
    if (openIndex === index) {
      setOpenIndex(-1);
    } else {
      setOpenIndex(index);
    }
  };

  const usePathName = usePathname();

  return (
    <>
      <header
        className={`header left-0 top-0 z-40 flex w-full items-center ${
          sticky
            ? "dark:bg-gray-dark dark:shadow-sticky-dark fixed z-[9999] bg-transparent !bg-opacity-80 shadow-sticky backdrop-blur-sm transition"
            : "absolute bg-transparent"
        }`}
      >
        <div className="container">
          <div className="relative -mx-4 flex items-center justify-between">
            <div className="w-60 max-w-full px-4 xl:mr-12 pl-15">
              <Link
                href="/"
                className={`header-logo block w-full ${
                  sticky ? "py-5 lg:py-2" : "py-8"
                } `}
              >
                <span style={{fontWeight: 'bold'}} className="text-meta-3 dark:text-white">
                  <Image
                    src="/images/logo/logo.png"
                    alt="logo"
                    width={60}
                    height={60}
                    className="dark:hidden"
                  />
                  
                  <Image
                    src="/images/logo/logo-dark.png"
                    alt="logo"
                    width={50}
                    height={50}
                    className="hidden dark:block"
                  />
                  CEVETCO
                </span>
              </Link>
            </div>
            <div className="flex w-full items-center justify-between px-4">
              <div>
                <button
                  onClick={navbarToggleHandler}
                  id="navbarToggler"
                  aria-label="Mobile Menu"
                  className="absolute right-4 top-1/2 block translate-y-[-50%] rounded-lg px-3 py-[6px] ring-meta-3 focus:ring-2 lg:hidden"
                >
                  <span
                    className={`relative my-1.5 block h-0.5 w-[30px] bg-black transition-all duration-300 dark:bg-white dark:hover:text-meta-3 ${
                      navbarOpen ? " top-[7px] rotate-45" : " "
                    }`}
                  />
                  <span
                    className={`relative my-1.5 block h-0.5 w-[30px] bg-black transition-all duration-300 dark:bg-white dark:hover:text-meta-3 ${
                      navbarOpen ? "opacity-0 " : " "
                    }`}
                  />
                  <span
                    className={`relative my-1.5 block h-0.5 w-[30px] bg-black transition-all duration-300 dark:bg-white dark:hover:text-meta-3 ${
                      navbarOpen ? " top-[-8px] -rotate-45" : " "
                    }`}
                  />
                </button>
                <nav
                  id="navbarCollapse"
                  className={`dark:hover:text-meta-3 dark:bg-boxdark navbar absolute right-0 z-30 w-[250px] rounded border-[.5px] border-body-color/50 bg-white px-6 py-4 duration-300 dark:border-body-color/20 dark:bg-dark lg:visible lg:static lg:w-auto lg:border-none lg:!bg-transparent lg:p-0 lg:opacity-100 ${
                    navbarOpen
                      ? "visibility top-full opacity-100"
                      : "invisible top-[120%] opacity-0"
                  }`}
                >
                  <ul className="block lg:flex lg:space-x-12">
                    {menuData.map((menuItem, index) => (
                      <li key={index} className="group relative">
                        {menuItem.path ? (
                          <Link
                            href={menuItem.path}
                            className={`flex py-2 text-base lg:mr-0 lg:inline-flex lg:px-0 lg:py-6 ${
                              usePathName === menuItem.path
                                ? "text-meta-3 dark:text-white"
                                : "text-dark hover:text-meta-3 dark:text-white/70 dark:hover:text-meta-3 "
                            }`}
                          >
                            {menuItem.title}
                          </Link>
                        ) : (
                          <>
                            <p
                              onClick={() => handleSubmenu(index)}
                              className=" flex cursor-pointer items-center justify-between py-2 text-base text-dark group-hover:text-meta-3 dark:text-white/70 dark:group-hover:text-meta-3 lg:mr-0 lg:inline-flex lg:px-0 lg:py-6"
                            >
                              {menuItem.title}
                              <span className="pl-3">
                                <svg width="25" height="24" viewBox="0 0 25 24">
                                  <path
                                    fillRule="evenodd"
                                    clipRule="evenodd"
                                    d="M6.29289 8.8427C6.68342 8.45217 7.31658 8.45217 7.70711 8.8427L12 13.1356L16.2929 8.8427C16.6834 8.45217 17.3166 8.45217 17.7071 8.8427C18.0976 9.23322 18.0976 9.86639 17.7071 10.2569L12 15.964L6.29289 10.2569C5.90237 9.86639 5.90237 9.23322 6.29289 8.8427Z"
                                    fill="currentColor"
                                  />
                                </svg>
                              </span>
                            </p>
                            <div
                              className={`dark:hover:text-meta-3 dark:bg-boxdark submenu relative left-0 top-full rounded-sm bg-white transition-[top] duration-300 group-hover:opacity-100 dark:bg-dark lg:invisible lg:absolute lg:top-[110%] lg:block lg:w-[250px] lg:p-4 lg:opacity-0 lg:shadow-lg lg:group-hover:visible lg:group-hover:top-full ${
                                openIndex === index ? "block" : "hidden"
                              }`}
                            >
                              {menuItem.submenu.map((submenuItem, index) => (
                                <Link
                                href={submenuItem.path}
                                key={index}
                                className=" dark:bg-boxdark block rounded py-2.5 text-sm dark:text-white hover:text-meta-3  dark:hover:text-meta-3 lg:px-3"
                              >
                                {submenuItem.title}
                              </Link>
                              ))}
                            </div>
                          </>
                        )}
                      </li>
                    ))}
                  </ul>
                </nav>
              </div>
              <div className="flex items-center justify-end pr-16 lg:pr-0">
                <Language/>
                <button
                  onClick={() =>
                            signOut({
                              callbackUrl: "/login",
                              redirect: true,
                            })
                          }
                  className="ease-in-up shadow-btn hover:shadow-btn-hover hidden rounded-sm bg-meta-3 px-8 py-3 text-base font-medium text-white transition duration-300 hover:bg-opacity-90 md:block md:px-9 lg:px-6 xl:px-9"
                >
                  Log Out
                </button>
                <div>
                  <ThemeToggler />
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>
    </>
  );
};

export default Nav;
