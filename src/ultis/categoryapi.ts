import { ApiResponse } from "@/type/apiResponse";
import { Category } from "@/type/category";
import apiclient from "./apiclient";

export const fetchCategories = async (): Promise<ApiResponse<Category[]>> => {
    const response = await apiclient.get<ApiResponse<Category[]>>("/category");
    return response.data;
  };