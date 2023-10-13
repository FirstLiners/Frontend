// this hook must take data that consist of nested key: value  from the mockdata forecasts.json file and return return [value, setValue] for the given key argument
import { useState, useEffect } from "react";
// по непонятной причине не работает импорт из json файла
// в tsconfig.json добавил "resolveJsonModule": true,  "esModuleInterop": true, но не помогло
// import data from "./forecasts.json";
//  ⨯ ./src/app/hooks/use-mockdata.ts:4:0
// Module not found: Can't resolve './forecasts.json'

const dataforecast = {
  data: [
    {
      store: "Lenta 1",
      forecast_date: "2023-09-01",
      forecast: {
        sku: "002c3a40ac50dc870f1ff386f11f5bae",
        sales_units: {
          "2023-09-01": 1,
          "2023-09-02": 3,
          "2023-09-03": 7,
          "2023-09-04": 9,
          "2023-09-05": 0,
        },
      },
    },
    {
      store: "Lenta 2",
      forecast_date: "2023-09-01",
      forecast: {
        sku: "0045ebdb1069ff4b3dd3efe628c39cd3",
        sales_units: {
          "2023-09-01": 2,
          "2023-09-02": 6,
          "2023-09-03": 14,
          "2023-09-04": 18,
          "2023-09-05": 0,
        },
      },
    },
  ],
};

const data_sku = {
  data: [
    {
      id: 1989,
      sku_id: "002c3a40ac50dc870f1ff386f11f5bae",
      uom: 1,
      group_id: "6512bd43d9caa6e02c990b0a82652dca",
      cat_id: "c9f95a0a5af052bffce5c89917335f67",
      subcat_id: "507c9dcd6538b05090d22c4b73c535a7",
    },
    {
      id: 1308,
      sku_id: "0045ebdb1069ff4b3dd3efe628c39cd3",
      uom: 1,
      group_id: "c74d97b01eae257e44aa9d5bade97baf",
      cat_id: "c559da2ba967eb820766939a658022c8",
      subcat_id: "130d817d8b3f616e97c555ec57946aec",
    },
    {
      id: 1901,
      sku_id: "005c52de11abaf8e0a9714b24415ce34",
      uom: 1,
      group_id: "c20ad4d76fe97759aa27a0c99bff6710",
      cat_id: "fb2fcd534b0ff3bbed73cc51df620323",
      subcat_id: "572494dd9d43f96629bddcbd4102f35f",
    },
    {
      id: 1953,
      sku_id: "0063fbd948a3d7368ba9d97739bfe2cc",
      uom: 1,
      group_id: "aab3238922bcc25a6f606eb525ffdc56",
      cat_id: "46771d1f432b42343f56f791422a4991",
      subcat_id: "38cc804f2e8d4b18785b84c68517eadf",
    },
    {
      id: 272,
      sku_id: "00661699f543753ec7e911a64b9fd2f6",
      uom: 1,
      group_id: "aab3238922bcc25a6f606eb525ffdc56",
      cat_id: "9701a1c165dd9420816bfec5edd6c2b1",
      subcat_id: "8afe22eeb3f3f68de994a3c60388858c",
    },
    {
      id: 279,
      sku_id: "0094042bfeae507dc7f62acc8e5ed03a",
      uom: 1,
      group_id: "6512bd43d9caa6e02c990b0a82652dca",
      cat_id: "e58cc5ca94270acaceed13bc82dfedf7",
      subcat_id: "c93c26cd49ea08e6b8984351d4164575",
    },
    {
      id: 506,
      sku_id: "00a631286fff2536dfc128e9cf03e92c",
      uom: 17,
      group_id: "c74d97b01eae257e44aa9d5bade97baf",
      cat_id: "1bc0249a6412ef49b07fe6f62e6dc8de",
      subcat_id: "83b5bd3157dca7df5e5e337a7f3143bc",
    },
    {
      id: 3,
      sku_id: "00b72c2f01a1512cbb1d3f33319bac93",
      uom: 17,
      group_id: "c74d97b01eae257e44aa9d5bade97baf",
      cat_id: "1bc0249a6412ef49b07fe6f62e6dc8de",
      subcat_id: "d407a3ebb4ab9b0d68b224486f8b8dad",
    },
  ],
};

type SalesUnits = {
  [date: string]: number;
};

type Forecast = {
  sku: string;
  sales_units: { [key: string]: number };
  // Add index signature to allow for string indexing
  [key: string]: any;
};

type Sku = {
  id: number;
  sku_id: string;
  uom: number;
  group_id: string;
  cat_id: string;
  subcat_id: string;
  // Add index signature to allow for string indexing
  [key: string]: any;
};

type Skus = {
  [key: string]: string;
};

interface Forecasts {
  data: Forecast[];
  [key: string]: any; // Add index signature
}

async function fetchForecasts(): Promise<Forecasts> {
  return dataforecast as unknown as Forecasts;
}

async function fetchSkus(): Promise<Skus> {
  // Implementation of fetchSkus
  return data_sku as unknown as Skus;
}

async function fetchData(point: string): Promise<Forecasts | Skus | string[]> {
  if (point === "forecast" || point === "store") {
    return fetchForecasts();
  } else if (
    point === "sku_id" ||
    point === "group_id" ||
    point === "cat_id" ||
    point === "subcat_id" ||
    point === "uom"
  ) {
    return fetchSkus();
  } else {
    throw new Error(`Invalid point: ${point}`);
  }
}

function returnOptions(
  key: string,
  input: Forecasts["data"] | Skus["data"]
): { label: string; checked: boolean }[] {
  if (Array.isArray(input)) {
    const values = input.map((obj: Forecast | Sku) => {
      // force label to be a string
      const label = obj[key].toString();
      const checked = false;
      return { label, checked };
    });
    return values;
  } else {
    return [];
  }
}

export default function useMockdata(
  key: string
): [
  { label: string; checked: boolean }[] | null,
  React.Dispatch<
    React.SetStateAction<{ label: string; checked: boolean }[] | null>
  >,
] {
  const [value, setValue] = useState<
    { label: string; checked: boolean }[] | null
  >(null);

  useEffect(() => {
    fetchData(key).then((datum) => {
      // console.log(forecasts.data); // seems to be endless rerender, why?
      // @ts-ignore
      const options = returnOptions(key, datum.data);
      options !== null && setValue(options);
      return value;
    });
  }, [key]);

  return [value, setValue];
}
