"use client";
import styles from "./sceleton.module.css";
import React, { Fragment, useEffect, useState } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import axios, { AxiosResponse } from "axios";

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

  const [dataSKUS, setDataSKUS] = useState<Data>(); //is () or ({}) is better
  const [dataSALES, setDataSALES] = useState<Data>();
  const [dataFORECASTS, setDataFORECASTS] = useState<Data>();

  const [isLoading, setLoading] = useState(true);
  const [isError, setError] = useState(false);
  // function that do post request to get token from backend localhost:8000/api/v1/users/token using axios
  // and post method body email and password

  async function getData(apiEndpoint = "skus") {
    console.log("getData");
    let token = process.env.FETCH_TOKEN;
    // let token =   (await localStorage.getItem("access_token"))
    console.log(token);
    try {
      const config = {
        method: "GET",
        // Autorization: `Bearer ${token}`,
        mode: "no-cors",
        refferer: "127.0.0.1:3000",
        maxBodyLength: Infinity,
        url: `http:"//127.0.0.1:8000/api/v1/${apiEndpoint}`,
        ContentType: "application/json",
        headers: {
          Authorization: `Bearer ${String(token)}`,
        },
      };
      axios(config)
        .then((response) => {
          console.log(`${axios.defaults}`);
          console.log(`getData - ${response.status} for ${apiEndpoint}`);
          // convert to JSON

          // case of each endpoint - skus, sales, forecasts
          switch (apiEndpoint) {
            case "skus":
              setDataSKUS(response.data);
              break;
            case "stores":
              setDataSKUS(response.data);
              break;
            case "sales":
              setDataSALES(response.data);
              break;
            case "forecasts":
              setDataFORECASTS(response.data);
              break;
            default:
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
          `axios request "getData" is done for endpoint - ${apiEndpoint}`
        );
      }, 1000); // 1 sec
    }
  }

  useEffect(() => {
    console.log(`-= data ${apiEndpoint} =-`);
    getData();
  }, []);
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
  return (
    <Fragment>
      {isLoading && !isError ? (
        <div className="flex flex-row gap-4">
          {/* tailwindcss width 50% */}
          <TheColumn />
          <TheColumn />
          <TheColumn />
          <TheColumn />
          <TheColumn />
          <TheColumn />
          <TheColumn />
          <TheColumn />
        </div>
      ) : !isLoading && !isError ? (
        <div className="ml-44  grid grid-cols-3 align-middle">
          {" "}
          data {apiEndpoint} загружено <p className="grid-cols col-auto "></p>{" "}
        </div>
      ) : (
        <div>Error here!</div>
      )}
    </Fragment>
  );
}
