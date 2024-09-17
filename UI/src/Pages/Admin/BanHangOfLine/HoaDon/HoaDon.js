import React from 'react';
import QRCode from 'qrcode.react';

const HoaDon = React.forwardRef(({ hoaDon }, ref) => {
  if (!hoaDon) return null;

  return (
    <div ref={ref} className="container-fluid d-flex flex-column align-items-center w-100 p-4 bg-gray-100">
      <div className="bg-white p-6 shadow-md w-100 max-w-4xl">
        <div className="text-center">
          <div className="d-flex justify-content-between align-items-center">
            <div style={{ width: '100px' }}></div>
            <h1 className="text-2xl font-bold text-center flex-grow-1">Shop Man</h1>
            <QRCode value={hoaDon?.Ma} size={100} />
          </div>
          <p>Chương trình Phổ thông Cao đẳng FPT Polytechnic, Phường Canh, Từ Liêm, Hà Nội, Việt Nam</p>
          <p>SDT: 0123456789</p>
          <div className="d-flex justify-content-between align-items-center mt-2">
            <p className="text-sm">Mã hóa đơn: {hoaDon?.Ma}</p>
            <p className="text-sm">Ngày tạo: {new Date()?.toLocaleString()}</p>
          </div>
        </div>
        <div className="mt-4">
          <div className="d-flex justify-content-between align-items-center mt-2">
            <p>Khách hàng: {hoaDon?.TenKhachHang}</p>
            <p>Số điện thoại: {hoaDon?.SDT}</p>
          </div>
          <p>Địa chỉ: {hoaDon?.DiaChi}</p>
        </div>
        <div className="mt-4 border-top border-bottom py-2">
          <p className="font-bold">Nội dung đơn hàng (Tổng số lượng sản phẩm {hoaDon?.SanPhams?.length})</p>
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
              {hoaDon?.SanPhams?.map((item, index) => (
                <tr key={item.IDCTSP}>
                  <td>{index + 1}</td>
                  <td>{item.TenSanPham}</td>
                  <td>{item.GiaBan?.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}</td>
                  <td>{item.SoLuongMua}</td>
                  <td>{(item.GiaBan * item.SoLuongMua)?.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="mt-4">
          <p>Tổng Tiền hàng: {hoaDon?.tongTienBanDau?.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}</p>
          <p>Giảm giá: {(hoaDon?.tienGiamVoucher + hoaDon?.tienGiamKhuyenMai + hoaDon?.tienGiamDiem)?.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}</p>
          <p>Phí ship: {hoaDon?.TienShip?.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}</p>
          <p className="font-bold">Tổng hóa đơn: {hoaDon?.TongTienHoaDon?.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}</p>
        </div>
      </div>
    </div>
  );
});

export default React.memo(HoaDon);