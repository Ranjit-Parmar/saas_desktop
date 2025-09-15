import { Outlet, NavLink, useLocation, useNavigate } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import {
  SquareMenu,
  FileText,
  LineChart,
  Settings,
  AlertTriangle,
  ChevronDown,
  CircleUserRound,
  CircleUser,
} from "lucide-react";
import { useUploadModal } from "../../contexts/UploadModalContext";
import UploadModal from "../UploadModal";
import { useAuth } from "../../contexts/AuthContext";

const Layout = () => {
  const { isUploadOpen, openUploadModal, closeUploadModal } = useUploadModal();
  const { user, logout } = useAuth(); // ⬅️ Use AuthContext
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  const location = useLocation();
  const navigate = useNavigate();

  // Collapse mobile menu on route change
  useEffect(() => setIsMobileOpen(false), [location]);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const toggleSidebar = () => {
    if (window.innerWidth < 1280) setIsMobileOpen((prev) => !prev);
    else setIsCollapsed((prev) => !prev);
  };

  const navItems = [
    { name: "Contracts", path: "/dashboard", icon: FileText },
    { name: "Insights", path: "#", icon: AlertTriangle },
    { name: "Reports", path: "#", icon: LineChart },
    { name: "Settings", path: "#", icon: Settings },
  ];

  return (
    <div className="flex h-screen overflow-hidden text-gray-800 bg-white">
      {/* Sidebar */}
      <aside
        className={`fixed xl:static top-0 left-0 z-40 h-full border-r border-gray-200 overflow-y-auto 
        bg-white transform transition-all duration-300 ease-in-out 
        ${isCollapsed ? "w-[80px]" : "w-[260px]"} 
        ${
          isMobileOpen ? "translate-x-0" : "-translate-x-full"
        } xl:translate-x-0`}
      >
        <div className="flex items-center justify-between px-4 py-4 xl:justify-baseline">
          {!isCollapsed && (
            <h2 className="text-2xl font-bold tracking-wide text-gray-900 transition-opacity duration-300">
              Desktop
            </h2>
          )}
          <button
            onClick={() => setIsMobileOpen(false)}
            className="xl:hidden text-gray-700 hover:text-black transition"
          >
            ✕
          </button>
        </div>

        <nav className="flex flex-col gap-2 mt-12 px-2 pb-10">
          {navItems.map(({ name, path, icon: Icon }) => (
            <NavLink
              key={name}
              to={path}
              className={({ isActive }) =>
                `flex items-center gap-3 rounded-md px-3 py-2.5 text-sm font-medium transition-all duration-300 ${
                  isActive
                    ? "bg-gray-100 text-gray-900"
                    : "text-gray-700 hover:text-black hover:bg-gray-50"
                }`
              }
            >
              <Icon className="w-5 h-5 transition-transform duration-300" />
              <span
                className={`transition-opacity duration-300 ${
                  isCollapsed ? "opacity-0 w-0" : "opacity-100"
                }`}
              >
                {name}
              </span>
            </NavLink>
          ))}
          <button
            onClick={openUploadModal}
            className="mt-6 flex items-center gap-3 px-3 py-2.5 text-sm font-medium rounded-md text-white bg-black hover:bg-gray-900 transition-all duration-300"
          >
            <FileText className="w-5 h-5" />
            <span
              className={`transition-opacity duration-300 ${
                isCollapsed ? "opacity-0 w-0" : "opacity-100"
              }`}
            >
              Upload File
            </span>
          </button>
        </nav>
      </aside>

      {/* Mobile overlay */}
      {isMobileOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-30 z-30 xl:hidden animate-fadeIn"
          onClick={() => setIsMobileOpen(false)}
        />
      )}

      {/* Main content */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <header className="sticky top-0 z-20 flex items-center justify-between w-full p-4 border-b border-gray-200 bg-white">
          <div className="flex items-center gap-3">
            <button
              onClick={toggleSidebar}
              className="text-gray-700 hover:text-black transition-transform duration-300"
            >
              <SquareMenu className="w-6 h-6" />
            </button>
          </div>

          {/* User dropdown */}
          <div className="relative" ref={dropdownRef}>
            <button
              onClick={() => setDropdownOpen((prev) => !prev)}
              className="flex items-center gap-1 px-3 py-1 rounded-md"
            >
              <span className="mr-3 flex items-center justify-center overflow-hidden rounded-full h-10 w-10 bg-gray-100">
                <CircleUser className="w-6 h-6 text-gray-500" />
              </span>

              <span className="hidden sm:block mr-1 font-medium">
                {user?.name || "Guest"}
              </span>
              <ChevronDown
                className={`transition-transform duration-300 ${
                  dropdownOpen ? "rotate-180" : "rotate-0"
                }`}
              />
            </button>

            <div
              className={`absolute right-0 mt-4 flex w-64 flex-col rounded-2xl bg-white border border-gray-200 p-3 shadow-lg z-50 transform transition-all duration-300 origin-top-right ${
                dropdownOpen
                  ? "scale-100 opacity-100"
                  : "scale-95 opacity-0 pointer-events-none"
              }`}
            >
              <div>
                <span className="block font-medium text-gray-700">
                  {user?.name || "Guest"}
                </span>
                <span className="mt-0.5 block text-xs font-medium text-gray-700">
                  {user?.email || "guest@example.com"}
                </span>
              </div>

              <ul className="flex flex-col gap-1 pt-4 pb-3 border-b border-gray-200">
                <li>
                  <NavLink
                    to="#"
                    className="flex items-center gap-3 px-3 py-2 text-sm rounded-md text-gray-700 hover:bg-gray-100 hover:text-gray-900 transition-all"
                  >
                    <CircleUserRound /> Profile
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="#"
                    className="flex items-center gap-3 px-3 py-2 text-sm rounded-md text-gray-700 hover:bg-gray-100 hover:text-gray-900 transition-all"
                  >
                    <Settings /> Settings
                  </NavLink>
                </li>
              </ul>

              <button
                onClick={() => {
                  logout();
                  navigate("/login");
                }}
                className="flex items-center gap-3 px-3 py-2 mt-3 font-medium text-gray-700 rounded-lg hover:bg-gray-100 hover:text-gray-900 w-full text-left"
              >
                Logout
              </button>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-y-auto p-4 sm:p-6 bg-gray-50">
          <Outlet />
        </main>
      </div>

      {/* Upload Modal */}
      {isUploadOpen && (
        <UploadModal isOpen={isUploadOpen} onClose={closeUploadModal} />
      )}
    </div>
  );
};

export default Layout;
