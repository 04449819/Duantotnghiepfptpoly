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
        public async Task<IActionResult> GetTop10SanphamTrongThang([FromQuery]  int month, int year)
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
                // Lấy danh sách hóa đơn cho năm chỉ định
                var dshd = await _dbcontext.HoaDons
                                            .Where(p => p.NgayThanhToan.HasValue && p.NgayThanhToan.Value.Year == year)
                                            .ToListAsync();

                var listidhoadon = dshd.Select(hd => hd.ID).ToList();

                // Lấy chi tiết hóa đơn cho các hóa đơn
                var listcthd = await _dbcontext.ChiTietHoaDons
                                                .Where(ct => listidhoadon.Contains(ct.IDHoaDon))
                                                .ToListAsync();

                // Tính tổng doanh thu cho mỗi sản phẩm
                var groupedChiTietHoaDons = listcthd.GroupBy(c => c.IDCTSP)
                                                     .Select(g => new
                                                     {
                                                         IdChiTietSanPham = g.Key,
                                                         TongTien = g.Sum(c => c.DonGia * c.SoLuong)
                                                     })
                                                     .ToList();

                // Lấy top 10 sản phẩm bán chạy nhất
                var sortedProducts = groupedChiTietHoaDons.OrderByDescending(g => g.TongTien)
                                                            .Take(5)
                                                            .ToList();

                // Lấy thông tin sản phẩm
                var topProductIds = sortedProducts.Select(p => p.IdChiTietSanPham).ToList();
                var products = await _dbcontext.SanPhams
                                                .Where(sp => topProductIds.Contains(sp.ID))
                                                .ToListAsync();

                // Tạo danh sách ViewModel từ dữ liệu lấy được
                var top10SanPham = sortedProducts.Select(item => new ThongKeMSSanPhamTheoSoLuong
                {
                    idSanPham = item.IdChiTietSanPham,
                    TenSP = products.FirstOrDefault(sp => sp.ID == item.IdChiTietSanPham)?.Ten ?? "Không tên",
                    SoLuong = listcthd.Where(ct => ct.IDCTSP == item.IdChiTietSanPham).Sum(ct => ct.SoLuong),
                    Gia = products.FirstOrDefault(sp => sp.ID == item.IdChiTietSanPham)?.TrangThai ?? 0,
                    DoanhThu = item.TongTien
                }).ToList();

                return Ok(top10SanPham);
            }
            catch (Exception ex)
            {
                // Ghi log lỗi nếu cần
                return StatusCode(StatusCodes.Status500InternalServerError, "Internal server error");
            }
        }





    }
}
