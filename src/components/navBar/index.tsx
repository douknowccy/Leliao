import React, { useEffect, useRef } from "react";
import { observer, inject } from "mobx-react"
import { useHistory, useLocation } from "react-router-dom";
import { config } from "./config"
import "./style.scss"
const NavBar = (props: any) => {
  let history = useHistory();
  let location = useLocation();
  const ref = useRef(null);
  const { commonState, msgState } = props;
  const { total } = msgState;
  const to = (path: string) => {
    history.replace(path)
  }
  useEffect(() => {
    const curretn: any = ref.current;
    if (curretn) {
      commonState.updateFooterHeight(curretn.clientHeight);
    }
  }, [])
  return (
    <ul className="navBar" ref={ref}>
      {
        config.map((item, index) => {
          return <li onClick={() => to(item.path)} key={item.name} className={item.path === location.pathname ? 'activity' : ''}>
            {item.icon === 'msg-icon' && total > 0 && < span className="total">{total}</span>
            }
            <div className="icon">
              <i className={`icons ${item.icon}`} />
              <i className={`icons ${item.iconCheck}`} />
            </div>
            <span className={item.path === location.pathname ? 'activity-font' : ''}>{item.name}</span>
          </li>
        })
      }
    </ul >
  )
}
export default inject('commonState', 'msgState')((observer(NavBar)));
//