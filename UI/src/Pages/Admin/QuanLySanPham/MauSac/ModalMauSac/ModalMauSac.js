import React, { useState } from "react";
import { SketchPicker } from "react-color";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import { Row } from "react-bootstrap";
import { toast } from "react-toastify";
import { SetLoading } from "../../../../../Rudux/Reducer/LoadingSlice";
import { useDispatch } from "react-redux";
import axios from "axios";
const ModalMauSac = (props) => {
  const [show, setShow] = useState(false);

  const handleClose = () => {
    setShow(false);
    props.setloaduseE(!props.loaduseE);
  };
  const handleShow = () => setShow(true);

  const [data, setdata] = useState({
    ten: props.item !== undefined ? props.item.ten : "",
    mausac: props.item !== undefined ? props.item.ma : "",
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
        ? Postdata(data.ten, data.mausac, data.trangThai)
        : updateData(props.item.id, data.ten, data.mausac, data.trangThai);
    }
    event.preventDefault();
    setValidated(true);
  };

  const handleColorChange = (color) => {
    setdata({ ...data, mausac: color.hex });
  };

  const dispath = useDispatch();
  const Postdata = async (ten, ma, trangthai) => {
    console.log(ten, ma, trangthai);
    dispath(SetLoading(true));
    setTimeout(async () => {
      try {
        const encodedMa = encodeURIComponent(ma);
        const res = await axios.post(
          `https://localhost:7095/api/MauSac/ThemMauSac?ten=${ten}&ma=${encodedMa}&trangthai=${trangthai}`
        );
        console.log(res.data);
        if (res.data !== null) {
          toast.success("Thêm màu sắc thành công");
          dispath(SetLoading(false));
        } else {
          toast.error("Thêm màu sắc thất bại");
        }
        dispath(SetLoading(false));
      } catch (error) {
        toast.error("Thêm màu sắc thất bại");
        dispath(SetLoading(false));
      }
    }, 3000);
  };

  const updateData = async (id, ten, ma, trangthai) => {
    dispath(SetLoading(true));
    setTimeout(async () => {
      try {
        const encodedMa = encodeURIComponent(ma);
        const res = await axios.put(
          `https://localhost:7095/api/MauSac/${id}?ten=${ten}&ma=${encodedMa}&trangthai=${trangthai}`
        );
        console.log(res.data);
        if (res.data !== null) {
          toast.success("Sửa màu sắc thành công");
          dispath(SetLoading(false));
        } else {
          toast.error("Sửa màu sắc thất bại");
        }
        dispath(SetLoading(false));
      } catch (error) {
        toast.error("Sửa màu sắc thất bại");
        dispath(SetLoading(false));
      }
    }, 3000);
  };

  return (
    <>
      <Button
        style={{ height: "28px", width: "70px", paddingTop: "7px" }}
        variant="primary"
        onClick={handleShow}
      >
        {props.item === undefined ? "+" : "Sửa"}
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>
            {props.item === undefined ? "Thêm màu sắc" : "Sửa màu sắc"}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form noValidate validated={validated} onSubmit={handleSubmit}>
            <Form.Group as={Col} md="6" controlId="validationCustom03">
              <Form.Label>Tên màu sắc</Form.Label>
              <Form.Control
                type="text"
                placeholder="Màu sắc"
                required
                value={data.ten}
                onChange={(e) => setdata({ ...data, ten: e.target.value })}
              />
              <Form.Control.Feedback type="invalid">
                Tên màu sắc không được bỏ trống.
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group>
              <Row>
                <Col xs={3}>
                  <Form.Label style={{ marginTop: "50px" }}>
                    Mã màu sắc:
                  </Form.Label>
                </Col>
                <Col xs={9}>
                  <div
                    style={{
                      width: "100px",
                      height: "25px",
                      border: "1px solid black",
                      borderRadius: "5px",
                      marginTop: "50px",
                      backgroundColor: data.mausac,
                    }}
                  >
                    <p style={{ textAlign: "center", margin: 0 }}>
                      {data.mausac}
                    </p>
                  </div>
                </Col>
              </Row>
              <SketchPicker
                color={data.mausac}
                onChangeComplete={handleColorChange}
              />
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

export default ModalMauSac;
