"use client";
import React, { useEffect, useState } from "react";
import styles from "../components/MainPage/MainPage.module.css";
import BlockFilter from "../components/MainPage/FilterComponent";
import DasTable2 from "./DashboardTable2";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Excel from "../shared/excel.svg";
import SimpleBarChart from "./SimpleBarChart";
import { useAppSelector } from "@/redux/hooks";
import { useRouter } from "next/navigation";

type CheckedState = boolean;

export default function MainPage() {
  const { push } = useRouter();
  const { isAuthenticated } = useAppSelector((state) => state.auth);

  useEffect(() => {
    isAuthenticated && push("/login");
  }, [isAuthenticated, push]);

  const [filterItems1, setFilterItems1] = useState([
    { label: "Яблоко", checked: false },
    { label: "Машина", checked: false },
    { label: "Яйцо", checked: false },
    { label: "Фильтр 2", checked: false },
    { label: "Фильтр 1", checked: false },
    { label: "Фильтр 2", checked: false },
    // Добавьте другие фильтры и их состояния по вашему усмотрению
  ]);

  const [filterItems2, setFilterItems2] = useState([
    { label: "Фильтр A", checked: false },
    { label: "Фильтр B", checked: false },
    { label: "Яблоко", checked: false },
    { label: "Машина", checked: false },
    { label: "Яйцо", checked: false },
    // Добавьте другие фильтры и их состояния по вашему усмотрению
  ]);

  const [filterItems3, setFilterItems3] = useState([
    { label: "Яблоко", checked: false },
    { label: "Машина", checked: false },
    { label: "Яйцо", checked: false },
    { label: "Фильтр 2", checked: false },
    { label: "Фильтр 1", checked: false },
    { label: "Фильтр 2", checked: false },
    // Добавьте другие фильтры и их состояния по вашему усмотрению
  ]);

  const [filterItems4, setFilterItems4] = useState([
    { label: "Яблоко", checked: false },
    { label: "Машина", checked: false },
    { label: "Яйцо", checked: false },
    { label: "Фильтр 2", checked: false },
    { label: "Фильтр 1", checked: false },
    { label: "Фильтр 2", checked: false },
    // Добавьте другие фильтры и их состояния по вашему усмотрению
  ]);

  const [filterItems5, setFilterItems5] = useState([
    { label: "Яблоко", checked: false },
    { label: "Машина", checked: false },
    { label: "Яйцо", checked: false },
    { label: "Фильтр 2", checked: false },
    { label: "Фильтр 1", checked: false },
    { label: "Фильтр 2", checked: false },
    // Добавьте другие фильтры и их состояния по вашему усмотрению
  ]);

  const [filterItems6, setFilterItems6] = useState([
    { label: "Яблоко", checked: false },
    { label: "Машина", checked: false },
    { label: "Яйцо", checked: false },
    { label: "Фильтр 2", checked: false },
    { label: "Фильтр 1", checked: false },
    { label: "Фильтр 2", checked: false },
    // Добавьте другие фильтры и их состояния по вашему усмотрению
  ]);

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
  const handleFilterChangeAll1 = (
    updatedFilters: { label: string; checked: CheckedState }[],
  ) => {
    setFilterItems1(updatedFilters);
  };

  // Функция для обновления состояния всех чекбоксов в фильтре 2
  const handleFilterChangeAll2 = (
    updatedFilters: { label: string; checked: CheckedState }[],
  ) => {
    setFilterItems2(updatedFilters);
  };

  // Функция для обновления состояния всех чекбоксов в фильтре 3
  const handleFilterChangeAll3 = (
    updatedFilters: { label: string; checked: CheckedState }[],
  ) => {
    setFilterItems1(updatedFilters);
  };

  // Функция для обновления состояния всех чекбоксов в фильтре 4
  const handleFilterChangeAll4 = (
    updatedFilters: { label: string; checked: CheckedState }[],
  ) => {
    setFilterItems2(updatedFilters);
  };

  // Функция для обновления состояния всех чекбоксов в фильтре 5
  const handleFilterChangeAll5 = (
    updatedFilters: { label: string; checked: CheckedState }[],
  ) => {
    setFilterItems1(updatedFilters);
  };

  // Функция для обновления состояния всех чекбоксов в фильтре 6
  const handleFilterChangeAll6 = (
    updatedFilters: { label: string; checked: CheckedState }[],
  ) => {
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
          <Button variant="firstly">Применить</Button>
          <Button variant="secondary">Сбросить</Button>
        </div>
      </div>
      <div className="flex justify-between mb-[10px]">
        <div>
          <h1 className="mb-2">Длительность</h1>
          <div className="items-end justify-center flex">
            <Button
              variant="dropdownMenuButton2"
              className="w-[70px] h-[40px] rounded-md text-sm"
              size="tpr3"
            >
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
        <Button variant="exel" size="tpr3" className="h-[40px]">
          <Image
            src={Excel}
            alt="Логотип"
            width={24}
            height={24}
            className="mr-3"
          />
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
