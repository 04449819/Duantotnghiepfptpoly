import React, { useEffect, useState } from 'react';
import { useSelector } from "react-redux";
import "./ThongTinThanhToan.scss";
//import { Modal, Button, ListGroup } from 'react-bootstrap';
import axios from 'axios';
import { toast } from 'react-toastify';
import { Container, Row, Col, InputGroup, Modal, Button, Form, ListGroup } from 'react-bootstrap';

const ThongTinThanhToan = ({ name, phone, email, address }) => {
  const [hoaDon, setHoaDon] = useState({
    TenKhachHang: '',
    SDT: '',
    Email: '',
    DiaChi: '',
    SanPhams: [],
    IdVoucher: null,
    IdNhanVien: '',
    TienShip: '', 
    DiemTichLuy: ''
  });
  const [vouchers, setVouchers] = useState([]);
  const [selectedVoucher, setSelectedVoucher] = useState(null);
  const [TongGia, setTongGia] = useState(0);
  const [showModal, setShowModal] = useState(false);
  const data = useSelector((state) => state.sanPhamGioHang.SanPhamGioHang);
  const nv = useSelector((nv) => nv.user.User);
  const [shipName, setShipName] = useState(name);
  const [shipPhone, setShipPhone] = useState(phone);
  const [shipAddress, setShipAddress] = useState(address);
  const [shipCost, setShipCost] = useState(0); 

  const [isActive, setIsActive] = useState(false);

  const fetchVouchers = async () => {
    try {
      const res = await axios.get(`https://localhost:7095/api/Voucher?pageIndex=1&pageSize=10`);
      if (res.data && res.data.data) {
        const filteredVouchers = res.data.data.filter(voucher => voucher.soTienCan <= TongGia);
        setVouchers(filteredVouchers);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchVouchers(); 
    console.log(nv);
  }, [TongGia]);
  const handleShipNameChange = (event) => {
    setShipName(event.target.value);
  };

  const handleShipPhoneChange = (event) => {
    setShipPhone(event.target.value);
  };

  const handleShipAddressChange = (event) => {
    setShipAddress(event.target.value);
  };

  const handleShipCostChange = (event) => {
    setShipCost(event.target.value);
  };
  useEffect(() => {
    const sanPhamsUpdate = data.map(sp => ({
      IDCTSP: sp.idCTSP,
      SoLuongMua: sp.soLuongmua,
      GiaBan: sp.giaBan,
      giaTriKhuyenMai: sp.giaTriKhuyenMai ?? 0,  
    }));
  
    setHoaDon(prevState => ({
      ...prevState,
      TenKhachHang: name,
      SDT: phone,
      Email: email,
      DiaChi: address,
      SanPhams: sanPhamsUpdate,
      IdNhanVien: nv.idNhanVien,
    }));
    console.log(hoaDon);
  }, [data, name, phone, email, address]); 

  useEffect(() => {
    updateTongTien();
  }, [selectedVoucher, hoaDon.SanPhams]);

  // Tính toán tổng giá tiền, kèm theo xử lý voucher
  const updateTongTien = () => {
    let TongGiaSP = hoaDon.SanPhams.reduce((acc, item) => {
      // Cung cấp giá trị mặc định nếu giá trị không tồn tại hoặc không hợp lệ
      const giaBan = Number(item.GiaBan) || 0;
      const soLuongMua = Number(item.SoLuongMua) || 0;
      const giaTriKhuyenMai = Number(item.giaTriKhuyenMai) || 0;
      // Tính toán giá trị đã điều chỉnh sau khuyến mãi
      const adjustedPrice = (giaBan - giaTriKhuyenMai) * soLuongMua;
      // Tích lũy vào tổng
      return acc + adjustedPrice;
    }, 0);

    if(selectedVoucher && TongGiaSP >= selectedVoucher.soTienCan){
      if(selectedVoucher.hinhThucGiamGia === 0) {
        TongGiaSP -= selectedVoucher.giaTri;
      } else {
        TongGiaSP -= TongGiaSP * (selectedVoucher.giaTri / 100);
      }
    } 
    setTongGia(TongGiaSP + Number(shipCost));
  };
  const handleClick = () => {
    setIsActive(!isActive);
  };
  const handleShowModal = () => {
    setShowModal(true); 
  }
  const handleCloseModal = () => {
    setShowModal(false);
  }
  const handleSelectVoucher = (voucher) => {
    setSelectedVoucher(voucher); // Cập nhật selectedVoucher với voucher được chọn từ danh sách
    setShowModal(false); // Đóng modal sau khi chọn một voucher
  }
  // Hàm xử lý thanh toán
  const handlePayment = async () => {
    try {
      const hoaDonToSubmit = { ...hoaDon, IdVoucher: selectedVoucher ? selectedVoucher.id : null };
      await axios.post('https://localhost:7095/api/HoaDon/Offline', hoaDonToSubmit);
      toast.success('Thanh toán thành công');
      
    } catch (error) {
      console.error('Đã xảy ra lỗi khi thanh toán: ', error);
      toast.error('Thanh toán thất bại!');
    }
  };
 

  return (
    <>
       <h5>THÔNG TIN THANH TOÁN</h5>

<div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
  <p>Tổng sản phẩm: {hoaDon.SanPhams.length}</p>
  <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
    <input
      type="text"
      readOnly
      value={selectedVoucher ? selectedVoucher.ten : ''}
      placeholder="Áp dụng voucher"
      style={{ width: 'calc(100% - 80px)' }} // Adjust width based on button size
      className="voucher-input"
    />
    <Button variant="primary" onClick={handleShowModal}>Áp dụng</Button>
  </div>

  <Modal show={showModal} onHide={handleCloseModal} centered>
    <Modal.Header closeButton>
      <Modal.Title>Chọn Voucher</Modal.Title>
    </Modal.Header>
    <Modal.Body>
      <ListGroup>
        {vouchers.map((voucher) => (
          <ListGroup.Item key={voucher.id} action onClick={() => handleSelectVoucher(voucher)}>
            {voucher.ten} - {voucher.moTa}
          </ListGroup.Item>
        ))}
      </ListGroup>
    </Modal.Body>
  </Modal>

  <div style={{ display: 'flex', alignItems: 'center', width: '100%' }}>
    <span style={{ marginRight: '10px' }}>Giao hàng</span>
    <div className={`toggle-button ${isActive ? 'active' : ''}`} onClick={handleClick}></div>
  </div>

  <div>{isActive && (
    <div className="shipping-info-section">
      <h5>THÔNG TIN GIAO HÀNG</h5>

      <div className="input-group">
        <label htmlFor="shipName">Tên người nhận:</label>
        <input type="text" id="shipName" value={shipName} onChange={handleShipNameChange} />
      </div>

      <div className="input-group">
        <label htmlFor="shipPhone">Số điện thoại:</label>
        <input type="text" id="shipPhone" value={shipPhone} onChange={handleShipPhoneChange} />
      </div>

      <div className="input-group">
        <label htmlFor="shipAddress">Địa chỉ:</label>
        <textarea id="shipAddress" value={shipAddress} onChange={handleShipAddressChange} />
      </div>

      <div className="input-group">
        <label htmlFor="shipCost">Tiền ship:</label>
        <input type="number" id="shipCost" value={shipCost} onChange={handleShipCostChange} />
      </div>
    </div>
  )}</div>

  <p>Điểm hiện tại: </p>
  <p>Tổng tiền: {TongGia.toLocaleString()} VND</p>
  <button onClick={handlePayment}>Thực hiện thanh toán</button>
</div>

      
    </>
  );
};

export default ThongTinThanhToan;