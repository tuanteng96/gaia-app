import { Link } from "framework7-react";
import React, { Fragment, useEffect, useState } from "react";

const initialMenu = [
  {
    Title: "Trang chủ",
    IconClass: "fa-light h6-font-size fa-house-chimney font-size-lg",
    Url: "/",
    Active: false,
  },
  {
    Title: "Bảng lịch",
    IconClass: "fa-light h6-font-size fa-calendar-day font-size-lg",
    Url: "/calendar/",
    Active: false,
  },
  {
    Title: "Cần xử lý",
    IconClass: "fa-light h6-font-size fa-circle-exclamation-check font-size-lg",
    Url: "/need-handle/",
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
          href={!item.Active ? item.Url : ""}
          className={`w-20 ${item.Active ? "text-success-ezs" : "text-muted"}`}
          key={index}
        >
          <i className={item.IconClass}></i>
        </Link>
      ))}
    </Fragment>
  );
}
