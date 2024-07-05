using AppAPI.IServices;
using AppAPI.Services;
using AppData.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
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
			return Ok(coAos);
		}

		[HttpGet("getAllCoAoThem")]

		public async Task<IActionResult> GetAllThem()
		{
			var coAos = await service.GetAllCoAo();
			return Ok(coAos.Where( p => p.trangThai != 0));
		}
	}
}
