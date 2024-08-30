import React, { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import axios from "axios";
import { useDispatch } from "react-redux";
import { setnamekhachhang } from "../../../../Rudux/Reducer/taiKhoanSlice";

function ModalXemhoso({ employee, onEmployeeUpdate, setload, load }) {
  const [show, setShow] = useState(false);
  const dispath = useDispatch();
  const [formData, setFormData] = useState({
    ten: "",
    email: "",
    password: "",
    confirmPassword: "",
    sdt: "",
    diaChi: "", // Updated key to match your database field
    idvaitro: "952c1a5d-74ff-4daf-ba88-135c5440809c",
    trangThai: 1,
  });
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (employee) {
      setFormData({
        ten: employee.ten || "",
        email: employee.email || "",
        password: "", // Xử lý mật khẩu cẩn thận
        confirmPassword: "", // Xử lý mật khẩu xác nhận
        sdt: employee.sdt || "",
        diaChi: employee.diaChi || "", // Updated key to match your database field
        idvaitro: employee.idvaitro || "952c1a5d-74ff-4daf-ba88-135c5440809c",
        trangThai: employee.trangThai || 1, // Cập nhật trạng thái
      });
    }
  }, [employee]);

  const handleClose = () => {
    setload(!load);
    setShow(false);
  };

  const handleShow = () => setShow(true);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Reset errors
    setErrors({});

    const {
      ten,
      email,
      password,
      confirmPassword,
      sdt,
      diaChi,
      idvaitro,
      trangThai,
    } = formData;
    const newErrors = {};
    let valid = true;

    // Check required fields
    if (!ten || !email || !sdt || !diaChi) {
      newErrors.general = "Vui lòng điền đầy đủ thông tin";
      valid = false;
    }

    // Check password length
    if (password && password.length < 8) {
      newErrors.password = "Mật khẩu phải có ít nhất 8 ký tự";
      valid = false;
    }

    // Check confirm password
    if (password !== confirmPassword) {
      newErrors.confirmPassword = "Mật khẩu xác nhận không khớp";
      valid = false;
    }

    // Check phone number length
    if (!/^0\d{9}$/.test(sdt.trim())) {
      newErrors.sdt = "Số điện thoại phải bắt đầu bằng 0 và có 10 ký tự";
      valid = false;
    }

    // Validate address
    if (!diaChi.trim()) {
      newErrors.diaChi = "Địa chỉ không được để trống";
      valid = false;
    }

    if (!valid) {
      setErrors(newErrors);
      return;
    }

    if (!employee || !employee.id) {
      console.error("Thiếu ID nhân viên");
      return;
    }

    try {
      // Create parameters object
      const params = {
        ten: ten.trim(),
        email: email.trim(),
        sdt: sdt.trim(),
        diaChi: diaChi.trim(), // Updated key to match your database field
        idvaitro: idvaitro.trim(),
        trangThai: trangThai,
      };

      // Add password if not empty
      if (password.trim() !== "") {
        params.password = password.trim();
      }

      // Convert to query string
      const queryString = new URLSearchParams(params).toString();

      // Thực hiện PUT request với tham số truy vấn
      const response = await axios.put(
        `https://localhost:7095/api/NhanVien/${employee.id}?${queryString}`
      );
      console.log("Cập nhật thành công:", response.data);
      onEmployeeUpdate(response.data); // Thông báo cho component cha về cập nhật
      dispath(setnamekhachhang(params.ten));
      handleClose();
    } catch (error) {
      if (error.response && error.response.data && error.response.data.errors) {
        // Xử lý lỗi xác thực
        console.error("Lỗi xác thực:", error.response.data.errors);
      } else {
        console.error("Lỗi khi cập nhật dữ liệu nhân viên:", error);
      }
    }
  };

  return (
    <>
      <Button variant="primary" onClick={handleShow}>
        Chỉnh sửa hồ sơ
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Chỉnh sửa hồ sơ nhân viên</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            {errors.general && (
              <div className="alert alert-danger">{errors.general}</div>
            )}

            <Form.Group className="mb-3" controlId="formTen">
              <Form.Label>Họ và tên</Form.Label>
              <Form.Control
                type="text"
                placeholder="Nhập họ và tên"
                name="ten"
                value={formData.ten}
                onChange={handleChange}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formEmail">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                placeholder="Nhập email"
                name="email"
                value={formData.email}
                onChange={handleChange}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formPassword">
              <Form.Label>Mật khẩu</Form.Label>
              <Form.Control
                type="password"
                placeholder="Nhập mật khẩu"
                name="password"
                value={formData.password}
                onChange={handleChange}
              />
              {errors.password && (
                <div className="text-danger">{errors.password}</div>
              )}
            </Form.Group>

            <Form.Group className="mb-3" controlId="formConfirmPassword">
              <Form.Label>Xác nhận mật khẩu</Form.Label>
              <Form.Control
                type="password"
                placeholder="Nhập lại mật khẩu"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
              />
              {errors.confirmPassword && (
                <div className="text-danger">{errors.confirmPassword}</div>
              )}
            </Form.Group>

            <Form.Group className="mb-3" controlId="formSdt">
              <Form.Label>Số điện thoại</Form.Label>
              <Form.Control
                type="text"
                placeholder="Nhập số điện thoại"
                name="sdt"
                value={formData.sdt}
                onChange={handleChange}
              />
              {errors.sdt && <div className="text-danger">{errors.sdt}</div>}
            </Form.Group>

            <Form.Group className="mb-3" controlId="formDiaChi">
              <Form.Label>Địa chỉ</Form.Label>
              <Form.Control
                type="text"
                placeholder="Nhập địa chỉ"
                name="diaChi" // Updated name to match your form data
                value={formData.diaChi} // Updated value to match your form data
                onChange={handleChange}
              />
              {errors.diaChi && (
                <div className="text-danger">{errors.diaChi}</div>
              )}
            </Form.Group>

            {/* Trường ID Vai trò ẩn */}
            <Form.Group className="mb-3" controlId="formIdvaitro">
              <Form.Control
                type="hidden"
                name="idvaitro"
                value={formData.idvaitro}
              />
            </Form.Group>

            {/* Trường Trang Thái ẩn */}
            <Form.Group className="mb-3" controlId="formTrangThai">
              <Form.Control
                type="hidden"
                name="trangThai"
                value={formData.trangThai}
              />
            </Form.Group>

            <Button variant="secondary" onClick={handleClose}>
              Đóng
            </Button>
            <Button variant="primary" type="submit">
              Lưu thay đổi
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
}

export default ModalXemhoso;
