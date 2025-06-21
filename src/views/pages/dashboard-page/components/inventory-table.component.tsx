import { IGoods } from "../types";

interface Props {
  role: "admin" | "staff" | null;
  data: IGoods[];
  onUpdateClick: (item: IGoods) => void;
  onDeleteClick?: (itemId: string) => void;
}

export default function InventoryTable({
  data,
  role,
  onUpdateClick,
  onDeleteClick,
}: Props) {
  return (
    <table className="w-full border border-gray-300 text-black">
      <thead className="bg-gray-100">
        <tr>
          <th className="border px-4 py-2">ID</th>
          <th className="border px-4 py-2">Goods Name</th>
          <th className="border px-4 py-2">Goods Quantity</th>
          <th className="border px-4 py-2">Created at</th>
          <th className="border px-4 py-2">Updated at</th>
          <th className="border px-4 py-2">Actions</th>
        </tr>
      </thead>
      <tbody className="bg-gray-300">
        {data.length > 0 ? (
          data.map((item) => (
            <tr key={item.id}>
              <td className="border px-4 py-2">{item.id}</td>
              <td className="border px-4 py-2">{item.goods_name}</td>
              <td className="border px-4 py-2">{item.goods_quantity}</td>
              <td className="border px-4 py-2">
                {item.created_at
                  ? new Date(item.created_at).toLocaleString()
                  : "-"}
              </td>
              <td className="border px-4 py-2">
                {item.updated_at
                  ? new Date(item.updated_at).toLocaleString()
                  : "-"}
              </td>
              <td className="border px-4 py-2 text-center">
                <div className="flex justify-center gap-2">
                  <button
                    onClick={() => onUpdateClick(item)}
                    className="bg-yellow-500 hover:bg-yellow-600 text-white px-3 py-1 rounded transition"
                  >
                    Update
                  </button>

                  {role === "admin" && (
                    <button
                      onClick={() => onDeleteClick?.(item.id)}
                      className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded transition"
                    >
                      Delete
                    </button>
                  )}
                </div>
              </td>
            </tr>
          ))
        ) : (
          <tr>
            <td className="border px-4 py-2 text-center" colSpan={6}>
              No data found
            </td>
          </tr>
        )}
      </tbody>
    </table>
  );
}
