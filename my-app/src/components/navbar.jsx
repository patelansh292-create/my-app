export default function Navbar() {
  return (
    <nav className="bg-indigo-600 text-white p-4 flex justify-between items-center">
      <h1 className="text-lg font-bold">Daily Puzzle</h1>
      <button className="bg-white text-indigo-600 px-4 py-1 rounded">
        Login
      </button>
    </nav>
  );
}
