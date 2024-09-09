using AppAPI.IServices;
using AppData.Models;
using AppData.ViewModels;
using Microsoft.EntityFrameworkCore;

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
            var hoaDon = await _context.HoaDons.FindAsync(chiTietHoaDon.IDHoaDon);
            if (hoaDon == null)
            {
                throw new InvalidOperationException("Hóa đơn không tìm thấy.");
            }
            var daHoanHang = await _context.hoanhangsanphams
                     .Where(hh => hh.ChiTietHoaDon.ID == chiTietHoaDon.ID && hh.TrangThaiHoanHang == 1)
                       .SumAsync(hh => hh.SoLuong);

            if (daHoanHang >= chiTietHoaDon.SoLuong)
            {
                throw new InvalidOperationException("Sản phẩm đã được hoàn đủ số lượng.");
            }


            var diaChiKhachHang = hoaDon.DiaChi; // Địa chỉ khách hàng trong HoaDon

            // Tìm HoaDon dựa trên ID trong ChiTietHoaDon


            // Tạo đối tượng hoàn hàng
            var hoanhangsanpham = new Hoanhangsanpham
            {
                ID = Guid.NewGuid(),
                ChiTietHoaDon = chiTietHoaDon,
                Diachikhachhang = diaChiKhachHang,
                SoLuong = viewModel.SoLuong,
                Ngayhoanhang = DateTime.UtcNow,
                Mota = viewModel.MoTa,
                TrangThaiHoanHang = 1
            };


            await _context.hoanhangsanphams.AddAsync(hoanhangsanpham);


            // Lưu các thay đổi
            await _context.SaveChangesAsync();

            return hoanhangsanpham;

        }

        public async Task<IEnumerable<Hoanhangsanpham>> GetAllAsync()
        {
            return await _context.hoanhangsanphams.ToArrayAsync();

        }

        public async Task<Hoanhangsanpham> UpdateStatusAsync(Guid id, int newStatus)
        {
            var trangthai = await _context.hoanhangsanphams.FindAsync(id);
            if (trangthai != null)
            {
                trangthai.TrangThaiHoanHang = newStatus;
                _context.hoanhangsanphams.Update(trangthai);
                await _context.SaveChangesAsync();
            }
            return trangthai;
        }
    }
}
