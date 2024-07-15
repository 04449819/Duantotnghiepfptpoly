import { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import { Row } from "react-bootstrap";
import axios from "axios";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { SetLoading } from "../../../Rudux/Reducer/LoadingSlice";
const ModalSuaSanPhamChiTiet = (props) => {
  const handleClose = () => {
    props.setShow(false);
    props.setloaduseE(!props.loaduseE);
  };

  // const [data, setdata] = useState(() => ({
  //   id: props.item?.id || "",
  //   trangThai: props.item?.trangthai || "",
  //   soluong: props.item?.soluong || "",
  //   giaban: props.item?.giaban || "",
  // }));

  // console.log(props.item);
  // console.log(data);

  const [validated, setValidated] = useState(false);

  const handleSubmit = (event) => {
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }
    if (form.checkValidity() === true) {
      updateData(
        props.data.id,
        props.data.giaban,
        props.data.soluong,
        props.data.trangThai
      );
    }
    event.preventDefault();
    setValidated(true);
  };

  const dispath = useDispatch();

  const updateData = async (id, giaBan, soLuong, trangthai) => {
    //https://localhost:7095/api/ChatLieu/0dc14d36-e00d-4cc7-bf92-0045c66861a2?ten=V%E1%BA%A3i%20Jean&trangthai=1
    dispath(SetLoading(true));
    setTimeout(async () => {
      try {
        const res = await axios.put(
          `https://localhost:7095/api/SanPham/UpdateChiTietSanPhamQLSP?id=${id}&soLuong=${soLuong}&giaBan=${giaBan}&trangThai=${trangthai}`
        );
        toast.success(`${res.data}`);
        dispath(SetLoading(false));
      } catch (error) {
        toast.error(`Gặp lỗi : ${error.response.data}`);
        dispath(SetLoading(false));
      }
    }, 3000);
  };

  return (
    <>
      <Modal show={props.show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Thông tin sản phẩm</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form noValidate validated={validated} onSubmit={handleSubmit}>
            <Form.Group
              as={Col}
              md="6"
              className="mb-3"
              controlId="validationCustom03"
            >
              <Form.Label>Số lượng</Form.Label>
              <Form.Control
                type="number"
                placeholder="Số lượng"
                min="1"
                max="10000"
                required
                value={props.data.soluong}
                onChange={(e) =>
                  props.setdata({ ...props.data, soluong: e.target.value })
                }
              />
              <Form.Control.Feedback type="invalid">
                Số lượng phải nằm trong khoảng 1000 - 10000
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group as={Col} md="6" controlId="validationCustom03">
              <Form.Label className="mt-3">Gía bán</Form.Label>
              <Form.Control
                type="number"
                placeholder="Gía bán"
                min="1"
                max="100000000"
                required
                value={props.data.giaban}
                onChange={(e) =>
                  props.setdata({ ...props.data, giaban: e.target.value })
                }
              />
              <Form.Control.Feedback type="invalid">
                Gía bán phải nằm trong khoảng 0 - 100000000
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group>
              <Form.Label className="mt-4">Trạng thái</Form.Label>
              <Form.Select
                style={{ width: "40%" }}
                aria-label="Default select example"
                value={props.data.trangThai}
                onChange={(e) =>
                  props.setdata({ ...props.data, trangThai: e.target.value })
                }
                required
              >
                <option value="">Trạng thái</option>
                <option value="1">Đang sử dụng</option>
                <option value="0">Ngưng sử dụng</option>
                <option value="2">Quét QR</option>
              </Form.Select>
              <Form.Control.Feedback type="invalid">
                Trạng thái không được bỏ trống.
              </Form.Control.Feedback>
            </Form.Group>
            <hr className="mt-5" />
            <Row>
              <Col xs={6}>
                <Button variant="secondary" onClick={handleClose}>
                  Đóng
                </Button>
              </Col>
              <Col xs={6} className="text-end">
                <Button className="ms-5" type="submit">
                  Lưu
                </Button>
              </Col>
            </Row>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default ModalSuaSanPhamChiTiet;
