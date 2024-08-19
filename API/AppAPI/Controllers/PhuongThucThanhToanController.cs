using AppAPI.IServices;
using AppAPI.Services;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace AppAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PhuongThucThanhToanController : ControllerBase
    {
        private readonly IPhuongThucThanhToanService _phuongThucThanhToanService;
        public PhuongThucThanhToanController()
        {
            _phuongThucThanhToanService = new PhuongThucThanhToanService();
        }
        [HttpGet("getPTTTByIdHoaDon/{idHoaDon}")]
        public async Task<IActionResult> GetPTTTByIdHoaDon(Guid idHoaDon)
        {
            var pttt = _phuongThucThanhToanService.GetPTTTByIdHoaDon(idHoaDon);
            return Ok(new { pttt } );
        }
    }
}
