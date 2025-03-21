export default function ProgressBar({ progress }) {
  return (
    <div className="w-full bg-gray-200 rounded-full h-2">
      <div
        className="bg-blue-600 rounded-full h-2 transition-all"
        style={{ width: `${progress}%` }}
      />
    </div>
  );
}
