import type { ApexOptions } from "apexcharts";
import { useMemo } from "react";
import ReactApexChart from "react-apexcharts";

type ChartType = NonNullable<ApexOptions["chart"]>["type"];

type PropsType = {
  type?: ChartType;
  height?: number | string;
  width?: number | string;
  getOptions: () => ApexOptions;
  series: ApexOptions["series"];
  className?: string;
};

export default function ApexChartClient({
  type,
  height,
  width = "100%",
  getOptions,
  series,
  className,
}: PropsType): JSX.Element {
  const options = useMemo<ApexOptions>(() => getOptions(), [getOptions]);

  return (
    <ReactApexChart
      type={type}
      height={height}
      width={width}
      options={options}
      series={series}
      className={className}
    />
  );
}
