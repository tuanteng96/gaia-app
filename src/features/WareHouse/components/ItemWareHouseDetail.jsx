import React from "react";
import moment from "moment";
import "moment/dist/locale/vi";
moment.locale("vi");

export default function ItemWareHouseDetail({item}) {
  return (
    <div className="shadows mb-15px rounded p-15px d--f ai--c">
      <div
        className={`h-40px w-40px symbol symbol-light-${
          item.IsOut ? "primary" : "danger"
        }`}
      >
        <div className="icon w-100 h-100 symbol-label rounded-circle d--f ai--c jc--c">
          {item.IsOut && (
            <i className="font-size-lg fa-light fa-arrow-down-left"></i>
          )}
          {!item.IsOut && (
            <i className="font-size-lg fa-light fa-arrow-up-right"></i>
          )}
        </div>
      </div>
      <div className="pl-15px f--1">
        <div className="font-size-smm fw-500 line-height-xs">
          {item.IsOut ? "Nhận từ Công ty" : "Hoàn về Công ty"}
        </div>
        <div className="font-size-xs text-muted mt-6px">
          {moment(item.CreateDate).format("DD-MM-YYYY HH:mm")}
        </div>
      </div>
      <div className="w-80px text-right font-size-md fw-600 ff-number">
        {item.IsOut ? "+" : "-"}
        {item.Qty}
      </div>
    </div>
  );
}
