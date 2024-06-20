import { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { TbCameraSearch } from "react-icons/tb";
import QrScanner from "react-qr-scanner";
function ModalSearchSP(props) {
  const [show, setShow] = useState(false);
  const [scanResult, setScanResult] = useState("");
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleScan = (data) => {
    if (data) {
      console.log("Scanned data:", data);
      setScanResult(data.text || "No Result");
      if (data) {
        props.HandleOnclickGetDatainQR(data.text);
        handleClose();
      }
    } else {
      console.log("No data");
    }
  };

  const handleError = (err) => {
    console.error("QR Scanner Error:", err);
  };

  const previewStyle = {
    height: 240,
    width: 320,
  };

  const videoConstraints = {
    width: 320,
    height: 240,
    facingMode: "environment",
  };

  return (
    <>
      <Button
        style={{ marginLeft: "20px" }}
        variant="primary"
        onClick={handleShow}
      >
        <TbCameraSearch />
      </Button>

      <Modal style={{ margin: "auto" }} show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Quét QR mã sản phẩm</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div>
            <QrScanner
              delay={300}
              onError={handleError}
              onScan={handleScan}
              style={previewStyle}
              videoConstraints={videoConstraints}
            />
            <p>Scan Result: {scanResult}</p>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default ModalSearchSP;
