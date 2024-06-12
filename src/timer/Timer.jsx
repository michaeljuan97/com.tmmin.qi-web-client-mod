import React, { useState, useEffect } from "react";

const Timer = ({ message, reFetch, showButton, quote, autoAnnotate }) => {
  const [seconds, setSeconds] = useState(0);
  const [isActive, setIsActive] = useState(true);

  function reset() {
    setSeconds(0);
    setIsActive(false);
  }

  useEffect(() => {
    let interval = null;
    if (isActive) {
      interval = setInterval(() => {
        setSeconds((seconds) => seconds + 1);
      }, 1000);
//This is hardcoded
      if (autoAnnotate && seconds === 90) {
        reset();
        reFetch();
      }
    } else if (!isActive && seconds !== 0) {
      clearInterval(interval);
    }

    return () => clearInterval(interval);
  }, [isActive, seconds, autoAnnotate]);

  return (
    <div
      className="row text-center"
      style={{ display: "flex", justifyContent: "center" }}
    >
      <div className="col-lg-8">
        <div className="alert alert-info" role="alert">
          {/* <p>{quote}</p> */}
          <p>No new data found. Please rescan QR Code..</p>
          <p>Tidak ada data baru. Silahkan scan QR Code..</p>

          {/* <p>{message}</p> */}
          {/* <p>Refetching in {seconds} seconds</p> */}
          <p>Auto refresh page dalam 90 detik.. {seconds}</p>
          {showButton ? (
            <button
              type="button"
              className="btn btn-secondary"
              onClick={() => {
                reset();
                reFetch();
              }}
            >
              Refresh
            </button>
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default Timer;
