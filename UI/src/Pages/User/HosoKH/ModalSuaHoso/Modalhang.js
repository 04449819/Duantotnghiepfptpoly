import React, { useState, useEffect } from 'react';
import { Modal, Button } from 'react-bootstrap';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './kk.scss';
import FeedbackModal from './FeedbackModal';
import ReturnModal from './ReturnModal';
import CompletedOrderModal from './CompletedOrderModal';
import { toast } from 'react-toastify';

const ModalHang = ({ isOpen, onClose, orderId, setload, load }) => {
  const [orderDetails, setOrderDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [feedbackStatus, setFeedbackStatus] = useState('');
  const [showReturnModal, setShowReturnModal] = useState(false);
  const [showCompletedOrderModal, setShowCompletedOrderModal] = useState(false);
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
      10: 'đang chuẩn bị hàng',
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
    setShowReturnModal(true);
  };

  const handleFeedbackClick = (product) => {
    if (product.id) {
      setSelectedProduct(product.id);
    } else {
      console.error('ID sản phẩm bị thiếu hoặc rỗng.');
    }
  };

  const handleCancelOrder = async () => {
    console.log(orderDetails.khachHangID);
    try {
      await axios.put(`https://localhost:7095/api/HoaDon/HuyHDkh?idhd=${orderId}&idkh=${orderDetails.khachHangID}`);
      toast.success('Đơn hàng đã được hủy thành công!');
      onClose(); // Đóng modal sau khi hủy thành công
    } catch (error) {
      toast.error('Hủy đơn hàng không thành công. Vui lòng thử lại.');
    }
  };


  const handleFeedbackModalClose = () => {
    setSelectedProduct(null);
  };

  const handleFeedbackSubmit = (success) => {
    if (success) {
      setFeedbackStatus('Đánh giá đã được gửi thành công!');
    } else {
      setFeedbackStatus('Gửi đánh giá không thành công.');
    }
    handleFeedbackModalClose();
  };

  const handleViewCompletedOrder = () => {
    setShowCompletedOrderModal(true);
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


              {/* Order Details */}
              <div className="order-info">
                <h5>Thông Tin Đơn Hàng</h5>
                <div className="order-info-row">
                  <div className="order-info-column">
                    <p><strong>Mã HD:</strong> {orderDetails.maHD}</p>
                    <p><strong>Ngày Tạo:</strong> {new Date(orderDetails.ngayTao).toLocaleDateString()}</p>
                    <p><strong>Ngày Thanh Toán:</strong> {orderDetails.ngayThanhToan ? new Date(orderDetails.ngayThanhToan).toLocaleDateString() : 'Chưa thanh toán'}</p>

                    {orderDetails.trangThaiGiaoHang === 6 ||
                      orderDetails.trangThaiGiaoHang === 8 ||
                      orderDetails.trangThaiGiaoHang === 9 ||
                      orderDetails.trangThaiGiaoHang === 5 ? (
                      <p><strong>Ngày Nhận:</strong> {orderDetails.ngayNhanHang ? new Date(orderDetails.ngayNhanHang).toLocaleDateString() : 'Chưa nhận hàng'}</p>
                    ) : null}
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
                        <p>Phân loại hàng: {item.mauSac || 'Không có màu sắc'} | Size: {item.kichCo || 'Không có kích cỡ'} | Số lượng: {item.soLuonga || 'Không có số lượng'}</p>
                        <p className="price">
                            {item.giaban !== undefined ? item.giaban.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' }) : 'Chưa có giá'}
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
          {orderDetails && (
            <>
              {(orderDetails.trangThaiGiaoHang === 5 ||
                orderDetails.trangThaiGiaoHang === 6 ||
                orderDetails.trangThaiGiaoHang === 4 ||
                orderDetails.trangThaiGiaoHang === 2 ||
                orderDetails.trangThaiGiaoHang === 10 ||
                orderDetails.trangThaiGiaoHang === 9) && (
                  <>
                   {
  (orderDetails.trangThaiGiaoHang === 5 || orderDetails.trangThaiGiaoHang === 6) &&
  new Date(orderDetails.ngayNhanHang) >= new Date(Date.now() - 3 * 24 * 60 * 60 * 1000) ? (
    <Button variant="primary" onClick={handleCompleteReturn}>
      Hoàn Hàng
    </Button>
  ) : null
}


                    {(orderDetails.trangThaiGiaoHang === 5 ||
                      orderDetails.trangThaiGiaoHang === 6 ||
                      orderDetails.trangThaiGiaoHang === 4 ||
                      orderDetails.trangThaiGiaoHang === 9) && (
                        <Button variant="info" onClick={handleViewCompletedOrder}>
                          Xem Đơn Hoàn
                        </Button>
                      )}
                    {(orderDetails.trangThaiGiaoHang === 2 ||
                      orderDetails.trangThaiGiaoHang === 10) && (
                        <Button variant="danger" onClick={handleCancelOrder}>
                          Hủy Đơn Hàng
                        </Button>
                      )}
                  </>
                )}
            </>
          )}
          <Button variant="secondary" onClick={onClose}>
            Đóng
          </Button>
        </Modal.Footer>
      </Modal>

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
          productDetails={orderDetails ? orderDetails.sanPhamDetails : []}
          onSubmit={(success) => {
            if (success) {
              setFeedbackStatus('Hoàn hàng thành công!');
            } else {
              setFeedbackStatus('Hoàn hàng không thành công.');
            }
            setShowReturnModal(false);
          }}
        />
      )}

      {showCompletedOrderModal && (
        <CompletedOrderModal
          show={showCompletedOrderModal}
          onHide={() => setShowCompletedOrderModal(false)}
          orderId={orderId}
        />
      )}
    </>
  );
};

export default ModalHang;
