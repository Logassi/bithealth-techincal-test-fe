"use client";
import useAuthStore from "@/stores/user.store";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { deleteCookie } from "cookies-next";

export default function Header() {
  const { user, clearAuth } = useAuthStore();
  const router = useRouter();

  const handleLogout = () => {
    deleteCookie("access_token");
    clearAuth();
    router.push("/");
  };

  return (
    <header className="bg-gray-800 text-white py-4">
      <div className="container mx-auto flex justify-between items-center px-4">
        <Link
          href="/"
          className="text-2xl font-bold hover:opacity-90 transition"
        >
          Inventory Management System
        </Link>

        {user ? (
          <div className="flex items-center space-x-6">
            <p className="text-gray-300">Welcome, {user.name}</p>

            <ul className="flex space-x-4">
              {user.role_id === 2 && (
                <li>
                  <Link
                    href="/event"
                    className="hover:underline text-indigo-300 hover:text-white transition"
                  >
                    Create Event
                  </Link>
                </li>
              )}
              {user.role_id === 1 && (
                <li>
                  <Link
                    href="/search"
                    className="hover:underline text-sky-300 hover:text-white transition"
                  >
                    Search Event
                  </Link>
                </li>
              )}
              <li>
                <a
                  onClick={handleLogout}
                  className="cursor-pointer hover:underline text-gray-400 hover:text-white transition"
                >
                  Logout
                </a>
              </li>
            </ul>
          </div>
        ) : (
          <ul className="flex space-x-4">
            <li>
              <Link href="/login" className="hover:underline text-white">
                Login
              </Link>
            </li>
            <li>
              <Link href="/register" className="hover:underline text-white">
                Register
              </Link>
            </li>
          </ul>
        )}
      </div>
    </header>
  );
}
