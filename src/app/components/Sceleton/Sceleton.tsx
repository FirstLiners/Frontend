"use client";
import styles from "./sceleton.module.css";
import React, { Fragment, use, useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { setJsonData as setStores } from "@/redux/features/storesSlice";
import { setJsonData as setSkus } from "@/redux/features/skuSlice";
import { setJsonData as setForecasts } from "@/redux/features/forecastsSlice";
import { Skeleton } from "@/components/ui/skeleton";

import axios, { AxiosResponse } from "axios";
import qs from "qs";

interface Props {
  apiEndpoint: string;
}

export default function Sceleton({
  apiEndpoint,
}: Props & { apiEndpoint?: string }) {
  interface Item {
    id: number;
    sku_id: string;
    uom: number;
    group_id: string;
    cat_id: string;
    subcat_id: string;
  }

  interface Data {
    // consist of array of Items - from interface Item
    data: Item[];
  }
  const dispatch = useAppDispatch();
  const { forecastsItems: dataForecasts } = useAppSelector(
    (state) => state.forecasts,
  );
  const { storeItems: dataStores } = useAppSelector((state) => state.stores);
  const { skuItems: dataSkus } = useAppSelector((state) => state.skus);

  const [dataSKUS, setDataSKUS] = useState<Data>(); //is () or ({}) is better
  const [dataSALES, setDataSALES] = useState<Data>();
  const [dataFORECASTS, setDataFORECASTS] = useState<Data>();
  const [dataSTORES, setDataSTORES] = useState<Data>();

  const [isSuccessData, setSuccessData] = useState(false);

  const [isLoading, setLoading] = useState(true);
  const [isError, setError] = useState(false);
  // function that do post request to get token from backend localhost:8000/api/v1/users/token using axios
  // and post method body email and password

  async function getData(apiEndpoint = "skus") {
    console.log("getData");
    let token = localStorage.getItem("access_token");
    if (token) {
      token = token.replace(/^"(.*)"$/, "$1"); // Remove quotes from token start/end. This is a temp fix?!
    }
    let data = qs.stringify({});
    console.log(token);
    try {
      let config = {
        method: "GET",
        // mode: "no-cors",
        // refferer: "127.0.0.1:3000",
        maxBodyLength: Infinity,
        url: `http://127.0.0.1:8000/api/v1/${apiEndpoint}`,
        // ContentType: "application/json",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        data: data,
      };
      axios
        .request(config)
        .then((response) => {
          console.log(`getData - ${response.status} for ${apiEndpoint}`);
          // add .then before switch
          return response.data;
        })
        .then((data) => {
          switch (apiEndpoint) {
            case "skus":
              setDataSKUS(data);
              dispatch(setSkus(data));
              break;
            case "stores":
              setDataSTORES(data);
              dispatch(setStores(data));
              break;
            case "forecasts":
              setDataFORECASTS(data);
              dispatch(setForecasts(data));
              break;
            case "sales":
              setDataSALES(data);
              break;
            default:
              data[0] !== undefined && data[0] !== null && data[0] !== ""
                ? setSuccessData(true)
                : setSuccessData(false);
              console.log(data[0]);
              break;
          }
        })
        .catch((error) => {
          console.log(error);
        });
    } catch (error) {
      setError(true);
      console.log(error);
    } finally {
      setTimeout(() => {
        setLoading(false);
        console.log(
          `axios request "getData" is done for endpoint - ${apiEndpoint}`,
        );
      }, 1000); // 1 sec
    }
  }

  useEffect(() => {
    // apiEndpoint = apiEndpoint || "skus";
    console.log(`-= data ${apiEndpoint} =-`);
    getData(apiEndpoint);
  }, [apiEndpoint]);

  useEffect(() => {
    console.log(
      `-= data ${Object.keys(dataForecasts || {}).length} : ${
        Object.values(dataForecasts || {}).length
      } =-`,
    );
    console.log(
      `-= data ${Object.keys(dataStores || {}).length} : ${
        Object.values(dataStores || {}).length
      } =-`,
    );
    console.log(
      `-= data ${Object.keys(dataSkus || {}).length} : ${
        Object.values(dataSKUS || {}).length
      } =-`,
    );
  }, [dataForecasts, dataStores, dataSkus]);

  // useEffect for call toast() if isSuccessData

  function TheColumn() {
    return (
      <div className="flex flex-col gap-4">
        <Skeleton className={`${styles.sc}  w-40 h-5  `} />

        <Skeleton className={`${styles.sc}  h-5  `} />
        <Skeleton className={`${styles.sc}  h-60  `} />
        <Skeleton className={`${styles.sc}  h-40  `} />
      </div>
    );
  }
  const texttoast = isSuccessData ? "" : ` не загружено ${apiEndpoint} `;
  const titletoast = isSuccessData ? " Успешно " : " Ошибка ";

  return <Fragment></Fragment>;
}
