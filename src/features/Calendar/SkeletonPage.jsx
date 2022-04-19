import { SkeletonBlock } from "framework7-react";
import React from "react";

export default function SkeletonPage() {
  return (
    <div className="p-15px">
      {Array(2)
        .fill()
        .map((item, index) => (
          <div className="mt-20px position-relative calendar-item" key={index}>
            <div className="position-relative">
              <div className="time-school time-school-top fw-500 mb-8px position-relative">
                <div className="time-icon"></div>
                <span className="pl-20px pr-15px bg-white position-relative text-muted text-uppercase">
                  
                </span>
              </div>
              <div className="pl-15px py-10px position-relative">
                <div className="line-status w-2px h-100 bg-primary position-absolute left-0 top-0"></div>
                <div className="text-uppercase fw-600 text-success-ezs line-height-md font-size-md">
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
                </div>
                <div className="mt-12px fw-600 text-uppercase text-gray-800 d--f">
                  <SkeletonBlock
                    className="w-80px mb-8px h-15px skeleton-text skeleton-effect-wave mr-8px"
                    slot="media"
                  />
                  <SkeletonBlock
                    className="w-80px mb-8px h-15px skeleton-text skeleton-effect-wave"
                    slot="media"
                  />
                </div>
                <div className="mt-12px d--f jc--sb ai--c text-gray-700">
                  <div className="fw-600 d--f">
                    <i className="fa-solid fa-timer"></i>
                    <SkeletonBlock
                      className="w-50px ml-5px h-15px skeleton-text skeleton-effect-wave"
                      slot="media"
                    />
                  </div>
                </div>
              </div>
              <div className="time-school time-school-bottom fw-500 mt-8px position-relative">
                <div className="time-icon"></div>
                <span className="pl-20px pr-15px bg-white position-relative text-muted text-uppercase">
                  
                </span>
              </div>
            </div>
          </div>
        ))}
    </div>
  );
}
