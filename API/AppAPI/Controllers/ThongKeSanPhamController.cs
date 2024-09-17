using AppAPI.IServices;
using AppData.Models;
using AppData.ViewModels.SanPham;
using AppData.ViewModels.ThongKe;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace AppAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ThongKeSanPhamController : ControllerBase
    {
        private readonly IThongKeSanPhamService service;

        private readonly AssignmentDBContext _dbcontext = new AssignmentDBContext();

        public ThongKeSanPhamController(IThongKeSanPhamService service)
        {
            this.service = service;
        }

        // GET: api/<ThongKeSanPhamController>
        [HttpGet("top10sanphamtrongngay")]
        public async Task<IActionResult> GetTop10SanphamTrongNgay([FromQuery] DateTime date)
        {
            var top = await service.Top10SanPhamTrongNgay(date);
            return Ok(top);
        }

        // GET api/<ThongKeSanPhamController>/5
        [HttpGet("top10sanphamtrongthang")]
        public async Task<IActionResult> GetTop10SanphamTrongThang([FromQuery] int month, int year)
        {
            var top = await service.Top10SanPhamTrongThang(month, year);
            return Ok(top);
        }
        // GET api/<ThongKeSanPhamController>/5



        [HttpGet("top10sanphamtrongnam")]
        public async Task<IActionResult> GetTop10SanphamTrongNam(int year)
        {
            try
            {

                var top10SanPham = new List<SanPham>();


                var dshd = await _dbcontext.HoaDons
                                          .Where(p => p.NgayThanhToan.HasValue && p.NgayThanhToan.Value.Year == year)
                                          .ToListAsync();


                var listidhoadon = dshd.Select(hd => hd.ID).ToList();


                var listcthd = await _dbcontext.ChiTietHoaDons
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
                    var sanPham = await _dbcontext.SanPhams.FirstOrDefaultAsync(sp => sp.ID == item.IdChiTietSanPham);
                    if (sanPham != null)
                    {
                        top10SanPham.Add(sanPham);
                    }
                }


                return Ok(top10SanPham);
            }
            catch (Exception ex)
            {

                return StatusCode(StatusCodes.Status500InternalServerError, "Internal server error");
            }
        }
        [HttpGet("top10sanphamtrongna222m")]
        public async Task<IActionResult> GetTop10SanphamTrongNam1(int year)
        {
            try
            {
                // Lấy danh sách hóa đơn cho năm chỉ định và ID hóa đơn
                var dshd = await _dbcontext.HoaDons
                    .Where(p => p.NgayThanhToan.HasValue && p.NgayThanhToan.Value.Year == year)
                    .Select(hd => hd.ID)
                    .ToListAsync();

                // Lấy chi tiết hóa đơn cho các hóa đơn
                var listcthd = await _dbcontext.ChiTietHoaDons
                    .Where(ct => dshd.Contains(ct.IDHoaDon))
                    .GroupBy(ct => ct.IDCTSP)
                    .Select(g => new
                    {
                        IdChiTietSanPham = g.Key,
                        TongTien = g.Sum(ct => ct.DonGia * ct.SoLuong),
                        SoLuong = g.Sum(ct => ct.SoLuong)
                    })
                    .OrderByDescending(g => g.TongTien)
                    .Take(10)
                    .ToListAsync();

                // Lấy thông tin sản phẩm tương ứng
                var topProductIds = listcthd.Select(p => p.IdChiTietSanPham).ToList();
                var products = await _dbcontext.ChiTietSanPhams
                    .Include(c => c.SanPham)
                    .Where(c => topProductIds.Contains(c.ID))
                    .ToListAsync();

                // Tạo danh sách ViewModel từ dữ liệu lấy được
                var top10SanPham = listcthd.Select(item =>
                {
                    var chiTietSanPham = products.FirstOrDefault(c => c.ID == item.IdChiTietSanPham);
                    var sanPham = chiTietSanPham?.SanPham;

                    return new ThongKeMSSanPhamTheoSoLuong
                    {
                        idSanPham = chiTietSanPham?.IDSanPham ?? Guid.Empty,
                        TenSP = sanPham?.Ten ?? "Unknown",
                        SoLuong = item.SoLuong,
                        Gia = chiTietSanPham?.GiaBan ?? 0,
                        DoanhThu = item.TongTien
                    };
                }).ToList();

                return Ok(top10SanPham);
            }
            catch (Exception ex)
            {
                // Ghi log lỗi nếu cần
                Console.WriteLine(ex.ToString());
                return StatusCode(StatusCodes.Status500InternalServerError, "Internal server error");
            }
        }






    }
}