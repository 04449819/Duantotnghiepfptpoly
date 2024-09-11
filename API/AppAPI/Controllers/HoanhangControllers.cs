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
            catch (Exception ex)
            {
                // Ghi log lỗi
                // _logger.LogError(ex, "An error occurred while creating the return record.");
                return StatusCode(500, "Có lỗi xảy ra trong khi tạo hoàn hàng.");
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
        [HttpGet("getall")]
        public async Task<ActionResult<IEnumerable<Hoanhangsanpham>>> GetAllAsync()
        {
            try
            {
                var result = await _hoanhangsanphamServices.GetAllAsync();
                return Ok(result);
            }
            catch (Exception ex)
            {
                // Log exception here if needed
                return StatusCode(500, $"Internal server error: {ex.Message}");
            }
        }
        [HttpPut("{id}/status")]
        public async Task<ActionResult<Hoanhangsanpham>> UpdateStatusAsync(Guid id, [FromQuery] int newStatus)
        {
            try
            {
                var updatedEntity = await _hoanhangsanphamServices.UpdateStatusAsync(id, newStatus);
                if (updatedEntity == null)
                {
                    return NotFound($"Entity with ID {id} not found");
                }
                return Ok(updatedEntity);
            }
            catch (Exception ex)
            {
                // Log exception here if needed
                return StatusCode(500, $"Internal server error: {ex.Message}");
            }
        }
        [HttpGet("returned-products/{invoiceId}")]
        public async Task<IActionResult> GetReturnedProductsByInvoiceId(Guid invoiceId)
        {
            try
            {
                var products = await _hoanhangsanphamServices.GetReturnedProductsByInvoiceIdAsync(invoiceId);
                return Ok(products);
            }
            catch (KeyNotFoundException ex)
            {
                return NotFound(ex.Message);
            }
        }

        // 2  xác nhận hoàn 
        // 3  xác nhận hoàn thành công
        // 4 hủy hoàn hang

    }
}
