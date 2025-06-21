"use client";
import { useEffect, useState } from "react";
import { IGoods } from "./types";
import axiosInstance from "@/libs/axios.lib";
import ErrorHandler from "@/utils/error.handler";
import DashboardHeader from "./components/dashboard-header.component";
import InventoryTable from "./components/inventory-table.component";
import AddModal from "./components/add-modal.component";
import UpdateModal from "./components/update-modal.component";

export default function DashboardView() {
  const [data, setData] = useState<IGoods[]>([]);
  const [search, setSearch] = useState("");
  const [currentItem, setCurrentItem] = useState<IGoods | null>(null);

  const [formData, setFormData] = useState({
    goods_name: "",
    goods_quantity: 0,
  });

  const [formUpdateData, setFormUpdateData] = useState({
    goods_name: "",
    goods_quantity: 0,
    action: "incoming",
  });

  const [showAddModal, setShowAddModal] = useState(false);
  const [showUpdateModal, setShowUpdateModal] = useState(false);

  const handleGetData = async () => {
    try {
      const { data } = await axiosInstance.get("/v1/inventory/get-inventory", {
        params: { search },
      });
      setData(data.data);
    } catch (error) {
      ErrorHandler(error);
    }
  };

  const handleAdd = async () => {
    try {
      const response = await axiosInstance.post(
        "/v1/inventory/add-goods",
        formData
      );
      setShowAddModal(false);
      setFormData({ goods_name: "", goods_quantity: 0 });
      await handleGetData();
    } catch (error) {
      ErrorHandler(error);
    }
  };

  const handleUpdate = async () => {
    if (!currentItem) return;
    try {
      await axiosInstance.put(
        `/v1/inventory/update-goods/${currentItem.id}`,
        formUpdateData
      );
      setShowUpdateModal(false);
      await handleGetData();
    } catch (error) {
      ErrorHandler(error);
    }
  };

  const filteredData = data.filter((item) =>
    item.goods_name.toLowerCase().includes(search.toLowerCase())
  );

  useEffect(() => {
    const delayDebounce = setTimeout(() => {
      handleGetData();
    }, 500);

    return () => clearTimeout(delayDebounce);
  }, [search]);

  return (
    <div className="max-w-4xl mx-auto p-4">
      <DashboardHeader
        onAddClick={() => setShowAddModal(true)}
        search={search}
        setSearch={setSearch}
      />
      <InventoryTable
        data={filteredData}
        onUpdateClick={(item) => {
          setCurrentItem(item);
          setFormUpdateData({
            goods_name: item.goods_name,
            goods_quantity: item.goods_quantity,
            action: item.action ?? "incoming",
          });
          setShowUpdateModal(true);
        }}
      />
      {showAddModal && (
        <AddModal
          formData={formData}
          onChange={(e) =>
            setFormData((prev) => ({
              ...prev,
              [e.target.name]:
                e.target.name === "goods_quantity"
                  ? parseInt(e.target.value)
                  : e.target.value,
            }))
          }
          onSubmit={handleAdd}
          onClose={() => setShowAddModal(false)}
        />
      )}
      {showUpdateModal && (
        <UpdateModal
          formData={formUpdateData}
          onChange={(e) =>
            setFormUpdateData((prev) => ({
              ...prev,
              [e.target.name]:
                e.target.name === "goods_quantity"
                  ? parseInt(e.target.value)
                  : e.target.value,
            }))
          }
          onSubmit={handleUpdate}
          onClose={() => setShowUpdateModal(false)}
        />
      )}
    </div>
  );
}
