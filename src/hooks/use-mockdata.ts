// this hook must take data that consist of nested key: value  from the mockdata forecasts.json file and return return [value, setValue] for the given key argument
import { useAppSelector, useAppDispatch } from "@/redux/hooks";
import { setJsonData, clearForecasts } from "@/redux/features/forecastsSlice";
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
  // TODO  переделать многоразовый фетч на один раз
  token: Token | null | undefined,
  point: string,
): Promise<Forecasts | Statistics | string[]> {
  switch (point) {
    case "forecast":
    case "store":
    case "group":
    case "category":
    case "subcategory":
    case "sku":
    case "uom":
      return fetchForecasts(token);
    case "statistics": //statistic
      console.log("fetching statistics with token", token?.access);
      return fetchStatistics(token);
    default:
      throw new Error(`Invalid point: ${point}`);
  }
}

function returnOptions(
  key: string,
  input: Forecasts["data"] | Statistics["data"],
): { label: string; checked: boolean }[] {
  // skip the case key==="forecast"
  if (key === "forecast" || key === "statistics") {
    return [];
  }
  if (Array.isArray(input)) {
    // need to get unique key: values , so transform input array of objects  to a set of objects

    const unique = Array.from(
      new Set([...input.filter((item) => "forecast_data" in item)]), //clean up the array from objects without forecast_data key
    );
    const values: { label: string; checked: boolean }[] = [];
    Array.from(unique).forEach((obj: Forecast | Statistic) => {
      // force label to be a string
      // before assign to label do check if it is unique value, not assigned before
      const label = obj[key].toString();
      // check if label is unique
      if (values.some((value) => value.label === label)) {
        // then skip it and do not add to values array
      } else {
        // unique label, add to values array
        values.push({ label, checked: false });
      }
    });
    // convert values to a set to get unique values, then convert back to an array
    return Array.from(new Set(values));
  } else {
    return [];
  }
}

function isString(item: unknown): item is string {
  return typeof item === "string";
}

export default function useMockdata(
  key: string,
): [
  { label: string; checked: boolean }[] | null,
  React.Dispatch<React.SetStateAction<{ label: string; checked: boolean }[] | null>>,
] {
  const [value, setValue] = useState<{ label: string; checked: boolean }[] | null>(null);

  const dispatch = useAppDispatch();
  // когда прихожу из статистики, токен должен быть не пустой, для этого need dispatch(setAuth())
  const [storagetoken] = useStorage("token");
  const authState = useAppSelector((state) => state.auth);
  const token = authState.token ? (authState.token as unknown as Token) : (storagetoken as unknown as Token);
  const { forecastsItems } = useAppSelector((state) => state.forecasts);
  const { StatisticsItems } = useAppSelector((state) => state.statistics);
  useEffect(() => {
    fetchData(token, key).then((datum) => {
      // console.log(forecasts.data); // seems to be endless rerender, why?
      key === "statistics" && dispatch(setStatisticData(datum));
      key === "forecast" && dispatch(setJsonData(datum));
      const filteredItems =
        Array.isArray(datum) && datum.filter((item) => !isString(item) && ("forecast_data" in item || "data" in item));
      // @ts-ignore
      const options = returnOptions(key, datum || []);
      options !== null && setValue(options ?? []);
    });
  }, [key, token]);

  return [value, setValue];
}
