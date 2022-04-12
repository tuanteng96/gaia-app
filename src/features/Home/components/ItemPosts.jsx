import Dom7 from "dom7";
import { Link } from "framework7-react";
import React from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";
import { toAbsoluteUrl } from "../../../helpers/AssetsHelpers";

export default function ItemPosts({ item }) {
  
  return (
    <Link href={`/posts/detail/${item.source.ID}/`} className="mb-15px w-100 fd--c position-relative last-mb-0" animate={true}>
      <div className="w-100 mb-10px h-225px">
        <LazyLoadImage
          className="w-100 d-block shadows rounded-sm object-fit-cover"
          src={toAbsoluteUrl(item.source.Thumbnail)}
          alt={item.source.Title}
          height={225}
          effect="blur"
        />
      </div>
      <div className="rounded-xl w-100 bz-bb">
        <div className="font-size-md line-height-md fw-500">{item.text}</div>
        <div
          className="text-truncate-2 line-height-sm mt-8px text-gray-700"
          dangerouslySetInnerHTML={{ __html: item.source.Desc }}
        />
      </div>
    </Link>
  );
}
