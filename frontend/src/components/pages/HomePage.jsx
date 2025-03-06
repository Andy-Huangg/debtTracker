import { Link, useNavigate } from "react-router-dom";
import favicon from "../../assets/favicon.ico";
import DebtDisplayImage from "../../assets/DebtDisplay.png";
function HomePage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-50 to-purple-50 py-4 px-4 sm:px-6 lg:px-8">
      <nav className="flex justify-between items-center mb-12 sticky top-4">
        <div className="flex">
          <img
            src={favicon}
            alt="Favicon"
            className="w-8 h-8 mr-2 hover:scale-110 transition-transform duration-100"
          />
          <div className="text-2xl font-bold text-blue-700">Debt Tracker</div>
        </div>

        <div className="space-x-4 flex">
          <Link
            className="bg-blue-700 text-white px-4 py-2 rounded-lg hover:bg-blue-800"
            to="/register"
          >
            Register
          </Link>
          <br></br>
          <Link
            className="bg-white text-blue-700 px-4 py-2 rounded-lg border border-blue-700 hover:bg-blue-50"
            to="/login"
          >
            Login
          </Link>
        </div>
      </nav>

      <div className="text-center mb-16">
        <h1 className="text-5xl font-bold text-gray-900 mb-4">
          Never Lose Track of Who Owes You Money Again
        </h1>
        <p className="text-xl text-gray-600 mb-8">
          <strong className="text-blue-700">Debt Tracker</strong> helps you
          effortlessly manage and track the money others owe you.
        </p>
        <div className="space-x-4">
          <button
            className="bg-blue-700 text-white px-6 py-3 rounded-lg hover:bg-blue-800"
            onClick={() => navigate("/register")}
          >
            Sign Up for Free
          </button>
          <button
            className="bg-white text-blue-700 px-6 py-3 rounded-lg border border-blue-700 hover:bg-blue-50"
            onClick={() => navigate("/login")}
          >
            Log In
          </button>
        </div>

        <div className="flex flex-col md:flex-row items-center justify-between px-6 md:px-12 lg:px-24 py-12">
          <div className="md:w-1/2 lg:w-2/3 flex-col text-center md:text-left flex justify-center items-center">
            <h1 className="text-3xl md:text-5xl font-bold text-gray-800 flex justify-center">
              Track The Money Owed To You!
            </h1>
            <p className="mt-4 text-lg text-gray-600 flex justify-center">
              Keep track of your debts and transactions with ease. Manage who
              owes you and how much in one place.
            </p>
          </div>

          <div className="md:w-1/2 lg:w-1/3flex justify-center mt-8 md:mt-0">
            <img
              src={DebtDisplayImage}
              alt="Debt Tracker Image"
              className="w-full max-w-md md:max-w-lg lg:max-w-xl drop-shadow-lg"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default HomePage;
