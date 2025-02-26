export default function LogOut() {
  const handleLogOut = () => {
    localStorage.removeItem("token");
    window.location.href = "/";
    alert("logged out!");
  };

  return <button onClick={handleLogOut}>Log Out</button>;
}
