import { useEffect, useState } from "react";
import "./QuanLyHoaDon.scss";
import axios from "axios";
const QuanLyHoaDon = () => {
  const [hoaDons, setHoaDons] = useState([]);

  useEffect(() => {
    fetchHoaDons();
    console.log(hoaDons);
  }, []);

  const fetchHoaDons = async () => {
    try {
      const response = await axios.get('https://localhost:7095/api/HoaDon/GetAll'); 
      setHoaDons(response.data);
    } catch (error) {
      console.error('Có lỗi khi fetch hóa đơn:', error);
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
  

  return (
    <div>
      <h2>Quản lý Hóa Đơn</h2>
      <table className="table">
        <thead>
          <tr>
            <th>Mã HĐ</th>
            <th>Ngày Tạo</th>
            <th>Ngày thanh toán</th>
            <th>Ngày nhận hàng</th>
            <th>Người Nhận</th>
            <th>SDT</th>
            <th>Email</th>
            <th>Địa Chỉ</th>
            <th>Tiền Ship</th>
            <th>Tổng Tiền</th>
            <th>Loại hóa đơn</th>
            <th>Phương thức thanh toán</th>
            <th>Ghi chú</th>
            <th>Trạng thái giao hàng</th>        
          </tr>
        </thead>
        <tbody>
          {hoaDons.map((hoaDon) => (
            <tr key={hoaDon.id}>
              <td>{hoaDon.maHD}</td>
              <td>{new Date(hoaDon.ngayTao).toLocaleDateString()}</td>
              <td>{new Date(hoaDon.ngayThanhToan).toLocaleDateString()}</td>
              <td>{new Date(hoaDon.ngayNhanHang).toLocaleDateString()}</td>
              <td>{hoaDon.tenNguoiNhan}</td>
              <td>{hoaDon.sdt}</td>
              <td>{hoaDon.email}</td>
              <td>{hoaDon.diaChi}</td>
              <td>{hoaDon.tienShip}</td>
              <td>{hoaDon.tongTien ? `${hoaDon.TongTien} VND` : 'Chưa xác định'}</td>
              <td>{hoaDon.loaiHD ? 'Off' : 'On'}</td>
              <td>{hoaDon.phuongThucThanhToan}</td>
              <td>{hoaDon.ghiChu}</td>
              <td>{renderTrangThaiGiaoHang(hoaDon.trangThaiGiaoHang)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default QuanLyHoaDon;
