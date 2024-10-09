import { Metrics } from "@/components/Metrics";
import { VisitorsGraph } from "@/components/VisitorsGraph";
import { QUERY_KEYS } from "@/constants/QueryKeys";
import { metricsService } from "@/services/metricsService";
import { useQuery } from "@tanstack/react-query";
import { Helmet } from "react-helmet-async";

export const Dashboard = () => {
  const { data: sold, isLoading: isLoadingSold } = useQuery({
    queryKey: [QUERY_KEYS.GET_SOLD],
    queryFn: metricsService.sold
  });

  const { data: available, isLoading: isLoadingAvailable } = useQuery({
    queryKey: [QUERY_KEYS.GET_AVAILABLE],
    queryFn: metricsService.available
  });

  const { data: views, isLoading: isLoadingViews } = useQuery({
    queryKey: [QUERY_KEYS.GET_VIEWS],
    queryFn: metricsService.views
  });

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
          <Metrics
            label="Produtos vendidos"
            total={String(sold?.amount || 0)}
            type="sold"
            isPending={isLoadingSold}
          />
          <Metrics
            label="Produtos anunciados"
            total={String(available?.amount || 0)}
            type="store"
            isPending={isLoadingAvailable}
          />
          <Metrics
            label="Pessoas visitantes"
            total={String(views?.amount || 0)}
            type="visitors"
            isPending={isLoadingViews}
          />
        </div>

        <VisitorsGraph />
      </div>
    </>
  );
};
