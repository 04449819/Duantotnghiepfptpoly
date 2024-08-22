import React, { useEffect, useState } from "react";
import axios from "axios";
import { Modal, Button } from "react-bootstrap";
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import ModalXacNhan from "./ModalXacnhandonhang/ModalXacnhan";
import ModalDangGiaoHang from "./ModalXacnhandonhang/ModalDangGiaoHang";
import ModalXacNhanHoan from "./ModalXacnhandonhang/ModalXacNhanHoan";
import ModalHoanThanhCong from "./ModalXacnhandonhang/ModalHoanThanhCong";

const QuanLyHoaDon = () => {
  const [hoaDons, setHoaDons] = useState([]);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedBillId, setSelectedBillId] = useState(null);
  const [selectedBillDetails, setSelectedBillDetails] = useState(null);
  const [filterStatus, setFilterStatus] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [billToConfirm, setBillToConfirm] = useState(null);
  const [showDangGiaoHangModal, setShowDangGiaoHangModal] = useState(false);
  const [showHoanHangModal, setShowHoanHangModal] = useState(false);
  const [showHoanHangThanhCongModal, setShowHoanHangThanhCongModal] = useState(false);
  const [customerName, setCustomerName] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const [unconfirmedOrderCount, setUnconfirmedOrderCount] = useState(0);

  useEffect(() => {
    fetchHoaDons();
  }, [filterStatus]);

  const fetchHoaDons = async () => {
    try {
      const url = filterStatus ? 
        `https://localhost:7095/api/HoaDon/loctheotrngthaigiaohang?trangthai=${filterStatus}` : 
        'https://localhost:7095/api/HoaDon/GetAll';
      const response = await axios.get(url);
      setHoaDons(response.data);
      setError(null);

      // Calculate unconfirmed orders
      const unconfirmedOrders = response.data.filter(order => order.trangThaiGiaoHang === 2);
      setUnconfirmedOrderCount(unconfirmedOrders.length);

    } catch (error) {
      console.error('Có lỗi khi fetch hóa đơn:', error);
      setError('Có lỗi khi fetch hóa đơn: ' + error.message);
    }
  };

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

  const handleSearch = async (tenkhachhang) => {
    try {
      if (tenkhachhang.trim() === "") {
        await fetchHoaDons();
      } else {
        const response = await axios.get(`https://localhost:7095/api/HoaDon/TimKiem?ten=${tenkhachhang}&loc=1`);
        setHoaDons(response.data);
      }
    } catch (error) {
      console.error('Có lỗi khi tìm kiếm hóa đơn:', error);
      setError('Có lỗi khi tìm kiếm hóa đơn: ' + error.message);
    }
  };

  const handleChangeSearchTerm = (event) => {
    setSearchTerm(event.target.value);
    handleSearch(event.target.value);
  };

  const fetchBillDetails = async (billId) => {
    try {
      const response = await axios.get(`https://localhost:7095/api/ChiTietHoaDon/getByIdCTHD/${billId}`);
      setSelectedBillDetails(response.data);
    } catch (error) {
      console.error('Có lỗi khi fetch chi tiết hóa đơn:', error);
      setError('Có lỗi khi fetch chi tiết hóa đơn: ' + error.message);
    }
  };
  const formatCurrency = (amount) => {
    // Kiểm tra xem amount có phải là số không
    if (isNaN(amount) || amount === null) {
      return 'Không hợp lệ';
    }
    // Chuyển số tiền thành chuỗi và định dạng
    return amount.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' });
  };
  

  const handleBillClick = (billId) => {
    setSelectedBillId(billId);
    fetchBillDetails(billId);
    setShowModal(true);
  };

  const handleFilterClick = (status) => {
    setFilterStatus(status);
  };

  const handleShowConfirmModal = (billId) => {
    setBillToConfirm(billId);
    setShowConfirmModal(true);
  };

  const handleConfirm = (billId) => {
    fetchHoaDons();
    setShowConfirmModal(false);
  };

  const handleShowDangGiaoHangModal = (bill) => {
    setSelectedBillId(bill.id);
    setCustomerName(bill.tenNguoiNhan);
    setCustomerPhone(bill.sdt);
    setShowDangGiaoHangModal(true);
  };

  const handleShowHoanHangModal = (billId) => {
    setSelectedBillId(billId);
    setShowHoanHangModal(true);
  };

  const handleShowHoanHangThanhCongModal = (billId) => {
    setSelectedBillId(billId);
    setShowHoanHangThanhCongModal(true);
  };

  return (
    <div className="invoice-management">
      <h2>Quản lý Hóa Đơn</h2>
      <div className="notification-container">
        {unconfirmedOrderCount > 0 && (
          <div className="notification-dot">
            <span>{unconfirmedOrderCount}</span>
          </div>
        )}
        {unconfirmedOrderCount > 0 && (
          <div className="notification-text">
            Có đơn chưa xác nhận
          </div>
        )}
      </div>

      <div className="search-bar">
        <input
          type="text"
          placeholder="Tìm kiếm..."
          value={searchTerm}
          onChange={handleChangeSearchTerm}
        />
      </div>
      
      <div className="button-group">
        <ButtonGroup aria-label="Basic example">
          <Button variant="secondary" onClick={() => { setFilterStatus(null); fetchHoaDons(); }}>Tất cả</Button>
          <Button variant="secondary" onClick={() => handleFilterClick(2)}>Chờ xác nhận</Button>
          <Button variant="secondary" onClick={() => handleFilterClick(3)}>Đang giao hàng</Button>
          <Button variant="secondary" onClick={() => handleFilterClick(6)}>Thành công</Button>
          <Button variant="secondary" onClick={() => handleFilterClick(7)}>Đơn Hủy</Button>
          <Button variant="secondary" onClick={() => handleFilterClick(9)}>Chờ xác nhận hoàn hàng</Button>
          <Button variant="secondary" onClick={() => handleFilterClick(4)}>Đang hoàn hàng</Button>
          <Button variant="secondary" onClick={() => handleFilterClick(5)}>Hoàn hàng thành công</Button>
        </ButtonGroup>
      </div>

      {error && <p>{error}</p>}

      <table className="table">
        <thead>
          <tr>
            <th>Người Nhận</th>
            <th>SDT</th>
            <th>Địa Chỉ</th>
            <th>Trạng thái giao hàng</th>
            <th>Tổng Tiền</th>
            <th>Loại hóa đơn</th>
          </tr>
        </thead>
        <tbody>
          {hoaDons.map((hoaDon) => (
            <tr key={hoaDon.id} onClick={() => handleBillClick(hoaDon.id)}>
              <td>{hoaDon.tenNguoiNhan}</td>
              <td>{hoaDon.sdt}</td>
              <td>{hoaDon.diaChi}</td>
              <td>{renderTrangThaiGiaoHang(hoaDon.trangThaiGiaoHang)}</td>
              <td>{hoaDon.tongTien ? formatCurrency(hoaDon.tongTien) : 'Chưa xác định'}</td>
              <td>{hoaDon.LoaiHD ? 'Off' : 'On'}</td>
              <td>
                {hoaDon.trangThaiGiaoHang === 2 && (
                  <Button variant="primary" onClick={(e) => { e.stopPropagation(); handleShowConfirmModal(hoaDon.id); }}>
                    Xác nhận
                  </Button>
                )}
                {hoaDon.trangThaiGiaoHang === 3 && (
                  <Button variant="warning" onClick={(e) => { e.stopPropagation(); handleShowDangGiaoHangModal(hoaDon); }}>
                    Đang giao hàng
                  </Button>
                )}
                {hoaDon.trangThaiGiaoHang === 9 && (
                  <Button variant="danger" onClick={(e) => { e.stopPropagation(); handleShowHoanHangModal(hoaDon.id); }}>
                    Xác nhận hoàn hàng
                  </Button>
                )}
                {hoaDon.trangThaiGiaoHang === 4 && (
                  <>
                    <Button variant="success" onClick={(e) => { e.stopPropagation(); handleShowHoanHangThanhCongModal(hoaDon.id); }}>
                      Hoàn hàng thành công
                    </Button>
                  </>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Modal để hiển thị chi tiết hóa đơn */}
      <Modal show={showModal} onHide={() => setShowModal(false)} className="modal-lg">
        <Modal.Header closeButton>
          <Modal.Title>Chi tiết hóa đơn</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <table className="table">
            <thead>
              <tr>
                <th>Ảnh</th>
                <th>Tên sản phẩm</th>
                <th>Đơn giá</th>
                <th>Số lượng</th>
                <th>Trạng thái</th>
              </tr>
            </thead>
            <tbody>
              {selectedBillDetails && selectedBillDetails.map((bill) => (
                <tr key={bill.chiTietHoaDon.id}>
                  <td><img src={bill.anh.duongDan} alt="Ảnh sản phẩm" style={{ width: '125px', height: '125px' }} /></td>
                  <td>{bill.sanPham.ten}</td> 
                  <td>{bill.chiTietHoaDon.donGia}</td>
                  <td>{bill.chiTietHoaDon.soLuong}</td>
                  <td>{bill.chiTietSanPham.trangThai}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Đóng
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Modal xác nhận đơn hàng */}
      <ModalXacNhan 
        show={showConfirmModal} 
        onClose={() => setShowConfirmModal(false)} 
        onConfirm={handleConfirm} 
        billId={billToConfirm} 
      />

      {/* Modal Đang giao hàng */}
      <ModalDangGiaoHang 
        show={showDangGiaoHangModal} 
        onClose={() => setShowDangGiaoHangModal(false)} 
        billId={selectedBillId} 
        customerName={customerName}
        customerPhone={customerPhone}
      />
      
      {/* Modal Xác nhận hoàn hàng */}
      <ModalXacNhanHoan 
        show={showHoanHangModal} 
        onClose={() => setShowHoanHangModal(false)} 
        billId={selectedBillId} 
      />
      
      {/* Modal Xác nhận hoàn hàng thành công */}
      <ModalHoanThanhCong 
        show={showHoanHangThanhCongModal} 
        onClose={() => setShowHoanHangThanhCongModal(false)} 
        billId={selectedBillId} 
      />
    </div>
  );
};

export default QuanLyHoaDon;
