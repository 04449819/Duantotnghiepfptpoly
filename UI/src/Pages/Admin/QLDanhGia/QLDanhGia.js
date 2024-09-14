import React, { useState, useEffect } from 'react';
import { Modal, Table, Form, Button, Dropdown } from 'react-bootstrap';
import axios from 'axios';

const QuanLyDanhGia = () => {
  const [danhSachDanhGia, setDanhSachDanhGia] = useState([]);
  const [danhGiaSelected, setDanhGiaSelected] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [phanHoi, setPhanHoi] = useState('');
  const [filterOption, setFilterOption] = useState('all'); // 'all', 'responded', 'notResponded'

  useEffect(() => {
    fetchDanhGia();
  }, []);

  const fetchDanhGia = async () => {
    try {
      const response = await axios.get('https://localhost:7095/api/DanhGia/GetAll');
      setDanhSachDanhGia(response.data);
    } catch (error) {
      console.error('There was a problem with the fetch operation:', error);
    }
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setDanhGiaSelected(null);
    setPhanHoi('');
  };

  const handlePhanHoi = (danhGia) => {
    setDanhGiaSelected(danhGia);
    setPhanHoi(danhGia.phanHoi || '');
    setShowModal(true);
  };

  const handleSubmitPhanHoi = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`https://localhost:7095/api/DanhGia/GuiPhanHoi/${danhGiaSelected.id}?phanHoi=${phanHoi}`);
      await fetchDanhGia();
      handleCloseModal();
    } catch (error) {
      console.error('Error submitting feedback:', error);
    }
  };

  const filteredDanhGia = danhSachDanhGia.filter(item => {
    if (filterOption === 'all') return true;
    if (filterOption === 'responded') return item.phanHoi && item.phanHoi.trim() !== '';
    if (filterOption === 'notResponded') return !item.phanHoi || item.phanHoi.trim() === '';
    return true;
  });

  return (
    <div className="container mt-4">
      <h2 className="mb-4">Quản Lý Đánh Giá</h2>

      <Dropdown className="mb-3">
        <Dropdown.Toggle variant="success" id="dropdown-basic">
          {filterOption === 'all' && 'Tất cả đánh giá'}
          {filterOption === 'responded' && 'Đánh giá đã phản hồi'}
          {filterOption === 'notResponded' && 'Đánh giá chưa phản hồi'}
        </Dropdown.Toggle>

        <Dropdown.Menu>
          <Dropdown.Item onClick={() => setFilterOption('all')}>Tất cả đánh giá</Dropdown.Item>
          <Dropdown.Item onClick={() => setFilterOption('responded')}>Đánh giá đã phản hồi</Dropdown.Item>
          <Dropdown.Item onClick={() => setFilterOption('notResponded')}>Đánh giá chưa phản hồi</Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>

      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Bình Luận</th>
            <th>Sao</th>
            <th>Phản Hồi</th>
            <th>Ngày Đánh Giá</th>
            <th>Trạng Thái</th>
            <th>Hành Động</th>
          </tr>
        </thead>
        <tbody>
          {filteredDanhGia.map((item) => (
            <tr key={item.id}>
              <td>{item.binhLuan}</td>
              <td>
                {[...Array(5)].map((_, index) => (
                  <span key={index} style={{ color: index < item.sao ? "gold" : "gray" }}>★</span>
                ))}
              </td>
              <td>{item.phanHoi || 'Chưa có phản hồi'}</td>
              <td>{item.ngayDanhGia}</td>
              <td>{item.trangThai}</td>
              <td>
                <Button variant="primary" size="sm" onClick={() => handlePhanHoi(item)}>
                  Phản hồi
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      <Modal show={showModal} onHide={handleCloseModal} size="lg" aria-labelledby="contained-modal-title-vcenter" centered>
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            Phản hồi đánh giá
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {danhGiaSelected && (
            <Form onSubmit={handleSubmitPhanHoi}>
              <Form.Group className="mb-3">
                <Form.Label>Bình Luận</Form.Label>
                <Form.Control type="text" value={danhGiaSelected.binhLuan} readOnly />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Sao</Form.Label>
                <Form.Control type="text" value={danhGiaSelected.sao} readOnly />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Ngày Đánh Giá</Form.Label>
                <Form.Control type="text" value={danhGiaSelected.ngayDanhGia} readOnly />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Phản Hồi</Form.Label>
                <Form.Control 
                  as="textarea" 
                  rows={3} 
                  value={phanHoi}
                  onChange={(e) => setPhanHoi(e.target.value)}
                  required
                />
              </Form.Group>
              <Button variant="primary" type="submit">
                Gửi phản hồi
              </Button>
            </Form>
          )}
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default QuanLyDanhGia;