import { http } from "@/lib/axios";
import { IMetricsDaysResponse, IMetricsResponse } from "@/types/metrics";

export const metricsService = {
  sold: async () => {
    const { data } = await http.get<IMetricsResponse>(
      "/sellers/metrics/products/sold"
    );
    return data;
  },
  available: async () => {
    const { data } = await http.get<IMetricsResponse>(
      "/sellers/metrics/products/available"
    );
    return data;
  },
  views: async () => {
    const { data } = await http.get<IMetricsResponse>("/sellers/metrics/views");
    return data;
  },
  days: async () => {
    const { data } = await http.get<IMetricsDaysResponse>(
      "/sellers/metrics/views/days"
    );
    return data;
  }
};
