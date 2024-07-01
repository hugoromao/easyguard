"use client";
import React, { useRef } from "react";

import { ResponsiveBar } from "@nivo/bar";
import { toJpeg } from "html-to-image";
import download from "downloadjs";
import dayjs from "dayjs";

type TestChartProps = {
  title: string;
  keys?: string[];
  colors?: string[];
  leftAxisLegend?: string;
  data: any[];
  maxValue?: number;
};

const TestChart = ({
  title,
  keys = ["EasyGuard", "Bitwarden"],
  colors = ["#4285F4", "#34A853"],
  leftAxisLegend = "Percentual de acerto",
  maxValue = 100,
  data,
}: TestChartProps) => {
  const chart = useRef<HTMLDivElement | null>(null);

  async function downloadChart() {
    const element = chart.current;
    if (!element) return;
    const dataUrl = await toJpeg(element);
    download(dataUrl, `${dayjs().format("DD-MM-YYYY HH:mm:ss")}.jpg`);
  }

  return (
    <>
      <div
        className="flex flex-col items-center gap-4 w-[1024px] h-[576px] bg-white"
        ref={chart}
      >
        <h1
          className="w-fit font-bold text-xl text-center mt-4 cursor-pointer"
          onClick={downloadChart}
        >
          {title}
        </h1>
        <ResponsiveBar
          data={data as any}
          groupMode="grouped"
          keys={keys}
          enableLabel={false}
          indexBy="name"
          margin={{ top: 5, bottom: 100, left: 50, right: 30 }}
          padding={0.3}
          colors={colors}
          maxValue={maxValue}
          axisBottom={{
            tickSize: 5,
            tickPadding: 5,
            tickRotation: 0,
            legendPosition: "middle",
            legendOffset: 32,
            truncateTickAt: 0,
          }}
          axisLeft={{
            tickSize: 5,
            tickPadding: 5,
            tickRotation: 0,
            legend: leftAxisLegend,
            legendPosition: "middle",
            legendOffset: -40,
            truncateTickAt: 0,
          }}
          labelSkipWidth={12}
          labelSkipHeight={12}
          labelTextColor={{
            from: "color",
            modifiers: [["darker", 1.6]],
          }}
          legends={[
            {
              dataFrom: "keys",
              anchor: "bottom",
              direction: "row",
              justify: false,
              translateX: 0,
              translateY: 60,
              itemsSpacing: 2,
              itemWidth: 100,
              itemHeight: 20,
              itemDirection: "left-to-right",
              itemOpacity: 0.85,
              symbolSize: 20,
              effects: [
                {
                  on: "hover",
                  style: {
                    itemOpacity: 1,
                  },
                },
              ],
            },
          ]}
        />
      </div>
    </>
  );
};

export default TestChart;
