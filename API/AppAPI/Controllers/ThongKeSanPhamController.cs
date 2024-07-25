using AppAPI.IServices;
using AppData.Models;
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



		
	}
}
