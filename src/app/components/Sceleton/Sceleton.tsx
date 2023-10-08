"use client";
import styles from "./sceleton.module.css";
import React, { Fragment, useEffect, useState } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { useToast } from "@/components/ui/use-toast";
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

  const [dataSKUS, setDataSKUS] = useState<Data>(); //is () or ({}) is better
  const [dataSALES, setDataSALES] = useState<Data>();
  const [dataFORECASTS, setDataFORECASTS] = useState<Data>();

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
              response.data[0] !== undefined &&
              response.data[0] !== null &&
              response.data[0] !== ""
                ? setSuccessData(true)
                : setSuccessData(false);
              console.log(response.data[0]);
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

  async function hardcodedGetData(apiEndpoint = "skus") {
    console.log("HardcodgetData");
    let data = qs.stringify({});

    let config = {
      method: "get",
      maxBodyLength: Infinity,
      url: "http://localhost:8000/api/v1/skus",
      headers: {
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNjk2NjMwNDMzLCJpYXQiOjE2OTY2MjQ0MzMsImp0aSI6IjNhOTA1ZjAzNjNmZjQzNjRhMzA0YzVkYWYxOWQzZmU0IiwidXNlcl9pZCI6Mn0.7Vmy_m9VDyvCPdd6fBCoU-emvWmRjHAMvURmh_zEbBM",
      },
      data: data,
    };

    axios
      .request(config)
      .then((response) => {
        console.log(JSON.stringify(response.data));
        setDataSKUS(response.data);
        response.data[0] !== undefined &&
        response.data[0] !== null &&
        response.data[0] !== ""
          ? setSuccessData(true)
          : setSuccessData(false);
      })
      .catch((error) => {
        console.log(error);
      });
    //finnaly
    setTimeout(() => {
      setLoading(false);

      console.log(
        `axios request "getData" is done for endpoint - ${apiEndpoint}`
      );
    }, 10000); // 1 sec
  }

  useEffect(() => {
    apiEndpoint = apiEndpoint || "skus";
    console.log(`-= data ${apiEndpoint} =-`);
    getData(apiEndpoint);
  }, []);

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
        <div className="grid grid-cols-3 align-middle">
          {" "}
          <p className="break-before-left">
            {/* здесь про результат */}
            {titletoast} {texttoast}
          </p>
          <p className="grid-cols col-auto "></p>{" "}
        </div>
      ) : (
        <div>Error here!</div>
      )}
    </Fragment>
  );
}
