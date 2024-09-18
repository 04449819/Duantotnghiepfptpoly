// import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
// import { useSelector, useDispatch } from "react-redux";
// import axios from 'axios';
// import { toast } from 'react-toastify';
// import { Container, Row, Col, Form, Button } from 'react-bootstrap';
// import { useReactToPrint } from 'react-to-print';
// import HoaDon from '../HoaDon/HoaDon';
// import { UpdateSoLuong, DeleteCTSP } from '../../../../Rudux/Reducer/GetSanPhamGioHangSlice';
// import { debounce } from 'lodash';

// const API_URL = 'https://localhost:7095/api';

// const ThongTinThanhToan = ({ idHoaDon, name, phone, email, address }) => {
//   const dispatch = useDispatch();
//   const [hoaDon, setHoaDon] = useState({
//     TenKhachHang: '',
//     SDT: '',
//     Email: '',
//     DiaChi: '',
//     SanPhams: [],
//     IdVoucher: '',
//     GhiChu: '',
//     TrangThaiGiaoHang: 1,
//     isGiaoHang: false,
//     TienShip: 0,
//     SoDiemSuDung: 0,
//     TongTienHoaDon: 0
//   });
//   const [errors, setErrors] = useState({});
//   const [voucher, setVoucher] = useState(null);
//   const [TongGia, setTongGia] = useState(0);
//   const data = useSelector((state) => state.sanPhamGioHang.SanPhamGioHang);
//   const [diemTichLuy, setDiemTichLuy] = useState(0);
//   const [soDiemSuDung, setSoDiemSuDung] = useState(0);
//   const [isGiaoHang, setIsGiaoHang] = useState(false);
//   const [isDiemTichLuy, setIsDiemTichLuy] = useState(false);
//   const [tienGiamVoucher, setTienGiamVoucher] = useState(0);
//   const [tienGiamDiem, setTienGiamDiem] = useState(0);
//   const componentRef = useRef();
//   const [reloadHoaDon, setReloadHoaDon] = useState(false);

//   const calculateTotalPrice = useCallback((products) => {
//     return products.reduce((acc, item) => {
//       const giaBan = Number(item.GiaBan) || 0;
//       const soLuongMua = Number(item.SoLuongMua) || 0;
//       const giaTriKhuyenMai = Number(item.giaTriKhuyenMai) || 0;
//       return acc + (giaBan - giaTriKhuyenMai) * soLuongMua;
//     }, 0);
//   }, []);
 

//   const applyVoucher = useCallback((totalPrice, voucher) => {
//     if (!voucher || totalPrice < voucher.soTienCan) return { tienGiamVoucher: 0, newTotal: totalPrice };
//     const tienGiamVoucher = voucher.hinhThucGiamGia === 0
//       ? voucher.giaTri
//       : totalPrice * (voucher.giaTri / 100);
//     return { tienGiamVoucher, newTotal: totalPrice - tienGiamVoucher };
//   }, []);

//   const applyLoyaltyPoints = useCallback((totalPrice, isDiemTichLuy, diemTichLuy) => {
//     if (!isDiemTichLuy) return { tienGiamDiem: 0, soDiemDung: 0, newTotal: totalPrice };
//     const tienGiamDiem = Math.min(diemTichLuy * 100, totalPrice);
//     const soDiemDung = Math.ceil(tienGiamDiem / 100);
//     const newTotal = Math.max(0, totalPrice - tienGiamDiem);
//     return { tienGiamDiem, soDiemDung, newTotal };
//   }, []);

//   const getVoucherAndCalculateTotal = useCallback(async () => {
//     try {
//       let totalPrice = calculateTotalPrice(hoaDon.SanPhams);
//       if (hoaDon.TienShip) {
//         totalPrice += Number(hoaDon.TienShip);
//       }

//       const voucherRes = await axios.get(`${API_URL}/Voucher/fillvoucher/${totalPrice}`);
//       const voucher = voucherRes.data.voucher;
//       setVoucher(voucher);

//       const { tienGiamVoucher, newTotal: totalAfterVoucher } = applyVoucher(totalPrice, voucher);
//       setTienGiamVoucher(tienGiamVoucher);

//       const { tienGiamDiem, soDiemDung, newTotal: finalTotal } = applyLoyaltyPoints(totalAfterVoucher, isDiemTichLuy, diemTichLuy);
      
//       setTienGiamDiem(tienGiamDiem);
//       setSoDiemSuDung(soDiemDung);
//       setTongGia(finalTotal);

//       return finalTotal;
//     } catch (error) {
//       console.error("Error in getVoucherAndCalculateTotal:", error);
//       return null;
//     }
//   }, [hoaDon.SanPhams, hoaDon.TienShip, isDiemTichLuy, diemTichLuy, calculateTotalPrice, applyVoucher, applyLoyaltyPoints]);

//   useEffect(() => {
//     getVoucherAndCalculateTotal();
//   }, [getVoucherAndCalculateTotal]);

