"use client";
import React, { useState } from "react";
import styles from "./MainPage.module.css";
import BlockFilter from "./FilterComponent";
import SimpleLineChart from "./ExampleLineChart";
import { Button } from "@/components/ui/button";

type CheckedState = boolean;

export default function MainPage() {
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

  // Функция для обновления состояния фильтра 3
  const handleFilterChange3 = (index: number, checked: CheckedState) => {
    const updatedFilters = [...filterItems3];
    updatedFilters[index].checked = checked;
    setFilterItems3(updatedFilters);
  };

  // Функция для обновления состояния фильтра 4
  const handleFilterChange4 = (index: number, checked: CheckedState) => {
    const updatedFilters = [...filterItems4];
    updatedFilters[index].checked = checked;
    setFilterItems4(updatedFilters);
  };

  // Функция для обновления состояния фильтра 5
  const handleFilterChange5 = (index: number, checked: CheckedState) => {
    const updatedFilters = [...filterItems5];
    updatedFilters[index].checked = checked;
    setFilterItems5(updatedFilters);
  };

  // Функция для обновления состояния фильтра 6
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
    setFilterItems3(updatedFilters);
  };

  // Функция для обновления состояния всех чекбоксов в фильтре 4
  const handleFilterChangeAll4 = (
    updatedFilters: { label: string; checked: CheckedState }[],
  ) => {
    setFilterItems4(updatedFilters);
  };

  // Функция для обновления состояния всех чекбоксов в фильтре 5
  const handleFilterChangeAll5 = (
    updatedFilters: { label: string; checked: CheckedState }[],
  ) => {
    setFilterItems5(updatedFilters);
  };

  // Функция для обновления состояния всех чекбоксов в фильтре 6
  const handleFilterChangeAll6 = (
    updatedFilters: { label: string; checked: CheckedState }[],
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
      <div></div>
      <SimpleLineChart />
    </section>
  );
}
