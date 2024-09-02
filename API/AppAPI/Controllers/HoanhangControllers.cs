using AppAPI.IServices;
using AppAPI.Services;
using AppData.Models;
using AppData.ViewModels;
using Microsoft.AspNetCore.Mvc;

namespace AppAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class HoanhangControllers : ControllerBase
    {
        private readonly AssignmentDBContext _context;
        private readonly IhoanhangsanphamServices _hoanhangsanphamServices;
        public HoanhangControllers()
        {
            _context = new AssignmentDBContext();
            _hoanhangsanphamServices = new hoanhangsanphamServices();

        }
        [HttpPost]
        public async Task<IActionResult> Create([FromBody] hoanhangviewmodel viewModel)
        {
            if (viewModel == null)
            {
                return BadRequest("Dữ liệu không hợp lệ.");
            }

            try
            {
                var hoanhangsanpham = await _hoanhangsanphamServices.CreateAsync(viewModel);
                return CreatedAtAction(nameof(GetById), new { id = hoanhangsanpham.ID }, hoanhangsanpham);
            }
            catch (InvalidOperationException ex)
            {
                return BadRequest(ex.Message);
            }
        }
        [HttpGet("{id}")]
        public async Task<IActionResult> GetById(Guid id)
        {
            var hoanhangsanpham = await _context.hoanhangsanphams.FindAsync(id);
            if (hoanhangsanpham == null)
            {
                return NotFound();
            }
            return Ok(hoanhangsanpham);
        }



    }
}
