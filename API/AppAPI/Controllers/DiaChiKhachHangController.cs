using System;
using System.Threading.Tasks;
using AppData.Models;
using AppAPI.IServices;
using Microsoft.AspNetCore.Mvc;
using AppData.ViewModels;
using AppAPI.Services;
using Microsoft.EntityFrameworkCore;

namespace AppAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class DiaChiKhachHangController : ControllerBase
    {
        private readonly IDCKHServices _dckhServices;
        private readonly AssignmentDBContext _context;

        public DiaChiKhachHangController()
        {
            _dckhServices = new DCKHServices();
            _context = new AssignmentDBContext();
        }
        [HttpPost("add")]
        public async Task<IActionResult> AddDiaChi([FromBody] DCKHViewModel request)
        {
            if (request == null)
            {
                return BadRequest("Dữ liệu không hợp lệ.");
            }

            try
            {
                var diaChi = await _dckhServices.AddDiaChi(request);
                return Ok(diaChi);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Lỗi server: {ex.Message}");
            }
        }
        [HttpGet("{id}")]
        public async Task<IActionResult> GetDiaChiById(Guid id)
        {
            var diaChi = await _dckhServices.GetDiaChiById(id);
            if (diaChi == null)
            {
                return NotFound("Địa chỉ không tồn tại.");
            }
            return Ok(diaChi);
        }
        [HttpGet("getByIdkh/{idkh}")]
        public async Task<IActionResult> GetByIdKH(Guid idkh)
        {

            var listSP = await _dckhServices.GetChiTietSPBHById(idkh);
            var query = from DiaChiKhachHang in listSP
                        join KhachHang in _context.KhachHangs on DiaChiKhachHang.KhachHangID equals KhachHang.IDKhachHang
                        select new
                        {
                            DiaChiKhachHang = DiaChiKhachHang,
                            KhachHangID = KhachHang,
                        };
            return Ok(query);
        }
        [HttpDelete("{id}")]
        public bool Delete(Guid id)
        {
            var result = _dckhServices.DeleteDC(id);
            return result;
        }


    }
}
