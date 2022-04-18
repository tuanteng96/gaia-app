import { Link } from "framework7-react";
import React from "react";

export default function ItemWareHouse({ item }) {
  return (
    <Link
      href={`/warehouse/${item.ID}?Title=${item.Title}`}
      className="d--f ai--c p-15px border-bottom"
    >
      <div className="symbol symbol-light-primary">
        <div className="icon w-50px h-50px symbol-label rounded-circle d--f ai--c jc--c font-size-xs fw-600">
          {(item.InQty / item.OutQty) * 100}%
        </div>
      </div>
      <div className="f--1 pl-20px">
        <div className="font-size-md fw-500 line-height-sm mb-4px text-truncate">
          {item.Title}
        </div>
        <div className="line-height-sm">
          <span className="pr-2px">Còn lại {item.OutQty - item.InQty}</span>/
          <span className="pl-2px">Tổng {item.OutQty}</span>
        </div>
      </div>
      <div className="w-20px text-center">
        <i className="font-size-lg text-gray-400 fa-light fa-chevron-right"></i>
      </div>
    </Link>
  );
}
