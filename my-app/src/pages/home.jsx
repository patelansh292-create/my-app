export default function Home() {
  return (
    <div className="max-w-xl mx-auto bg-white p-6 rounded-lg shadow">
      <h2 className="text-2xl font-semibold mb-4">
        Welcome to Daily Puzzle
      </h2>

      <p className="mb-4">
        Solve today’s puzzle and maintain your streak!
      </p>

      <button className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700">
        Start Puzzle
      </button>
    </div>
  );
}
