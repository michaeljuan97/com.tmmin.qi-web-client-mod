import React, { useState, useEffect } from "react";
import axios from "axios";
import { useInterval } from "_helpers";
import CapturedImages from "capturedImages";
import ScannedVehicle from "scannedVehicle";
import TableData from "tableData";
import Timer from "timer";
import InfoModal from "_components/InfoModal";

const Home = () => {
  const [response, setResponse] = useState([]);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [postReqBody, setPostReqBody] = useState([]);
  const [isRunning, setIsRunning] = useState(false);
  const [displayCarouselArrow, setDisplayCarouselArrow] = useState("block");

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleShowModal = () => {
    setShowModal(true);
  };

  const handlePostReqBody = (reqBody) => {
    const found = postReqBody.find(
      (item) =>
        (item?.pos || "").toLowerCase() === (reqBody?.pos || "").toLowerCase()
    );

    if (found) {
      const updated = postReqBody.map((req) => {
        if (
          (req?.pos || "").toLowerCase() === (reqBody?.pos || "").toLowerCase()
        ) {
          return { ...reqBody };
        }

        return req;
      });
      setPostReqBody(updated);
    } else {
      setPostReqBody([...postReqBody, reqBody]);
    }
  };

  const fetchInferenceResult = async () => {
    try {
      setLoading(true);
      const resp = await axios.get(
        `${process.env.REACT_APP_API_URL}/inference/data`
      );

      if (resp) {
        const { results = [] } = (resp || {})?.data || {};

        if (results && results.length > 0) {
          const res = results.reduce((acc, curr) => {
            if (curr.pos_status) {
              acc = [
                ...acc,
                {
                  "qr-code": ((curr.data || {}).header || {})?.qr_code || "",
                  pos: curr?.id || "",
                  status: curr?.pos_status ? "OK" : "NG",
                  annotations: "OK",
                },
              ];
            }

            return acc;
          }, []);
          

          if (results.length === 1) {
            setDisplayCarouselArrow("none");
          } else {
            setDisplayCarouselArrow("block");
          }
          // Seems like this control whether it shows the main page or not 
          setIsRunning(false);
          setResponse(results);
          setPostReqBody(res);
        } else {
          setIsRunning(true);
          setDisplayCarouselArrow("none");
          setErrorMessage("No data found! Please rescan QR code.. ");
        }
      } else {
        setIsRunning(true);
        setDisplayCarouselArrow("none");
        setErrorMessage("No data found! Please rescan QR code.. ");
      }
      setLoading(false);
    } catch (error) {
      setIsRunning(true);
      setLoading(false);
      setErrorMessage(
        error?.message || "Something went wrong while fetching the information"
      );
    }
  };

  // useInterval(() => fetchInferenceResult(), isRunning ? 30000 : null);
  useInterval(() => fetchInferenceResult(), isRunning ? 90000 : null);

  useEffect(() => {
    fetchInferenceResult();
  }, []);

  const updateProceededData = async () => {
    try {
      setLoading(true);
      await axios.post(
        `${process.env.REACT_APP_API_URL}/qi/annotate`,
        postReqBody
      );
      setIsRunning(true);
      setShowModal(false);
      setPostReqBody([]);
      setResponse([]);
      // setErrorMessage("Annotation was successful");
      setErrorMessage("Tagging berhasil");
      setLoading(false);
    } catch (error) {
      setIsRunning(true);
      setLoading(false);
      setErrorMessage(
        error?.message ||
          "Something went wrong while proceeding with your action"
      );
    }
  };

  const setButtonActive = (currentItem) => {
    const found = postReqBody.find(
      (item) =>
        (item?.annotations || "").toLowerCase() ===
          (currentItem?.annotations || "").toLowerCase() &&
        (item?.pos || "").toLowerCase() ===
          (currentItem?.pos || "").toLowerCase()
    );

    if (found) {
      return "#01F800";
    } else {
      return "#FF9304";
    }
  };

  return (
    <>
      {loading ? (
        <div className="row">
          <div
            className="col-lg-12"
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              height: "25rem",
            }}
          >
            <div
              className="d-flex justify-content-center spinner-border"
              style={{ width: "3rem", height: "3rem" }}
              role="status"
            >
              <span className="sr-only"></span>
            </div>
          </div>
        </div>
      ) : (
        <>
          {(response || []).length > 0 ? (
            <>
              <div className="row">
                <div className="col-lg-12 col-md-12 col-sm-12">
                  <div
                    id="postDataCarousel"
                    className="carousel slide"
                    data-bs-ride="false"
                    data-interval="false"
                  >
                    <div className="carousel-inner">
                      {(response || []).map((resp, indexed) => (
                        <div
                          key={`${resp.id || "N/A"}-${indexed}`}
                          className={`carousel-item${
                            indexed === 0 ? " active" : ""
                          }`}
                        >
                          <div
                            className="row mt-2"
                            style={{
                              display: "flex",
                              justifyContent: "center",
                            }}
                          >
                            <div className="col-lg-8 col-md-8 col-sm-8 pb-2">
                              <ScannedVehicle
                                response={(resp.data || {}).header || {}}
                                post={(resp?.id || "N/A").toUpperCase()}
                              />
                            </div>
                          </div>
                          <div className="row mt-2">
                            <div className="col-lg-6 col-md-6 col-sm-12 pb-2">
                              <CapturedImages
                                imagesData={((resp.data || {}).data || []).map(
                                  (img) => {
                                    return {
                                      url: img.image_url || "",
                                      camName: img.camera_name || "",
                                    };
                                  }
                                )}
                                title={(resp?.id || "N/A").toUpperCase()}
                              />
                            </div>
                            <div className="col-lg-6 col-md-6 col-sm-12 pb-2">
                              <TableData
                                inferenceData={((resp.data || {}).data || [])
                                  .map((inf) => [...(inf?.inference || [])])
                                  .flat(Infinity)}
                              />
                            </div>
                          </div>
                          <div
                            className="row"
                            style={{
                              display: "flex",
                              justifyContent: "center",
                            }}
                          >
                            <div className="col-lg-12 col-md-12 col-sm-12">
                              <div
                                className="conatiner"
                                style={{ border: "0.02rem solid white" }}
                              >
                                <div className="block row text-center">
                                  <div
                                    className="col-lg-12 col-md-12 col-sm-12 p-2 captured-images-title"
                                    style={{
                                      borderBottom: "0.02rem solid white",
                                    }}
                                  >
                                    Summary
                                  </div>
                                </div>
                                <div className="row">
                                  <div
                                    className="col-lg-6 col-md-6 col-sm-12 pb-2"
                                    style={{
                                      display: "flex",
                                      flexDirection: "row",
                                      alignItems: "center",
                                      flexWrap: "wrap",
                                      justifyContent: "space-evenly",
                                    }}
                                  >
                                    <p
                                      style={{
                                        color: "red",
                                        fontSize: "3rem",
                                      }}
                                    >
                                      {(resp?.id || "N/A").toUpperCase()}
                                    </p>
                                    <p style={{ 
                                          color: resp?.pos_status ? "#01F800" : "red", 
                                          fontSize: "3rem" 
                                          }}>
                                        {resp?.pos_status ? "OK" : "NG"}
                                    </p>
                                  </div>
                                  <div
                                    className="col-lg-6 col-md-6 col-sm-12 failed-status"
                                    style={{
                                      display: "flex",
                                      flexDirection: "column",
                                      alignItems: "center",
                                      justifyContent: "center",
                                    }}
                                  >
                                    {/* Double Width */}
                                    <button
                                      type="button"
                                      className="btn btn-primary mt-2"
                                      disabled={resp?.pos_status}
                                      style={{
                                        // width: "13rem",
                                        // Bigger font on button
                                        fontSize:20,
                                        width: "26rem",
                                        borderRadius: 0,
                                        backgroundColor: setButtonActive({
                                          annotations: "Wrong Judgement",
                                          pos: resp?.id || "",
                                        }),
                                        borderColor: setButtonActive({
                                          annotations: "Wrong Judgement",
                                          pos: resp?.id || "",
                                        }),
                                        color: "#1d2655",
                                      }}
                                      onClick={() => {
                                        handlePostReqBody({
                                          "qr-code":
                                            ((resp.data || {}).header || {})
                                              ?.qr_code || "",
                                          pos: resp?.id || "",
                                          status: resp?.pos_status
                                            ? "OK"
                                            : "NG",
                                          annotations: "Wrong Judgement",
                                        });
                                      }}
                                    >
                                      OK &#40;Wrong Judgement&#41;
                                    </button>
                                    {/* Also double width */}
                                    <button
                                      type="button"
                                      className="btn btn-primary mt-2"
                                      disabled={resp?.pos_status}
                                      style={{
                                        // width: "13rem",
                                        fontSize:20,
                                        width: "26rem",
                                        borderRadius: 0,
                                        backgroundColor: setButtonActive({
                                          annotations: "Repair",
                                          pos: resp?.id || "",
                                        }),
                                        borderColor: setButtonActive({
                                          annotations: "Repair",
                                          pos: resp?.id || "",
                                        }),
                                        color: "#1d2655",
                                      }}
                                      onClick={() => {
                                        handlePostReqBody({
                                          "qr-code":
                                            ((resp.data || {}).header || {})
                                              ?.qr_code || "",
                                          pos: resp?.id || "",
                                          status: resp?.pos_status
                                            ? "OK"
                                            : "NG",
                                          annotations: "Repair",
                                        });
                                      }}
                                    >
                                      Repair
                                    </button>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                    {/* Ada tombol carousel tapi hidden, why? Whats the purpose? */}
                    <button
                      className="carousel-control-prev"
                      type="button"
                      data-bs-target="#postDataCarousel"
                      data-bs-slide="prev"
                      style={{
                        width: "4%",
                        height: "8%",
                        marginTop: "14rem",
                        display: `${displayCarouselArrow}`,
                      }}
                    >
                      <span
                        className="carousel-control-prev-icon"
                        aria-hidden="true"
                      ></span>
                      <span className="visually-hidden">Previous</span>
                    </button>
                    <button
                      className="carousel-control-next"
                      type="button"
                      data-bs-target="#postDataCarousel"
                      data-bs-slide="next"
                      style={{
                        width: "4%",
                        height: "8%",
                        marginTop: "14rem",
                        display: `${displayCarouselArrow}`,
                      }}
                    >
                      <span
                        className="carousel-control-next-icon"
                        aria-hidden="true"
                      ></span>
                      <span className="visually-hidden">Next</span>
                    </button>
                  </div>
                  <InfoModal
                    handleProceed={() => {
                      updateProceededData();
                    }}
                    showModal={showModal}
                    handleCloseModal={() => {
                      handleCloseModal();
                    }}
                    confirmation="Are you sure you want to proceed?"
                  />
                </div>
              </div>
              {postReqBody.length === response.length ? (
                <div
                  className="row text-center mt-4"
                  style={{ display: "flex", justifyContent: "center" }}
                >
                  <Timer
                    // quote="All POS statuses are OK."
                    quote="Semua POS status OK"
                    message="Please, click on the Proceed button to annotate or wait 30 seconds to automatically annotate!"
                    showButton={false}
                    autoAnnotate={true}
                    reFetch={() => {
                      updateProceededData();
                    }}
                  />
                </div>
              ) : null}
              <div className="row mt-2">
                <div
                  className="col-lg-12"
                  style={{
                    display: "flex",
                    justifyContent: "center",
                  }}
                >
                  {/* <button
                    type="button"
                    className="btn btn-primary mt-2 mb-2"
                    style={{
                      width: "13rem",
                      borderRadius: 0,
                      backgroundColor: "#FF9304",
                      borderColor: "#FF9304",
                      color: "#1d2655",
                    }}
                    disabled={postReqBody.length !== response.length}
                    onClick={() => {
                      handleShowModal();
                    }}
                  >
                    Proceed
                  </button> */}
                </div>
              </div>
            </>
          ) : (
            <>
              <Timer
                quote={`"${errorMessage}".`}
                message="Please, click on the refresh button or wait 30 seconds to refetch!"
                showButton={true}
                reFetch={() => {
                  fetchInferenceResult();
                }}
              />
            </>
          )}
        </>
      )}
    </>
  );
};

export default Home;
