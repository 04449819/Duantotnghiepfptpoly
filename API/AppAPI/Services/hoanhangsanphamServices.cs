using AppAPI.IServices;
using AppData.Models;
using AppData.ViewModels;

namespace AppAPI.Services
{
    public class hoanhangsanphamServices : IhoanhangsanphamServices
    {
        private readonly AssignmentDBContext _context;
        public hoanhangsanphamServices()
        {
            _context = new AssignmentDBContext();
        }

        public async Task<Hoanhangsanpham> CreateAsync(hoanhangviewmodel viewModel)
        {
            // Tìm ChiTietHoaDon dựa trên ID
            var chiTietHoaDon = await _context.ChiTietHoaDons.FindAsync(viewModel.IdChiTietHoaDon);
            if (chiTietHoaDon == null)
            {
                throw new InvalidOperationException("Chi tiết hóa đơn không tìm thấy.");
            }

            if (viewModel.SoLuong <= 0 || viewModel.SoLuong > chiTietHoaDon.SoLuong)
            {
                throw new InvalidOperationException("Số lượng hoàn hàng không hợp lệ hoặc lớn hơn số lượng còn lại.");
            }

            // Tìm HoaDon dựa trên ID trong ChiTietHoaDon
            var hoaDon = await _context.HoaDons.FindAsync(chiTietHoaDon.IDHoaDon);
            if (hoaDon == null)
            {
                throw new InvalidOperationException("Hóa đơn không tìm thấy.");
            }


            var diaChiKhachHang = hoaDon.DiaChi; // Địa chỉ khách hàng trong HoaDon

            // Tạo đối tượng hoàn hàng
            var hoanhangsanpham = new Hoanhangsanpham
            {
                ID = Guid.NewGuid(),
                ChiTietHoaDon = chiTietHoaDon,
                Diachikhachhang = diaChiKhachHang,
                SoLuong=viewModel.SoLuong,
                Ngayhoanhang = DateTime.UtcNow,
                Mota = viewModel.MoTa,
                TrangThaiHoanHang = 1
            };


            await _context.hoanhangsanphams.AddAsync(hoanhangsanpham);

           
            // Lưu các thay đổi
            await _context.SaveChangesAsync();

            return hoanhangsanpham;

        }
    }
}
