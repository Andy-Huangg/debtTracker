import { Link } from "react-router-dom";
import LogOut from "./LogOut";
import CheckAuth from "./CheckAuth";
import favicon from "../../assets/favicon.ico";

const Header = () => {
  const isAuth = CheckAuth();
  return (
    <div className="flex justify-between items-center p-2 bg-gray-800 text-white shadow-md">
      <Link to="/dashboard" className="ml-5 flex items-center">
        <img
          src={favicon}
          alt="Favicon"
          className="w-8 h-8 mr-2 hover:scale-110 transition-transform duration-100"
        />
        <h1 className="text-2xl font-bold hover:shadow-lg hover:scale-110 transition-transform duration-100">
          Debt Tracker
        </h1>
      </Link>
      {isAuth && (
        <div className="mr-5">
          <LogOut />
        </div>
      )}
    </div>
  );
};

export default Header;
