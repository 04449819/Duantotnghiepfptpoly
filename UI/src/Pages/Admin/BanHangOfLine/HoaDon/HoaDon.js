import axios from 'axios';
import QRCode from 'qrcode.react';
// import QRCode from 'qrcode.react';
// import React, { useEffect, forwardRef } from 'react';
import React, { useEffect, forwardRef, useState } from 'react';
import { Table } from 'react-bootstrap';



// Component chính sử dụng forwardRef
const HoaDon = forwardRef((props, ref) => {
  const [hoaDonSelected, setHoaDonSelected] = useState([]);
  const [chiTietHoaDonSelected, setChiTietHoaDonChoSelected] = useState([]);
  
  useEffect(() => {
    
    if(props.props){
      getHoaDonById();
    }
  }, [props]); // Run useEffect when props change
  const getHoaDonById = async () => {
    try {
      
      const resCTHD = await axios.get(`https://localhost:7095/api/SanPham/GetChiTietSanPhamByIdHD?hoaDonId=${props.props}`);
      setChiTietHoaDonChoSelected(resCTHD.data);
     
      const resHD = await axios.get(`https://localhost:7095/api/HoaDon/GetById/${props.props}`);
      setHoaDonSelected(resHD.data); 
      console.log(resHD.data);
      
    } catch (error) {
      console.error('Đã xảy ra lỗi: ', error);
    }
  };
  return (
    <div ref={ref}>

 <div className="container-fluid d-flex flex-column align-items-center w-100 p-4 bg-gray-100">
      <div className="bg-white p-6 shadow-md w-100 max-w-4xl">
        <div className="text-center">
        <div className="d-flex justify-content-between align-items-center">
  <div style={{ width: '100px' }}></div> {/* Div này để căn giữa h1 */}
  <h1 className="text-2xl font-bold text-center flex-grow-1">Shop Man</h1>
  <QRCode value={hoaDonSelected.id} size={100} />
</div>


          
          

          <p>Chương trình Phổ thông Cao đẳng FPT Polytechnic, Phường Canh, Từ Liêm, Hà Nội, Việt Nam</p>
          <p>SDT: 0123456789</p>
          <div className="d-flex justify-content-between align-items-center mt-2">
            <p className="text-sm">Mã hóa đơn: {hoaDonSelected.maHD}</p>
            <p className="text-sm">Ngày tạo: {hoaDonSelected.ngayTao}</p>
          </div>
        </div>
        <div className="mt-4">
         
          <div className="d-flex justify-content-between align-items-center mt-2">
          <p>Khách hàng: {hoaDonSelected.tenNguoiNhan}</p>
          <p>Số điện thoại: {hoaDonSelected.sdt} </p>
          </div>
          <p>Địa chỉ: {hoaDonSelected.diaChi}</p>
        </div>
        <div className="mt-4 border-top border-bottom py-2">
          <p className="font-bold">Nội dung đơn hàng (Tổng số lượng sản phẩm {chiTietHoaDonSelected.length} )</p>
          <table className="table table-bordered mt-2">
            <thead>
              <tr className="bg-gray-200">
                <th className="p-2">Stt</th>
                <th className="p-2">Tên</th>
                <th className="p-2">Giá</th>
                <th className="p-2">Số lượng</th>
                <th className="p-2">Tổng</th>
              </tr>
            </thead>
            <tbody>
            {chiTietHoaDonSelected.length === 0 ? (
              <tr>
                <td colSpan="5">Không có dữ liệu hóa đơn.</td>
              </tr>
            ) : (
              chiTietHoaDonSelected.map((item, index) => (
                <tr key={item.id}>
                  <td>{index + 1}</td>
                  <td>{item.tenSanPham}</td>
                  <td>{(item.giaBan).toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}</td>
                  <td>{item.soLuongmua}</td>
                  <td>{(item.giaBan * item.soLuongmua).toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}</td>
                </tr>
              ))
            )}
 
            </tbody>
          </table>

        </div>
        <div className="mt-4">
          <p>Tổng Tiền hàng: {hoaDonSelected.tongTien}</p>
          <p>Giảm giá: </p>
          <p>Phí ship: {hoaDonSelected.tienShip}</p>
          <p className="font-bold">Tổng hóa đơn: {hoaDonSelected.tongTien + hoaDonSelected.tienShip} </p>
        </div>
      </div>
    </div>







</div>
  );
});
// Sử dụng React.memo để ghi nhớ component, với hàm so sánh tùy chỉnh
export default React.memo(HoaDon);
