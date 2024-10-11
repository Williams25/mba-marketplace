import { http } from "@/lib/axios";
import { ICategories } from "@/types/categories";

export const categoryServices = {
  getAll: async () => {
    const { data } = await http.get<ICategories>("categories");
    return data;
  }
};
