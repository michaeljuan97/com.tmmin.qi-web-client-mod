import React from "react";

const ScannedVehicle = ({ response, post }) => {
  return (
    <div className="row scanned-vehicle">
      <div className="col col-3 fw-bolder last-scanned">
        <p className="title">
          <span style={{ fontSize: "0.9rem" }}>{post}</span>
          <span className="vr hr-line"></span>
        </p>
      </div>
      <div className="col col-9">
        <div className="row">
          <div className="col col-4">
            <div className="row">
              <div className="col-12 text-truncate fw-bolder">QR Code</div>
              <div
                className="col-12 text-truncate smaller-font-size"
                data-toggle="tooltip"
                data-placement="bottom"
                title={response?.qr_code || "not fetched"}
              >
                {response?.qr_code || "-"}
              </div>
            </div>
          </div>

          <div className="col col-4">
            <div className="row">
              <div className="col-12 text-truncate fw-bolder">Frame Rate</div>
              <div
                className="col-12 text-truncate smaller-font-size"
                data-toggle="tooltip"
                data-placement="bottom"
                title={response?.frame_number || "not fetched"}
              >
                {response?.frame_number || "-"}
              </div>
            </div>
          </div>

          <div className="col col-2">
            <div className="row">
              <div className="col-12 text-truncate fw-bolder">Variant</div>
              <div
                className="col-12 text-truncate smaller-font-size"
                data-toggle="tooltip"
                data-placement="bottom"
                title={response?.model || "not fetched"}
              >
                {response?.model || "-"}
              </div>
            </div>
          </div>

          <div className="col col-2">
            <div className="row">
              <div className="col-12 text-truncate fw-bolder">Suffix</div>
              <div
                className="col-12 text-truncate smaller-font-size"
                data-toggle="tooltip"
                data-placement="bottom"
                title={response?.suffix || "not fetched"}
              >
                {response?.suffix || "-"}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default ScannedVehicle;
