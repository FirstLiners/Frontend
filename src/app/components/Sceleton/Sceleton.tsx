"use client";
import styles from "./sceleton.module.css";
import React, { Fragment, useEffect, useState } from "react";
import { Skeleton } from "@/components/ui/skeleton";

import axios, { AxiosResponse } from "axios";
import qs from "qs";

export default function Sceleton() {
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

  interface Token {
    access?: string;
    refresh?: string;
  }

  const [token, setToken] = useState<Token | undefined>();
  const [data, setData] = useState<Data>(); //is () or ({}) is better

  // function that do post request to get token from backend localhost:8000/api/v1/users/token using axios
  // and post method body email and password

  async function getData() {
    try {
      // const body = { email: "prostome2@prosto.me", password: "222" };
      const config = {
        method: "GET",
        autorization: `Bearer ${String(token?.access)}`,

        // Authorization: `Bearer ${token?.access}`,
        //   mode: "no-cors",
        //   refferer: "http://localhost:3000",
        //   maxBodyLength: Infinity,

        url: "http://localhost:8000/api/v1/skus",
        //   params: { email: "prostome2@prosto.me", password: "222" },

        //  ContentType: "application/json",
        //
        // use body to send email and password
        data: qs.stringify('Accept: "*/*"'),
      };
      axios(config)
        .then((response) => {
          console.log(`getData - ${response.status}`);
          // convert to JSON
          setData(response.data);
        })
        .catch((error) => {
          console.log(error);
        });
    } catch (error) {
      console.log(error);
    } finally {
      console.log(token);
    }
  }

  async function handToken() {
    try {
      const data = {
        email: "prostome2@prosto.me",
        password: "222",
      };
      const config = {
        method: "POST",
        mode: "no-cors",
        refferer: "http://localhost:3000",
        maxBodyLength: Infinity,
        url: "http://localhost:8000/api/v1/users/token/",
        ContentType: "application/json",
        Accept: "application/vnd.api+json",

        headers: {},
        data: qs.stringify(data),
      };
      axios(config)
        .then((response) => {
          // response data contains accessToken and refreshToken as concatenated string
          // accessToken begins with access: and refreshToken begins with refresh:
          // need to extract accessToken and refreshToken from response.data
          //  const accessToken = String(response.data).split('access:')[1].split('refresh:')[0];
          //  const refreshToken = String(response.data).split('refresh:')[1];

          // create token object with accessToken and refreshToken
          //@ts-ignore
          const newtoken = {
            access: response.data.access,
            refresh: response.data.refresh,
          };
          // @ts-ignore
          setToken(newtoken);
          console.log(`handToken - ${response.data.access}`);
        })
        .catch((error) => {
          console.log(error);
        });
    } catch (error) {
      console.log(error);
    } finally {
      console.log(token?.refresh);
      getData();
    }
  }

  /*   

Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNjk2NTM0NTE2LCJpYXQiOjE2OTY1Mjg1MTYsImp0aSI6IjA5MjI3ZWNkMjllMzQ2YzVhNjkwYzlmMWU3ZDhhYTFhIiwidXNlcl9pZCI6MzR9.OOnktA2JQBXPGqT5gwLNf-Im-PygJDYd-vzOCk6p6Pk
  User-Agent: PostmanRuntime/7.33.0
  Accept: *\*
  Postman-Token: 89e63a50-0adb-401a-8947-c361f62f3901
  Host: localhost:8000
  Accept-Encoding: gzip, deflate, br
  Connection: keep-alive
   



  
  */

  useEffect(() => {
    console.log("-=token=-");
    handToken();
    console.log("-=data=-");

    console.log(token?.access);
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
    </Fragment>
  );
}
