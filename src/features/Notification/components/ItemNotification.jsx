import { Link } from "framework7-react";
import React from "react";

import moment from "moment";
import "moment/dist/locale/vi";
moment.locale("vi");

export default function ItemNotification({ item }) {
  const getActionId = (action) => {
    const objAction = action && JSON.parse(action);
    if (typeof objAction === "object" && objAction.click_action) {
      return objAction.click_action.split(":")[1];
    }
  };
  return (
    <Link
      className="d--f ai--fs mt-15px"
      href={`/posts/detail/${getActionId(item.NotiData)}`}
    >
      <div className="w-50px symbol symbol-light-primary">
        <div className="icon w-45px h-45px symbol-label rounded-circle d--f ai--c jc--c">
          <i className="font-size-lg fa-light fa-bells"></i>
        </div>
      </div>
      <div className="f--1 pl-10px">
        <div className="fw-600 line-height-sm">{item.Title}</div>
        <div className="line-height-sm mt-5px mb-8px">{item.Body}</div>
        <div className="text-muted font-size-xs">
          Lúc{" "}
          <span className="text-uppercase">
            {moment(item.CreateDate).format("HH:mm a")}
          </span>
        </div>
      </div>
    </Link>
  );
}
