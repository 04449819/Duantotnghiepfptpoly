import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import QRCode from "qrcode.react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { SetLoading } from "../../../Rudux/Reducer/LoadingSlice";
import { toast } from "react-toastify";
function GetQRChiTietSp(props) {
  //   const [show, setShow] = useState(false);
  const dispath = useDispatch();
  const handleClose = async () => {
    dispath(SetLoading(true));
    setTimeout(async () => {
      try {
        var res = await axios.put(
          `https://localhost:7095/api/SanPham/UpdateChiTietSanPhamQLSP?id=${props.value}&trangThai=1`
        );
        // toast.success(`${res.data}`);
        dispath(SetLoading(false));
        props.setloaduseE(!props.loaduseE);
        props.setShow(false);
      } catch (error) {
        toast.error(`Gặp lỗi : ${error.response.data}`);
        dispath(SetLoading(false));
      }
    }, 3000);
  };
  const handleClose1 = () => props.setShow(false);
  return (
    <>
      <Modal show={props.show} onHide={handleClose1}>
        <Modal.Header closeButton>
          <Modal.Title>Modal heading</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="w-50 mx-auto">
            <QRCode className="ms-4" value={props.value} />
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={handleClose}>
            Lưu
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default GetQRChiTietSp;
