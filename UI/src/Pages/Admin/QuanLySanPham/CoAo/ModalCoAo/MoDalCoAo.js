import { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import { Row } from "react-bootstrap";
import { toast } from "react-toastify";
import { SetLoading } from "../../../../../Rudux/Reducer/LoadingSlice";
import { useDispatch } from "react-redux";
import axios from "axios";
const MoDalCoAo = (props) => {
  const [show, setShow] = useState(false);

  const handleClose = () => {
    setShow(false);
    props.setloaduseE(!props.loaduseE);
  };
  const handleShow = () => setShow(true);

  const [data, setdata] = useState({
    ten: props.item !== undefined ? props.item.ten : "",
    trangThai: props.item !== undefined ? props.item.trangThai : "",
  });

  const [validated, setValidated] = useState(false);

  const handleSubmit = (event) => {
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }
    if (form.checkValidity() === true) {
      props.item === undefined
        ? Postdata(data.ten, data.trangThai)
        : updateData(props.item.id, data.ten, data.trangThai);
    }
    event.preventDefault();
    setValidated(true);
  };

  const dispath = useDispatch();
  const Postdata = async (ten, trangthai) => {
    dispath(SetLoading(true));
    setTimeout(async () => {
      try {
        const res = await axios.post(
          `https://localhost:7095/api/CoAo/ThemCoAo?ten=${ten}&trangthai=${trangthai}`
        );
        console.log(res.data);
        if (res.data !== null) {
          toast.success("Thêm cổ áo thành công");
          dispath(SetLoading(false));
        } else {
          toast.error("Thêm cổ áo thất bại");
        }
        dispath(SetLoading(false));
      } catch (error) {
        toast.error("Thêm cổ áo thất bại");
        dispath(SetLoading(false));
      }
    }, 3000);
  };

  const updateData = async (id, ten, trangthai) => {
    //https://localhost:7095/api/ChatLieu/0dc14d36-e00d-4cc7-bf92-0045c66861a2?ten=V%E1%BA%A3i%20Jean&trangthai=1
    dispath(SetLoading(true));
    setTimeout(async () => {
      try {
        const res = await axios.put(
          `https://localhost:7095/api/CoAo/${id}?ten=${ten}&trangthai=${trangthai}`
        );
        console.log(res.data);
        if (res.data !== null) {
          toast.success("Sửa cổ áo thành công");
          dispath(SetLoading(false));
        } else {
          toast.error("Sửa cổ áo thất bại");
        }
        dispath(SetLoading(false));
      } catch (error) {
        toast.error("Sửa cổ áo thất bại");
        dispath(SetLoading(false));
      }
    }, 3000);
  };

  return (
    <>
      <Button variant="primary" onClick={handleShow}>
        {props.item === undefined ? "+" : "Sửa"}
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>
            {props.item === undefined ? "Thêm cổ áo" : "Sửa cổ áo"}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form noValidate validated={validated} onSubmit={handleSubmit}>
            <Form.Group as={Col} md="6" controlId="validationCustom03">
              <Form.Label>Tên cổ áo</Form.Label>
              <Form.Control
                type="text"
                placeholder="Cổ áo"
                required
                value={data.ten}
                onChange={(e) => setdata({ ...data, ten: e.target.value })}
              />
              <Form.Control.Feedback type="invalid">
                Tên cổ áo không được bỏ trống.
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group>
              <Form.Select
                style={{ width: "40%" }}
                className="mt-5"
                aria-label="Default select example"
                value={data.trangThai}
                onChange={(e) =>
                  setdata({ ...data, trangThai: e.target.value })
                }
                required
              >
                <option value="">Trạng thái</option>
                <option value="1">Đang sử dụng</option>
                <option value="0">Ngưng sử dụng</option>
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

export default MoDalCoAo;
