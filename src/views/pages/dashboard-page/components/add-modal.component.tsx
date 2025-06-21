interface AddModalProps {
  formData: { goods_name: string; goods_quantity: number };
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSubmit: () => void;
  onClose: () => void;
}

export default function AddModal({
  formData,
  onChange,
  onSubmit,
  onClose,
}: AddModalProps) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded shadow w-[400px]">
        <h2 className="text-xl font-semibold mb-4">Add Inventory</h2>
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
          className="border w-full mb-4 px-3 py-2 rounded"
        />
        <div className="flex justify-end space-x-2">
          <button onClick={onClose} className="px-4 py-2 bg-gray-300 rounded">
            Cancel
          </button>
          <button
            onClick={onSubmit}
            className="px-4 py-2 bg-blue-600 text-white rounded"
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  );
}
