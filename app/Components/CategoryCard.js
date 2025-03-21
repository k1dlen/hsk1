export default function CategoryCard({ type, total, learned, onClick }) {
  const progress = Math.round((learned / total) * 100);

  return (
    <div
      onClick={onClick}
      className="p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-all cursor-pointer"
    >
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-xl font-semibold capitalize">{type}</h3>
        <span className="text-gray-500">
          {learned}/{total}
        </span>
      </div>
      <div className="w-full bg-gray-200 rounded-full h-2">
        <div
          className="bg-blue-600 rounded-full h-2 transition-all"
          style={{ width: `${progress}%` }}
        />
      </div>
    </div>
  );
}
