using AppAPI.IServices;
using AppAPI.Services;
using AppData.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Runtime.CompilerServices;

namespace AppAPI.Controllers
{
	[Route("api/[controller]")]
	[ApiController]
	public class CoAoController : ControllerBase
	{

		private readonly IQlThuocTinhService service;
		private readonly AssignmentDBContext _dbContext;
		public CoAoController()
		{
			service = new QlThuocTinhService();
			_dbContext = new AssignmentDBContext();
		}

		[HttpGet("getAllCoAo")]

		public async Task<IActionResult> GetAll() {
			var coAos = await service.GetAllCoAo();
			var ds = coAos.Where(p => p.trangThai == 1);
			return Ok(coAos);
		}

		[HttpGet("getAllCoAoThem")]

		public async Task<IActionResult> GetAllThem()
		{
			var coAos = await service.GetAllCoAo();
			return Ok(coAos.Where( p => p.trangThai != 0));
		}


		[HttpGet("getAllCoAoQLCA")]
		public async Task<IActionResult> GetAllCoAo()
		{
			var ds = await service.GetAllCoAo();
			return Ok(ds);
		}

		[HttpGet("getAllCoAoQLCAbyname")]
		public async Task<IActionResult> GetAllCoAobyName(string name)
		{
			var ds = await service.GetAllCoAobyName(name);
			return Ok(ds);
		}

		[HttpDelete("{id}")]
		public async Task<IActionResult> DeleteCoAo(Guid id)
		{
			var cl = await service.DeleteCoAo(id);
			switch (cl)
			{
				case 0:
					return BadRequest("Cổ áo đã được sử dụng trong sản phẩm");

				case 1:
					return Ok("Xóa thành công");

				case 2:
					return BadRequest("Không tìm thấy Cổ áo cần xóa");

				default:
					return BadRequest("Xóa thất bại");

			}
		}

		[HttpPut("{id}")]
		public async Task<IActionResult> PutCoAo(Guid id, string ten, int trangthai)
		{
			var bv = await service.UpdateCoAo(id, ten, trangthai);
			if (bv == null)
			{
				return BadRequest(); // Trả về BadRequest nếu tên trùng
			}

			return Ok(bv);
		}

		[HttpPost("ThemCoAo")]
		public async Task<IActionResult> AddCoAo(string ten, int trangthai)
		{

			var nv = await service.AddCoAo(ten, trangthai);
			if (nv == null)
			{
				return BadRequest();
			}
			return Ok(nv);
		}
	}
}