//   const getDiemTichLuy = useCallback(async () => {
//     try {
//       const res = await axios.get(`${API_URL}/KhachHang/getBySDT?sdt=${phone}`);

//       if (res.data.khachhang) {
//         setDiemTichLuy(res.data.khachhang.diemTich);
//       }
//     } catch (error) {
//       console.error("Error fetching DiemTichLuy:", error);
//     }
//   }, [phone]);

//   useEffect(() => {
//     const sanPhamsUpdate = data.map(sp => ({
//       IDCTSP: sp.idCTSP,
//       SoLuongMua: sp.soLuongmua,
//       GiaBan: sp.giaBan,
//       giaTriKhuyenMai: sp.giaTriKhuyenMai ?? 0,  
//     }));
//     setHoaDon(prevState => ({
//       ...prevState,
//       TenKhachHang: name,
//       SDT: phone,
//       Email: email,
//       DiaChi: address,
//       SanPhams: sanPhamsUpdate,
//     }));
//   }, [data, name, phone, email, address]);

//   useEffect(() => {
//     getDiemTichLuy();
//   }, [getDiemTichLuy]);

//   const handleInputChange = useCallback((e) => {
//     const { id, value } = e.target;
//     setHoaDon(prevHoaDon => ({
//       ...prevHoaDon,
//       [id]: value
//     }));

//     const error = validateInput(id, value);
//     setErrors(prevErrors => ({
//       ...prevErrors,
//       [id]: error,
//     }));
//   }, []);

//   const validateInput = useCallback((id, value) => {
//     switch (id) {
//       case "TenKhachHang":
//         return !value.trim() ? "Tên người nhận không được để trống" : "";
//       case "SDT":
//         return /^[0-9]{10}$/.test(value) ? "" : "Số điện thoại không hợp lệ";
//       case "DiaChi":
//         return !value.trim() ? "Địa chỉ không được để trống" : "";
//       case "TienShip":
//         return isNaN(value) || value <= 0 ? "Tiền ship phải là số lớn hơn 0" : "";
//       default:
//         return "";
//     }
//   }, []);

//   const updateHoaDon = useCallback(async () => {

//     if (isGiaoHang) {
//       const newErrors = {
//         TenKhachHang: validateInput("TenKhachHang", hoaDon.TenKhachHang),
//         SDT: validateInput("SDT", hoaDon.SDT),
//         DiaChi: validateInput("DiaChi", hoaDon.DiaChi),
//         TienShip: validateInput("TienShip", hoaDon.TienShip),
//       };

//       setErrors(newErrors);
//       if (Object.values(newErrors).some(error => error !== "")) {
//         toast.error('Vui lòng kiểm tra và nhập đầy đủ thông tin.');
//         return;
//       }
//     }

//     try {
//       await getVoucherAndCalculateTotal();
//       const hoaDonToSubmit = {
//         ...hoaDon,
//         TenKhachHang: isGiaoHang ? hoaDon.TenKhachHang : name,
//         SDT: isGiaoHang ? hoaDon.SDT : phone,
//         Email: isGiaoHang ? hoaDon.Email : email,
//         DiaChi: isGiaoHang ? hoaDon.DiaChi : address,
//         IdVoucher: voucher ? voucher.id : null,
//         SoDiemSuDung: soDiemSuDung,
//         isGiaoHang,
//         TienShip: hoaDon.TienShip || 0,
//         SanPhams: data.map(sp => ({
//           IDCTSP: sp.idCTSP,
//           SoLuongMua: sp.soLuongmua,
//           GiaBan: sp.giaBan,
//           giaTriKhuyenMai: sp.giaTriKhuyenMai ?? 0,
//         })),
//         TongTienHoaDon: TongGia,
//       };
//       await axios.put(`${API_URL}/HoaDon/UpdateHoaDonOffline/${idHoaDon}`, hoaDonToSubmit);
//       setReloadHoaDon(prev => !prev);
//     } catch (error) {
//       console.error('Đã xảy ra lỗi khi cập nhật hóa đơn:', error);
//     }
//   }, [hoaDon, isGiaoHang, voucher, soDiemSuDung, TongGia, data, getVoucherAndCalculateTotal, validateInput, name, phone, email, address, idHoaDon]);

//   const debouncedUpdateHoaDon = useMemo(  
//     () => debounce(updateHoaDon, 2000),
//     [updateHoaDon]
//   );

//   useEffect(() => {
//     debouncedUpdateHoaDon();
//     return () => debouncedUpdateHoaDon.cancel();
//   }, [debouncedUpdateHoaDon]);

//   const handlePayment = useCallback(async () => {
//     try {
//       const response = await axios.post(`${API_URL}/HoaDon/ThanhToanVNPay/${idHoaDon}?soDiemSuDung=${soDiemSuDung}&isGiaoHang=${isGiaoHang}`);
//       if(response.data.paymentUrl){
//         window.open(response.data.paymentUrl, '_blank');
//       }
//       toast.success('Thanh toán thành công!');
//     } catch (error) {
//       console.error('Đã xảy ra lỗi khi thanh toán: ', error);
//       toast.error('Thanh toán thất bại!');
//     }
//   }, [idHoaDon, soDiemSuDung, isGiaoHang]);

