import React from "react";
import ImageEmpty from "../../assets/media/empty/data-empty.png";
import { LazyLoadImage } from "react-lazy-load-image-component";

function PageEmpty({ Title }) {
  return (
    <div className="h-100 d--f fd--c ai--c jc--c">
      <LazyLoadImage
        src={ImageEmpty}
        alt={Title}
        effect="blur"
        wrapperClassName="text-center"
      />
      <div className="text-capitalize fw-700 font-size-md mt-20px mb-100px text-gray-800">
        {Title}
      </div>
    </div>
  );
}

export default PageEmpty;
