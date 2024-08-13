import React, { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import "./ModalXacnhan.scss"

function ModalDangGiaoHang({ show, onClose, onConfirm, billId }) {
  const [billInfo, setBillInfo] = useState(null);
  const [productDetails, setProductDetails] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (show && billId) {
      fetchBillInfo();
    }
  }, [show, billId]);

  const fetchBillInfo = async () => {
    setLoading(true);
    try {
      // Fetch bill info
      const billResponse = await fetch(`https://localhost:7095/api/HoaDon/GetById/${billId}`);
      if (!billResponse.ok) {
        throw new Error('Network response was not ok');
      }
      const billData = await billResponse.json();
      setBillInfo(billData);

      // Fetch product details
      const productResponse = await fetch(`https://localhost:7095/api/ChiTietHoaDon/getByIdCTHD/${billId}`);
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
      const response = await fetch(`https://localhost:7095/api/HoaDon?idhoadon=${billId}&trangthai=6`, {
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
        <Modal.Title>Thông Tin Đơn Hàng</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {billInfo && (
          <div>
            <h4>Thông tin khách hàng</h4>
            <p><strong>Người nhận:</strong> {billInfo.tenNguoiNhan}</p>
            <p><strong>Địa chỉ:</strong> {billInfo.diaChi}</p>
            <p><strong>Số điện thoại:</strong> {billInfo.sdt}</p>
            <p><strong>ngày giao hàng:</strong> {billInfo.ngayTao}</p>

            <h4>Chi tiết sản phẩm</h4>
            {productDetails.length > 0 ? (
              <table className="table">
                <thead>
                  <tr>
                    <th>Ảnh </th>
                    <th>Tên sản phẩm</th>
                    <th>Tên người nhận</th>
                    <th>Đơn giá</th>
                    <th>Số lượng</th>
                  </tr>
                </thead>
                <tbody>
                  {productDetails.map((product) => (
                   
                     <tr key={product.id}>
                      <td>
                        <img
                          src={product.anh.duongDan} // Thay `product.anh` bằng đường dẫn đến ảnh
                          
                          style={{ width: '150px', height: '150px' }} // Điều chỉnh kích thước nếu cần
                        />
                      </td>
                      <td>{product.sanPham.ten}</td>
                      <p>{product.hoaDon.tenNguoiNhan}</p>
                      <td>{product.chiTietHoaDon.donGia}</td>
                      <td>{product.chiTietHoaDon.soLuong}</td>
                      
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
        <Button variant="primary" onClick={handleConfirm}>
          Xác Nhận giao hàng Thành công
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default ModalDangGiaoHang;
