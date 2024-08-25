import React, { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import './ModalXacnhan.scss';
import { useSelector } from 'react-redux';

function ModalHoanThanhCong({ show, onClose, billId }) {
  const [billInfo, setBillInfo] = useState(null);
  const [productDetails, setProductDetails] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
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

  const handleComplete = async () => {
    try {
      const response = await fetch(`https://localhost:7095/api/HoaDon/HoanTCHD?idhd=${billId}&idnv=${user.id}`, {
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
      // Close the modal and trigger any callback if necessary
      onClose();
    } catch (error) {
      console.error('Error:', error);
      setError('Có lỗi khi hoàn thành đơn hàng: ' + error.message);
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
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    );
  }

  return (
    <Modal show={show} onHide={onClose}>
      <Modal.Header closeButton>
        <Modal.Title>Hoàn Thành Đơn Hàng</Modal.Title>
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

            <p>Bạn có chắc chắn muốn hoàn thành đơn hàng này?</p>
          </div>
        )}
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onClose}>
          Đóng
        </Button>
        <Button variant="primary" onClick={handleComplete}>
          hoàn thành công
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default ModalHoanThanhCong;
