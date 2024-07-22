using AppAPI.IServices;
using AppData.Models;
using AppData.ViewModels.BanOffline;
using Microsoft.AspNetCore.Authorization;
using Microsoft.EntityFrameworkCore;

namespace AppAPI.Services
{
    public class ThongKeSanPhamService : IThongKeSanPhamService
    {
        private readonly AssignmentDBContext context;

        public ThongKeSanPhamService(AssignmentDBContext context)
        {
            this.context = context;
        }

        //public async Task<List<SanPham>> Top10SanPhamTrongNam(int year)
        //{
        //    var top = await context.ChiTietHoaDons.Include(a => a.ChiTietSanPham).Include(a => a.ChiTietSanPham.SanPham).Where(a => a.HoaDon.NgayTao.Year == year).GroupBy(a => a.ChiTietSanPham.SanPham).OrderByDescending(a => a.Sum(s => s.SoLuong)).Select(a => a.Key).Take(10).ToListAsync();
        //    return top;
        //}
        public async Task<List<SanPham>> Top10SanPhamTrongNam(int year)
        {
            //var listSP = new List<SanPham>();
            //var dshd = await context.HoaDons.Where(p => p.NgayThanhToan.HasValue && p.NgayThanhToan.Value.Year == year).ToListAsync();

            //var listidhoadon = dshd.Select(hd => hd.ID).ToList();
            //var listcthd = await context.ChiTietHoaDons
            //                      .Where(ct => listidhoadon.Contains(ct.IDHoaDon))
            //                      .ToListAsync();
            //var groupedChiTietHoaDons = listcthd.GroupBy(c => c.IDCTSP).Select(g => new
            //  {
            //       IdChiTietSanPham = g.Key,
            //      TongTien = g.Sum(c => c.DonGia),
            // }).ToList();
            //return listSP;

            var top10SanPham = new List<SanPham>();


            var dshd = await context.HoaDons
                                      .Where(p => p.NgayThanhToan.HasValue && p.NgayThanhToan.Value.Year == year)
                                      .ToListAsync();


            var listidhoadon = dshd.Select(hd => hd.ID).ToList();


            var listcthd = await context.ChiTietHoaDons

                                           .Where(ct => listidhoadon.Contains(ct.IDHoaDon))
                                           .ToListAsync();


            var groupedChiTietHoaDons = listcthd.GroupBy(c => c.IDCTSP)
                                                .Select(g => new
                                                {
                                                    IdChiTietSanPham = g.Key,
                                                    TongTien = g.Sum(c => c.DonGia)
                                                })
                                                .ToList();


            var sortedProducts = groupedChiTietHoaDons.OrderByDescending(g => g.TongTien)
                                                     .Take(10)
                                                     .ToList();


            foreach (var item in sortedProducts)
            {
                var sanPham = await context.SanPhams.FirstOrDefaultAsync(sp => sp.ID == item.IdChiTietSanPham);
                if (sanPham != null)
                {
                    top10SanPham.Add(sanPham);
                }
            }


            return top10SanPham;




        }


        public async Task<List<SanPham>> Top10SanPhamTrongNgay(DateTime date)
        {
            var top = await context.ChiTietHoaDons.Include(a => a.ChiTietSanPham).Include(a => a.ChiTietSanPham.SanPham).Where(a => a.HoaDon.NgayTao.Date == date.Date).GroupBy(a => a.ChiTietSanPham.SanPham).OrderByDescending(a => a.Sum(s => s.SoLuong)).Select(a => a.Key).Take(10).ToListAsync(); return top;
        }

        public async Task<List<SanPham>> Top10SanPhamTrongThang(int month, int year)
        {

            var top10SanPham = new List<SanPham>();
            var dshd = await context.HoaDons
                              .Where(p => p.NgayThanhToan.HasValue &&
                                          p.NgayThanhToan.Value.Year == year &&
                                          p.NgayThanhToan.Value.Month == month)
                              .ToListAsync();
            var listidhoadon = dshd.Select(hd => hd.ID).ToList();

            var listcthd = await context.ChiTietHoaDons
                                           .Where(ct => listidhoadon.Contains(ct.IDHoaDon))
                                           .ToListAsync();
            var groupedChiTietHoaDons = listcthd.GroupBy(c => c.IDCTSP)
                                                    .Select(g => new
                                                    {
                                                        IdChiTietSanPham = g.Key,
                                                        TongTien = g.Sum(c => c.DonGia)
                                                    })
                                                    .ToList();
                         return top10SanPham;              
        }
    }
}
