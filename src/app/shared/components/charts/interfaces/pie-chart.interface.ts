import { ApexChart, ApexNonAxisChartSeries, ApexResponsive } from "ng-apexcharts";

export type PieChartOptions = {
    series: ApexNonAxisChartSeries;
    chart: ApexChart;
    responsive: ApexResponsive[];
    labels: any;
  };