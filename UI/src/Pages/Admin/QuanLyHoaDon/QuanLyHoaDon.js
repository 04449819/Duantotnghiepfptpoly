import React, { useEffect, useState } from "react";
import "./QuanLyHoaDon.scss";
import axios from "axios";
import { Modal, Button } from "react-bootstrap";
import { Bar } from "react-chartjs-2";

const QuanLyHoaDon = () => {
  const [hoaDons, setHoaDons] = useState([]);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedBillId, setSelectedBillId] = useState(null);
  const [selectedBillDetails, setSelectedBillDetails] = useState(null);
  const [showModal, setShowModal] = useState(false); // State for modal visibility

  useEffect(() => {
    fetchHoaDons();
  }, []);

  const fetchHoaDons = async () => {
    try {
      const response = await axios.get('https://localhost:7095/api/HoaDon/GetAll');
      setHoaDons(response.data);
      setError(null);
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

  const handleSearch = async () => {
    try {
      if (searchTerm.trim() === "") {
        await fetchHoaDons();
      } else {
        const response = await axios.get(`https://localhost:7095/api/HoaDon/TimKiem?ten=${searchTerm}&loc=1`);
        setHoaDons(response.data);
      }
    } catch (error) {
      console.error('Có lỗi khi tìm kiếm hóa đơn:', error);
      setError('Có lỗi khi tìm kiếm hóa đơn: ' + error.message);
    }
  };

  const handleChangeSearchTerm = (event) => {
    setSearchTerm(event.target.value);
    handleSearch();
  };

  const fetchBillDetails = async (billId) => {
    try {
      const response = await axios.get(`https://localhost:7095/api/ChiTietHoaDon/getByIdCTHD/${billId}`);
      setSelectedBillDetails(response.data);
      console.log(response.data);
    } catch (error) {
      console.error('Có lỗi khi fetch chi tiết hóa đơn:', error);
      setError('Có lỗi khi fetch chi tiết hóa đơn: ' + error.message);
    }
  };
  const [sanPhamDetails, setSanPhamDetails] = useState([]);
  const fetchSanPhamDetails = async (productId) => {
    try {
      const response = await axios.get(`https://localhost:7095/api/SanPham/GetChiTietSanPhamByIDChiTietSanPham?id=${productId}`);
      setSanPhamDetails(response.data);
    } catch (error) {
      console.error('Có lỗi khi fetch sản phẩm:', error);
      setError('Có lỗi khi fetch sản phẩm: ' + error.message);
    }
  };

  const handleBillClick = (billId) => {
    setSelectedBillId(billId);
    fetchBillDetails(billId);
    setShowModal(true); // Show modal when clicking on a bill
    fetchSanPhamDetails(billId); // Fetch product details based on billId
  };

  const handleCloseModal = () => {
    setShowModal(false); // Hide modal
    setSelectedBillDetails(null); // Clear selected bill details when modal closes
  };

  return (
    <div>
      <h2>Quản lý Hóa Đơn</h2>
      <div>
        <input
          type="text"
          placeholder="searchTerm..."
          value={searchTerm}
          onChange={handleChangeSearchTerm}
        />
      </div>
      {error && <p>{error}</p>}
      <table className="table">
        <thead>
          <tr>
            <th>Ngày thanh toán</th>
            <th>Ngày nhận hàng</th>
            <th>Người Nhận</th>
            <th>SDT</th>
            <th>Địa Chỉ</th>
            <th>Trạng thái giao hàng</th>
            <th>Tổng Tiền</th>
            <th>Loại hóa đơn</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {hoaDons.map((hoaDon) => (
            <tr key={hoaDon.id} onClick={() => handleBillClick(hoaDon.id)}>
              <td>{hoaDon.ngayThanhToan}</td>
              <td>{hoaDon.ngayNhanHang}</td>
              <td>{hoaDon.tenNguoiNhan}</td>
              <td>{hoaDon.sdt}</td>
              <td>{hoaDon.diaChi}</td>
              <td>{renderTrangThaiGiaoHang(hoaDon.trangThaiGiaoHang)}</td>
              <td>{hoaDon.tongTien ? `${hoaDon.tongTien} VND` : 'Chưa xác định'}</td>
              <td>{hoaDon.LoaiHD ? 'Off' : 'On'}</td>
              <td>{hoaDon.phuongThucThanhToan}</td>
             
            </tr>
          ))}
        </tbody>
      </table>

      {/* Modal to display bill details */}
      <Modal show={showModal} onHide={handleCloseModal} className="modal-lg" >
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
        <th>số lượng</th>
        <th>trạng thái</th>
        
        {/* Add more headers as needed */}
      </tr>
    </thead>
    <tbody>
      {selectedBillDetails && selectedBillDetails.map((bill) => (
        <tr key={bill.chiTietHoaDon.id}>
          <img src={bill.anh.duongDan} alt="Ảnh sản phẩm" style={{ width: '125px', height: '125px' }} />
          <td>{bill.sanPham.ten}</td> 
          <td>{bill.chiTietHoaDon.donGia}</td>
          <td>{bill.chiTietHoaDon.soLuong}</td>
          <td>{bill.chiTietSanPham.trangThai}</td>
          {/* Render more details here */}
        </tr>
      ))} 
    </tbody>
  </table>
</Modal.Body>

        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default QuanLyHoaDon;
