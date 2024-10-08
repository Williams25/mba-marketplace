import { Metrics } from "@/components/Metrics";
import { Helmet } from "react-helmet-async";

export const Dashboard = () => {
  return (
    <>
      <Helmet title="Dashboard" />

      <div className="mb-12">
        <h1 className="font-bold text-2xl">Últimos 30 dias</h1>
        <span className="font-semibold text-base text-gray-400">
          Confira as estatísticas da sua loja no último mês
        </span>
      </div>

      <div className="grid grid-flow-col grid-cols-[240px_auto] gap-10">
        <div className="flex flex-col gap-4">
          <Metrics label="Produtos vendidos" total="25" type="sold" />
          <Metrics label="Produtos anunciados" total="56" type="store" />
          <Metrics label="Pessoas visitantes" total="1.238" type="visitors" />
        </div>

        <div>grafico</div>
      </div>
    </>
  );
};
