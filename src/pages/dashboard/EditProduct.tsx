import { FormProduct, IFormProductData } from "@/components/FormProduct";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Helmet } from "react-helmet-async";
import { IParamsId } from "./DetailProduct";
import { Link, useParams } from "react-router-dom";
import { productsService } from "@/services/productsService";
import { QUERY_KEYS } from "@/constants/QueryKeys";
import { IProduct, IProductStatus, IProductTranslate } from "@/types/products";
import { DEFAULT_ROUTES } from "@/constants/DefaultRoutes";
import { Ban, Check, MoveLeft } from "lucide-react";
import { toast } from "sonner";
import { AxiosError } from "axios";

const parseDateProductToEdit = (product?: IProduct): IFormProductData => {
  return {
    categoryId: product?.category?.id || "",
    description: product?.description || "",
    priceInCents: (product?.priceInCents
      ? (product?.priceInCents / 100).toString()
      : // eslint-disable-next-line @typescript-eslint/no-explicit-any
        "00,00") as any,
    title: product?.title || "",
    attachmentsIds: product?.attachments || [],
    file: null,
    id: product?.id || ""
  };
};

export const EditProduct = () => {
  const params = useParams() as unknown as IParamsId;
  const queryClient = useQueryClient();

  const { data: product, isLoading: isLoadingProduct } = useQuery({
    queryKey: [QUERY_KEYS.GET_PRODUCT_DETAIL, params.id],
    queryFn: () => productsService.getProductById(params.id),
    enabled: !!params.id
  });

  const { mutateAsync, isPending } = useMutation({
    mutationFn: productsService.updateStatus
  });

  const handleUpdateStatus = async (status: IProductStatus) => {
    try {
      await mutateAsync({ id: product?.id!, status: status });
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.GET_PRODUCT_DETAIL]
      });
      toast.success(
        `Status do Produto atualizado para ${IProductTranslate[status].toUpperCase()}!`
      );
    } catch (error) {
      const axiosError = error as AxiosError<{ message: string }>;
      toast.error(
        axiosError.response?.data?.message ||
          `Erro ao salvar status do produto - ${IProductTranslate[status]}`
      );
    }
  };

  return (
    <>
      <Helmet title="Editar Produto" />

      <div className="mb-12 grid grid-cols-2 items-end">
        <div>
          <Link
            to={DEFAULT_ROUTES.PRIVATE.PRODUCT_DETAILS.replace(
              ":id",
              params.id
            )}
            className="text-orange-500 flex gap-2 items-center mb-7 font-medium text-base"
          >
            <MoveLeft className="w-4 h-4" />
            Voltar
          </Link>
          <h1 className="font-bold text-2xl">Editar produto</h1>
          <span className="font-semibold text-base text-gray-400">
            Gerencie as informações do produto cadastrado
          </span>
        </div>

        <div className="flex gap-4 items-center justify-end">
          <button
            className="text-orange-500 flex gap-2 items-center font-semibold text-base"
            onClick={() =>
              handleUpdateStatus(
                product?.status === "cancelled" || product?.status === "sold"
                  ? "available"
                  : "sold"
              )
            }
            disabled={isPending || isLoadingProduct}
          >
            <Check className="w-4 h-4" />{" "}
            {product?.status === "cancelled" || product?.status === "sold"
              ? "Marcar como Anunciado"
              : "Marcar como vendido"}
          </button>

          <button
            className="text-orange-500 flex gap-2 items-center font-semibold text-base"
            disabled={
              product?.status === "cancelled" || isPending || isLoadingProduct
            }
            onClick={() => handleUpdateStatus("cancelled")}
          >
            <Ban className="w-4 h-4" /> Desativar anúncio
          </button>
        </div>
      </div>

      <FormProduct
        defaultValues={parseDateProductToEdit(product)}
        status={product?.status}
      />
    </>
  );
};
