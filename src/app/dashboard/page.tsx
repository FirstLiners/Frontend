"use client";
import React, { useEffect, useState } from "react";
import styles from "@/components/MainPage/MainPage.module.css";
import BlockFilter from "@/components/MainPage/FilterComponent";
import DasTable from "@/components/DashboardTable/DashboardTable";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Excel from "@/shared/excel.svg";
import { useAppSelector, useAppDispatch } from "@/redux/hooks";
import { useRouter } from "next/navigation";
import { setParamsApplyed, unsetParamsApplyed } from "@/redux/features/forecastsSlice";

import { useMockdata } from "@/hooks";

type CheckedState = boolean;

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

export default function MainPage() {
  const { push, replace } = useRouter();
  const dispatch = useAppDispatch();
  const { isAuthenticated } = useAppSelector((state) => state.auth);
  const { forecastsItems = [] } = useAppSelector((state) => state.forecasts) || [];
  const { paramsApplyed = [] } = useAppSelector((state) => state.forecasts) || [];

  useEffect(() => {
    typeof window !== "undefined" && !isAuthenticated && replace("/login");
  }, [isAuthenticated, push, replace]);

  useMockdata("forecast");

  function returnOptions(key: string, input: ForecastsItemsType): { label: string; checked: boolean }[] {
    // skip the case key==="forecast"
    if (key === "forecast" || key === "statistics") {
      return [];
    }
    if (Array.isArray(input)) {
      // need to get unique key: values , so transform input array of objects  to a set of objects

      const unique = Array.from(
        new Set([...input.filter((item) => "forecast_data" in item)]), //clean up the array from objects without forecast_data key (they are not needed just for fun)
      );
      const values: { label: string; checked: boolean }[] = [];
      Array.from(unique).forEach((obj: ForecastsItemsType) => {
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

  let filterItems = returnOptions("store", forecastsItems);

  useEffect(() => {
    console.log("forecasts", forecastsItems);
    console.log("paramsApplyed", paramsApplyed);
    console.log("filtered: ", filterItems);
  }, [forecastsItems, filterItems, paramsApplyed]);

  const [filterItems1, setFilterItems1] = useState([...filterItems]);

  filterItems = returnOptions("group", forecastsItems);
  const [filterItems2, setFilterItems2] = useState([...filterItems]);

  filterItems = returnOptions("category", forecastsItems);
  const [filterItems3, setFilterItems3] = useState([...filterItems]);

  filterItems = returnOptions("subcategory", forecastsItems);
  const [filterItems4, setFilterItems4] = useState([...filterItems]);

  filterItems = returnOptions("sku", forecastsItems);
  const [filterItems5, setFilterItems5] = useState([...filterItems]);

  filterItems = returnOptions("uom", forecastsItems);
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
      <div className="flex justify-end mb-[10px]">
        <Button disabled={!hasChecked} variant="excel" size="tpr3" className="h-[40px]">
          <Image src={Excel} alt="Логотип" width={24} height={24} className="mr-3" />
          Экспорт в Excel
        </Button>
      </div>
      {/* <div className='flex space-x-[660px] bg-[#E0E3F1] h-14 text-center rounded-t-lg align-middle'>
      <h1 className='ml-4 pt-4 text-sm'>Товар</h1>
      <h1 className='pt-4 text-sm'>Прогнозирование спроса по дням</h1>
    </div> */}
      <DasTable />
    </section>
  );
}
