import React, { useState, useEffect } from 'react';
import { Modal, Button } from 'react-bootstrap';
import axios from 'axios';

const ModalHang = ({ isOpen, onClose, orderId }) => {
  const [orderDetails, setOrderDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchOrderDetails = async () => {
      try {
        const response = await axios.get(`https://localhost:7095/api/SanPham/getAllSPBanHa222ng?hoaDonId=${orderId}`);
        setOrderDetails(response.data);
      } catch (err) {
        setError('Không thể tải thông tin đơn hàng.');
      } finally {
        setLoading(false);
      }
    };

    if (orderId) {
      fetchOrderDetails();
    }
  }, [orderId]);

  const renderTrangThaiGiaoHang = (trangThai) => {
    const trangThaiGiaoHangDict = {
      1: 'Đơn nháp',
      2: 'Chờ xác nhận',
      3: 'Đang giao hàng',
      6: 'Thành công',
      7: 'Đơn hủy',
      8: 'Chờ xác nhận hủy',
      9: 'Chờ xác nhận hoàn hàng',
      4: 'Đang hoàn hàng',
      5: 'Hoàn hàng thành công'
    };
    return trangThaiGiaoHangDict[trangThai] || 'Không xác định';
  };

  if (loading) return <div>Đang tải...</div>;
  if (error) return <div className="text-danger">{error}</div>;

  return (
    <Modal show={isOpen} onHide={onClose} size="lg">
      <Modal.Header closeButton>
        <Modal.Title>Chi Tiết Đơn Hàng</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {orderDetails ? (
          <div>
            <div className="order-info">
              <h5>Thông Tin Đơn Hàng</h5>
              <p><strong>Mã HD:</strong> {orderDetails.maHD}</p>
              <p><strong>Ngày Tạo:</strong> {new Date(orderDetails.ngayTao).toLocaleDateString()}</p>
              <p><strong>Ngày Thanh Toán:</strong> {orderDetails.ngayThanhToan ? new Date(orderDetails.ngayThanhToan).toLocaleDateString() : 'Chưa thanh toán'}</p>
              <p><strong>Ngày Nhận:</strong> {orderDetails.ngayNhanHang ? new Date(orderDetails.ngayNhanHang).toLocaleDateString() : 'Chưa nhận hàng'}</p>
              <p><strong>Tên Người Nhận:</strong> {orderDetails.tenNguoiNhan}</p>
              <p><strong>SDT:</strong> {orderDetails.sdt}</p>
              <p><strong>Email:</strong> {orderDetails.email}</p>
              <p><strong>Địa Chỉ:</strong> {orderDetails.diaChi}</p>
              <p><strong>Tổng Tiền:</strong> {orderDetails.tongTien !== undefined ? orderDetails.tongTien.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' }) : 'Chưa có tổng tiền'}</p>
              <p><strong>Tiền Ship:</strong> {orderDetails.tienShip !== undefined ? orderDetails.tienShip.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' }) : 'Chưa có tiền ship'}</p>
              <p><strong>Ghi Chú:</strong> {orderDetails.ghiChu || 'Không có ghi chú'}</p>
              <p><strong>Trạng Thái Giao Hàng:</strong> {renderTrangThaiGiaoHang(orderDetails.trangThaiGiaoHang)}</p>
            </div>

            <div className="order-items">
              <h5>Danh Sách Sản Phẩm</h5>
              {orderDetails.sanPhamDetails && orderDetails.sanPhamDetails.length > 0 ? (
                orderDetails.sanPhamDetails.map((item) => (
                  <div className="order-item" key={item.sanPhamId}>
                    <img
                      src={item.anhSanPham || 'default-image-url.jpg'}
                      alt={item.tenSanPham}
                      style={{ width: '100px', height: '100px', objectFit: 'cover' }}
                    />
                    <div className="order-item-details">
                      <p><strong>{item.tenSanPham}</strong></p>
                      <p>Phân loại hàng: {item.mauSac || 'Không có màu sắc'} | Size: {item.kichCo || 'Không có kích cỡ'} | Số lượng: {item.soLuong || 'Không có kích cỡ'}</p>
                      <p className="price">
                        {item.tongTien !== undefined ? item.donGia.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' }) : 'Chưa có giá'}
                      </p>
                    </div>
                  </div>
                ))
              ) : (
                <p>Không có chi tiết sản phẩm.</p>
              )}
            </div>
          </div>
        ) : (
          <p>Không có thông tin đơn hàng.</p>
        )}
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onClose}>
          Đóng
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ModalHang;
