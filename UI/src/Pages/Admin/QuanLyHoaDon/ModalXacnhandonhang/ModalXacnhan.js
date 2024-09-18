import React, { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import './ModalXacnhan.scss';
import { useSelector } from 'react-redux';

function ModalXacnhan({ show, onClose, onConfirm, billId }) {
  const [billInfo, setBillInfo] = useState(null);
  const [productDetails, setProductDetails] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const user = useSelector(state => state.user.User); // Get user info from Redux

  useEffect(() => {
    console.log(billId);
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
      const productResponse = await fetch(`https://localhost:7095/api/SanPham/getAllSPBanHa222ng?hoaDonId=${billId}`);
      if (!productResponse.ok) {
        throw new Error('Network response was not ok');
      }
      const productData = await productResponse.json();
      setProductDetails(productData.sanPhamDetails); // Ensure to use the correct field if structure differs
    } catch (error) {
      setError('Có lỗi khi lấy thông tin: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleConfirm = async () => {
  
    try {
      const response = await fetch(`https://localhost:7095/api/HoaDon?idhoadon=${billId}&trangthai=10&idnhanvien=${user.id}`, {
        method: 'PUT',
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

  const handleCancel = async () => {
    try {
      const response = await fetch(`https://localhost:7095/api/HoaDon?idhoadon=${billId}&trangthai=7&idnhanvien=${user.id}`, {
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
      if (onConfirm) onConfirm(billId); // Notify parent component
    } catch (error) {
      console.error('Error:', error);
    } finally {
      onClose();
    }
  };

  if (loading) {
    return (
      <Modal show={show} onHide={onClose}>
        <Modal.Header closeButton>
          <Modal.Title>Loading...</Modal.Title>
        </Modal.Header>
        <Modal.Body>Loading information...</Modal.Body>
      </Modal>
    );
  }

  if (error) {
    return (
      <Modal show={show} onHide={onClose}>
        <Modal.Header closeButton>
          <Modal.Title>Error</Modal.Title>
        </Modal.Header>
        <Modal.Body>{error}</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={onClose}>
            Đóng
          </Button>
        </Modal.Footer>
      </Modal>
    );
  }

  return (
    <Modal show={show} onHide={onClose}>
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
                    <tr key={product.sanPhamId}>
                      <td>
                        <img
                          src={product.anhSanPham} // Adjust URL if needed
                          alt={product.tenSanPham}
                          style={{ width: '150px', height: '150px' }} // Adjust size as needed
                        />
                      </td>
                      <td>{product.tenSanPham}</td>
                      <td>{product.donGiaa}</td>
                      <td>{product.soLuonga}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <p>Chưa có sản phẩm nào.</p>
            )}

            <p>Bạn có chắc chắn muốn xác nhận đơn hàng này?</p>
          </div>
        )}
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onClose}>
          Đóng
        </Button>
        <Button variant="danger" onClick={handleCancel}>
          Hủy hóa đơn
        </Button>
        <Button variant="primary" onClick={handleConfirm}>
          Chuẩn bị hàng
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default ModalXacnhan;
