"use client";
import React, { useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  Legend,
} from "recharts";

const dt = [
  {
    store: "Lenta_1",
    group: "by_weight",
    category: "Kulinaria",
    subcategory: "salaty",
    sku: "olivier",
    date: "2023-10-14",
    forecast_data: 100,
    uom: "10",
  },
  {
    store: "Lenta_1",
    group: "by_weight",
    category: "Kulinaria",
    subcategory: "pirojki",
    sku: "pirojok_s_kapustoi",
    date: "2023-10-14",
    forecast_data: 10,
    uom: "1",
  },
  {
    store: "Lenta_1",
    group: "by_weight",
    category: "Kulinaria",
    subcategory: "pirojki",
    sku: "pirojok_s_kapustoi",
    date: "2023-10-15",
    forecast_data: 101,
    uom: "1",
  },
];

const SimpleLineChart = ({ data }) => {
  // @ts-ignore

  // @ts-ignore

  // @ts-ignore

  return (
    <LineChart
      width={1500}
      height={500}
      data={data}
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
      <Line
        type="monotone"
        dataKey="line1"
        stroke="#8884d8"
        activeDot={{ r: 8 }}
      />
      <Line type="monotone" dataKey="line0" stroke="#82ca9d" />
    </LineChart>
  );
};

export default SimpleLineChart;
