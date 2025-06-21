"use client";
import { useEffect, useState } from "react";
import { IGoods } from "./types";
import axiosInstance from "@/libs/axios.lib";
import ErrorHandler from "@/utils/error.handler";
import DashboardHeader from "./components/dashboard-header.component";
import InventoryTable from "./components/inventory-table.component";
import AddModal from "./components/add-modal.component";
import UpdateModal from "./components/update-modal.component";
import Pagination from "./components/pagination.component";
import { getCookie } from "cookies-next";
import { jwtDecode } from "jwt-decode";
import Swal from "sweetalert2";

interface MyJwtPayload {
  id: string;
  email: string;
  role_id: "admin" | "staff" | null;
  name: string;
  iat?: number;
  exp?: number;
}

export default function DashboardView() {
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [data, setData] = useState<IGoods[]>([]);
  const [search, setSearch] = useState("");
  const [role, setRole] = useState<"admin" | "staff" | null>(null);
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
      const res = await axiosInstance.get("/v1/inventory/get-inventory", {
        params: { search, page },
      });

      setData(res.data.data);
      setTotalPages(res.data.meta.totalPages);
    } catch (error) {
      ErrorHandler(error);
    }
  };

  const handleAdd = async () => {
    try {
      await axiosInstance.post("/v1/inventory/add-goods", formData);
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

  const handleDelete = async (id: string) => {
    const confirmed = await Swal.fire({
      title: "Are you sure?",
      text: "This item will be permanently deleted.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
    });

    if (confirmed.isConfirmed) {
      try {
        await axiosInstance.delete(`/v1/inventory/delete-goods/${id}`);
        Swal.fire("Deleted!", "The item has been deleted.", "success");
        await handleGetData(); // refresh table
      } catch (err) {
        ErrorHandler(err);
      }
    }
  };

  useEffect(() => {
    const token = getCookie("access_token")?.toString();

    if (token) {
      try {
        const decoded = jwtDecode<MyJwtPayload>(token);

        // console.log("Decoded JWT:", decoded);

        // const roleValue =
        //   decoded.role_id === 1
        //     ? "admin"
        //     : decoded.role_id === 2
        //     ? "staff"
        //     : null;
        setRole(decoded.role_id);
      } catch (err) {
        console.error("Invalid token", err);
        setRole(null);
      }
    }

    const delayDebounce = setTimeout(() => {
      handleGetData();
    }, 500);

    return () => clearTimeout(delayDebounce);
  }, [search, page]);

  return (
    <div className="max-w-4xl mx-auto p-4">
      <DashboardHeader
        onAddClick={() => setShowAddModal(true)}
        search={search}
        setSearch={setSearch}
      />
      <InventoryTable
        data={filteredData}
        role={role}
        onUpdateClick={(item) => {
          setCurrentItem(item);
          setFormUpdateData({
            goods_name: item.goods_name,
            goods_quantity: item.goods_quantity,
            action: item.action ?? "incoming",
          });
          setShowUpdateModal(true);
        }}
        onDeleteClick={handleDelete}
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
      <Pagination
        page={page}
        totalPages={totalPages}
        onPageChange={(newPage) => setPage(newPage)}
      />
    </div>
  );
}
