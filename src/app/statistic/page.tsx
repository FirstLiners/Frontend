"use client";
import React, { useEffect, useState } from "react";
import styles from "@/components/MainPage/MainPage.module.css";
import BlockFilter from "@/components/MainPage/FilterComponent";
import DasTable2 from "@/components/DashboardTable2";
import Image from "next/image";
import Excel from "@/shared/excel.svg";
import SimpleBarChart from "@/components/SimpleBarChart";
import { useRouter } from "next/navigation";
import { useAppSelector, useAppDispatch } from "@/redux/hooks";
import {
  setStatisticData,
  clearStatistics,
  setParamsStatistics,
  unsetParamsStatistics,
} from "@/redux/features/statisticSlice";
import { Button } from "@/components/ui/button";
import { useMockdata } from "@/hooks";

type CheckedState = boolean;
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

export default function StatisticPage() {
  const { push, replace } = useRouter();
  const dispatch = useAppDispatch();
  const { isAuthenticated, token } = useAppSelector((state) => state.auth);
  const { StatisticsItems = [] } = useAppSelector((state) => state.statistics) || [];
  const { paramsApplyed } = useAppSelector((state) => state.statistics) || [];

  useMockdata("statistics");

  useEffect(() => {
    !isAuthenticated && replace("/login");
  }, [isAuthenticated, push, replace]);

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

  let filterItems = returnOptions("store", StatisticsItems);

  useEffect(() => {
    console.log("statistics", StatisticsItems);
    console.log("paramsApplyed", paramsApplyed);
    console.log("filtered: ", filterItems);
  }, [StatisticsItems, filterItems, paramsApplyed]);

  const [filterItems1, setFilterItems1] = useState([...filterItems]);

  filterItems = returnOptions("group", StatisticsItems);

  const [filterItems2, setFilterItems2] = useState([...filterItems]);

  filterItems = returnOptions("category", StatisticsItems);

  const [filterItems3, setFilterItems3] = useState([...filterItems]);

  filterItems = returnOptions("subcategory", StatisticsItems);

  const [filterItems4, setFilterItems4] = useState([...filterItems]);

  filterItems = returnOptions("sku", StatisticsItems);

  const [filterItems5, setFilterItems5] = useState([...filterItems]);

  filterItems = returnOptions("uom", StatisticsItems);

  const [filterItems6, setFilterItems6] = useState([...filterItems]);

  const hasChecked =
    [filterItems1, filterItems2, filterItems3, filterItems4, filterItems5, filterItems6].some(
      (filterItems) => filterItems && filterItems.some((item) => item.checked),
    ) || false;

  // Функция для обновления состояния фильтра 1
  const handleFilterChange1 = (index: number, checked: CheckedState) => {
    const updatedFilters = [...filterItems1];
    updatedFilters[index].checked = checked;
    setFilterItems1(updatedFilters);
  };

  // Функция для обновления состояния фильтра 2
  const handleFilterChange2 = (index: number, checked: CheckedState) => {
    const updatedFilters = [...filterItems2];
    updatedFilters[index].checked = checked;
    setFilterItems2(updatedFilters);
  };

  // Функция для обновления состояния фильтра 2
  const handleFilterChange3 = (index: number, checked: CheckedState) => {
    const updatedFilters = [...filterItems3];
    updatedFilters[index].checked = checked;
    setFilterItems3(updatedFilters);
  };

  // Функция для обновления состояния фильтра 2
  const handleFilterChange4 = (index: number, checked: CheckedState) => {
    const updatedFilters = [...filterItems4];
    updatedFilters[index].checked = checked;
    setFilterItems4(updatedFilters);
  };

  // Функция для обновления состояния фильтра 2
  const handleFilterChange5 = (index: number, checked: CheckedState) => {
    const updatedFilters = [...filterItems5];
    updatedFilters[index].checked = checked;
    setFilterItems5(updatedFilters);
  };

  // Функция для обновления состояния фильтра 2
  const handleFilterChange6 = (index: number, checked: CheckedState) => {
    const updatedFilters = [...filterItems6];
    updatedFilters[index].checked = checked;
    setFilterItems6(updatedFilters);
  };

  // Функция для обновления состояния всех чекбоксов в фильтре 1
  const handleFilterChangeAll1 = (updatedFilters: { label: string; checked: CheckedState }[]) => {
    setFilterItems1(updatedFilters);
  };

  // Функция для обновления состояния всех чекбоксов в фильтре 2
  const handleFilterChangeAll2 = (updatedFilters: { label: string; checked: CheckedState }[]) => {
    setFilterItems2(updatedFilters);
  };

  // Функция для обновления состояния всех чекбоксов в фильтре 3
  const handleFilterChangeAll3 = (updatedFilters: { label: string; checked: CheckedState }[]) => {
    setFilterItems1(updatedFilters);
  };

  // Функция для обновления состояния всех чекбоксов в фильтре 4
  const handleFilterChangeAll4 = (updatedFilters: { label: string; checked: CheckedState }[]) => {
    setFilterItems2(updatedFilters);
  };

  // Функция для обновления состояния всех чекбоксов в фильтре 5
  const handleFilterChangeAll5 = (updatedFilters: { label: string; checked: CheckedState }[]) => {
    setFilterItems1(updatedFilters);
  };

  // Функция для обновления состояния всех чекбоксов в фильтре 6
  const handleFilterChangeAll6 = (updatedFilters: { label: string; checked: CheckedState }[]) => {
    setFilterItems2(updatedFilters);
  };

  return (
    <section>
      <h1 className={styles.block__title_h1}>Параметры</h1>
      <div className={styles.block__filter2}>
        <div>
          <h1 className={styles.h1_first}>Торговый Комплекс</h1>
          <div className={styles.shift}>
            <BlockFilter
              filterLabel="Выбор"
              filterItems={filterItems1}
              onFilterChange={handleFilterChange1}
              onFilterChangeAll={handleFilterChangeAll1}
            />
          </div>
        </div>
        <div>
          <h1 className={styles.h1}>Группа</h1>
          <div>
            <BlockFilter
              filterLabel="Выбор"
              filterItems={filterItems2}
              onFilterChange={handleFilterChange2}
              onFilterChangeAll={handleFilterChangeAll2}
            />
          </div>
        </div>
        <div>
          <h1 className={styles.h1}>Категория</h1>
          <div>
            <BlockFilter
              filterLabel="Выбор"
              filterItems={filterItems3}
              onFilterChange={handleFilterChange3}
              onFilterChangeAll={handleFilterChangeAll3}
            />
          </div>
        </div>
        <div>
          <h1 className={styles.h1}>Подкатегория</h1>
          <div>
            <BlockFilter
              filterLabel="Выбор"
              filterItems={filterItems4}
              onFilterChange={handleFilterChange4}
              onFilterChangeAll={handleFilterChangeAll4}
            />
          </div>
        </div>
        <div>
          <h1 className={styles.h1}>Товар</h1>
          <div>
            <BlockFilter
              filterLabel="Выбор"
              filterItems={filterItems5}
              onFilterChange={handleFilterChange5}
              onFilterChangeAll={handleFilterChangeAll5}
            />
          </div>
        </div>
        <div>
          <h1 className={styles.h1}>Ед.измерения\Руб</h1>
          <div>
            <BlockFilter
              filterLabel="Выбор"
              filterItems={filterItems6}
              onFilterChange={handleFilterChange6}
              onFilterChangeAll={handleFilterChangeAll6}
            />
          </div>
        </div>
        <div className={styles.block__button}>
          <Button disabled={!hasChecked} variant="firstly">
            Применить
          </Button>
          <Button disabled={!hasChecked} variant="secondary">
            Сбросить
          </Button>
        </div>
      </div>
      <div className="flex justify-between mb-[10px]">
        <div>
          <h1 className="mb-2">Длительность</h1>
          <div className="items-end justify-center flex">
            <Button variant="dropdownMenuButton2" className="w-[70px] h-[40px] rounded-md text-sm" size="tpr3">
              День
            </Button>
            <Button variant="dropdownMenuButton3" size="tpr3">
              Неделя
            </Button>
            <Button variant="dropdownMenuButton3" size="tpr3">
              Месяц
            </Button>
          </div>
        </div>
        <Button disabled={!hasChecked} variant="excel" size="tpr3" className="h-[40px]">
          <Image src={Excel} alt="Логотип" width={24} height={24} className="mr-3" />
          Экспорт в Excel
        </Button>
      </div>

      <div className="rounded-lg ring-offset-background border flex flex-col justify-center">
        <h1 className="font-bold mb-4 ml-4 mt-4">Прогноз сравнение</h1>
        <SimpleBarChart />

        <div className="mb-5 rounded-lg ring-offset-background border w-[1560px] ml-5 flex flex-col justify-center">
          <h1 className="font-bold ml-5 mt-4">Прогноз сравнение</h1>
          <DasTable2 />
        </div>
      </div>
    </section>
  );
}
