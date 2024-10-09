export interface IMetricsResponse {
  amount: number;
}

export interface IMetricsDaysResponse {
  viewsPerDay: {
    date: string;
    amount: number;
  }[];
}
