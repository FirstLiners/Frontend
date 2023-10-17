"use client";
import React, { useState } from "react";
import { useAppSelector, useAppDispatch } from "@/redux/hooks";
import { setJsonData, clearForecasts } from "@/redux/features/forecastsSlice";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  Legend,
} from "recharts";

interface paramsApplyed {
  applyed: boolean;
  store: string[];
  group: string[];
  category: string[];
  subcategory: string[];
  sku: string[];
  uom: string[];
}
interface SimpleLineChartProps {
  params: paramsApplyed;
}

const SimpleLineChart: React.FC<SimpleLineChartProps> = ({ params }) => {
  // @ts-ignore

  const { forecastsItems } = useAppSelector((state) => state.forecasts);
  const linechartData = Object.entries(
    forecastsItems.reduce((acc, { date, sku, forecast_data }) => {
      if (!acc[date]) {
        acc[date] = { name: date };
      }
      acc[date][`line${Object.keys(acc[date]).length - 1}`] = forecast_data;
      // acc[date][sku] = forecast_data;
      return acc;
    }, {}),
  ).map(([name, data]) => ({
    name,
    ...data,
  }));

  const lines = Object.keys(linechartData[0])
    .filter((key) => key.startsWith("line"))
    .map((key, index) => (
      <Line
        key={key}
        type="monotone"
        dataKey={key}
        stroke={`#${(index + 1) * 111111}`}
        activeDot={{ r: 8 }}
      />
    ));

  return (
    <LineChart
      width={1500}
      height={500}
      data={linechartData}
      margin={{
        top: 5,
        right: 30,
        left: 20,
        bottom: 5,
      }}
    >
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="name" />
      <YAxis />
      <Tooltip />
      <Legend />
      {lines}
    </LineChart>
  );
};

export default SimpleLineChart;
