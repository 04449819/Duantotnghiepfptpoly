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
            var chiTietHoaDon = await _context.ChiTietHoaDons.FindAsync(viewModel.IdChiTietHoaDon);
            if (chiTietHoaDon == null)
            {
                throw new InvalidOperationException("Chi tiết hóa đơn không tìm thấy.");
            }

            // Kiểm tra số lượng hoàn hàng
            if (viewModel.SoLuong <= 0 || viewModel.SoLuong > chiTietHoaDon.SoLuong)
            {
                throw new InvalidOperationException("Số lượng hoàn hàng không hợp lệ hoặc lớn hơn số lượng còn lại.");
            }

            // Tạo đối tượng hoàn hàng
            var hoanhangsanpham = new Hoanhangsanpham
            {
                ID = Guid.NewGuid(),
                SoLuong = viewModel.SoLuong,
                Diachikhachhang = viewModel.DiaChiKhachHang,
                Ngayhoanhang = viewModel.NgayHoanHang,
                Mota = viewModel.MoTa,
                TrangThaiHoanHang = 1 // Trạng thái "đã hoàn"
            };

            // Thêm đối tượng vào cơ sở dữ liệu
            await _context.hoanhangsanphams.AddAsync(hoanhangsanpham);
            // Lưu các thay đổi

            await _context.SaveChangesAsync();

            return hoanhangsanpham;

        }
    }
}
