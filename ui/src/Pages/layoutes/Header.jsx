import React, { useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import logo from "../../pics/managemnt Logo.jpg";
import { useDispatch } from "react-redux";
import { setLogOut } from "../../State/AuthSlice";

function Header() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <div className=" relative   ">
        <nav className=" fixed w-full z-20 shadow-md py-3 bg-white top-0 left-0  px-8 flex items-center justify-between ">
          <div className=" flex items-center gap-4  ">
            <button
              className=" lg:hidden block btn-primary   "
              onClick={() => setIsOpen(!isOpen)}
            >
              {isOpen ? "close" : "open"}
            </button>
            <img src={logo} alt="" className="w-[55px]  rounded-3xl  " />
          </div>
          <ul className="navbar-nav flex items-center">
            <li className="nav-item m-1">
              <NavLink to="/home">Dashboard</NavLink>
            </li>
            <li className="nav-item m-1">
              <NavLink to="/employee">Employee</NavLink>
            </li>
          </ul>
        </nav>
        <div
          className={`flex flex-col w-[250px] bg-white z-10 overflow-hidden fixed lg:left-0 left-[-100%]  top-0 h-full ${
            isOpen ? "!left-0" : ""
          }  `}
        >
          <ul className="flex flex-col py-4 pt-[6rem] [&>li_a]:flex [&>li_a]:items-center  [&>li_a]:w-full [&>li_a]:text-black  [&>li_a]:CustomDashNavLink ">
            <li>
              <NavLink
                className={(navActive) =>
                  navActive.isActive ? "CustomDashActiveNavLink" : ""
                }
                to={"/dashboard/home"}
              >
                <span className="inline-flex items-center justify-center h-12 w-12 text-lg">
                  <i className="bx bx-home"></i>
                </span>
                <span className="text-sm font-medium">Dashboard</span>
              </NavLink>
            </li>
            <li>
              <NavLink
                className={(navActive) =>
                  navActive.isActive ? "CustomDashActiveNavLink" : ""
                }
                to={"/dashboard/profile"}
              >
                <span className="inline-flex items-center justify-center h-12 w-12 text-lg">
                  <i className="bx bx-user"></i>
                </span>
                <span className="text-sm font-medium">Profile</span>
              </NavLink>
            </li>
            <li>
              <NavLink
                className={(navActive) =>
                  navActive.isActive ? "CustomDashActiveNavLink" : ""
                }
                to={"/dashboard/links"}
              >
                <span className="inline-flex items-center justify-center h-12 w-12 text-lg">
                  <i className="bx bx-redo"></i>
                </span>
                <span className="text-sm font-medium">apply leave</span>
              </NavLink>
            </li>
            <li>
              <NavLink
                className={(navActive) =>
                  navActive.isActive ? "CustomDashActiveNavLink" : ""
                }
                to={"/dashboard/links"}
              >
                <span className="inline-flex items-center justify-center h-12 w-12 text-lg">
                  <i className="bx bxs-file-doc"></i>
                </span>
                <span className="text-sm font-medium">upload documents</span>
              </NavLink>
            </li>
            <li>
              <NavLink
                className={(navActive) =>
                  navActive.isActive ? "CustomDashActiveNavLink" : ""
                }
                to={"/dashboard/history"}
              >
                <span className="inline-flex items-center justify-center h-12 w-12 text-lg">
                  <i className="bx bx-history"></i>
                </span>
                <span className="text-sm font-medium">history</span>
              </NavLink>
            </li>
            <li>
              <NavLink
                className={(navActive) =>
                  navActive.isActive ? "CustomDashActiveNavLink" : ""
                }
                to={"/dashboard/employee"}
              >
                <span className="inline-flex items-center justify-center h-12 w-12 text-lg">
                  <i className="bx bx-history"></i>
                </span>
                <span className="text-sm font-medium">all users</span>
              </NavLink>
            </li>

            <li>
              <Link
                onClick={() => dispatch(setLogOut())}
                className={(navActive) =>
                  navActive.isActive ? "CustomDashActiveNavLink" : ""
                }
              >
                <span className="inline-flex items-center justify-center h-12 w-12 text-lg">
                  <i className="bx bx-log-out"></i>
                </span>
                <span className="text-sm font-medium">Logout</span>
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
}

export default Header;
