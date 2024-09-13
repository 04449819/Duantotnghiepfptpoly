import React, { useState, useEffect } from 'react';
import { Modal, Button } from 'react-bootstrap';
import axios from 'axios';

const CompletedOrderModal = ({ show, onHide, orderId }) => {
  const [completedOrderDetails, setCompletedOrderDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchCompletedOrderDetails = async () => {
      setLoading(true); // Bắt đầu tải
      try {
        const response = await axios.get(`https://localhost:7095/api/SanPham/getAllchitiethoan?hoaDonId=${orderId}`);
        setCompletedOrderDetails(response.data);
      } catch (err) {
        console.error('Lỗi khi tải thông tin đơn hàng hoàn thành:', err); // Ghi lỗi ra console
        setError('Không thể tải thông tin đơn hàng hoàn thành.');
      } finally {
        setLoading(false); // Kết thúc tải
      }
    };

    if (orderId) {
      fetchCompletedOrderDetails();
    }
  }, [orderId]);

  if (loading) return <div>Đang tải...</div>;
  if (error) return <div className="text-danger">{error}</div>;

  return (
    <Modal show={show} onHide={onHide} size="lg">
      <Modal.Header closeButton>
        <Modal.Title>Chi Tiết Đơn Hàng Hoàn Thành</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {completedOrderDetails && completedOrderDetails.length > 0 ? (
          <div className="completed-order-info">
            <h5>Thông Tin Đơn Hàng</h5>
            {completedOrderDetails.map((item) => (
              <div key={item.id} className="completed-order-item">
                <div className="order-item">
                  <img
                    src={item.anhSanPham || 'default-image-url.jpg'}
                    alt={item.tenSanPham}
                    style={{ width: '100px', height: '100px', objectFit: 'cover' }}
                  />
                  <div className="order-item-details">
                    <p><strong>{item.tenSanPham}</strong></p>
                    <p>Màu sắc: {item.mauSac || 'Không có màu sắc'}</p>
                    <p>Kích cỡ: {item.kichCo || 'Không có kích cỡ'}</p>
                    <p>Số lượng hoàn: {item.soLuongHoan || '0'}</p>
                    <p>Địa chỉ khách hàng: {item.diaChiKhachHang || 'Không có địa chỉ'}</p>
                    <p className="price">
                      {item.donGia !== undefined ? item.donGia.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' }) : 'Chưa có giá'}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p>Không có thông tin đơn hàng hoàn thành.</p>
        )}
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onHide}>
          Đóng
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default CompletedOrderModal;
