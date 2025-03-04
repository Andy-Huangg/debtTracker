export default function LogOut() {
  const handleLogOut = () => {
    localStorage.removeItem("token");
    window.location.href = "/";
  };

  return (
    <button
      className="p-2 bg-red-500 text-white rounded hover:bg-red-600 transition"
      onClick={handleLogOut}
    >
      Log Out
    </button>
  );
}
