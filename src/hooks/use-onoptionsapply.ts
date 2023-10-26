import { setParamsApplyed, unsetParamsApplyed } from "@/redux/features/forecastsSlice";
import { setStatisticData, clearStatistics } from "@/redux/features/statisticSlice";
import { useAppDispatch } from "@/redux/hooks";

type CheckedState = boolean;

type FilterItem = {
  label?: string;
  value?: string;
  checked: CheckedState;
};

// in process...
export default function useOnOptionsApply(
  filterItems1: FilterItem[] | undefined,
  filterItems2: FilterItem[] | undefined,
  filterItems3: FilterItem[] | undefined,
  filterItems4: FilterItem[] | undefined,
  filterItems5: FilterItem[] | undefined,
  filterItems6: FilterItem[] | undefined,
  key: string,
): () => void {
  const dispatch = useAppDispatch();

  return () => {
    console.log(
      `ТК: ${JSON.stringify(filterItems1)} \n Группа: ${JSON.stringify(filterItems2)} \n Категория: ${JSON.stringify(
        filterItems3,
      )} \n Подкатегория: ${JSON.stringify(filterItems4)} \n Товар: ${JSON.stringify(
        filterItems5,
      )} \n Ед.измерения\\Руб: ${JSON.stringify(filterItems6)}`,
    );
    // create params for request only with checked items
    const params = {
      store: filterItems1?.filter((item: FilterItem) => item.checked).map((item: FilterItem): string => item.label!) ?? [],
      group: filterItems2?.filter((item: FilterItem) => item.checked).map((item: FilterItem): string => item.label!) ?? [],
      category: filterItems3?.filter((item: FilterItem) => item.checked).map((item: FilterItem): string => item.label!) ?? [],
      subcategory:
        filterItems4?.filter((item: FilterItem) => item.checked).map((item: FilterItem): string => item.label!) ?? [],
      sku: filterItems5?.filter((item: FilterItem) => item.checked).map((item: FilterItem): string => item.label!) ?? [],
      uom: filterItems6?.filter((item: FilterItem) => item.checked).map((item: FilterItem): string => item.label!) ?? [],
    };

    console.log(`результат по кнопке аплай: ${JSON.stringify(params)} \n `);

    dispatch(unsetParamsApplyed());
    dispatch(setParamsApplyed(params));
  };
}
