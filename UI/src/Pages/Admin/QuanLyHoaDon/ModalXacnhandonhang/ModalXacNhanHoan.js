import React, { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import './ModalXacnhan.scss';
import { useSelector } from 'react-redux';

function ModalXacNhanHoan({ show, onClose, onConfirm, billId }) {
  const [billInfo, setBillInfo] = useState(null);
  const [productDetails, setProductDetails] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [cancelNote, setCancelNote] = useState(''); // State to store cancellation note
  const [showCancelNote, setShowCancelNote] = useState(false); // State to control the visibility of the cancel note field
  const user = useSelector(state => state.user.User); // Get user info from Redux

  useEffect(() => {
    if (show && billId) {
      fetchBillInfo();
    }
  }, [show, billId]);

  const fetchBillInfo = async () => {
    setLoading(true);
    setError(null); // Reset error state

    try {
      // Fetch bill info
      const billResponse = await fetch(`https://localhost:7095/api/HoaDon/GetById/${billId}`);
      if (!billResponse.ok) {
        throw new Error('Network response was not ok');
      }
      const billData = await billResponse.json();
      setBillInfo(billData);

      // Fetch product details
      const productResponse = await fetch(`https://localhost:7095/api/ChiTietHoaDon/getByIdCTHD/${billId}?idnhanvien=${user.id}`);
      if (!productResponse.ok) {
        throw new Error('Network response was not ok');
      }
      const productData = await productResponse.json();
      setProductDetails(productData);
    } catch (error) {
      setError('Có lỗi khi lấy thông tin: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleConfirm = async () => {
    try {
      const response = await fetch(`https://localhost:7095/api/HoaDon/HoanHD?idhd=${billId}&idnv=${user.id}`, {
        method: 'PUT', // Updated method to PUT
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json();
      console.log('Success:', data);
      if (onConfirm) onConfirm(billId);
    } catch (error) {
      console.error('Error:', error);
    } finally {
      onClose();
    }
  };

  const handleCancelConfirm = async () => {
    if (!cancelNote.trim()) {
      alert('Vui lòng nhập lý do hủy hoàn.');
      return;
    }

    try {
      const response = await fetch(`https://localhost:7095/api/HoaDon/UpdateGhichu?idhd=${billId}&idnv=${user.id}&trangThai=6&ghichu=${encodeURIComponent(cancelNote)}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json();
      console.log('Cancel Success:', data);
      if (onConfirm) onConfirm(billId); // Optionally trigger onConfirm with a different context if needed
    } catch (error) {
      console.error('Cancel Error:', error);
    } finally {
      onClose();
    }
  };

  const handleCancelButtonClick = () => {
    setShowCancelNote(true);
  };

  const handleClose = () => {
    setShowCancelNote(false);
    setCancelNote('');
    onClose();
  };

  if (loading) {
    return (
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Loading...</Modal.Title>
        </Modal.Header>
        <Modal.Body>Loading information...</Modal.Body>
      </Modal>
    );
  }

  if (error) {
    return (
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Error</Modal.Title>
        </Modal.Header>
        <Modal.Body>{error}</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    );
  }

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Xác nhận Đơn Hàng</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {billInfo && (
          <div>
            <h4>Thông tin khách hàng</h4>
            <p><strong>Người nhận:</strong> {billInfo.tenNguoiNhan}</p>
            <p><strong>Địa chỉ:</strong> {billInfo.diaChi}</p>
            <p><strong>Số điện thoại:</strong> {billInfo.sdt}</p>
            <p><strong>Email:</strong> {billInfo.email}</p>

            <h4>Chi tiết sản phẩm</h4>
            {productDetails.length > 0 ? (
              <table className="table">
                <thead>
                  <tr>
                    <th>Ảnh</th>
                    <th>Tên sản phẩm</th>
                    <th>Đơn giá</th>
                    <th>Số lượng</th>
                  </tr>
                </thead>
                <tbody>
                  {productDetails.map((product) => (
                    <tr key={product.id}>
                      <td>
                        <img
                          src={product.anh.duongDan} // Replace with correct image URL
                          alt={product.sanPham.ten}
                          style={{ width: '150px', height: '150px' }} // Adjust size as needed
                        />
                      </td>
                      <td>{product.sanPham.ten}</td>
                      <td>{product.chiTietHoaDon.donGia}</td>
                      <td>{product.chiTietHoaDon.soLuong}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <p>Chưa có sản phẩm nào.</p>
            )}

            {showCancelNote && (
              <>
                <h4>Lý do hủy hoàn</h4>
                <textarea
                  value={cancelNote}
                  onChange={(e) => setCancelNote(e.target.value)}
                  rows="3"
                  className="form-control"
                  placeholder="Nhập lý do hủy hoàn"
                />
              </>
            )}

            <p>Bạn có chắc chắn muốn xác nhận đơn hàng này?</p>
          </div>
        )}
      </Modal.Body>
      <Modal.Footer>
        {!showCancelNote && (
          <Button variant="danger" onClick={handleCancelButtonClick}>
            Hủy hoàn
          </Button>
        )}
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
        {showCancelNote && (
          <Button variant="danger" onClick={handleCancelConfirm}>
            Xác nhận hủy hoàn
          </Button>
        )}
        <Button variant="primary" onClick={handleConfirm}>
          Confirm
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default ModalXacNhanHoan;