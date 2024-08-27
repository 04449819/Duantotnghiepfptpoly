using AppData.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System;

namespace AppAPI.Controllers
{

	[Route("api/[controller]")]
	[ApiController]
	public class DiaChiKhachHangConTroller : ControllerBase
	{
		private readonly AssignmentDBContext _dbContext;
		public DiaChiKhachHangConTroller()
		{
			_dbContext = new AssignmentDBContext();
		}

		[HttpGet("getalldiachikh")]
		public async Task<IActionResult> GetAllDiaChiKhachHang(Guid id)
		{
			try
			{
				var dckh = await _dbContext.diaChiKhachHangs.Where(x => x.KhachHangID == id).OrderByDescending(p => p.TrangThai).ToListAsync();
				return Ok(dckh);
			}
			catch (Exception)
			{

				throw;
			}

		}

		[HttpPut("updatedckh")]
		public async Task<IActionResult> UpdateTrangThaiDCKH(Guid id)
		{
			try
			{
				var dckh = await _dbContext.diaChiKhachHangs.FindAsync(id);
				if (dckh == null)
				{
					return BadRequest("Địa chỉ khách hàng không tồn tại");
				}

				if (dckh.TrangThai == 1)
				{
					return Ok();
				}

				// Cập nhật trạng thái của địa chỉ khách hàng được chọn
				dckh.TrangThai = 1;

				// Cập nhật trạng thái của các địa chỉ khác về 0
				var otherDCKHs = _dbContext.diaChiKhachHangs.Where(d => d.Id != id && d.TrangThai == 1);
				foreach (var d in otherDCKHs)
				{
					d.TrangThai = 0;
				}

				await _dbContext.SaveChangesAsync();

				return Ok("Cập nhật thành công");
			}
			catch (Exception)
			{

				throw;
			}

		}

		[HttpDelete("xoadckh")]
		public async Task<IActionResult> DeleteDiaChiKhachHang(Guid id)
		{
			var dckh = await _dbContext.diaChiKhachHangs.FindAsync(id);
			if (dckh == null)
			{
				return NotFound("Địa chỉ khách hàng không tồn tại");
			}

			if (dckh.TrangThai == 1)
			{
				return BadRequest("Địa chỉ khách hàng đang được sử dụng không thể xóa");
			}

			_dbContext.diaChiKhachHangs.Remove(dckh);
			await _dbContext.SaveChangesAsync();
			return Ok("Xóa thành công");
		}

		[HttpPost("themdiachikhachhangmoi")]
		public async Task<IActionResult> ADDDiaChiKhachHang(string tenkh, string sdt, string diachi, Guid idkh)
		{
			try
			{
				if (string.IsNullOrEmpty(tenkh) || string.IsNullOrEmpty(sdt) || string.IsNullOrEmpty(diachi) || idkh == Guid.Empty)
				{
					return BadRequest("Dữ liệu đầu vào không hợp lệ");
				}
				var check = await _dbContext.KhachHangs.FindAsync(idkh);
				if (check == null)
				{
					return BadRequest("Không tìm thấy thông tin khách hàng");
				}
				// Cập nhật tất cả địa chỉ của khách hàng thành trạng thái 0
				var diaChiKhachHangs = _dbContext.diaChiKhachHangs.Where(d => d.KhachHangID == idkh);
				await diaChiKhachHangs.ForEachAsync(d => d.TrangThai = 0);

				var dckh = new DiaChiKhachHang();
				dckh.Id = Guid.NewGuid();
				dckh.TenKhachHang = tenkh;
				dckh.sdt = sdt;
				dckh.DiaChi = diachi;
				dckh.KhachHangID = idkh;
				dckh.TrangThai = 1;
				await _dbContext.diaChiKhachHangs.AddAsync(dckh);
				await _dbContext.SaveChangesAsync();
				return Ok("Thêm thành công");
			}
			catch (Exception)
			{

				throw;
			}

		}

	}
}
