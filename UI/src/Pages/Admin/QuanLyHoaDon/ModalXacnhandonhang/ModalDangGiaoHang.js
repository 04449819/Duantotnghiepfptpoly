import React, { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import "./ModalXacnhan.scss";
import { useSelector } from 'react-redux';

function ModalDangGiaoHang({ show, onClose, onConfirm, billId }) {
  const [billInfo, setBillInfo] = useState(null);
  const [productDetails, setProductDetails] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const user = useSelector(state => state.user.User);

  useEffect(() => {
    if (show && billId) {
      fetchBillInfo();
    }
  }, [show, billId]);

  const fetchBillInfo = async () => {
    setLoading(true);
    try {
      // Fetch thông tin hóa đơn
      const billResponse = await fetch(`https://localhost:7095/api/HoaDon/GetById/${billId}`);
      if (!billResponse.ok) throw new Error('Lấy thông tin hóa đơn thất bại');
      const billData = await billResponse.json();
      setBillInfo(billData);

      // Fetch chi tiết sản phẩm
      const productResponse = await fetch(`https://localhost:7095/api/SanPham/getAllSPBanHa222ng?hoaDonId=${billId}`);
      if (!productResponse.ok) throw new Error('Lấy thông tin sản phẩm thất bại');
      const productData = await productResponse.json();
      setProductDetails(productData.sanPhamDetails || []); // Điều chỉnh theo cấu trúc dữ liệu
    } catch (error) {
      setError(`Lỗi: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  const handleConfirm = async () => {
    try {
      const response = await fetch(`https://localhost:7095/api/HoaDon?idhoadon=${billId}&trangthai=6&idnhanvien=${user.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
      });

      if (!response.ok) throw new Error('Xác nhận giao hàng thất bại');
      const data = await response.json();
      console.log('Xác nhận thành công:', data);
      if (onConfirm) onConfirm(billId);
    } catch (error) {
      setError(`Lỗi: ${error.message}`);
    } finally {
      onClose();
    }
  };

  if (loading) {
    return (
      <Modal show={show} onHide={onClose}>
        <Modal.Header closeButton>
          <Modal.Title>Đang tải...</Modal.Title>
        </Modal.Header>
        <Modal.Body>Đang tải thông tin...</Modal.Body>
      </Modal>
    );
  }

  if (error) {
    return (
      <Modal show={show} onHide={onClose}>
        <Modal.Header closeButton>
          <Modal.Title>Lỗi</Modal.Title>
        </Modal.Header>
        <Modal.Body>{error}</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={onClose}>Đóng</Button>
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
            <h4>Thông Tin Khách Hàng</h4>
            <p><strong>Người nhận:</strong> {billInfo.tenNguoiNhan}</p>
            <p><strong>Địa chỉ:</strong> {billInfo.diaChi}</p>
            <p><strong>Số điện thoại:</strong> {billInfo.sdt}</p>
            <p><strong>Ngày tạo:</strong> {billInfo.ngayTao}</p>

            <h4>Chi Tiết Sản Phẩm</h4>
            {productDetails.length > 0 ? (
              <table className="table">
                <thead>
                  <tr>
                    <th>Ảnh</th>
                    <th>Tên Sản Phẩm</th>
                    <th>Đơn Giá</th>
                    <th>Số Lượng</th>
                  </tr>
                </thead>
                <tbody>
                  {productDetails.map((product) => (
                    <tr key={product.sanPhamId}>
                      <td>
                        <img
                          src={product.anhSanPham} // Đảm bảo đây là URL chính xác cho hình ảnh
                          alt={product.tenSanPham}
                          style={{ width: '150px', height: '150px' }} // Điều chỉnh kích thước nếu cần
                        />
                      </td>
                      <td>{product.tenSanPham}</td>
                      <td>{product.donGia}</td>
                      <td>{product.soLuong}</td>
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
        <Button variant="secondary" onClick={onClose}>Đóng</Button>
        <Button variant="primary" onClick={handleConfirm}>Xác Nhận Giao Hàng Thành Công</Button>
      </Modal.Footer>
    </Modal>
  );
}

export default ModalDangGiaoHang;
