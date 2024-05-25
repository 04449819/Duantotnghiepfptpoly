using API.IServices;
using Microsoft.EntityFrameworkCore;
using ShopOnlineModel.Data;
using ShopOnlineModel.Entities;

namespace API.Services
{
    public class ThongKeSanPhamService : IThongKeSanPhamService
    {
        private readonly ShopOnlineDBContext _context;
        public ThongKeSanPhamService(ShopOnlineDBContext context)
        {
            _context = context;
        }
        public async Task<List<SanPham>> Top10SanPhamTrongNam(int year)
        {
            var top = await _context.ChiTietHoaDons.Include(a => a.ChiTietSanPham).Include(a => a.ChiTietSanPham.SanPham).Where(a => a.HoaDon.NgayTao.Year == year).GroupBy(a => a.ChiTietSanPham.SanPham).OrderByDescending(a => a.Sum(s => s.SoLuong)).Select(a => a.Key).Take(10).ToListAsync();
            return top;
        }

        public async Task<List<SanPham>> Top10SanPhamTrongNgay(DateTime date)
        {
            var top = await _context.ChiTietHoaDons.Include(a => a.ChiTietSanPham).Include(a => a.ChiTietSanPham.SanPham).Where(a => a.HoaDon.NgayTao.Date == date.Date).GroupBy(a => a.ChiTietSanPham.SanPham).OrderByDescending(a => a.Sum(s => s.SoLuong)).Select(a => a.Key).Take(10).ToListAsync(); return top;

        }

        public async Task<List<SanPham>> Top10SanPhamTrongThang(int month, int year)
        {
            var top = await _context.ChiTietHoaDons.Include(a => a.ChiTietSanPham).Include(a => a.ChiTietSanPham.SanPham).Where(a => a.HoaDon.NgayTao.Month == month && a.HoaDon.NgayTao.Year == year).GroupBy(a => a.ChiTietSanPham.SanPham).OrderByDescending(a => a.Sum(s => s.SoLuong)).Select(a => a.Key).Take(10).ToListAsync(); return top;

        }
    }
}
