// this hook must take data that consist of nested key: value  from the mockdata forecasts.json file and return return [value, setValue] for the given key argument
import { useAppSelector, useAppDispatch } from "@/redux/hooks";
import { useState, useEffect } from "react";
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

interface Forecasts {
  data: Forecast[];
}

type Token = {
  access?: string;
  refresh?: string;
};

async function fetchForecasts(
  token: Token | null | undefined,
): Promise<Forecasts> {
  const config = {
    headers: {
      Authorization: `Bearer ${token?.access}`,
    },
  };
  const backend = process.env.NEXT_PUBLIC_BACKEND as string;
  // console.log(`Bearer ${token?.access}`);
  const response = await axios.get(`${backend}/api/v1/forecasts`, config);
  console.log(JSON.stringify(response.data));
  return response.data as unknown as Forecasts;
}

async function fetchData(
  // TODO  переделать многоразовый фетч на один раз
  token: Token | null | undefined,
  point: string,
): Promise<Forecasts | string[]> {
  if (
    point === "forecast" ||
    point === "store" ||
    point === "group" ||
    point === "category" ||
    point === "subcategory" ||
    point === "sku" ||
    point === "uom"
  ) {
    return fetchForecasts(token);
  } else {
    throw new Error(`Invalid point: ${point}`);
  }
}

function returnOptions(
  key: string,
  input: Forecasts["data"],
): { label: string; checked: boolean }[] {
  if (Array.isArray(input)) {
    // need to get unique key: values , so transform input array of objects  to a set of objects
    const unique = new Set(input);
    const values: { label: string; checked: boolean }[] = [];
    Array.from(unique).forEach((obj: Forecast) => {
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

export default function useMockdata(
  key: string,
): [
  { label: string; checked: boolean }[] | null,
  React.Dispatch<
    React.SetStateAction<{ label: string; checked: boolean }[] | null>
  >,
] {
  const [value, setValue] = useState<
    { label: string; checked: boolean }[] | null
  >(null);

  const { token } = useAppSelector((state) => state.auth);

  useEffect(() => {
    fetchData(token, key).then((datum) => {
      // console.log(forecasts.data); // seems to be endless rerender, why?
      // @ts-ignore
      const options = returnOptions(key, datum);
      options !== null && setValue(options ?? []);
    });
  }, [key]);

  return [value, setValue];
}