//   const handlePrint = useReactToPrint({
//     content: () => componentRef.current,
//     documentTitle: "HoaDon",
//   });

//   const handleUpdateQuantity = useCallback((idctsp, newQuantity) => {
//     dispatch(UpdateSoLuong({ idctsp, soluong: newQuantity }));
//   }, [dispatch]);

//   const handleDeleteProduct = useCallback((idctsp) => {
//     dispatch(DeleteCTSP(idctsp));
//   }, [dispatch]);

//   return (
//     <Container className="mt-4">
//       <h5 className="mb-4">THÔNG TIN THANH TOÁN</h5>
//       <Row className="mb-3">
//         <Col>
//           <p>Tổng sản phẩm: {hoaDon.SanPhams.length}</p>
//         </Col>
//       </Row>
//       <p>Voucher: {voucher ? voucher.ten : 'Không có voucher được sử dụng'}</p>
//       <Row className="mb-3">
//         <Col className="d-flex align-items-center">
//           <span className="me-3">Giao hàng</span>
//           <Form.Check 
//             type="switch"
//             id="giao-hang-switch"
//             checked={isGiaoHang}
//             onChange={() => setIsGiaoHang(prev => !prev)}
//           />
//         </Col>
//       </Row>
//       {isGiaoHang && (
//         <div className="shipping-info-section mb-3">
//           <h5 className="mb-3">THÔNG TIN GIAO HÀNG</h5>
//           {['TenKhachHang', 'SDT', 'DiaChi', 'TienShip'].map(field => (
//             <Form.Group as={Row} className="mb-3" key={field}>
//               <Form.Label column sm={3}>
//                 {field === 'TenKhachHang' ? 'Tên người nhận' : 
//                  field === 'SDT' ? 'Số điện thoại' : 
//                  field === 'DiaChi' ? 'Địa chỉ' : 'Tiền ship'}:
//               </Form.Label>
//               <Col sm={9}>
//                 <Form.Control
//                   type={field === 'TienShip' ? 'number' : 'text'}
//                   as={field === 'DiaChi' ? 'textarea' : 'input'}
//                   rows={field === 'DiaChi' ? 3 : undefined}
//                   id={field}
//                   value={hoaDon[field]}
//                   onChange={handleInputChange}
//                   isInvalid={!!errors[field]}
//                 />
//                 <Form.Control.Feedback type="invalid">
//                   {errors[field]}
//                 </Form.Control.Feedback>
//               </Col>
//             </Form.Group>
//           ))}
//         </div>
//       )}
//       <Row className="mb-3">
//         <Col className="d-flex align-items-center">
//           <span className="me-3">Điểm hiện tại: {diemTichLuy}</span>
//           <Form.Check 
//             type="switch"
//             id="diem-tich-luy-switch"
//             checked={isDiemTichLuy}
//             onChange={() => setIsDiemTichLuy(prev => !prev)}
//           />
//         </Col>
//       </Row>
//       <Row className="mb-3">
//         <Col className="d-flex align-items-center">
//           <span className="me-3">Trạng thái: </span>
//           <Form.Select id="TrangThaiGiaoHang" value={hoaDon.TrangThaiGiaoHang} onChange={handleInputChange}>
//             <option value="2">Chờ xác nhận</option>
//             <option value="3">Đang giao hàng</option>
//             <option value="4">Đang hoàn hàng</option>
//             <option value="5">Hoàn hàng thành công</option>
//             <option value="6">Thành công</option>
//             <option value="7">Hủy đơn</option>
//             <option value="8">Chờ xác nhận</option>
//             <option value="9">Chờ xác nhận hoàn hàng</option>
//           </Form.Select>
//         </Col>
//       </Row>
//       <Row className="mb-3">
//         <Col>
//           <p>Tiền giảm: {(tienGiamVoucher + tienGiamDiem).toLocaleString()} VND</p>
//         </Col>
//       </Row>
//       <Row className="mb-3">
//         <Col>
//           <p>Tổng tiền: {TongGia.toLocaleString()} VND</p>
//         </Col>
//       </Row>
//       <Row>
//         <Col>
//           <Button variant="success" onClick={handlePrint}>Xem hóa đơn</Button>
//         </Col>
//         <Col>
//           <Button variant="success" onClick={handlePayment}>Thanh toán</Button>
//         </Col>
//       </Row>
//       <div style={{ position: 'absolute', top: '-1000px', left: '-1000px' }}>
//       <HoaDon 
//         idHoaDon={idHoaDon} 
//         hoaDon={hoaDon} 
//         tongTien={TongGia}
//         tienGiamVoucher={tienGiamVoucher} 
//         tienGiamDiem={tienGiamDiem} 
//         ref={componentRef} 
//         key={reloadHoaDon} 
//       />
//       </div>
//     </Container>
//   );
// };

// export default ThongTinThanhToan;