import { Skeleton } from "@/components/ui/skeleton";
import { DEFAULT_ROUTES } from "@/constants/DefaultRoutes";
import { QUERY_KEYS } from "@/constants/QueryKeys";
import { productsService } from "@/services/productsService";
import { DefaultStatusColor, IProductTranslate } from "@/types/products";
import { currency, parsePriceDividedHundred } from "@/utils/currencyUtils";
import { useQuery } from "@tanstack/react-query";
import { Edit2, MoveLeft } from "lucide-react";
import { Helmet } from "react-helmet-async";
import { Link, useParams } from "react-router-dom";

export interface IParamsId {
  id: string;
}

export const DetailProduct = () => {
  const params = useParams() as unknown as IParamsId;

  const { data: product, isLoading: isLoadingProduct } = useQuery({
    queryKey: [QUERY_KEYS.GET_PRODUCT_DETAIL, params.id],
    queryFn: () => productsService.getProductById(params.id),
    enabled: !!params.id
  });

  return (
    <>
      <Helmet title="Detalhes do Produto" />

      <div className="mb-12">
        <div className="flex items-center justify-between">
          <Link
            to={DEFAULT_ROUTES.PRIVATE.PRODUCTS}
            className="text-orange-500 flex gap-2 items-center mb-7 font-medium text-base"
          >
            <MoveLeft className="w-4 h-4" />
            Voltar
          </Link>

          <Link
            to={DEFAULT_ROUTES.PRIVATE.PRODUCT_EDIT.replace(":id", params.id)}
            className="text-orange-500 flex gap-2 items-center mb-7 font-medium text-base"
          >
            <Edit2 className="w-4 h-4" />
            Editar produto
          </Link>
        </div>
        <h1 className="font-bold text-2xl">
          Detalhes do produto para no marketplace
        </h1>
      </div>
      <div className="bg-white grid grid-cols-2 px-9 py-10 rounded-md">
        {isLoadingProduct ? (
          <Skeleton className="w-[450px] h-[450px] rounded-2xl" />
        ) : (
          <img
            src={product?.attachments[0].url || ""}
            className="w-[450px] h-[450px] object-cover rounded-2xl"
          />
        )}

        <div>
          {isLoadingProduct && (
            <>
              <Skeleton className="w-full h-[24px]" />
              <Skeleton className="w-10/12 h-[24px] mt-2" />
              <Skeleton className="w-9/12 h-[24px] mt-2" />
              <Skeleton className="w-8/12 h-[60px] mt-2" />
              <Skeleton className="w-7/12 h-[24px] mt-2" />
            </>
          )}
          {product && !isLoadingProduct && (
            <>
              <p className="font-bold text-2xl text-gray-700">
                Nome do Produto: {product?.title}
              </p>
              <p className="font-bold text-xl text-gray-700">
                Categoria: {product?.category?.title}
              </p>
              <p className="font-bold text-xl text-gray-700">
                Preço:{" "}
                {currency(parsePriceDividedHundred(product?.priceInCents || 0))}
              </p>
              <p className="font-medium text-lg text-gray-700">
                <strong>Descrição:</strong> {product?.description}
              </p>
              <p className="font-medium text-lg text-gray-700">
                <strong>Status</strong>{" "}
                <span
                  className={`px-3 py-1 rounded-full text-sm font-semibold ${DefaultStatusColor[product.status] || "bg-gray-800 text-gray-200"}`}
                >
                  {IProductTranslate[product.status]}
                </span>
              </p>

              {product.owner && (
                <div className="flex mt-5 items-center justify-start gap-4">
                  {product?.owner?.avatar?.url ? (
                    <img
                      src={product?.owner?.avatar?.url}
                      className="min-w-10 min-h-10 object-cover rounded-full"
                    />
                  ) : (
                    <span className="min-w-10 w-10 h-10  text-white font-semibold min-h-10 object-cover rounded-full bg-gray-800 flex justify-center items-center text-lg">
                      {product?.owner?.name?.split("")[0]?.toUpperCase()}
                    </span>
                  )}

                  <div>
                    <p className="font-semibold text-lg text-gray-700">
                      {product?.owner?.email}
                    </p>
                    <p className="font-medium text-xs text-gray-700">
                      {product?.owner?.phone}
                    </p>
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </>
  );
};
