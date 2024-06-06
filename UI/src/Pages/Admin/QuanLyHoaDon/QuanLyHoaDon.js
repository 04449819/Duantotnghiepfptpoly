import { useEffect, useState } from "react";
import "./QuanLyHoaDon.scss";
import axios from "axios";
const QuanLyHoaDon = () => {
  const [hoaDons, setHoaDons] = useState([]);

  useEffect(() => {
    fetchHoaDons();
  }, []);

  const fetchHoaDons = async () => {
    try {
      const response = await axios.get('/api/hoadons'); 
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
            <tr key={hoaDon.ID}>
              <td>{hoaDon.MaHD}</td>
              <td>{new Date(hoaDon.NgayTao).toLocaleDateString()}</td>
              <td>{new Date(hoaDon.NgayThanhToan).toLocaleDateString()}</td>
              <td>{new Date(hoaDon.NgayNhanHang).toLocaleDateString()}</td>
              <td>{hoaDon.TenNguoiNhan}</td>
              <td>{hoaDon.SDT}</td>
              <td>{hoaDon.Email}</td>
              <td>{hoaDon.DiaChi}</td>
              <td>{hoaDon.TienShip}</td>
              <td>{hoaDon.TongTien ? `${hoaDon.TongTien} VND` : 'Chưa xác định'}</td>
              <td>{hoaDon.LoaiHD ? 'Off' : 'On'}</td>
              <td>{hoaDon.PhuongThucThanhToan}</td>
              <td>{hoaDon.GhiChu}</td>
              <td>{renderTrangThaiGiaoHang(hoaDon.TrangThaiGiaoHang)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default QuanLyHoaDon;
