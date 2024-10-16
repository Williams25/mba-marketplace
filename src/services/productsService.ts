import { http } from "@/lib/axios";
import {
  IProductDetails,
  IProductFilterParams,
  IProducts,
  IUpdateStatusProduct
} from "@/types/products";
import { attachmentsService } from "./attachmentsService";
import { IFormProductData } from "@/components/FormProduct";

export const productsService = {
  allProducts: async ({
    page,
    search = "",
    status = "available"
  }: IProductFilterParams) => {
    const { data } = await http.get<IProducts>(`/products`, {
      params: {
        page,
        status,
        search
      }
    });

    return data?.products || [];
  },
  productsMe: async ({
    search,
    status
  }: Pick<IProductFilterParams, "search" | "status">) => {
    const params = { search, status };
    if (!params.search?.length) delete params.search;
    if (!params.status?.length) delete params.status;

    const { data } = await http.get<IProducts>(`/products/me`, {
      params
    });

    return data?.products || [];
  },
  getProductById: async (id: string) => {
    const { data } = await http.get<IProductDetails>(`/products/${id}`);

    return data?.product;
  },
  createProduct: async (params: IFormProductData) => {
    const attachmentsIds: string[] = params.file
      ? []
      : [...(params.attachmentsIds?.map(({ id }) => id) || [])];
    if (params.file) {
      const uploadedFiles = await attachmentsService.upload([params.file]);
      const uploadedFile = uploadedFiles?.attachments[0]?.id || null;
      uploadedFile && attachmentsIds.push(uploadedFile);
    }
    const { data } = await http.post<IProductDetails>(`/products`, {
      ...params,
      attachmentsIds
    });

    return data.product;
  },
  editProduct: async (params: IFormProductData) => {
    const attachmentsIds: string[] = params.file
      ? []
      : [...(params.attachmentsIds?.map(({ id }) => id) || [])];
    if (params.file) {
      const uploadedFiles = await attachmentsService.upload([params.file]);
      const uploadedFile = uploadedFiles?.attachments[0]?.id || null;
      uploadedFile && attachmentsIds.push(uploadedFile);
    }
    const { data } = await http.put<IProductDetails>(`/products/${params.id}`, {
      ...params,
      attachmentsIds
    });

    return data.product;
  },
  updateStatus: async (params: IUpdateStatusProduct) => {
    const { data } = await http.patch<IProductDetails>(
      `/products/${params.id}/available`,
      {
        ...params
      }
    );
    return data.product;
  }
};
