import { FormProviderCustom } from "@/components/FormProviderCustom";
import { InputCustom } from "@/components/InputCustom";
import { SelectCustom } from "@/components/SelectCustom";
import { Button } from "@/components/ui/button";
import { Search, Tag, Trash } from "lucide-react";
import { Helmet } from "react-helmet-async";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useSearchParams } from "react-router-dom";
import { QUERY_PARAMS } from "@/constants/QueryParams";
import { zodResolver } from "@hookform/resolvers/zod";
import { productsService } from "@/services/productsService";
import { useQuery } from "@tanstack/react-query";
import { QUERY_KEYS } from "@/constants/QueryKeys";
import { IProductStatus } from "@/types/products";
import { ProductCard } from "@/components/ProductCard";
import { ProductCardSkeleton } from "@/components/ProductCardSkeleton";
import { DefaultStatus } from "@/constants/DefaultStatus";

const schema = z.object({
  search: z.string().optional(),
  status: z.string().optional()
});

type ISearchForm = z.infer<typeof schema>;

export const Products = () => {
  const [params, setParams] = useSearchParams();
  const search = params.get(QUERY_PARAMS.SEARCH) || "";
  const status = (params.get(QUERY_PARAMS.STATUS) || "") as IProductStatus;
  const page = Number(params.get(QUERY_PARAMS.STATUS)) || 1;

  const { data: products, isLoading: isLoadingProducts } = useQuery({
    queryKey: [QUERY_KEYS.GET_ALL_PRODUCTS, page, status, search],
    queryFn: () =>
      productsService.allProducts({
        page,
        status: status || "available",
        search
      })
  });

  const methods = useForm<ISearchForm>({
    values: {
      search,
      status
    },
    resolver: zodResolver(schema)
  });

  const handleSearch = (data: ISearchForm) => {
    params.set(QUERY_PARAMS.SEARCH, data.search || "");
    params.set(QUERY_PARAMS.STATUS, data.status || "");
    setParams(params);
  };

  const handleClearFilters = () => {
    params.delete(QUERY_PARAMS.SEARCH);
    params.delete(QUERY_PARAMS.STATUS);
    setParams(params);
  };

  return (
    <>
      <Helmet title="Produtos" />

      <div className="mb-12">
        <h1 className="font-bold text-2xl">Seus produtos</h1>
        <span className="font-semibold text-base text-gray-400">
          Acesse gerencie a sua lista de produtos à venda
        </span>
      </div>

      <div className="grid grid-flow-col grid-cols-[240px_auto] gap-10 items-start">
        <FormProviderCustom
          methods={methods}
          onSubmit={methods.handleSubmit(handleSearch)}
          className="flex flex-col gap-3 bg-white rounded-md px-5 py-5 sticky top-6"
        >
          <p className="font-semibold text-xl text-gray-600">Filtrar</p>
          <InputCustom
            id="search"
            placeholder="Pesquisar"
            startIcon={<Search />}
            className="mb-4"
          />
          <SelectCustom
            id="status"
            startIcon={<Tag />}
            placeholder="Status"
            options={DefaultStatus}
          />
          <Button className="mt-4" type="submit">
            Aplicar filtro
          </Button>

          {search.length > 0 || status.length > 0 ? (
            <Button
              className="mt-1 flex gap-2"
              type="button"
              variant={"destructive"}
              onClick={handleClearFilters}
            >
              <Trash /> Limpar filtro
            </Button>
          ) : null}
        </FormProviderCustom>

        <div className="w-full flex gap-6 flex-wrap justify-start items-start pb-10">
          {isLoadingProducts && (
            <>
              <ProductCardSkeleton />
              <ProductCardSkeleton />
              <ProductCardSkeleton />
              <ProductCardSkeleton />
              <ProductCardSkeleton />
              <ProductCardSkeleton />
            </>
          )}

          {!isLoadingProducts &&
            products?.map((product) => (
              <ProductCard key={product.id} {...product} />
            ))}
        </div>
      </div>
    </>
  );
};
