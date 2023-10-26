// this hook must take data that consist of nested key: value  from the mockdata forecasts.json file and return return [value, setValue] for the given key argument
import { useAppSelector, useAppDispatch } from "@/redux/hooks";
import { setJsonData } from "@/redux/features/forecastsSlice";
import { setStatisticData } from "@/redux/features/statisticSlice";
import { useState, useEffect } from "react";
import useStorage from "@rehooks/local-storage";
// теперь данные фетчатся с бэкенда TODO: rename module to use-fetchdata
import axios from "axios";

type Forecast = {
  store: string;
  group: string;
  category: string;
  subcategory: string;
  sku: string;
  date: string;
  forecast_data: number;
  uom: string;
  [key: string]: any;
};

type Statistic = {
  store: string;
  group: string;
  category: string;
  subcategory: string;
  sku: string;
  uom: string;
  real_sale: number;
  forecast: number;
  difference: number;
  period: number;
  wape: number;
  [key: string]: any;
};

interface Statistics {
  data: Statistic[];
}

interface Forecasts {
  data: Forecast[];
}

type Token = {
  access?: string;
  refresh?: string;
};

async function fetchForecasts(token: Token | null | undefined): Promise<Forecasts> {
  const config = {
    headers: {
      Authorization: `Bearer ${token?.access}`,
    },
  };
  const backend = process.env.NEXT_PUBLIC_BACKEND as string;
  // console.log(`Bearer ${token?.access}`);
  const response = await axios.get(`${backend}/api/v1/forecasts`, config);
  // console.log(JSON.stringify(response.data));
  return response.data as unknown as Forecasts;
}

async function fetchStatistics(token: Token | null | undefined): Promise<Statistics> {
  const config = {
    headers: {
      Authorization: `Bearer ${token?.access}`,
    },
  };
  const backend = process.env.NEXT_PUBLIC_BACKEND as string;
  const response = await axios.get(`${backend}/api/v1/statistics`, config);

  return response.data as unknown as Statistics;
}

async function fetchData(
  //кешированные данные из стора
  Items: Forecasts | Statistics,
  token: Token | null | undefined,
  key: string,
): Promise<Forecasts | Statistics> {
  switch (key) {
    case "forecast":
      return Array.isArray(Items) && Items.length ? Items : fetchForecasts(token);
      // it seems that  fetchForecasts(token) does not return data, need to verify that
      console.log(`fetchedData: ${JSON.stringify(Items)}`);
    case "statistics":
      return Array.isArray(Items) && Items.length ? Items : fetchStatistics(token);
    case "store":
    case "group":
    case "category":
    case "subcategory":
    case "sku":
    case "uom":
      return Array.isArray(Items) && Items.length ? Items : fetchForecasts(token);
    default:
      throw new Error(`Invalid point: ${key}`);
  }
}

function isString(item: unknown): item is string {
  return typeof item === "string";
}

export default function useMockdata(key: string): [
  boolean, // loading state
  string | null, // error message
] {
  const dispatch = useAppDispatch();
  const [isLoading, setLoading] = useState(false);
  const [isError, setError] = useState<string | null>(null);

  const [storagetoken] = useStorage("token");
  const authState = useAppSelector((state) => state.auth);
  const token = authState.token ? (authState.token as unknown as Token) : (storagetoken as unknown as Token);
  const { forecastsItems = [] } = useAppSelector((state) => state.forecasts) || [];
  const { StatisticsItems = [] } = useAppSelector((state) => state.statistics) || [];

  useEffect(() => {
    setLoading(true);
    setError(null);
    const Items = key === "forecast" ? forecastsItems : StatisticsItems;
    fetchData(Items as unknown as Statistics | Forecasts, token, key)
      .then((datum) => {
        console.log(`datum: ${JSON.stringify(datum)}`);
        // console.log(`key: ${key}`);
        key === "statistics" && dispatch(setStatisticData(datum));
        key === "forecast" && dispatch(setJsonData(datum));
      })
      .catch((error) => {
        setError(error.message);
      })
      .finally(() => {
        setLoading(false);
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [key, token]);

  return [isLoading, isError];
}
