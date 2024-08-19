import React, { useState } from 'react';
import axios from 'axios';
import { Modal, Button, Form } from 'react-bootstrap';
import "./djdjf.scss"

const ChangePasswordModal = ({ show, handleClose, userId }) => {
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Kiểm tra nếu mật khẩu mới và xác nhận mật khẩu không khớp
    if (newPassword !== confirmPassword) {
      setError('Mật khẩu mới và xác nhận mật khẩu không khớp.');
      return;
    }

    // Kiểm tra nếu mật khẩu mới ngắn hơn 8 ký tự
    if (newPassword.length < 8) {
      setError('Mật khẩu mới phải có ít nhất 8 ký tự.');
      return;
    }

    // Kiểm tra nếu mật khẩu hiện tại không được cung cấp
    if (!currentPassword) {
      setError('Mật khẩu hiện tại không được bỏ trống.');
      return;
    }

    try {
      console.log('Gửi yêu cầu với dữ liệu:', {
        currentPassword,
        newPassword,
        confirmPassword
      });

      const response = await axios.put(
        `https://localhost:7095/api/KhachHang/changepassword?id=${userId}`,
        {
          currentPassword,
          newPassword,
          confirmPassword
        }
      );

      console.log('Phản hồi:', response.data); // Xem phản hồi từ API
      setSuccess('Đổi mật khẩu thành công.');
      setError(null);

      // Đóng modal sau khi đổi mật khẩu thành công
      setTimeout(() => {
        handleClose();
      }, 1500); // Đợi 1.5 giây để người dùng có thể đọc thông báo thành công
    } catch (error) {
      console.error('Lỗi khi đổi mật khẩu:', error.response || error.message);
      setError('Lỗi khi đổi mật khẩu.'); // Hiển thị thông báo lỗi cụ thể
    }
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Đổi Mật Khẩu</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="formCurrentPassword">
            <Form.Label>Mật Khẩu Hiện Tại</Form.Label>
            <Form.Control
              type="password"
              placeholder="Nhập mật khẩu hiện tại"
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
              required
            />
          </Form.Group>
          <Form.Group controlId="formNewPassword">
            <Form.Label>Mật Khẩu Mới</Form.Label>
            <Form.Control
              type="password"
              placeholder="Nhập mật khẩu mới"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              required
            />
          </Form.Group>
          <Form.Group controlId="formConfirmPassword">
            <Form.Label>Xác Nhận Mật Khẩu Mới</Form.Label>
            <Form.Control
              type="password"
              placeholder="Nhập lại mật khẩu mới"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
          </Form.Group>
          {error && <div className="text-danger mt-2">{error}</div>}
          {success && <div className="text-success mt-2">{success}</div>}
          <Button variant="secondary" onClick={handleClose}>
            Đóng
          </Button>
          <Button variant="primary" type="submit">
            Lưu
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default ChangePasswordModal;
