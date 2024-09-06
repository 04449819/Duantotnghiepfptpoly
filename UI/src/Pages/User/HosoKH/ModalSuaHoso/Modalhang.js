import React, { useState, useEffect } from 'react';
import { Modal, Button } from 'react-bootstrap';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './kk.scss';
import FeedbackModal from './FeedbackModal';
import ReturnModal from './ReturnModal';
const ModalHang = ({ isOpen, onClose, orderId }) => {
  const [orderDetails, setOrderDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [selectedProduct, setSelectedProduct] = useState(null); // Sản phẩm được chọn để đánh giá
  const [feedbackStatus, setFeedbackStatus] = useState('');
  const [showReturnModal, setShowReturnModal] = useState(false); // Trạng thái hiển thị ReturnModal
  const navigate = useNavigate();

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

  const handleCompleteReturn = () => {
    setShowReturnModal(true); // Hiển thị ReturnModal
  };

  const handleFeedbackClick = (product) => {
    const feedbackId = product.iDcthd[0].id; // Lấy ID của chi tiết đơn hàng
    setSelectedProduct(feedbackId); // Đặt ID đã lấy làm sản phẩm được chọn
  };

  const handleFeedbackModalClose = () => {
    setSelectedProduct(null); // Đóng modal đánh giá
  };

  const handleFeedbackSubmit = (success) => {
    if (success) {
      setFeedbackStatus('Đánh giá đã được gửi thành công!');
    } else {
      setFeedbackStatus('Gửi đánh giá không thành công.');
    }
    handleFeedbackModalClose(); // Đóng modal sau khi gửi phản hồi
  };

  if (loading) return <div>Đang tải...</div>;
  if (error) return <div className="text-danger">{error}</div>;

  return (
    <>
      <Modal show={isOpen} onHide={onClose} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>Chi Tiết Đơn Hàng</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {orderDetails ? (
            <div className="modal-content">
              {/* Stepper */}
              <div className="stepper">
                {/* Các bước của đơn hàng */}
                {orderDetails.trangThaiGiaoHang >= 2 && (
                  <div className="stepper__step stepper__step--finish">
                    <div className="stepper__step-icon">
                      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M12 8v8m4-4H8"></path>
                      </svg>
                    </div>
                    <div className="stepper__step-text">Đã xác nhận thông tin</div>
                    <div className="stepper__step-date">
                      {orderDetails.ngayThanhToan ? new Date(orderDetails.ngayTao).toLocaleDateString() + ' ' + new Date(orderDetails.ngayThanhToan).toLocaleTimeString() : 'Chưa xác nhận'}
                    </div>
                  </div>
                )}
                {orderDetails.trangThaiGiaoHang >= 3 && (
                  <div className="stepper__step stepper__step--finish">
                    <div className="stepper__step-icon">
                      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M5 15l4 4L19 7"></path>
                      </svg>
                    </div>
                    <div className="stepper__step-text">Ngày giao hàng</div>
                    <div className="stepper__step-date">
                      {orderDetails.ngayNhanHang ? new Date(orderDetails.ngayNhanHang).toLocaleDateString() + ' ' + new Date(orderDetails.ngayNhanHang).toLocaleTimeString() : 'Chưa nhận'}
                    </div>
                  </div>
                )}
                {orderDetails.trangThaiGiaoHang >= 6 && (
                  <div className="stepper__step stepper__step--finish">
                    <div className="stepper__step-icon">
                      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M12 4l2.5 7h7.5l-6 4.5 2.5 7.5-6-4.5-6 4.5L8.5 16 2 8.5h7.5z"></path>
                      </svg>
                    </div>
                    <div className="stepper__step-text">Đơn hàng đã hoàn thành</div>
                    <div className="stepper__step-date">
                      {orderDetails.ngayHoanThanh ? new Date(orderDetails.ngayThanhToan).toLocaleDateString() + ' ' + new Date(orderDetails.ngayHoanThanh).toLocaleTimeString() : 'Chưa hoàn thành'}
                    </div>
                  </div>
                )}
                <div className="stepper__line">
                  <div className="stepper__line-foreground" style={{ width: `${(orderDetails.trangThaiGiaoHang / 6) * 100}%` }}></div>
                </div>
              </div>

              {/* Nội dung chi tiết đơn hàng */}
              <div className="order-info">
                <h5>Thông Tin Đơn Hàng</h5>
                <div className="order-info-row">
                  <div className="order-info-column">
                    <p><strong>Mã HD:</strong> {orderDetails.maHD}</p>
                    <p><strong>Ngày Tạo:</strong> {new Date(orderDetails.ngayTao).toLocaleDateString()}</p>
                    <p><strong>Ngày Thanh Toán:</strong> {orderDetails.ngayThanhToan ? new Date(orderDetails.ngayThanhToan).toLocaleDateString() : 'Chưa thanh toán'}</p>
                    <p><strong>Ngày Nhận:</strong> {orderDetails.ngayNhanHang ? new Date(orderDetails.ngayNhanHang).toLocaleDateString() : 'Chưa nhận hàng'}</p>
                    <p><strong>Trạng Thái Giao Hàng:</strong> {renderTrangThaiGiaoHang(orderDetails.trangThaiGiaoHang)}</p>
                    <p><strong>Tên Người Nhận:</strong> {orderDetails.tenNguoiNhan}</p>
                  </div>
                  <div className="order-info-column">
                    <p><strong>SDT:</strong> {orderDetails.sdt}</p>
                    <p><strong>Email:</strong> {orderDetails.email}</p>
                    <p><strong>Địa Chỉ:</strong> {orderDetails.diaChi}</p>
                    <p><strong>Tổng Tiền:</strong> {orderDetails.tongTien !== undefined ? orderDetails.tongTien.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' }) : 'Chưa có tổng tiền'}</p>
                    <p><strong>Tiền Ship:</strong> {orderDetails.tienShip !== undefined ? orderDetails.tienShip.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' }) : 'Chưa có tiền ship'}</p>
                    <p><strong>Ghi Chú:</strong> {orderDetails.ghiChu || 'Không có ghi chú'}</p>
                  </div>
                </div>
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
                        <p>Phân loại hàng: {item.mauSac || 'Không có màu sắc'} | Size: {item.kichCo || 'Không có kích cỡ'} | Số lượng: {item.soLuong || 'Không có số lượng'}</p>
                        <p className="price">
                          {item.tongTien !== undefined ? item.donGia.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' }) : 'Chưa có giá'}
                        </p>
                        {orderDetails.trangThaiGiaoHang === 6 && (
                          <Button onClick={() => handleFeedbackClick(item)}>Đánh Giá</Button>
                        )}
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
          {orderDetails && orderDetails.trangThaiGiaoHang === 6 && (
            <>
              <Button variant="primary" onClick={handleCompleteReturn}>
                Hoàn Hàng
              </Button>
              
            </>
          )}
          <Button variant="secondary" onClick={onClose}>
            Đóng
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Feedback Modal */}
      {selectedProduct && (
        <FeedbackModal
          show={Boolean(selectedProduct)}
          onHide={handleFeedbackModalClose}
          productId={selectedProduct}
          onSubmit={(success) => handleFeedbackSubmit(success)}
        />
      )}

{showReturnModal && (
  <ReturnModal
    show={showReturnModal}
    onHide={() => setShowReturnModal(false)}
    orderId={orderId}
    productDetails={orderDetails ? orderDetails.sanPhamDetails : []} // Sử dụng sanPhamDetails để truyền dữ liệu
    onSubmit={(success) => {
      if (success) {
        setFeedbackStatus('Hoàn hàng thành công!');
      } else {
        setFeedbackStatus('Hoàn hàng không thành công.');
      }
      setShowReturnModal(false); // Đóng modal hoàn hàng
    }}
  />
)}


      {/* Feedback Status Modal */}
      {feedbackStatus && (
        <Modal show={Boolean(feedbackStatus)} onHide={() => setFeedbackStatus('')} size="sm">
          <Modal.Body>
            {feedbackStatus}
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => setFeedbackStatus('')}>Đóng</Button>
          </Modal.Footer>
        </Modal>
      )}
    </>
  );
};

export default ModalHang;
