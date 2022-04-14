import { SkeletonBlock } from "framework7-react";
import React, { Fragment } from "react";

export default function SkeletonPage() {
  return (
    <div className="p-15px">
      {Array(2)
        .fill()
        .map((item, index) => (
          <Fragment key={index}>
            <SkeletonBlock
              className="w-125px mb-20px h-15px skeleton-text skeleton-effect-wave"
              slot="media"
            />
            <div className="d--f ai--fs mt-15px">
              <div className="w-50px symbol symbol-light-primary">
                <div className="icon w-45px h-45px symbol-label rounded-circle d--f ai--c jc--c">
                  <i className="font-size-lg fa-light fa-bells"></i>
                </div>
              </div>
              <div className="f--1 pl-10px">
                <div className="fw-600 line-height-sm">
                  <SkeletonBlock
                    className="w-100 mb-8px h-15px skeleton-text skeleton-effect-wave"
                    slot="media"
                  />
                </div>
                <div className="line-height-sm mt-5px mb-8px">
                  <SkeletonBlock
                    className="w-80 mb-8px h-15px skeleton-text skeleton-effect-wave"
                    slot="media"
                  />
                </div>
                <div className="text-muted font-size-xs">
                  <span className="text-uppercase">
                    <SkeletonBlock
                      className="w-90 mb-8px h-15px skeleton-text skeleton-effect-wave"
                      slot="media"
                    />
                  </span>
                </div>
              </div>
            </div>
          </Fragment>
        ))}
    </div>
  );
}
