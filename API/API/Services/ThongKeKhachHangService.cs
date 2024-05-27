using API.IServices;
using ShopOnlineModel.Data;
using ShopOnlineModel.Entities;

namespace API.Services
{
    public class ThongKeKhachHangService : IThongKeKhachHangService
    {
        private readonly ShopOnlineDBContext _context;
        public ThongKeKhachHangService(ShopOnlineDBContext context)
        {
            _context = context;
        }
        public int KhachHangCuTheoNam(int year)
        {
            var kh = _context.KhachHangs.Count(kh => _context.LichSuTichDiems.Any(ls => ls.KhachHang.IDKhachHang == kh.IDKhachHang && ls.HoaDon.NgayTao.Year == year));
            return kh;
        }

        public int KhachHangCuTheoNgay(DateTime date)
        {
            var khachHangCu = _context.KhachHangs.Count(kh => kh.LichSuTichDiems.Any(ls => ls.KhachHang.IDKhachHang == kh.IDKhachHang && ls.HoaDon.NgayTao.Date == date.Date));
            return khachHangCu;
        }

        public int KhachHangCuTheoThang(int month, int year)
        {
            var kh = _context.KhachHangs.Count(kh => kh.LichSuTichDiems.Any(ls => ls.KhachHang.IDKhachHang == kh.IDKhachHang && ls.HoaDon.NgayTao.Month == month && ls.HoaDon.NgayTao.Year == year));
            return kh;
        }

        public int KhachHangMoiTheoNam(int year)
        {
            var kh = _context.KhachHangs.Count(kh => kh.GioHang.NgayTao.Year == year);
            return kh;
        }

        public int KhachHangMoiTheoNgay(DateTime date)
        {
            var khachHangMoi = _context.KhachHangs.Count(kh => kh.GioHang.NgayTao.Date == date

            .Date);
            return khachHangMoi;
        }

        public int KhachHangMoiTheoThang(int month, int year)
        {
            var kh = _context.KhachHangs.Count(kh => kh.GioHang.NgayTao.Month == month && kh.GioHang.NgayTao.Year == year);
            return kh;
        }

        public IEnumerable<ChiTietHoaDon> TongKhachHangMuaTrongNam(int year)
        {
            return _context.ChiTietHoaDons.Where(a => a.HoaDon.NgayTao.Year == year);
        }

        public IEnumerable<ChiTietHoaDon> TongKhachHangMuaTrongThang(int month, int year)
        {
            return _context.ChiTietHoaDons.Where(a => a.HoaDon.NgayTao.Month == month && a.HoaDon.NgayTao.Year == year);
        }

        public IEnumerable<ChiTietHoaDon> TongKhachHangTrongNgay(DateTime date)
        {
            return _context.ChiTietHoaDons.Where(a => a.HoaDon.NgayTao.Date == date.Date);
        }
    }
}
