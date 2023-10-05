
'use client'
import styles from './about.module.css'
import React, { useState } from 'react';
import Link from "next/link";
import type { RootState } from  '../../redux/store';
import { useSelector, useDispatch } from 'react-redux';
import { increment, decrement, incrementByAmount } from '../../redux/features/counterSlice';
import { Button } from "@/components/ui/button";
import axios from 'axios';
import qs from 'qs';

function ButtonAsChild({ ...props }) {
  return (
    <Button asChild variant="link">
      <Link href="/">{props.label}</Link>
    </Button>
  )
}


export default function Page() {
  const [token, setToken] = useState('');
  // function that do post request to get token from backend localhost:8000/api/v1/users/token using axios and post method body email and password

  function handToken() {
  try {
    
    const data = {
      email: 'prostome2@prosto.me',
      password: '222',
    };
    const config = {
      method: 'POST',
      mode: 'no-cors',
      refferer: 'http://localhost:3000',
      maxBodyLength: Infinity,
      url: 'http://localhost:8000/api/v1/users/token/',
      ContentType: 'application/json',  
      Accept: 'application/vnd.api+json',
      // add headers 'Access-Control-Allow-Origin', '*'
      headers: {
        // 'Content-Type': 'application/vnd.api+json',
     
      //  'Access-Control-Allow-Origin': '*',
       // 'Content-Type': 'application/x-www-form-urlencoded',
        // set refferer to localhost:3000
      //  'refferer': 'http://localhost:3000',
      },
      data: qs.stringify(data),
    };
    axios(config)
      .then((response) => {
        setToken(response.data.token);
        console.log(`handToken - ${response.status}`);
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

// function that do post request with axios to https://reqbin.com/echo/post/json 


// https://agropark.acceleratorpracticum.ru/api/v1/users/token/


function handAgropark() {
  try {
    const data = {
      email:'prostome2@prosto.me',
      password: '222',
    };
    const config = {
      method: 'POST',
      // for  maximum cors compatibility
      mode: 'no-cors',
      refferer: 'http://localhost:3000',
      maxBodyLength: Infinity,
      url: 'https://agropark.acceleratorpracticum.ru/api/v1/users/token',
      // add headers 'Access-Control-Allow-Origin', '*'
      headers: {
         
    //    'Content-Type': 'application/x-www-form-urlencoded',
        // set refferer to localhost:3000
        // 'refferer': 'http://localhost:3000',
      },
      data: qs.stringify(data),
    };
    axios(config)
      .then((response) => {
        // mark in console that request was from reqbin
        console.log(`agropark- ${response.status}`);
      })
      .catch((error) => {
        console.log(error);
      }) 
  } catch (error) {
    console.log(error);
  }
}

// call function handToken with useEffect wrapper
React.useEffect(() => {
  console.log('token');
  handToken();
  // console.log('Agropark');
  // handAgropark();
}, []);


  const count = useSelector((state: RootState) => state.counter.value);
  const dispatch = useDispatch();

  return (
    <>



      <div className="relative isolate overflow-hidden bg-gray-900 py-24 sm:py-32">
      <button 
        className={styles.button}
        onClick={() => dispatch(increment())}
      >Increment</button>
      <span>{count}</span>
      <button 
        className={styles.button}
        onClick={() => dispatch(decrement())}
      >Decrement</button>
      <button 
        className={styles.button}
        onClick={() => dispatch(incrementByAmount(2))}
      >Increment by 2</button>
        
      </div>


    </>
  )
}
