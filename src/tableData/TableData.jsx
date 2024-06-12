import React, { useEffect, useState } from "react";

import "./style.css";

const TableData = ({ inferenceData }) => {
  const [inferenceResults, setInferenceResults] = useState();

  useEffect(() => {
    setInferenceResults(inferenceData);
  }, [inferenceData]);

  return (
    <div className="container">
      <div className="row">
        <div className="col-lg-12 col-md-12 col-sm-12 table-responsive toyota-grid">
          <table className="table table-sm table-data">
            <thead>
              <tr className="header-row">
                <th scope="col" className="left-pad">
                  PARTNAME
                </th>
                <th scope="col">STANDARD</th>
                <th scope="col">ACTUAL</th>
                <th scope="col">ACCURACY</th>
                <th scope="col">STATUS</th>
              </tr>
            </thead>
            <tbody>
              {(inferenceResults || []).length > 0 ? (
                <>
                  {(inferenceResults || []).map((inference, indexed) => (
                    <tr key={`${inference?.name}-${indexed}`}>
                      <td className="left-pad">{inference?.name || "N/A"}</td>
                      <td>{inference?.standard || "N/A"}</td>
                      <td>{(inference?.actual || []).toString() || "N/A"}</td>
                      <td>
                        {(inference?.confidence || []).toString() || "N/A"}
                      </td>
                      <td
                        className={
                          inference?.status === "OK"
                            ? "success-status"
                            : "failed-status"
                        }
                      >
                        {inference?.status || "N/A"}
                      </td>
                    </tr>
                  ))}
                </>
              ) : (
                <tr>
                  <td colSpan={5}>
                    <div
                      className="col-lg-12 col-md-6 col-sm-6 col-xs-12"
                      style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        height: "13rem",
                        fontSize: "0.7rem",
                      }}
                    >
                      No inference results found for this station!
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default TableData;
