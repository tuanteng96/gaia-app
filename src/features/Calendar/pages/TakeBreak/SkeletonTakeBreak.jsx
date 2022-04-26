import { Button, SkeletonBlock } from 'framework7-react';
import React from 'react';

function SkeletonTakeBreak(props) {
    return (
      <div className="py-15px">
        <div className="timeline m-0">
          {Array(2)
            .fill()
            .map((item, index) => (
              <div
                className={`timeline-item ${1 === index && "pb-0"}`}
                key={index}
              >
                <div className="timeline-item-date line-height-sm fw-500">
                  <SkeletonBlock
                    className="w-50px mb-8px h-15px skeleton-text skeleton-effect-wave"
                    slot="media"
                  />
                </div>
                <div className="timeline-item-divider" />
                <div className="timeline-item-content w-100">
                  <div className="timeline-item-inner p-0">
                    <div className="border p-15px rounded">
                      <div className="mb-12px">
                        <div className="text-uppercase text-muted fw-500 font-size-xs">
                          Ngày xin nghỉ
                        </div>
                        <div className="mt-5px fw-600 line-height-sm">
                          <SkeletonBlock
                            className="w-100 mb-8px h-15px skeleton-text skeleton-effect-wave"
                            slot="media"
                          />
                        </div>
                      </div>
                      <div className="mb-12px">
                        <div className="text-uppercase text-muted fw-500 font-size-xs">
                          Ghi chú
                        </div>
                        <div className="mt-5px fw-600 line-height-sm">
                          <SkeletonBlock
                            className="w-100 mb-8px h-15px skeleton-text skeleton-effect-wave"
                            slot="media"
                          />
                        </div>
                      </div>
                      <div className="d--f ai--c jc--sb">
                        <div className={`text-italic fw-500`}>
                          <SkeletonBlock
                            className="w-100px mb-8px h-15px skeleton-text skeleton-effect-wave"
                            slot="media"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          <div className="timeline-item"></div>
        </div>
      </div>
    );
}

export default SkeletonTakeBreak;