// это пока не работает! доделать!
import { useAppSelector } from "@/redux/hooks";
type CheckedState = boolean;

type FilterItem = {
  label?: string;
  value?: string;
  checked: CheckedState;
};

type keyType = "forecast_data" | "do_nothing" | "real_sale";

type sixfiltersType = "store" | "group" | "category" | "subcategory" | "sku" | "uom";

type ForecastsItemsType = {
  store: string;
  group: string;
  category: string;
  subcategory: string;
  sku: string;
  date: string;
  forecast_data: number;
  uom: string;
}[];

type StatisticsItemsType = {
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
}[];

export default function useOptions(key: keyType, option: sixfiltersType): { label: string; checked: boolean }[] {
  const { forecastsItems = [] } = useAppSelector((state) => state.forecasts);
  const { StatisticsItems = [] } = useAppSelector((state) => state.statistics);
  let Items: ForecastsItemsType | StatisticsItemsType = [];

  // skip the case key==="do_nothing"
  switch (key) {
    case "do_nothing":
      return [];
    case "real_sale":
      Items = StatisticsItems.length > 0 ? StatisticsItems : [];
      break;
    case "forecast_data":
      Items = forecastsItems.length > 0 ? forecastsItems : [];
      break;
    default:
      Items = forecastsItems.length > 0 ? forecastsItems : [];
      break;
  }
  if (Array.isArray(Items)) {
    // need to get unique key: values , so transform input array of objects  to a set of objects

    const unique = Array.from(
      new Set([...Items.filter((item) => option in item)]), //clean up the array from objects without forecast_data key (they are not needed just for fun)
    );
    const values: { label: string; checked: boolean }[] = [];
    Array.from(unique).forEach((obj: ForecastsItemsType[number] | StatisticsItemsType[number]) => {
      // force label to be a string
      // before assign to label do check if it is unique value, not assigned before
      const label = obj[option as keyof typeof obj].toString();
      // check if label is unique
      if (values.some((value) => value.label === label)) {
        // then skip it and do not add to values array
      } else {
        // unique label, add to values array
        values.push({ label, checked: false });
      }
    });
    // convert values to a set to get unique values, then convert back to an array
    const returnvalues = Array.from(new Set(values));
    console.log(`-=useOptions=-: ${JSON.stringify(returnvalues)}`);
    return returnvalues;
  } else {
    return [];
  }
}

/*
  function returnOptions(key: string, input: StatisticsItemsType): { label: string; checked: boolean }[] {
    // skip the case key==="forecast"
    if (key === "forecast" || key === "statistics") {
      return [];
    }
    if (Array.isArray(input)) {
      // need to get unique key: values , so transform input array of objects  to a set of objects

      const unique = Array.from(
        new Set([...input.filter((item) => "real_sale" in item)]), //clean up the array from objects without real_sale key
      );
      const values: { label: string; checked: boolean }[] = [];
      Array.from(unique).forEach((obj: StatisticsItemsType) => {
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


*/
