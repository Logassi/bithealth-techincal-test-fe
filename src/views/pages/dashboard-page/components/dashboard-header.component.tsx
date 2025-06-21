interface DashboardHeaderProps {
  onAddClick: () => void;
  search: string;
  setSearch: (value: string) => void;
}

export default function DashboardHeader({
  onAddClick,
  search,
  setSearch,
}: DashboardHeaderProps) {
  return (
    <div className="flex justify-between mb-4">
      <button
        className="bg-blue-600 text-white px-4 py-2 rounded"
        onClick={onAddClick}
      >
        Add
      </button>
      <input
        type="text"
        placeholder="Search..."
        className="border px-3 py-2 rounded w-1/3"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
    </div>
  );
}
