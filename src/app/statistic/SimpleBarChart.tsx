import "./SimpleBarChart.css";
import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";

const data = [
  {
    name: "ТК 1",
    Продажи: 4000,
    Прогноз: 2400,
    amt: 2400,
  },
  {
    name: "ТК 2",
    Продажи: 3000,
    Прогноз: 1398,
    amt: 2210,
  },
  {
    name: "ТК 3",
    Продажи: 2000,
    Прогноз: 9800,
    amt: 2290,
  },
  {
    name: "ТК 4",
    Продажи: 2780,
    Прогноз: 3908,
    amt: 2000,
  },
  {
    name: "ТК 5",
    Продажи: 1890,
    Прогноз: 4800,
    amt: 2181,
  },
  {
    name: "ТК 6",
    Продажи: 2390,
    Прогноз: 3800,
    amt: 2500,
  },
  {
    name: "ТК 7",
    Продажи: 3490,
    Прогноз: 4300,
    amt: 2100,
  },
];

export default function SimpleBarChart() {
  return (
    <BarChart
      width={1560}
      height={272}
      data={data}
      margin={{
        top: 5,
        right: 30,
        left: 20,
        bottom: 5,
      }}
      className="ml-5"
    >
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="name" />
      <YAxis />
      <Tooltip />
      <Legend />
      <Bar dataKey="Прогноз" fill="#003C96" />
      <Bar dataKey="Продажи" fill="#FFB900" />
    </BarChart>
  );
}
