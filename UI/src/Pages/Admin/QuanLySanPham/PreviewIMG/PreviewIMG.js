import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

const PreviewIMG = (props) => {
  //   const [show, setShow] = useState(false);

  const handleClose = () => props.setShow(false);
  //   const handleShow = () => setShow(true);

  return (
    <>
      <Modal show={props.show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Image</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div>
            {props.preview && (
              <img
                src={props.preview}
                alt="Preview"
                style={{ width: "100%", height: "100%" }}
              />
            )}
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleClose}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default PreviewIMG;
