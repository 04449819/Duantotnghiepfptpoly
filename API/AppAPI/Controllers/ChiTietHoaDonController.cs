using AppAPI.IServices;
using AppAPI.Services;
using AppData.Models;
using AppData.ViewModels.BanOffline;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Org.BouncyCastle.Crypto;

namespace AppAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ChiTietHoaDonController : ControllerBase
    {
        private readonly IChiTietHoaDonService _idchiTietHoaDon;

        private readonly AssignmentDBContext _context;

        public ChiTietHoaDonController()
        {
            _idchiTietHoaDon = new ChiTietHoaDonService();
            _context = new AssignmentDBContext();
        }
        [HttpGet]
        public List<ChiTietHoaDon> getAll()
        {
            return _idchiTietHoaDon.GetAllCTHoaDon();
        }
        [HttpGet("getByIdHD/{idhd}")]
        public async Task<IActionResult> GetById(Guid idhd)
        {
            var lsp = await _idchiTietHoaDon.GetHDCTByIdHD(idhd);
            if (lsp == null) return NotFound();
            return Ok(lsp);
        }

        [HttpGet("getByIdCTHD/{idCTHD}")]
        public async Task<IActionResult> GetByIdcthd(Guid idCTHD)
        {
            


            var listSP = await _idchiTietHoaDon.GetChiTietSPBHById(idCTHD);
            //var query = from chitiethoadon in listSP
            //            join ChiTietSanPham in _context.ChiTietSanPhams  on chitiethoadon.IDCTSP equals ChiTietSanPham.ID

            //            select new
            //            {
            //                chiTietHoaDon = chitiethoadon,
            //                ChiTietSanPham = ChiTietSanPham,

            //            };
            var query = from chitiethoadon in listSP
                        join chiTietSanPham in _context.ChiTietSanPhams on chitiethoadon.IDCTSP equals chiTietSanPham.ID    
                        join ANH in _context.Anhs on chiTietSanPham.ID equals ANH.ID
                        join sanPham in _context.SanPhams on chiTietSanPham.IDSanPham equals sanPham.ID
                        select new
                        {
                            ChiTietHoaDon = chitiethoadon,
                            ChiTietSanPham = chiTietSanPham,
                            SanPham = sanPham,
                            ANH = ANH
                        };
            return Ok(query);

        }
        [HttpPost("saveHDCT")]
        public async Task<IActionResult> Save(HoaDonChiTietRequest request)
        {
            if (request == null) return BadRequest();
            var hdct = await _idchiTietHoaDon.SaveCTHoaDon(request);
            if(hdct == true) return Ok();
            else return BadRequest();
        }
        [HttpPost("UpdateSL")]
        public async Task<IActionResult> UpdateSL(Guid id, int sl)
        {
            var hdct = await _idchiTietHoaDon.UpdateSL(id,sl);
            if( hdct == true) return Ok();
            return BadRequest();
        }
        [HttpDelete("delete/{id}")]
        public async Task<IActionResult> DeleteLoaiSP(Guid id)
        {
            var loaiSP = await _idchiTietHoaDon.DeleteCTHoaDon(id);
            return Ok();
        }
    }
}
