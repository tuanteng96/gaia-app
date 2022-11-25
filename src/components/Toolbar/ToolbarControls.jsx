import Dom7 from "dom7";
import { f7, Link } from "framework7-react";
import React, { Fragment, useEffect, useState } from "react";

const initialMenu = [
  {
    Title: "Trang chủ",
    IconClass: "fa-light h6-font-size fa-house-chimney font-size-lg",
    Url: "/",
    Active: false,
  },
  {
    Title: "Lịch",
    IconClass: "fa-light h6-font-size fa-calendar-day font-size-lg",
    Url: "/calendar/",
    Active: false,
  },
  {
    Title: "Ngày nghỉ",
    IconClass: "fa-light h6-font-size fa-circle-exclamation-check font-size-lg",
    Url: "/take-break/",
    Active: false,
  },
  {
    Title: "Kho",
    IconClass: "fa-light h6-font-size fa-warehouse-full font-size-lg",
    Url: "/warehouse/",
    Active: false,
  },
  {
    Title: "Thống kê",
    IconClass: "fa-light h6-font-size fa-chart-pie font-size-lg",
    Url: "/statistical/",
    Active: false,
  },
];

export default function ToolbarControls({ f7router }) {
  const [MenuList, setMenuList] = useState(initialMenu);

  useEffect(() => {
    setMenuList((prevState) =>
      prevState.map((item) => ({
        ...item,
        Active:
          item.Url === f7router.url ||
          (item.Url !== "/" && f7router.url.indexOf(item.Url) > -1),
      }))
    );
  }, [f7router.url]);

  return (
    <Fragment>
      {MenuList.map((item, index) => (
        <Link
          //href={!item.Active ? item.Url : ""}
          className={`w-20 ${item.Active ? "text-success-ezs" : "text-muted"} line-height-auto text-center`}
          onClick={() => {
            if (!item.Active) {
              f7.views.main.router.navigate(item.Url);
            }
          }}
          key={index}
        >
          <div className="h-100 d--f ai--c fd--c jc--c pt-10px">
            <i className={item.IconClass}></i>
            <div className="font-size-min mt-3px">{item.Title}</div>
          </div>
        </Link>
      ))}
    </Fragment>
  );
}
