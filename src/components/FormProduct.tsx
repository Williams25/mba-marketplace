import { currencyMask } from "@/utils/masks";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { FormProviderCustom } from "./FormProviderCustom";
import { AttachmentFile } from "./AttachmentFile";
import { InputCustom } from "./InputCustom";
import { TextareaCustom } from "./TextareaCustom";
import { SelectCustom } from "./SelectCustom";
import { QUERY_KEYS } from "@/constants/QueryKeys";
import { categoryServices } from "@/services/categoryServices";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Button } from "./ui/button";
import { productsService } from "@/services/productsService";
import { toast } from "sonner";
import { AxiosError } from "axios";
import {
  DefaultStatusColor,
  IProductStatus,
  IProductTranslate
} from "@/types/products";
import { parsePriceMultipliedOneHundred } from "@/utils/currencyUtils";
import { useNavigate } from "react-router-dom";
import { DEFAULT_ROUTES } from "@/constants/DefaultRoutes";
import { ERRORS_MESSAGES } from "@/constants/ErrorsMessages";
import { useMemo } from "react";

const schema = z.object({
  id: z.string().nullish(),
  file: z.instanceof(File).nullish(),
  attachmentsIds: z
    .array(
      z.object({
        id: z.string(),
        url: z.string()
      })
    )
    .optional(),
  title: z
    .string({ message: ERRORS_MESSAGES.REQUIRED_FIELD })
    .min(1, { message: ERRORS_MESSAGES.REQUIRED_FIELD }),
  categoryId: z
    .string({ message: ERRORS_MESSAGES.REQUIRED_FIELD })
    .min(1, { message: ERRORS_MESSAGES.REQUIRED_FIELD }),
  description: z
    .string({ message: ERRORS_MESSAGES.REQUIRED_FIELD })
    .min(1, { message: ERRORS_MESSAGES.REQUIRED_FIELD }),
  priceInCents: z
    .string({ message: ERRORS_MESSAGES.REQUIRED_FIELD })
    .min(1, { message: ERRORS_MESSAGES.REQUIRED_FIELD })
    .transform((value) => parsePriceMultipliedOneHundred(value))
});

export type IFormProductData = z.infer<typeof schema>;

const initialValuesForm: IFormProductData = {
  id: "",
  categoryId: "",
  description: "",
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  priceInCents: "0,00" as any,
  title: "",
  attachmentsIds: [],
  file: null
};

export interface IFormProductProps {
  defaultValues?: IFormProductData;
  status?: IProductStatus;
}

export const FormProduct = ({ defaultValues, status }: IFormProductProps) => {
  const navigate = useNavigate();

  const methods = useForm<IFormProductData>({
    defaultValues: defaultValues || initialValuesForm,
    resolver: zodResolver(schema)
  });

  const queryClient = useQueryClient();

  const { mutateAsync, isPending } = useMutation({
    mutationFn: defaultValues?.id
      ? productsService.editProduct
      : productsService.createProduct
  });

  const handleSaveProduct = async (data: IFormProductData) => {
    try {
      const response = await mutateAsync(data);
      toast.success(
        `Produto ${response.title.toUpperCase()} salvo com sucesso!`
      );
      methods.reset({ ...initialValuesForm });
      navigate(
        DEFAULT_ROUTES.PRIVATE.PRODUCT_DETAILS.replace(":id", response.id)
      );
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.GET_SOLD]
      });
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.GET_AVAILABLE]
      });
    } catch (error) {
      const axiosError = error as AxiosError<{ message: string }>;

      toast.error(
        axiosError.response?.data?.message ||
          `Erro ao salvar produto - ${data.title.toUpperCase()}`
      );
    }
  };

  const { data: categories, isLoading: isLoadingCategories } = useQuery({
    queryKey: [QUERY_KEYS.GET_CATEGORIES],
    queryFn: categoryServices.getAll,
    select(data) {
      return (
        data?.categories?.map((category) => ({
          label: category.title,
          value: category.id
        })) || []
      );
    }
  });

  const attachmentsIdsWatched = methods.watch("attachmentsIds");

  const isDisabledProductToStatus = useMemo(() => {
    return status === "cancelled" || status === "sold";
  }, [status]);

  return (
    <FormProviderCustom
      methods={methods}
      onSubmit={methods.handleSubmit(handleSaveProduct)}
      className="grid grid-cols-2 gap-5 items-start"
    >
      <AttachmentFile
        id="file"
        className="mb-4"
        classNameLabel="max-w-[415px] max-h-[340px] min-h-[340px] min-w-[415px]"
        image={attachmentsIdsWatched ? attachmentsIdsWatched[0]?.url : null}
        disabled={isPending || isLoadingCategories || isDisabledProductToStatus}
      />

      <div className="bg-white px-6 py-8 rounded-md">
        <div className="mb-10 flex items-center justify-between">
          <h1 className="text-gray-700 font-bold text-2xl">Dados do produto</h1>
          {status && (
            <span
              className={`px-3 py-1 rounded-full text-sm font-semibold ${DefaultStatusColor[status] || "bg-gray-800 text-gray-200"}`}
            >
              {IProductTranslate[status]}
            </span>
          )}
        </div>
        <div className="grid grid-cols-2 gap-4 items-start">
          <InputCustom
            label="Título"
            id="title"
            placeholder="Nome do produto"
            className="mb-4"
            disabled={
              isPending || isLoadingCategories || isDisabledProductToStatus
            }
          />

          <InputCustom
            label="Valor"
            id="priceInCents"
            placeholder="R$ 0,00"
            className="mb-4"
            mask={currencyMask}
            disabled={
              isPending || isLoadingCategories || isDisabledProductToStatus
            }
          />
        </div>

        <TextareaCustom
          label="Descrição"
          id="description"
          placeholder="Escreva detalhes sobre o produto, tamanho, características"
          className="mb-4"
          disabled={
            isPending || isLoadingCategories || isDisabledProductToStatus
          }
        />

        <SelectCustom
          label="Categoria"
          id="categoryId"
          placeholder="Selecione"
          options={categories || []}
          disabled={
            isPending || isLoadingCategories || isDisabledProductToStatus
          }
        />

        <div className="mt-8 w-full flex gap-10">
          <Button
            type="button"
            className="w-full"
            variant={"outline"}
            disabled={isPending || isLoadingCategories}
            onClick={() =>
              navigate(
                defaultValues?.id
                  ? DEFAULT_ROUTES.PRIVATE.PRODUCT_DETAILS.replace(
                      ":id",
                      defaultValues.id
                    )
                  : DEFAULT_ROUTES.PRIVATE.PRODUCTS
              )
            }
          >
            Cancelar
          </Button>
          <Button
            type="submit"
            className="w-full"
            disabled={isPending || isDisabledProductToStatus}
          >
            {isPending ? "Publicando produto..." : "Salvar e publicar"}
          </Button>
        </div>
      </div>
    </FormProviderCustom>
  );
};
