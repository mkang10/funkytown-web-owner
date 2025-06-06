import apiclient from "./apiclient";
import { LoginRequest, LoginResponse } from "@/type/auth";

// POST: Đăng nhập người dùng
export const loginUser = async (
  credentials: LoginRequest
): Promise<LoginResponse> => {
  try {
    const response = await apiclient.post<LoginResponse>(
      "/auth/login",
      credentials
    );

    // Nếu bạn muốn lưu token sau khi login, hãy kiểm tra môi trường trước
    if (typeof window !== "undefined") {
      localStorage.setItem("token", response.data.data.token);
    }

    return response.data;
  } catch (error) {
    console.error("Error logging in:", error);
    throw error;
  }
};
