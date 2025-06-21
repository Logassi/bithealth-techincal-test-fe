interface UpdateModalProps {
  formData: { goods_name: string; goods_quantity: number; action: string };
  onChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => void;
  onSubmit: () => void;
  onClose: () => void;
}

export default function UpdateModal({
  formData,
  onChange,
  onSubmit,
  onClose,
}: UpdateModalProps) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded shadow w-[400px]">
        <h2 className="text-xl font-semibold mb-4">Update Inventory</h2>
        <input
          type="text"
          name="goods_name"
          placeholder="Goods Name"
          value={formData.goods_name}
          onChange={onChange}
          className="border w-full mb-2 px-3 py-2 rounded"
        />
        <input
          type="number"
          name="goods_quantity"
          placeholder="Goods Quantity"
          value={formData.goods_quantity}
          onChange={onChange}
          className="border w-full mb-2 px-3 py-2 rounded"
        />
        <select
          name="action"
          value={formData.action}
          onChange={onChange}
          className="border w-full mb-4 px-3 py-2 rounded"
        >
          <option value="incoming">Incoming</option>
          <option value="outgoing">Outgoing</option>
        </select>
        <div className="flex justify-end space-x-2">
          <button onClick={onClose} className="px-4 py-2 bg-gray-300 rounded">
            Cancel
          </button>
          <button
            onClick={onSubmit}
            className="px-4 py-2 bg-yellow-500 text-white rounded"
          >
            Update
          </button>
        </div>
      </div>
    </div>
  );
}
