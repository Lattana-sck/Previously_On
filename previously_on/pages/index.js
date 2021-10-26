
import Head from 'next/head';
import React, { useState } from 'react';
import { useForm } from "react-hook-form";
import Navbar from '../components/Navbar';
import { ErrorMessage } from '@hookform/error-message'; 
import { Input, Button } from '@material-ui/core';
import { useRouter } from 'next/router';
const md5 = require('md5');

// CLE API 3bee3373bb7d
// CLE SECRETE 6925be4afc83f414034269ea27a3d6b4

export default function Home() {

  const router = useRouter();
  const { register, formState: { errors }, handleSubmit } = useForm();
  const [showPassword, setShowPassword] = useState(true);


  const onSubmit = (data) => {

    fetch('https://api.betaseries.com/members/auth', {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-BetaSeries-Key": "3bee3373bb7d",
        "accept": "application/ld+json"
      },
      body: JSON.stringify({
        login: data.login,
        password: md5(data.password)
      }),
    })
      .then((res) => res.json())
      .then((response) => {
        console.log(response)
        localStorage.setItem('token', response.token)
        localStorage.setItem('id', response.user.id)
      })
      .catch((e) => {
        console.log(e);
      })
      
      router.push("/serielist")
  
    //  console.log(data) 
  }
  return (

    <div className="container">
      <Head>
        <title>Previously On...</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Navbar />
      <main>
        <h1 className="title">Previously On...</h1><br />
        <form onSubmit={handleSubmit(onSubmit)} noValidate style={{ width: '100%' }}>
          <Input
            fullWidth={true}
            autoFocus={true}
            {...register('login', { required: "Veuillez indiquez votre login" })}
            type="text"
            id="login"
            placeholder="login"
          /><ErrorMessage
            errors={errors}
            name='login'
            render={({ message }) => <p>{message}</p>}
          /><br /><br />

          <Input
            fullWidth={true}
            {...register('password', { required: "Veuillez indiquez votre password" })}
            type={showPassword ? "password" : "text"}
            id="password"
            placeholder="Mot de passe"
          />
          <ErrorMessage
            errors={errors}
            name='password'
            render={({ message }) => <p>{message}</p>}
          /><br /><br />

          <Button
            fullWidth={true}
            type="submit">Se Connecter</Button>

        </form>
      </main>


      <footer>
        <p>Previously On By Lattana & Yanis</p>
      </footer>

      <style jsx>{`
          .container {
            min-height: 100vh;
            padding: 0 0.5rem;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
          }
  
          main {
            padding: 5rem 0;
            flex: 1;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
          }
  
          footer {
            width: 100%;
            height: 100px;
            border-top: 1px solid #eaeaea;
            display: flex;
            justify-content: center;
            align-items: center;
          }
  
          footer img {
            margin-left: 0.5rem;
          }
  
          footer a {
            display: flex;
            justify-content: center;
            align-items: center;
          }
  
          a {
            color: inherit;
            text-decoration: none;
          }
  
          .title a {
            color: #0070f3;
            text-decoration: none;
          }
  
          .title a:hover,
          .title a:focus,
          .title a:active {
            text-decoration: underline;
          }
  
          .title {
            margin: 0;
            line-height: 1.15;
            font-size: 4rem;
          }
  
          .title,
          .description {
            text-align: center;
          }
  
          .description {
            line-height: 1.5;
            font-size: 1.5rem;
          }
  
          code {
            background: #fafafa;
            border-radius: 5px;
            padding: 0.75rem;
            font-size: 1.1rem;
            font-family: Menlo, Monaco, Lucida Console, Liberation Mono,
              DejaVu Sans Mono, Bitstream Vera Sans Mono, Courier New, monospace;
          }
  
          .grid {
            display: flex;
            align-items: center;
            justify-content: center;
            flex-wrap: wrap;
  
            max-width: 800px;
            margin-top: 3rem;
          }
  
          .card {
            margin: 1rem;
            flex-basis: 45%;
            padding: 1.5rem;
            text-align: left;
            color: inherit;
            text-decoration: none;
            border: 1px solid #eaeaea;
            border-radius: 10px;
            transition: color 0.15s ease, border-color 0.15s ease;
          }
  
          .card:hover,
          .card:focus,
          .card:active {
            color: #0070f3;
            border-color: #0070f3;
          }
  
          .card h3 {
            margin: 0 0 1rem 0;
            font-size: 1.5rem;
          }
  
          .card p {
            margin: 0;
            font-size: 1.25rem;
            line-height: 1.5;
          }
  
          .logo {
            height: 1em;
          }
  
          @media (max-width: 600px) {
            .grid {
              width: 100%;
              flex-direction: column;
            }
          }
        `}</style>

      <style jsx global>{`
          html,
          body {
            padding: 0;
            margin: 0;
            font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto,
              Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue,
              sans-serif;
          }
  
          * {
            box-sizing: border-box;
          }
        `}</style>
    </div>
  )

}

