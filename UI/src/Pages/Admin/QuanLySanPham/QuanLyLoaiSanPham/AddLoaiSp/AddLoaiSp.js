import { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import * as formik from "formik";
import * as yup from "yup";
import { Await } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { SetLoading } from "../../../../../Rudux/Reducer/LoadingSlice";
function AddLoaiSP(props) {
  const [show, setShow] = useState(false);
  const handleClose = () => {
    setShow(false);
    props.HandleOnLoading(true);
  };
  const handleShow = () => setShow(true);

  const { Formik } = formik;

  const schema = yup.object().shape({
    TenLoaiSP: yup.string().required("Tên loại sản phẩm không được để trống"),
    TrangThai: yup.string().required("bạn chưa trọng trạng thái"),
  });
  const dispath = useDispatch();
  const handleSubmit = async (values) => {
    dispath(SetLoading(true));
    if (props.item === undefined) {
      setTimeout(async () => {
        try {
          const res = await axios.post(
            `https://localhost:7095/api/LoaiSP?ten=${values.TenLoaiSP}&trangthai=${values.TrangThai}`
          );
          if (res.data != null) {
            dispath(SetLoading(false));
            return toast.success("Thêm thành công loại sản phẩm");
          }
          toast.error("Loại sản phẩm đã tồn tại");
          dispath(SetLoading(false));
        } catch (error) {
          toast.error("Loại sản phẩm đã tồn tại");
          dispath(SetLoading(false));
        }
      }, 3000);
    } else {
      setTimeout(async () => {
        try {
          const res = await axios.put(
            `https://localhost:7095/api/LoaiSP/updateLoaiSP?id=${props.item.id}&name=${values.TenLoaiSP}&trangThai=${values.TrangThai}`
          );
          console.log(res.data);
          toast.success("update thành công");
          dispath(SetLoading(false));
        } catch (error) {
          toast.error(error.response.data);
          dispath(SetLoading(false));
        }
      }, 3000);
      // dispath(SetLoading(false));
    }
  };
  return (
    <>
      <Button variant="primary" onClick={handleShow}>
        {props.item ? "Sửa" : "Thêm Loại sản phẩm"}
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>
            {props.item ? "Sửa loại sản phẩm" : "Thêm loại sản phẩm"}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Formik
            validationSchema={schema}
            onSubmit={handleSubmit}
            initialValues={{
              TenLoaiSP: props.item ? props.item.ten : "",
              TrangThai: props.item ? props.item.trangThai : "",
            }}
          >
            {({ handleSubmit, handleChange, values, touched, errors }) => (
              <Form noValidate onSubmit={handleSubmit}>
                <Row className="mb-3">
                  <Form.Group as={Col} md="6" controlId="validationFormik03">
                    <Form.Label>Tên loại sản phẩm</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Tên loại sản phẩm"
                      name="TenLoaiSP"
                      value={values.TenLoaiSP}
                      onChange={handleChange}
                      isInvalid={!!errors.TenLoaiSP}
                    />

                    <Form.Control.Feedback type="invalid">
                      {errors.TenLoaiSP}
                    </Form.Control.Feedback>
                  </Form.Group>
                </Row>
                <Row className="mb-5">
                  <Form.Group as={Col} md="6" controlId="validationFormik03">
                    <Form.Label>Trạng thái</Form.Label>
                    <Form.Select
                      aria-label="Default select example"
                      name="TrangThai"
                      value={values.TrangThai}
                      onChange={handleChange}
                      isInvalid={!!errors.TrangThai}
                    >
                      <option>Chọn trạng thái</option>
                      <option value="1">Đang sử dụng </option>
                      <option value="0">Ngưng sử dụng</option>
                    </Form.Select>

                    <Form.Control.Feedback className="mt-2" type="invalid">
                      {errors.TrangThai}
                    </Form.Control.Feedback>
                  </Form.Group>
                </Row>
                <hr />
                <Row>
                  <Form.Group as={Col}>
                    <Button variant="secondary" onClick={handleClose}>
                      Đóng
                    </Button>
                  </Form.Group>
                  <Form.Group as={Col}>
                    <Button style={{ marginLeft: "200px" }} type="submit">
                      Lưu
                    </Button>
                  </Form.Group>
                </Row>
              </Form>
            )}
          </Formik>
        </Modal.Body>
      </Modal>
    </>
  );
}

export default AddLoaiSP;
