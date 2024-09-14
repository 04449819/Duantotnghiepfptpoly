using AppAPI.IServices;
using AppAPI.Services;
using AppData.Models;
using AppData.ViewModels;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Org.BouncyCastle.Crypto;

namespace AppAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class DanhGiaController : ControllerBase
    {
        private readonly IDanhGiaService _danhGiaService;
        private readonly AssignmentDBContext _dbcontext;
        public DanhGiaController()
        {
            _danhGiaService = new DanhGiaService();
            _dbcontext = new AssignmentDBContext();
        }
        [HttpGet("getbyIdSp/{idsp}")]
        public async Task<IActionResult> GetByIdSp(Guid idsp)
        {
            var result = await _danhGiaService.GetDanhGiaByIdSanPham(idsp);
            return Ok(result);
        }
        [HttpGet("getbyIdBt/{idbt}")]
        public async Task<IActionResult> GetByIdBt(Guid idbt)
        {
            var result = await _danhGiaService.GetDanhGiaByIdBthe(idbt);
            return Ok(result);
        }
        [HttpGet("getDaDanhGia/{idkh}")]
        public async Task<IActionResult> GetHDCTDaDanhGia(Guid idkh)
        {
            var result = await _danhGiaService.GetHDCTDaDanhGia(idkh);
            return Ok(result);
        }
        [HttpGet("getChuaDanhGia/{idkh}")]
        public async Task<IActionResult> GetHDCTChuaDanhGia(Guid idkh)
        {
            var result = await _danhGiaService.GetHDCTChuaDanhGia(idkh);
            return Ok(result);
        }
        [HttpPost("save")]
        public async Task<IActionResult> SaveDanhGia(Danhgiamodel dg)
        {
            var result = await _danhGiaService.SaveDanhgia(dg);
            return Ok(result);
        }
        [HttpPost("anDanhGia")]
        public async Task<IActionResult> AnDanhGia(Guid id)
        {
            var result = await _danhGiaService.AnDanhGia(id);
            return Ok(result);
        }
        [HttpPut]
        public bool UpdateDanhGia(Guid idCTHD, int soSao, string? binhLuan)
        {
            return _danhGiaService.UpdateDanhGia(idCTHD,soSao,binhLuan);
        }

        [HttpGet]
        public async Task<IActionResult> DanhgiaSanpham (Guid Idsp)
        {
            try
            {
				var dsdanhgia = await (from a in _dbcontext.DanhGias
									   join b in _dbcontext.ChiTietHoaDons
									   on a.ID equals b.ID
									   join d in _dbcontext.HoaDons
                                       on b.IDHoaDon equals d.ID
									   join e in _dbcontext.KhachHangs 
                                       on d.KhachHangID equals e.IDKhachHang
									   join c in _dbcontext.ChiTietSanPhams
									   on b.IDCTSP equals c.ID
									   where c.IDSanPham == Idsp // Thay `someIdspValue` bằng giá trị bạn muốn lọc
									   select new {
                                           tenkh = e.Ten,
										   ngaydanhgia = a.NgayDanhGia,
										   sao = a.Sao,
										   danhgia = a.BinhLuan,
										   phanhoi = a.phanHoi
									   })
			   .ToListAsync();

				return Ok(dsdanhgia);
			}
            catch (Exception)
            {

                throw;
            }

        }
        [HttpGet("GetAllUnrespondedReview")]
        public async Task<IActionResult> GetAllUnrespondedReview()
        {
            var danhGia = await _danhGiaService.GetAllUnrespondedReview();
            if (danhGia != null) return Ok(danhGia);
            return Ok();
        }
        [HttpGet("GetAll")]
        public  IActionResult GetAll()
        {
            var danhGia =  _danhGiaService.GetAll();
            return Ok(danhGia);
        }
        [HttpPut("GuiPhanHoi/{idDanhGia}")]
        public IActionResult ReplyPhanHoi(Guid idDanhGia, string phanHoi)
        {
            var danhGia = _danhGiaService.ReplyPhanHoi(idDanhGia, phanHoi);
            return Ok(danhGia);
        }
    }
}
