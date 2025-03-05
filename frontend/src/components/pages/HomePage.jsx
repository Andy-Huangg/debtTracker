import { Link, useNavigate } from "react-router-dom";

function HomePage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-50 to-purple-50 py-12 px-4 sm:px-6 lg:px-8">
      <nav className="flex justify-between items-center mb-12">
        <div className="text-2xl font-bold text-blue-700">Debt Tracker</div>
        <div className="space-x-4 flex">
          <Link to="/register">Register</Link>
          <br></br>
          <Link to="/login">Login</Link>
        </div>
      </nav>

      <div className="text-center mb-16">
        <h1 className="text-5xl font-bold text-gray-900 mb-4">
          Never Lose Track of Who Owes You Money Again
        </h1>
        <p className="text-xl text-gray-600 mb-8">
          Debt Tracker helps you effortlessly manage and track the money others
          owe you.
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
      </div>
    </div>
  );
}

export default HomePage;
