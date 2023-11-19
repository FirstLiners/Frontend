import React, { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import './SimpleBarChart.css';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

/*
const data = [
  {
    name: "ТК 1", // store
    real_sale: 4000, // real_sale
    forecast: 2400, // forecast
    diff: 2400, // difference
  },
  {
    name: "ТК 2",
    real_sale: 3000,
    forecast: 1398,
    diff: 2210,
  },
  {
    name: "ТК 3",
    real_sale: 2000,
    forecast: 9800,
    diff: 2290,
  },
  {
    name: "ТК 4",
    real_sale: 2780,
    forecast: 3908,
    diff: 2000,
  },
  {
    name: "ТК 5",
    real_sale: 1890,
    forecast: 4800,
    diff: 2181,
  },
  {
    name: "ТК 6",
    real_sale: 2390,
    forecast: 3800,
    diff: 2500,
  },
  {
    name: "ТК 7",
    real_sale: 3490,
    forecast: 4300,
    diff: 2100,
  },
];
*/

type params = {
  applyed: boolean;
  store: string[];
  group: string[];
  category: string[];
  subcategory: string[];
  sku: string[];
  uom: string[];
};

interface paramsApplyed {
  key: string;
  value: string;
}
[];

type SimpleBarChartProps = {};

const SimpleBarChart: React.FC<SimpleBarChartProps> = () => {
  const dispatch = useAppDispatch();
  // const { isAuthenticated, token } = useAppSelector((state) => state.auth);
  const { StatisticsItems = [] } = useAppSelector((state) => state.statistics) || [];
  const { paramsApplyed = [] } = useAppSelector((state) => state.statistics) || {};

  const filteredData = StatisticsItems.filter((item) => {
    if (!Array.isArray(paramsApplyed)) {
      return true;
    }
    return (
      !paramsApplyed ||
      paramsApplyed.every((param: { key: string; value: string }) => {
        return item[param.key] === param.value;
      })
    );
  });

  if (filteredData.length === 0) {
    return null;
  }

  const data = filteredData.map((item) => ({
    name: item.store,
    real_sale: item.real_sale,
    forecast: item.forecast,
  }));

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
      <Bar dataKey="forecast" fill="#003C96" />
      <Bar dataKey="real_sale" fill="#FFB900" />
    </BarChart>
  );
};

export default SimpleBarChart;
