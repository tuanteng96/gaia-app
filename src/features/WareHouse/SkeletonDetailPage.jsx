import { SkeletonBlock } from "framework7-react";
import React, { Fragment } from "react";

export default function SkeletonDetailPage() {
  return (
    <div className="mt-15px">
      {Array(3)
        .fill()
        .map((item, index) => (
          <Fragment key={index}>
            <div className="shadows mb-15px rounded p-15px d--f ai--c">
              <div className={`h-40px w-40px symbol symbol-light-primary`}>
                <div className="icon w-100 h-100 symbol-label rounded-circle d--f ai--c jc--c">
                  <i className="font-size-lg fa-light fa-arrow-down-left"></i>
                </div>
              </div>
              <div className="pl-15px f--1">
                <SkeletonBlock
                  className="w-100 mb-8px h-15px skeleton-text skeleton-effect-wave"
                  slot="media"
                />
                <SkeletonBlock
                  className="w-80 mb-8px h-15px skeleton-text skeleton-effect-wave"
                  slot="media"
                />
              </div>
            </div>
          </Fragment>
        ))}
    </div>
  );
}
