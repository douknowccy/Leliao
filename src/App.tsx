import React, { useEffect } from 'react';
import { Switch, } from "react-router-dom"
import AuthRoute from "./utils/authRoute"
import { addListenr } from "@utils/observerListen"
import './App.scss';
import { Toast } from 'antd-mobile';
Toast.config({ duration: 1.3 })

const App = (props: any) => {
  useEffect(() => {
    addListenr();
  }, [])
  return (
    <>
      <Switch>
        <AuthRoute></AuthRoute>
      </Switch>
    </>
  )
}

export default App;