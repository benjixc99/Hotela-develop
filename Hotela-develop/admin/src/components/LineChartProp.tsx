/* eslint-disable @typescript-eslint/no-explicit-any */
import { AreaChart, getFilteredChartTooltipPayload } from "@mantine/charts";
import { Paper, Text } from "@mantine/core";

const LineChartProp = ({
  data,
  name,
  datakey,
}: {
  data: any;
  name: string;
  datakey: string;
}) => {
  interface ChartTooltipProps {
    label: string;
    payload: Record<string, any>[] | undefined;
  }

  function ChartTooltip({ label, payload }: ChartTooltipProps) {
    if (!payload) return null;

    return (
      <Paper px='md' py='sm' withBorder shadow='md' radius='md'>
        <Text fw={500} mb={5}>
          {label}
        </Text>
        {getFilteredChartTooltipPayload(payload).map((item: any) => (
          <Text key={item.name} c={item.color} fz='sm'>
            {item.name}: {item.value}
          </Text>
        ))}
      </Paper>
    );
  }
  return (
    <>
      <AreaChart
        w={"100%"}
        h={"90%"}
        data={data}
        translate='yes'
        withTooltip={true}
        dataKey={datakey}
        tooltipProps={{
          content: ({ label, payload }) => (
            <ChartTooltip label={label} payload={payload} />
          ),
        }}
        series={[{ name: name, color: "rgb(9, 188, 138)" }]}
        curveType='monotone'
        tooltipAnimationDuration={600}
        fillOpacity={0.39}
      />
    </>
  );
};

export default LineChartProp;
