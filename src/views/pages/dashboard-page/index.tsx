// components/Dashboard.tsx
"use client";
import { useEffect, useRef, useState } from "react";
import { IGoods } from "./types";
import axiosInstance from "@/libs/axios.lib";
import ErrorHandler from "@/utils/error.handler";

// const mockData: IGoods[] = [
//   { id: 1, goods_name: "Item A", goods_quantity: 123 },
//   { id: 2, goods_name: "Item B", goods_quantity: 321 },
// ];

export default function DashboardView() {
  // const [data, setData] = useState<IGoods[]>(mockData);
  // const [search, setSearch] = useState("");

  const handleGetData = async () => {
    try {
      const { data } = await axiosInstance.get("/v1/inventory/get-inventory");
    } catch (error) {
      ErrorHandler(error);
    }
  };

  // const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   setSearch(e.target.value);
  // };

  // const handleAdd = () => {
  //   // Placeholder logic
  //   const newItem: IGoods = {
  //     id: data.length + 1,
  //     goods_name: `${data.length + 1}`,
  //     goods_quantity: data.length + 1,
  //   };
  //   setData((prev) => [...prev, newItem]);
  // };

  // const handleUpdate = (id: number) => {
  //   const updated = data.map((item) =>
  //     item.id === id ? { ...item, name: item.name + " (Updated)" } : item
  //   );
  //   setData(updated);
  // };

  // const filteredData = data.filter((item) =>
  //   item.name.toLowerCase().includes(search.toLowerCase())
  // );

  useEffect(() => {
    handleGetData();
  });

  return (
    <div className="max-w-4xl mx-auto p-4">
      <div className="flex justify-between mb-4">
        <button
          className="bg-blue-600 text-white px-4 py-2 rounded"
          // onClick={handleAdd}
        >
          Add
        </button>
        <input
          type="text"
          placeholder="Search..."
          className="border px-3 py-2 rounded w-1/3"
          // value={search}
          // onChange={handleSearch}
        />
      </div>

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
        <tbody>
          {/* {filteredData.map((item) => (
            <tr key={item.id}>
              <td className="border px-4 py-2">{item.id}</td>
              <td className="border px-4 py-2">{item.name}</td>
              <td className="border px-4 py-2">{item.description}</td>
              <td className="border px-4 py-2">
                <button
                  onClick={() => handleUpdate(item.id)}
                  className="bg-yellow-500 text-white px-3 py-1 rounded"
                >
                  Update
                </button>
              </td>
            </tr>
          ))} */}
        </tbody>
      </table>
    </div>
  );
}
