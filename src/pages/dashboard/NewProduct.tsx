import { FormProduct } from "@/components/FormProduct";
import { Helmet } from "react-helmet-async";

export const NewProduct = () => {
  return (
    <>
      <Helmet title="Novo Produto" />

      <div className="mb-12">
        <h1 className="font-bold text-2xl">Novo produto</h1>
        <span className="font-semibold text-base text-gray-400">
          Cadastre um produto para venda no marketplace
        </span>
      </div>

      <FormProduct />
    </>
  );
};
