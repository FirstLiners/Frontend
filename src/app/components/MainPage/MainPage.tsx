"use client";
import React, { useState } from "react";
import styles from "./MainPage.module.css";
import BlockFilter from "./FilterComponent";
import SimpleLineChart from "./ExampleLineChart";
import { useAppSelector, useAppDispatch } from "@/redux/hooks";
import { setJsonData, clearForecasts } from "@/redux/features/forecastsSlice";
import { Button } from "@/components/ui/button";
import { useMockdata } from "@/app/hooks";

type CheckedState = boolean;

type FilterItem = {
  label?: string;
  value?: string;
  checked: CheckedState;
};

export default function MainPage() {
  const dispatch = useAppDispatch();
  const { forecastsItems } = useAppSelector((state) => state.forecasts);
  const linechartData = Object.entries(
    forecastsItems.reduce((acc, { date, sku, forecast_data }) => {
      if (!acc[date]) {
        acc[date] = { name: date };
      }
      acc[date][`line${Object.keys(acc[date]).length - 1}`] = forecast_data;
      // acc[date][sku] = forecast_data;
      return acc;
    }, {}),
  ).map(([name, data]) => ({
    name,
    ...data,
  }));

  useMockdata("forecast");
  const [filterItems1, setFilterItems1] = useMockdata("store");
  const [filterItems2, setFilterItems2] = useMockdata("group");
  const [filterItems3, setFilterItems3] = useMockdata("category");
  const [filterItems4, setFilterItems4] = useMockdata("subcategory");
  const [filterItems5, setFilterItems5] = useMockdata("sku");
  const [filterItems6, setFilterItems6] = useMockdata("uom");

  function onOptionsApply() {
    console.log(
      `ТК: ${JSON.stringify(filterItems1)} \n Группа: ${JSON.stringify(
        filterItems2,
      )} \n Категория: ${JSON.stringify(
        filterItems3,
      )} \n Подкатегория: ${JSON.stringify(
        filterItems4,
      )} \n Товар: ${JSON.stringify(
        filterItems5,
      )} \n Ед.измерения\\Руб: ${JSON.stringify(filterItems6)}`,
    );
    // create params for request only with checked items
    const params = {
      store:
        filterItems1
          ?.filter((item: FilterItem) => item.checked)
          .map((item: FilterItem): string => item.label!) ?? [],
      group:
        filterItems2
          ?.filter((item: FilterItem) => item.checked)
          .map((item: FilterItem): string => item.label!) ?? [],
      category:
        filterItems3
          ?.filter((item: FilterItem) => item.checked)
          .map((item: FilterItem): string => item.label!) ?? [],
      subcategory:
        filterItems4
          ?.filter((item: FilterItem) => item.checked)
          .map((item: FilterItem): string => item.label!) ?? [],
      sku:
        filterItems5
          ?.filter((item: FilterItem) => item.checked)
          .map((item: FilterItem): string => item.label!) ?? [],
      uom:
        filterItems6
          ?.filter((item: FilterItem) => item.checked)
          .map((item: FilterItem): string => item.label!) ?? [],
    };

    console.log(`результат по кнопке аплай: ${JSON.stringify(params)} \n `);
    console.log(`forecasts: ${JSON.stringify(forecastsItems)} \n `);
  }

  // Функция для обновления состояния фильтра 1
  const handleFilterChange1 = (index: number, checked: CheckedState) => {
    const updatedFilters = filterItems1 ? [...filterItems1] : [];
    updatedFilters[index].checked = checked ?? false;

    setFilterItems1(updatedFilters);
  };

  // Функция для обновления состояния фильтра 2
  const handleFilterChange2 = (index: number, checked: CheckedState) => {
    const updatedFilters = filterItems2 ? [...filterItems2] : [];
    updatedFilters[index].checked = checked;
    setFilterItems2(updatedFilters);
  };

  // Функция для обновления состояния фильтра 3
  const handleFilterChange3 = (index: number, checked: CheckedState) => {
    const updatedFilters = filterItems3 ? [...filterItems3] : [];
    updatedFilters[index].checked = checked;
    setFilterItems3(updatedFilters);
  };

  // Функция для обновления состояния фильтра 4
  const handleFilterChange4 = (index: number, checked: CheckedState) => {
    const updatedFilters = filterItems4 ? [...filterItems4] : [];
    updatedFilters[index].checked = checked;
    setFilterItems4(updatedFilters);
  };

  // Функция для обновления состояния фильтра 5
  const handleFilterChange5 = (index: number, checked: CheckedState) => {
    const updatedFilters = filterItems5 ? [...filterItems5] : [];
    updatedFilters[index].checked = checked;
    setFilterItems5(updatedFilters);
  };

  // Функция для обновления состояния фильтра 6
  const handleFilterChange6 = (index: number, checked: CheckedState) => {
    const updatedFilters = filterItems6 ? [...filterItems6] : [];
    updatedFilters[index].checked = checked;
    setFilterItems6(updatedFilters);
  };

  // Функция для обновления состояния всех чекбоксов в фильтре 1
  const handleFilterChangeAll1 = (
    updatedFilters: {
      label: string;
      checked: CheckedState;
    }[],
  ) => {
    setFilterItems1(updatedFilters);
  };

  // Функция для обновления состояния всех чекбоксов в фильтре 2
  const handleFilterChangeAll2 = (
    updatedFilters: {
      label: string;
      checked: CheckedState;
    }[],
  ) => {
    setFilterItems2(updatedFilters);
  };

  // Функция для обновления состояния всех чекбоксов в фильтре 3
  const handleFilterChangeAll3 = (
    updatedFilters: {
      label: string;
      checked: CheckedState;
    }[],
  ) => {
    setFilterItems3(updatedFilters);
  };

  // Функция для обновления состояния всех чекбоксов в фильтре 4
  const handleFilterChangeAll4 = (
    updatedFilters: {
      label: string;
      checked: CheckedState;
    }[],
  ) => {
    setFilterItems4(updatedFilters);
  };

  // Функция для обновления состояния всех чекбоксов в фильтре 5
  const handleFilterChangeAll5 = (
    updatedFilters: {
      label: string;
      checked: CheckedState;
    }[],
  ) => {
    setFilterItems5(updatedFilters);
  };

  // Функция для обновления состояния всех чекбоксов в фильтре 6
  const handleFilterChangeAll6 = (
    updatedFilters: {
      label: string;
      checked: CheckedState;
    }[],
  ) => {
    setFilterItems6(updatedFilters);
  };

  return (
    <section>
      <h1 className={styles.block__title_h1}>Параметры</h1>
      <div className={styles.block__filter}>
        <div>
          <h1 className={styles.h1_first}>Торговый Комплекс</h1>
          <div className={styles.shift}>
            <BlockFilter
              filterLabel="Выбор"
              filterItems={filterItems1 || []}
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
              filterItems={filterItems2 || []}
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
              filterItems={filterItems3 || []}
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
              filterItems={filterItems4 || []}
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
              filterItems={filterItems5 || []}
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
              filterItems={filterItems6 || []}
              onFilterChange={handleFilterChange6}
              onFilterChangeAll={handleFilterChangeAll6}
            />
          </div>
        </div>
        <div className={styles.block__button}>
          <Button variant="firstly" onClick={() => onOptionsApply()}>
            Применить
          </Button>
          <Button variant="secondary">Сбросить</Button>
        </div>
      </div>
      <div></div>
      {console.log(`chart: ${linechartData} \n `)}
      <SimpleLineChart data={linechartData as unknown as string} />
    </section>
  );
}
