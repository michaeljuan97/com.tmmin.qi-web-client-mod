/* eslint-disable jsx-a11y/anchor-is-valid */

export { Nav };

function Nav() {
  return (
    <nav className="navbar toyota-header">
      <div className="container-fluid">
        <div className="row" style={{ width: "100%" }}>
          <div className="col-lg-1 col-md-3 col-sm-12 text-center">
            <a className="navbar-brand" href="#">
              <img
                src="https://cdn.motor1.com/images/mgl/qzNwG/s3/logo-baru-toyota-indonesia.jpg"
                alt="Toyota Indonesia Logo"
                className="d-inline-block align-text-top toyota-logo"
              />
            </a>
          </div>

          <div className="col-lg-4 col-md-4 col-sm-12 pt-2">
            <div className="row text-sm-center text-md-start text-lg-start pb-2">
              <div className="col-12 text-uppercase fw-bolder company">
                PT TOYOTA MOTOR MANUFACTURING INDONESIA
              </div>
              <div className="col-12 text-uppercase fw-normal slogan">
                Plant #2 Quality Control AI IP Line Inspection
              </div>
            </div>
          </div>

          <div className="col-lg-7 col-md-5 col-sm-12 scanned-vehicle-container">
            <div
              className="row"
              style={{
                width: "100%",
                display: "flex",
                justifyContent: "flex-end",
              }}
            ></div>
          </div>
        </div>
      </div>
    </nav>
  );
}
