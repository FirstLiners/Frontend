"use client";
import React, { useEffect, useState } from "react";
import styles from "@/styles/dashboard.module.css";
import BlockFilter from "@/components/MainPage/FilterComponent";
import DasTable from "@/components/DashboardTable/DashboardTable";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Excel from "@/shared/excel.svg";
import { useAppSelector, useAppDispatch } from "@/redux/hooks";
import { useRouter } from "next/navigation";
import { setParamsApplyed, unsetParamsApplyed } from "@/redux/features/forecastsSlice";
import { downloadClick } from "@/utils";
import useStorage from "@rehooks/local-storage";

import { useMockdata, useOptions } from "@/hooks";

type CheckedState = boolean;

type Token = {
  access?: string;
  refresh?: string;
};

type keyType = "forecast_data" | "do_nothing" | "real_sale";

type sixfiltersType = "store" | "group" | "category" | "subcategory" | "sku" | "uom";

export default function MainPage() {
  const { push, replace } = useRouter();
  const dispatch = useAppDispatch();

  const { isAuthenticated } = useAppSelector((state) => state.auth);

  const [storagetoken] = useStorage("token");
  const authState = useAppSelector((state) => state.auth);
  const token = authState.token ? (authState.token as unknown as Token) : (storagetoken as unknown as Token);

  const { forecastsItems = [] } = useAppSelector((state) => state.forecasts) || [];
  const { paramsApplyed = [] } = useAppSelector((state) => state.forecasts) || [];
  const [isDownloading, setIsDownloading] = useState(false);
  const [downloadError, setDownloadError] = useState("");
  const [authToken, setAuthToken] = useState("");

  useEffect(() => {
    typeof window !== "undefined" && !isAuthenticated && replace("/login");
  }, [isAuthenticated, push, replace]);

  useMockdata("forecast");

  useEffect(() => {
    token.access && setAuthToken(token.access);
  }, [token]);
  // use-options.ts

  let f1 = useOptions("forecast_data" as unknown as keyType, "store" as unknown as sixfiltersType);

  const [filterItems1, setFilterItems1] = useState([...f1]);

  let f2 = useOptions("forecast_data" as unknown as keyType, "group" as unknown as sixfiltersType);

  const [filterItems2, setFilterItems2] = useState([...f2]);

  let f3 = useOptions("forecast_data" as unknown as keyType, "category" as unknown as sixfiltersType);

  const [filterItems3, setFilterItems3] = useState([...f3]);

  let f4 = useOptions("forecast_data" as unknown as keyType, "subcategory" as unknown as sixfiltersType);

  const [filterItems4, setFilterItems4] = useState([...f4]);

  let f5 = useOptions("forecast_data" as unknown as keyType, "sku" as unknown as sixfiltersType);

  const [filterItems5, setFilterItems5] = useState([...f5]);

  let f6 = useOptions("forecast_data" as unknown as keyType, "uom" as unknown as sixfiltersType);

  const [filterItems6, setFilterItems6] = useState([...f6]);

  useEffect(() => {
    console.log("forecasts", forecastsItems);
    console.log("paramsApplyed", paramsApplyed);
    console.log("filtered on prognosis page: ", f1, f2, f3, f4, f5, f6);
  }, [forecastsItems, f1, f2, f3, f4, f5, f6, paramsApplyed]);

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

  // Функция для обновления состояния фильтра 3
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

  // Функция для обновления состояния фильтра 4
  const handleFilterChange5 = (index: number, checked: CheckedState) => {
    const updatedFilters = [...filterItems5];
    updatedFilters[index].checked = checked;
    setFilterItems5(updatedFilters);
  };

  // Функция для обновления состояния фильтра 5
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

  const handleDownloadClick = async (event: React.MouseEvent<HTMLButtonElement>) => {
    try {
      setIsDownloading(true); // Set the loading state to true
      const authtoken = authState.token?.access || storagetoken || authToken;
      console.log("authtoken before call obtained", authtoken);
      const handlerd = await downloadClick("file.xlsx", authtoken);

      if (typeof handlerd === "function") {
        handlerd(event);
        setIsDownloading(false); // Set the loading state to false when the download is complete
        setDownloadError(""); // Clear any previous download errors
      }
    } catch (error) {
      console.error("Error downloading file:", error);
      setIsDownloading(false); // Set the loading state to false when the download fails
      setDownloadError("Error downloading file. Please try again."); // Set the error message
    }
  };

  return (
    <section className="p-0 pl-40 pr-40  ">
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
        {/* use downloadClick hook */}
        <Button
          onClick={handleDownloadClick}
          disabled={!hasChecked || isDownloading}
          variant="excel"
          size="tpr3"
          className="h-[40px]"
        >
          {isDownloading ? (
            <>
              <Image src={Excel} alt="Логотип" width={24} height={24} className="mr-3" /> Загружаем...{" "}
              <span className="loading loading-spinner loading-md"></span>
            </>
          ) : (
            <>
              <Image src={Excel} alt="Логотип" width={24} height={24} className="mr-3" />
              Экспорт в Excel
            </>
          )}
        </Button>
        {downloadError && <p>{downloadError}</p>}
      </div>
      {/* <div className='flex space-x-[660px] bg-[#E0E3F1] h-14 text-center rounded-t-lg align-middle'>
      <h1 className='ml-4 pt-4 text-sm'>Товар</h1>
      <h1 className='pt-4 text-sm'>Прогнозирование спроса по дням</h1>
    </div> */}
      <DasTable />
    </section>
  );
}
