import React, { useState, useEffect } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import axios from "axios";
import { useDispatch } from "react-redux";
import { setnamekhachhang } from "../../../../Rudux/Reducer/taiKhoanSlice";

const Modalsua = ({ isOpen, onClose, customer, onSave }) => {
  const [formData, setFormData] = useState({
    ten: "",
    email: "",
    sdt: "",
    gioiTinh: "",
    ngaySinh: "",
  });
  const dispath = useDispatch();
  const [errors, setErrors] = useState({
    ten: "",
    email: "",
    sdt: "",
    gioiTinh: "",
    ngaySinh: "",
  });

  useEffect(() => {
    if (customer) {
      console.log("Customer data:", customer);
      setFormData({
        ten: customer.ten || "",
        email: customer.email || "",
        sdt: customer.sdt || "",
        gioiTinh:
          customer.gioiTinh !== undefined ? customer.gioiTinh.toString() : "",
        ngaySinh: customer.ngaySinh
          ? new Date(customer.ngaySinh).toISOString().split("T")[0]
          : "",
      });
    }
  }, [customer]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const validate = () => {
    const newErrors = {};

    if (!formData.ten) newErrors.ten = "Vui lòng nhập tên.";
    if (!formData.email) newErrors.email = "Vui lòng nhập email.";
    else if (!/\S+@\S+\.\S+/.test(formData.email))
      newErrors.email = "Email không hợp lệ.";
    if (!formData.sdt) newErrors.sdt = "Vui lòng nhập số điện thoại.";
    else if (!/^0\d{9}$/.test(formData.sdt))
      newErrors.sdt = "Số điện thoại phải bắt đầu bằng 0 và có 10 ký tự.";
    if (!formData.gioiTinh) newErrors.gioiTinh = "Vui lòng chọn giới tính.";
    if (!formData.ngaySinh) newErrors.ngaySinh = "Vui lòng chọn ngày sinh.";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSave = async () => {
    if (!validate()) return;

    try {
      const response = await axios.put(
        `https://localhost:7095/api/KhachHang/updatekhachhangabc?id=${customer.idKhachHang}`,
        formData
      );
      console.log("Response:", response.data);
      onSave();
      dispath(setnamekhachhang(formData.ten));
      onClose();
    } catch (error) {
      console.error(
        "Lỗi cập nhật thông tin khách hàng:",
        error.response || error.message
      );
      setErrors({
        ...errors,
        global:
          error.response?.data?.message ||
          "Có lỗi xảy ra khi cập nhật thông tin.",
      });
    }
  };

  return (
    <Modal show={isOpen} onHide={onClose}>
      <Modal.Header closeButton>
        <Modal.Title>Thông tin khách hàng</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group controlId="formFullName">
            <Form.Label>Tên</Form.Label>
            <Form.Control
              type="text"
              name="ten"
              value={formData.ten}
              onChange={handleInputChange}
              isInvalid={!!errors.ten}
            />
            <Form.Control.Feedback type="invalid">
              {errors.ten}
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group controlId="formEmail">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              isInvalid={!!errors.email}
            />
            <Form.Control.Feedback type="invalid">
              {errors.email}
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group controlId="formPhoneNumber">
            <Form.Label>SDT</Form.Label>
            <Form.Control
              type="text"
              name="sdt"
              value={formData.sdt}
              onChange={handleInputChange}
              isInvalid={!!errors.sdt}
            />
            <Form.Control.Feedback type="invalid">
              {errors.sdt}
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group controlId="formGender">
            <Form.Label>Giới tính</Form.Label>
            <Form.Control
              as="select"
              name="gioiTinh"
              value={formData.gioiTinh}
              onChange={handleInputChange}
              isInvalid={!!errors.gioiTinh}
            >
              <option value="">Chọn giới tính</option>
              <option value="0">Nam</option>
              <option value="1">Nữ</option>
            </Form.Control>
            <Form.Control.Feedback type="invalid">
              {errors.gioiTinh}
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group controlId="formBirthDate">
            <Form.Label>Ngày sinh</Form.Label>
            <Form.Control
              type="date"
              name="ngaySinh"
              value={formData.ngaySinh}
              onChange={handleInputChange}
              isInvalid={!!errors.ngaySinh}
            />
            <Form.Control.Feedback type="invalid">
              {errors.ngaySinh}
            </Form.Control.Feedback>
          </Form.Group>

          {errors.global && (
            <div className="text-danger mt-2">{errors.global}</div>
          )}
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onClose}>
          Đóng
        </Button>
        <Button variant="primary" onClick={handleSave}>
          Lưu
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default Modalsua;
