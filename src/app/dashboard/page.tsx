'use client';
import useStorage from '@rehooks/local-storage';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';

import DasTable from '@/components/DashboardTable/DashboardTable';
import FilePopover from '@/components/file-popover';
import BlockFilter from '@/components/MainPage/FilterComponent';
import { Button } from '@/components/ui/button';
import { useMockdata, useOptions } from '@/hooks';
// eslint-disable-next-line unused-imports/no-unused-imports
import { setParamsApplyed, unsetParamsApplyed } from '@/redux/features/forecastsSlice';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import Excel from '@/shared/excel.svg';
import styles from '@/styles/dashboard.module.css';
import { downloadClick } from '@/utils';

type CheckedState = boolean;

type Token = {
  access?: string;
  refresh?: string;
};

type keyType = 'forecast_data' | 'do_nothing' | 'real_sale';

type sixfiltersType = 'store' | 'group' | 'category' | 'subcategory' | 'sku' | 'uom';

export default function MainPage() {
  const { push, replace } = useRouter();
  const dispatch = useAppDispatch();

  const { isAuthenticated } = useAppSelector((state) => state.auth);

  const [storagetoken] = useStorage('token');
  const authState = useAppSelector((state) => state.auth);
  const token = authState.token ? (authState.token as unknown as Token) : (storagetoken as unknown as Token);

  const { forecastsItems = [] } = useAppSelector((state) => state.forecasts) || [];
  const { paramsApplyed = [] } = useAppSelector((state) => state.forecasts) || [];
  const [isDownloading, setIsDownloading] = useState(false);
  const [downloadError, setDownloadError] = useState<{}>({});
  const [response, setResponse] = useState<{}>({}); // response from downloadClick()
  const [authToken, setAuthToken] = useState('');

  function callback(action: any, data: any) {
    // eslint-disable-next-line no-console
    console.log(action, data);
  }

  const handleClickClear = () => {
    setDownloadError({});
    setResponse({});
    setIsDownloading(false);
  };

  useEffect(() => {
    console.log('isDownloading updated:', isDownloading);
    console.log('downloadError updated:', downloadError);
    console.log('response updated:', response);
  }, [isDownloading, downloadError, response]);

  useEffect(() => {
    typeof window !== 'undefined' && !isAuthenticated && replace('/login');
  }, [isAuthenticated, push, replace]);

  useMockdata('forecast');

  useEffect(() => {
    token.access && setAuthToken(token.access);
  }, [token]);
  // use-options.ts

  let f1 = useOptions('forecast_data' as unknown as keyType, 'store' as unknown as sixfiltersType);

  const [filterItems1, setFilterItems1] = useState([...f1]);

  let f2 = useOptions('forecast_data' as unknown as keyType, 'group' as unknown as sixfiltersType);

  const [filterItems2, setFilterItems2] = useState([...f2]);

  let f3 = useOptions('forecast_data' as unknown as keyType, 'category' as unknown as sixfiltersType);

  const [filterItems3, setFilterItems3] = useState([...f3]);

  let f4 = useOptions('forecast_data' as unknown as keyType, 'subcategory' as unknown as sixfiltersType);

  const [filterItems4, setFilterItems4] = useState([...f4]);

  let f5 = useOptions('forecast_data' as unknown as keyType, 'sku' as unknown as sixfiltersType);

  const [filterItems5, setFilterItems5] = useState([...f5]);

  let f6 = useOptions('forecast_data' as unknown as keyType, 'uom' as unknown as sixfiltersType);

  const [filterItems6, setFilterItems6] = useState([...f6]);

  useEffect(() => {
    console.log('forecasts', forecastsItems);
    console.log('paramsApplyed', paramsApplyed);
    console.log('filtered on prognosis page: ', f1, f2, f3, f4, f5, f6);
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
      setResponse({}); // Clear the response
      setDownloadError({}); // Clear any previous download errors
      console.log('isDownloading before:', isDownloading);
      setIsDownloading(true);
      console.log('isDownloading after:', isDownloading);
      const authtoken = token?.access || authToken;
      console.log('authtoken before call obtained', authtoken);
      const { respinfo, error } = await downloadClick('file.xlsx', authtoken); // file.xlsx statfile.xlsx
      setResponse(respinfo || error); // Set the response
      if (response) {
        console.log('respinfo', response);
      }
    } catch (downloadError) {
      // it should never happen as error is passed to response do remove code below
      console.error('outside Error downloading file:', downloadError);
      if (downloadError) {
        console.log(downloadError, 'catched ! error');
      }
      setDownloadError({ downloadError }); // Set the error message
      if (typeof downloadError === 'object' && downloadError !== null) {
        setResponse(downloadError);
      }
    } finally {
      // This block will run regardless of whether an exception was thrown or caught
      console.log('Download attempt finished.');
      // Hide the popover after a delay
      setTimeout(() => {
        setIsDownloading(false);
      }, 2000); // 2000 ms = 2 seconds
      //    setIsDownloading(false); // Set the loading state to false when the download fails or is complete
    }
  };
  return (
    <>
      <section className="p-0 px-40">
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
        <div className="mb-[10px] flex justify-end">
          {/* use downloadClick hook */}

          <button
            className="btn"
            disabled={!hasChecked || isDownloading}
            onClick={() => {
              handleClickClear();
              handleDownloadClick(event);
            }}
          >
            {isDownloading ? (
              <span className="loading loading-spinner"></span>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                />
              </svg>
            )}
          </button>
          {/* show file-popover */}
          {Object.keys(response).length > 0 ? <FilePopover cb={callback} arg={response} fileSize={0} /> : <div></div>}
        </div>

        <DasTable />
      </section>
    </>
  );
}
