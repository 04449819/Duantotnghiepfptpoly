import React, { useState, useEffect } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import axios from 'axios';
import "./styles.scss"

const Modalsua = ({ isOpen, onClose, customer, onSave }) => {
  const [formData, setFormData] = useState({
    ten: '',
    email: '',
    sdt: '',
    gioiTinh: '',
    ngaySinh: ''
  });

  const [error, setError] = useState('');

  useEffect(() => {
    if (customer) {
      setFormData({
        ten: customer.ten || '',
        email: customer.email || '',
        sdt: customer.sdt || '',
        gioiTinh: customer.gioiTinh || '',
        ngaySinh: customer.ngaySinh ? new Date(customer.ngaySinh).toISOString().split('T')[0] : ''
      });
    }
  }, [customer]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSave = async () => {
    // Basic validation
    if (!formData.ten || !formData.email || !formData.sdt || !formData.gioiTinh || !formData.ngaySinh) {
      setError('Vui lòng điền đầy đủ thông tin.');
      return;
    }

    // Email validation
    if (!/\S+@\S+\.\S+/.test(formData.email)) {
      setError('Email không hợp lệ.');
      return;
    }

    // Phone number validation: must start with 0 and be exactly 10 digits long
    if (!/^0\d{9}$/.test(formData.sdt)) {
      setError('Số điện thoại phải bắt đầu bằng 0 và có 10 ký tự.');
      return;
    }

    try {
      const response = await axios.put(
        `https://localhost:7095/api/KhachHang/updatekhachhangabc?id=${customer.idKhachHang}`,
        formData
      );
      console.log('Response:', response.data); // View the response from the API
      onSave(); // Callback function to handle successful save
      onClose(); // Close the modal
    } catch (error) {
      console.error('Lỗi cập nhật thông tin khách hàng:', error.response || error.message);
      setError(
        error.response?.data?.message || 'Có lỗi xảy ra khi cập nhật thông tin.'
      ); // Display specific error message
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
              required
            />
          </Form.Group>
          <Form.Group controlId="formEmail">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              required
            />
          </Form.Group>
          <Form.Group controlId="formPhoneNumber">
            <Form.Label>SDT</Form.Label>
            <Form.Control
              type="text"
              name="sdt"
              value={formData.sdt}
              onChange={handleInputChange}
              required
            />
          </Form.Group>
          <Form.Group controlId="formGender">
            <Form.Label>Giới tính</Form.Label>
            <Form.Control
              as="select"
              name="gioiTinh"
              value={formData.gioiTinh}
              onChange={handleInputChange}
              required
            >
              <option value="">Chọn giới tính</option>
              <option value="0">Nam</option>
              <option value="1">Nữ</option>
            </Form.Control>
          </Form.Group>
          <Form.Group controlId="formBirthDate">
            <Form.Label>Ngày sinh</Form.Label>
            <Form.Control
              type="date"
              name="ngaySinh"
              value={formData.ngaySinh}
              onChange={handleInputChange}
              required
            />
          </Form.Group>

          {error && <div className="text-danger mt-2">{error}</div>}
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
