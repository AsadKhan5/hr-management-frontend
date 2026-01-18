import { Link, useLocation } from 'react-router-dom';
import { MdAssessment } from "react-icons/md";
import { FaUsers } from "react-icons/fa";
import { SlCalender } from "react-icons/sl";

const Layout = ({ children }) => {
  const location = useLocation();

  const navItems = [
    { path: '/', label: 'Dashboard', icon: <MdAssessment /> },
    { path: '/employees', label: 'Employees', icon: <FaUsers /> },
    { path: '/attendance', label: 'Attendance', icon: <SlCalender /> }
  ];

  return (
    <div className="drawer lg:drawer-open">
      <input id="my-drawer" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content flex flex-col">
        {/* Navbar for mobile */}
        <div className="w-full navbar bg-base-300 lg:hidden">
          <div className="flex-none">
            <label htmlFor="my-drawer" className="btn btn-square btn-ghost">
            </label>
          </div>
          <div className="flex-1 px-2 mx-2">HR Management System</div>
        </div>
        
        {/* Page content */}
        <div className="p-4 lg:p-8">
          {children}
        </div>
      </div>
      
      {/* Sidebar */}
      <div className="drawer-side">
        <label htmlFor="my-drawer" className="drawer-overlay"></label>
        <div className="menu p-4 w-64 min-h-full bg-base-200 border-r border-base-300">
          <div className="mb-6">
            <h2 className="text-xl font-bold text-center text-base-content">
              <span className='font-serif text-lg'>HR Management </span> 
              System
            </h2>
          </div>
          <ul>
            {navItems.map((item) => (
              <li key={item.path} className="mb-2">
                <Link
                  to={item.path}
                  className={`flex items-center gap-3 no-underline hover:bg-base-300 rounded-lg p-3 transition-colors ${
                    location.pathname === item.path 
                      ? 'bg-neutral text-neutral-content font-semibold' 
                      : 'text-base-content'
                  }`}
                >
                  <span className={`text-xl ${location.pathname === item.path ? 'text-neutral-content' : ''}`}>
                    {item.icon}
                  </span>
                  <span className="text-base">{item.label}</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Layout;
