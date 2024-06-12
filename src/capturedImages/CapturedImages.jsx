import React from "react";

const CapturedImages = ({ imagesData, title }) => {
  return (
    <div className="container captured-images">
      <div className="row text-center">
        <div className="col-lg-12 col-md-12 col-sm-12 p-2 captured-images-title">
          Captured Images - {title}
        </div>
      </div>

      <div
        className="row"
        style={{
          // padding: "0.5rem",
          padding: "1rem",
          display: "flex", //maybe this fix the image overlap? Masih belum bisa
          flexWrap: "wrap", //originalnya udah wrap
        }}
      >
        {(imagesData || []).length > 0 ? (
          <>
            {(imagesData || []).map((image, indexed) => (
              <div
                className="col-3 pb-1"
                key={`${image?.url || ""}-${indexed}`}
                style={{ position: "relative" }}
              >
                <img
                  src={image?.url || ""}
                  className="rounded captured-image"
                  alt="toyota"
                />
                <p className="top-right">{image.camName || "N/A"}</p>
              </div>
            ))}
          </>
        ) : (
          <div
            className="col-lg-12 col-md-6 col-sm-6 col-xs-12"
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              height: "12rem",
              fontSize: "0.7rem",
            }}
          >
            No images found for this station!
          </div>
        )}
      </div>
    </div>
  );
};

export default CapturedImages;
