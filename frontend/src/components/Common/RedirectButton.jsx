export default function RedirectButton({ redirectUrl, children }) {
  const handleClick = () => {
    window.location.href = redirectUrl;
  };

  return (
    <button
      onClick={handleClick}
      className="mt-4 p-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
    >
      {children}
    </button>
  );
}
