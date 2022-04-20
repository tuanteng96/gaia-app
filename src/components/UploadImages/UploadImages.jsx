import React from "react";
import PromHelpers from "../../helpers/PromHelpers";

function UploadImages({ onChange }) {
  const OnUpload = () => {
    PromHelpers.CHOOSE_FILE_SERVER()
      .then(({ data }) => {
        onChange(data);
      })
      .catch((error) => console.log(error));
  };

  return (
    <div
      className="upload-images w-80px h-80px d--f ai--c jc--c"
      onClick={OnUpload}
    >
      <div className="d--f fd--c ai--c">
        <i className="fa-light fa-cloud-arrow-up"></i>
        <span className="font-size-xs text-muted mt-8px">Chọn File</span>
      </div>
    </div>
  );
}

export default UploadImages;
