import { BarChart } from "@mantine/charts";

interface IReportRevenue {}
type barProps = {
  data: Array<IReportRevenue>;
  name: string;
  height: number | string;
};
export const BarchartComp = ({ data, name, height }: barProps) => {
  return (
    <BarChart
      h={height}
      data={data}
      dataKey='month'
      tooltipAnimationDuration={200}
      withLegend
      series={[{ name: name, color: "cyan.6", label: name }]}
      tickLine='y'
    />
  );
};
