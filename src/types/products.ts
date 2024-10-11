export interface IProduct {
  id: string;
  title: string;
  description: string;
  priceInCents: number;
  status: IProductStatus;
  owner: {
    id: string;
    name: string;
    phone: string;
    email: string;
    avatar: {
      id: string;
      url: string;
    };
  };
  category: {
    id: string;
    title: string;
    slug: string;
  };
  attachments: [
    {
      id: string;
      url: string;
    }
  ];
}

export interface IProducts {
  products: IProduct[];
}

export interface IProductDetails {
  product: IProduct;
}

export type IProductStatus = "available" | "sold" | "cancelled";

export enum IProductTranslate {
  "available" = "Anunciado",
  "sold" = "Vendido",
  "cancelled" = "Cancelado"
}

export enum DefaultStatusColor {
  "available" = "bg-blue-800 text-gray-200",
  "sold" = "bg-red-500 text-gray-200",
  "cancelled" = "bg-zinc-600 text-gray-200"
}

export interface IProductFilterParams {
  page: number;
  status?: IProductStatus;
  search?: string;
}

export interface IUpdateStatusProduct {
  status: IProductStatus;
  id: string;
}
