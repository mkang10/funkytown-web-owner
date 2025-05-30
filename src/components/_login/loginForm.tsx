"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import toast, { Toaster } from "react-hot-toast";
import { loginUser } from "@/ultis/AuthAPI";
import { LoginResponse } from "@/type/auth";
import { motion } from "framer-motion";

export default function LoginPage() {
  const router = useRouter();
  const [email, setemail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  // Hiệu ứng chuyển đổi logo/tiêu đề (giữ nguyên UI)
  const [showLogo, setShowLogo] = useState(true);
  const [fadeOut, setFadeOut] = useState(false);
  useEffect(() => {
    const interval = setInterval(() => {
      setFadeOut(true);
      setTimeout(() => {
        setShowLogo((prev) => !prev);
        setFadeOut(false);
      }, 1250);
    }, 2500);
    return () => clearInterval(interval);
  }, []);

  // Xử lý đăng nhập
  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    const credentials = { email: email, password: password };
    try {
      const response: LoginResponse = await loginUser(credentials);
      if (response.status) {
        toast.success(response.message || "Login successful!", {
          duration: 4000,
          style: {
            borderRadius: "12px",
            background: "linear-gradient(90deg, #2152ff, #21d4fd)",
            color: "#fff",
            fontWeight: 500,
            boxShadow: "0 4px 12px rgba(0, 0, 0, 0.2)",
          },
          iconTheme: {
            primary: "#4ade80",
            secondary: "#fff",
          },
        });
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("account", JSON.stringify(response.data.account));
        setTimeout(() => {
          router.push("/dashboard");
        }, 2000);
      } else {
        toast.error(response.message || "Login failed!", {
          duration: 4000,
          style: {
            borderRadius: "12px",
            background: "#ff4d4d",
            color: "#fff",
            fontWeight: 500,
            boxShadow: "0 4px 12px rgba(0, 0, 0, 0.2)",
          },
          iconTheme: {
            primary: "#ff0000",
            secondary: "#fff",
          },
        });
      }
    } catch (error: any) {
      console.error("Login error:", error);
      toast.error(
        error.response?.data?.message ||
          "An error occurred during login. Please try again later.",
        {
          duration: 4000,
          style: {
            borderRadius: "12px",
            background: "#ff4d4d",
            color: "#fff",
            fontWeight: 500,
            boxShadow: "0 4px 12px rgba(0, 0, 0, 0.2)",
          },
          iconTheme: {
            primary: "#ff0000",
            secondary: "#fff",
          },
        }
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col min-h-screen w-full bg-gradient-to-b from-white via-blue-50 to-white">
     
      {/* BANNER */}
      <div
        className="relative w-11/12 mx-auto mt-8 h-[50vh] bg-fixed bg-center bg-cover rounded-xl shadow-2xl overflow-hidden"
        style={{ backgroundImage: "url('/assets/pexels-steve-29599682.avif')" }}
      >
        <div className="absolute inset-0 bg-black/40"></div>
        <div className="relative z-10 flex flex-col items-center justify-center h-full text-center text-white px-4">
          <motion.h1
            className="text-4xl md:text-5xl font-extrabold mb-3 drop-shadow-lg"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
          >
            Welcome Back!
          </motion.h1>
          <motion.p
            className="text-sm md:text-lg max-w-md drop-shadow"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.3 }}
          >
            Enter your email and password to login
          </motion.p>
        </div>
      </div>

      {/* FORM */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.6 }}
        className="container mx-auto px-4"
      >
        <div className="relative -mt-16 w-full max-w-md mx-auto bg-white rounded-2xl shadow-xl p-6 md:p-8">
          <h2 className="text-center text-2xl font-bold text-gray-700 mb-6">
            Login
          </h2>
          <form onSubmit={handleLogin}>
            <div className="mb-4">
              <label className="block text-sm font-semibold text-gray-700 mb-1">
                Email
              </label>
              <input
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setemail(e.target.value)}
                className="block w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition"
                required
              />
            </div>
            <div className="mb-6">
              <label className="block text-sm font-semibold text-gray-700 mb-1">
                Password
              </label>
              <input
                type="password"
                placeholder="********"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="block w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition"
                required
              />
            </div>
            <button
              type="submit"
              disabled={loading}
              className={`w-full rounded-full py-3 text-sm font-bold uppercase text-white shadow-lg transition-transform transform hover:scale-105 ${
                loading
                  ? "bg-gradient-to-r from-gray-400 to-gray-500 cursor-not-allowed"
                  : "bg-gradient-to-r from-black to-black"
              }`}
            >
              {loading ? (
                <span className="flex items-center justify-center">
                  <svg
                    className="animate-spin h-5 w-5 mr-2 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8v8z"
                    ></path>
                  </svg>
                  Logging in...
                </span>
              ) : (
                "Log In"
              )}
            </button>
          </form>
        </div>
      </motion.div>



      <Toaster />
    </div>
  );
}
