import React from "react";
import { Toast } from "antd-mobile";

import { observer, inject } from "mobx-react";
import { Route, Redirect, useLocation } from "react-router-dom";

import routers from "../routers";
const AuthRoute = (props: any) => {
 const { userState } = props;
 const { pathname } = useLocation();
 let { user } = userState;
 const targetRoute: any = routers.find((item) => item.path === pathname)
 let { component } = targetRoute
 // 不需要拦截的页面直接放行
 if (targetRoute && !targetRoute.auth && !user.isLogin) {
  return <Route path={pathname} component={component}></Route>
 }
 // 登录
 if (user.isLogin) {
  return <Route path={pathname} component={component}></Route>
 } else {
  // 未登录
  return <Redirect to="/login" />
 }
}
export default inject('userState')((observer(AuthRoute)));
