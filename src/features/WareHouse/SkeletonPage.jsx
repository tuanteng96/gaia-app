import { SkeletonBlock } from "framework7-react";
import React, { Fragment } from "react";

export default function SkeletonPage() {
    return (
        <div className="mt-15px">
            {Array(3)
                .fill()
                .map((item, index) => (
                    <Fragment key={index}>
                        <div className="d--f ai--fs p-15px">
                            <div className="symbol symbol-light-primary">
                                <div className="icon w-50px h-50px symbol-label rounded-circle d--f ai--c jc--c font-size-xs fw-600">
                                </div>
                            </div>
                            <div className="f--1 pl-20px">
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
                            <div className="w-20px text-center">
                                <i className="font-size-lg text-gray-400 fa-light fa-chevron-right"></i>
                            </div>
                        </div>
                    </Fragment>
                ))}
        </div>
    );
}
