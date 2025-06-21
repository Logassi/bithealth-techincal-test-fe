"use client";
import useAuthStore from "@/stores/user.store";
import { getCookie } from "cookies-next";
import { useEffect } from "react";
import { jwtDecode } from "jwt-decode";
import Swal from "sweetalert2";

type Token = {
  id: number;
  email: string;
  name: string;
  role_id: number;
  iat: number;
  exp: number;
};

export default function AuthProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const { onAuthSuccess, clearAuth } = useAuthStore();

  useEffect(() => {
    const token = getCookie("access_token") as string;
    if (!token) return;

    try {
      const decoded: Token = jwtDecode(token);

      if (Date.now() >= decoded.exp * 1000) {
        Swal.fire({
          icon: "warning",
          title: "Session expired, please relogin",
          showConfirmButton: false,
          timer: 2000,
        }).then(() => clearAuth());
      } else {
        onAuthSuccess({
          id: decoded.id,
          email: decoded.email,
          name: decoded.name,
          role_id: decoded.role_id,
        });
      }
    } catch (err) {
      clearAuth();
    }
  }, []);

  return <>{children}</>;
}
