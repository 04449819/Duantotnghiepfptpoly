import React, { useEffect, useState } from 'react';
import { useSelector } from "react-redux";
import "./ThongTinThanhToan.scss";
import axios from 'axios';
import { toast } from 'react-toastify';
import { Container, Row, Col, Form, Button, Modal, ListGroup, Select } from 'react-bootstrap';

const ThongTinThanhToan = ({idHoaDon, name, phone,email, address} ) => {
  const [hoaDon, setHoaDon] = useState({
    TenKhachHang: '',
    SDT: '',
    Email: '',
    DiaChi: '',
    SanPhams: [],
    IdVoucher: '',
    GhiChu: '',
    TrangThaiGiaoHang: 1,
    TienShip: 0, 
    IdPhuongThucThanhToan: '',
    SoDiemSuDung: 0
  });
  const [vouchers, setVouchers] = useState([]);
  const [pttts, setPttts] = useState([]);
  const [selectedVoucher, setSelectedVoucher] = useState(null);
  const [selectedPttt, setSelectedPttt] = useState(null);
  const [TongGia, setTongGia] = useState(0);
  const [showModal, setShowModal] = useState(false);
  const [showModalPttt, setShowModalPttt] = useState(false);
  const data = useSelector((state) => state.sanPhamGioHang.SanPhamGioHang);
  const nv = useSelector((nv) => nv.user.User);
  const [diemTichLuy, setDiemTichLuy] = useState(0);
  const [soDiemSuDung, setSoDiemSuDung] = useState(0);
  const [isGiaoHang, setIsGiaoHang] = useState(false);
  const [isDiemTichLuy, setIsDiemTichLuy] = useState(false);
  const [tienGiamVoucher, setTienGiamVoucher] = useState(0);
  const [tienGiamDiem, setTienGiamDiem] = useState(0);
  
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
  const fetchPttts = async () => {
    try {
      const res = await axios.get(`https://localhost:7095/api/HoaDon/pptt`);
      if (res.data) {
        setPttts(res.data);
      }
    } catch (error) {
      console.log(error);
    }
  }
  const getDiemTichLuy = async () => {
    try {
      const res = await axios.get(`https://localhost:7095/api/KhachHang/tong-hop-diem/${phone}`);
      if (res.data) {
        setDiemTichLuy(res.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchVouchers(); 
  }, [TongGia]);
  useEffect(() => {
    fetchPttts();
  },[]);
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
    }));
    if(phone){
      getDiemTichLuy();
    }
}, [ data, name, phone, email, address]);
  useEffect(() => {
    updateTongTien();
  }, [selectedVoucher, hoaDon.SanPhams, isDiemTichLuy, diemTichLuy, data]);
  useEffect(() => {
    setHoaDon(prevState => ({
      ...prevState,
      SoDiemSuDung: soDiemSuDung
    }));
  }, [soDiemSuDung]);
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

    let tienGiamVoucher = 0;
    if(selectedVoucher && TongGiaSP >= selectedVoucher.soTienCan){
      if(selectedVoucher.hinhThucGiamGia === 0) {
        tienGiamVoucher = selectedVoucher.giaTri;
      } else {
        tienGiamVoucher = TongGiaSP * (selectedVoucher.giaTri / 100);
      }
      TongGiaSP -= tienGiamVoucher;
    }
    setTienGiamVoucher(tienGiamVoucher);
    if(hoaDon.TienShip){
      TongGiaSP += Number(hoaDon.TienShip);
    }

    let tienGiamDiem = 0;
    let soDiemDung = 0;
    if (isDiemTichLuy) {
      tienGiamDiem = Math.min(diemTichLuy * 100, TongGiaSP);
      soDiemDung = Math.ceil(tienGiamDiem / 100);
      TongGiaSP = Math.max(0, TongGiaSP - tienGiamDiem);
    }
    
    setTienGiamDiem(tienGiamDiem);
    setSoDiemSuDung(soDiemDung);
    setTongGia(TongGiaSP);
   
  };
  const handleClickGiaoHang = () => {
    setIsGiaoHang(!isGiaoHang);
  };
  const handleClickDiemTichLuy = () => {
    setIsDiemTichLuy(!isDiemTichLuy);
    updateTongTien();
  };
  const handleShowModal = () => {
    setShowModal(true); 
  }
  const handleCloseModal = () => {
    setShowModal(false);
  }
  const handleShowModalPttt = () => {
    setShowModalPttt(true); 
  }
  const handleCloseModalPttt = () => {
    setShowModalPttt(false);
  }
  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setHoaDon((prevHoaDon) => ({
      ...prevHoaDon,
      [id]: value
    }));
  };
  const handleSelectVoucher = (voucher) => {
    setSelectedVoucher(voucher); 
    setShowModal(false); 
  }
  const handleSelectPttt = (pttt) => {
    setSelectedPttt(pttt); 
    setShowModalPttt(false); 
  }
  // Hàm xử lý thanh toán
  const updateHoaDon = async () => {
    try {
       const hoaDonToSubmit = {
        ...hoaDon,
        IdVoucher: selectedVoucher ? selectedVoucher.id : null,
        IdPhuongThucThanhToan: selectedPttt.id,
        SoDiemSuDung: soDiemSuDung
      };
      await axios.put(`https://localhost:7095/api/HoaDon/UpdateHoaDonOffline/${idHoaDon}`, hoaDonToSubmit);
      toast.success('Cập nhật thành công');
      
    } catch (error) {
      console.error('Đã xảy ra lỗi khi thanh toán: ', error);
      toast.error('Cập nhật thất bại!');
    }
  };
  const handlePayment = async () => {
    try {
       
      const response = await axios.post(`https://localhost:7095/api/HoaDon/ThanhToanVNPay/${idHoaDon}`);
      //console.log(response.data);
      if(response.data.paymentUrl){
        window.open(response.data.paymentUrl, '_blank');
      }
    } catch (error) {
      console.error('Đã xảy ra lỗi khi thanh toán: ', error);
      toast.error('Thanh toán thất bại!');
    }
  };
 

  return (
    <>
      <Container className="mt-4">
        <h5 className="mb-4">THÔNG TIN THANH TOÁN</h5>

      <Row className="mb-3">
        <Col>
          <p>Tổng sản phẩm: {hoaDon.SanPhams.length}</p>
        </Col>
      </Row>

      <Row className="mb-3">
        <Col>
          <Form.Group as={Row}>
            <Col sm={9}>
              <Form.Control
                type="text"
                readOnly
                value={selectedVoucher ? selectedVoucher.ten : ''}
                placeholder="Áp dụng voucher"
              />
            </Col>
            <Col sm={3}>
              <Button variant="primary" onClick={handleShowModal}  style={{ fontSize: '10px', padding: '5px 25px 5px 25px' }}>Áp dụng</Button>
            </Col>
          </Form.Group>
        </Col>
      </Row>

      <Modal show={showModal} onHide={handleCloseModal} centered>
        <Modal.Header closeButton>
          <Modal.Title>Chọn Voucher</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <ListGroup>
            {vouchers.map((voucher) => (
              <ListGroup.Item key={voucher.id} action onClick={() => handleSelectVoucher(voucher)}>
                {voucher.ten} - {voucher.moTa} - {voucher.giaTri}
              </ListGroup.Item>
            ))}
          </ListGroup>
        </Modal.Body>
      </Modal>
      

      <Row className="mb-3">
        <Col>
          <Form.Group as={Row}>
            <Col sm={9}>
              <Form.Control
                type="text"
                readOnly
                value={selectedPttt ? selectedPttt.ten : ''}
                placeholder="Chọn PTTT"
              />
            </Col>
            <Col sm={3}>
              <Button variant="primary" onClick={handleShowModalPttt}  style={{ fontSize: '10px', padding: '5px 25px 5px 25px' }}>Chọn</Button>
            </Col>
          </Form.Group>
        </Col>
      </Row>

      <Modal show={showModalPttt} onHide={handleCloseModalPttt} centered>
        <Modal.Header closeButton>
          <Modal.Title>Chọn PTTT</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <ListGroup>
            {pttts.map((pttt) => (
              <ListGroup.Item key={pttt.id} action onClick={() => handleSelectPttt(pttt)}>
                {pttt.ten} 
              </ListGroup.Item>
            ))}
          </ListGroup>
        </Modal.Body>
      </Modal>

        

      <Row className="mb-3">
        <Col>
          <p>Khách thanh toán: </p>
        </Col>
      </Row>

      <Row className="mb-3">
        <Col className="d-flex align-items-center">
          <span className="me-3">Giao hàng</span>
          <Form.Check 
            type="switch"
            id="giao-hang-switch"
            checked={isGiaoHang}
            onChange={handleClickGiaoHang}
          />
        </Col>
      </Row>

      {isGiaoHang && (
        <div className="shipping-info-section mb-3">
          <h5 className="mb-3">THÔNG TIN GIAO HÀNG</h5>

          <Form.Group as={Row} className="mb-3">
            <Form.Label column sm={3}>Tên người nhận:</Form.Label>
            <Col sm={9}>
              <Form.Control
                type="text"
                id="TenKhachHang"
                value={hoaDon.TenKhachHang}
                onChange={handleInputChange}
              />
            </Col>
          </Form.Group>

          <Form.Group as={Row} className="mb-3">
            <Form.Label column sm={3}>Số điện thoại:</Form.Label>
            <Col sm={9}>
              <Form.Control
                type="text"
                id="SDT"
                value={hoaDon.SDT}
                onChange={handleInputChange}
              />
            </Col>
          </Form.Group>

          <Form.Group as={Row} className="mb-3">
            <Form.Label column sm={3}>Địa chỉ:</Form.Label>
            <Col sm={9}>
              <Form.Control
                as="textarea"
                rows={3}
                id="DiaChi"
                value={hoaDon.DiaChi}
                onChange={handleInputChange}
              />
            </Col>
          </Form.Group>

          <Form.Group as={Row} className="mb-3">
            <Form.Label column sm={3}>Tiền ship:</Form.Label>
            <Col sm={9}>
              <Form.Control
                type="number"
                id="TienShip"
                value={hoaDon.TienShip}
                onChange={handleInputChange}
              />
            </Col>
          </Form.Group>
        </div>
      )}

      <Row className="mb-3">
        <Col className="d-flex align-items-center">
          <span className="me-3">Điểm hiện tại: {diemTichLuy}</span>
          <Form.Check 
            type="switch"
            id="diem-tich-luy-switch"
            checked={isDiemTichLuy}
            onChange={handleClickDiemTichLuy}
          />
        </Col>
      </Row>
      <Row className="mb-3">
        <Col className="d-flex align-items-center">
          <span className="me-3">Trạng thái giao hàng: </span>
          <select id="TrangThaiGiaoHang"  value={hoaDon.TrangThaiGiaoHang} onChange={handleInputChange}>
            <option value="1">Đơn nháp</option>
            <option value="3">Đang giao hàng</option>
            <option value="6">Thành công</option>
          </select>

        </Col>
      </Row>
      <Row className="mb-3">
        <Col>
        <p>Tiền giảm: {(tienGiamVoucher + tienGiamDiem).toLocaleString()} VND</p>
        </Col>
      </Row>

      <Row className="mb-3">
        <Col>
          <p>Tổng tiền: {TongGia.toLocaleString()} VND</p>
        </Col>
      </Row>

      <Row>
        <Col>
          <Button variant="success" onClick={updateHoaDon}>Cập nhật hóa đơn</Button>
        </Col>
        <Col>
          <Button variant="success" onClick={handlePayment}>Thanh toán hóa đơn</Button>
        </Col>
      </Row>

      
    </Container>
    </>
  );
};

export default ThongTinThanhToan;

