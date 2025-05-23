import { DashboardResponse } from "@/type/dashboard";
import apiclient from "./apiclient";

export const getDashboard = async (
  status?: string
): Promise<DashboardResponse> => {
  try {
    const response = await apiclient.get<DashboardResponse>(
      "/dashboard",
      {
        params: status ? { status } : {},
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching dashboard:", error);
    throw error;
  }
};