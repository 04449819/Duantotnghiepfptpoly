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

            if (listSP == null || !listSP.Any())
            {
                return NotFound("Chi tiet hoa don not found.");
            }

            var query = from chitiethoadon in listSP
                        join chiTietSanPham in _context.ChiTietSanPhams on chitiethoadon.IDCTSP equals chiTietSanPham.ID
                        join anh in _context.Anhs on chiTietSanPham.ID equals anh.ID
                        join sanPham in _context.SanPhams on chiTietSanPham.IDSanPham equals sanPham.ID
                        join hoaDon in _context.HoaDons on chitiethoadon.IDHoaDon equals hoaDon.ID
                        select new
                        {
                            ChiTietHoaDon = chitiethoadon,
                            ChiTietSanPham = chiTietSanPham,
                            SanPham = sanPham,
                            HoaDon = hoaDon,
                            Anh = anh
                        };

           

            return Ok(query);
        }
        [HttpGet("getAllthongtin")]
        public async Task<IActionResult> GetChiTietHoaDonById(Guid chiTietHoaDonId)
        {
            // Fetch the ChiTietHoaDon with its related HoaDon, DanhGia, and KhachHang details
            var chiTietHoaDon = await _context.ChiTietHoaDons
                .Where(cthd => cthd.ID == chiTietHoaDonId)
                .Select(cthd => new
                {
                    cthd.ID,
                    cthd.DonGia,
                    cthd.SoLuong,
                    cthd.TrangThai,
                    cthd.IDCTSP,
                    cthd.IDHoaDon,
                    SanPham = new
                    {
                        SanPhamId = cthd.ChiTietSanPham.IDSanPham,
                        TenSanPham = cthd.ChiTietSanPham.SanPham.Ten,
                        AnhSanPham = _context.Anhs
                            .Where(a => a.IDChitietsanpham == cthd.ChiTietSanPham.ID)
                            .Select(a => a.DuongDan)
                            .FirstOrDefault(),
                        MauSac = cthd.ChiTietSanPham.MauSac.Ten,
                        KichCo = cthd.ChiTietSanPham.KichCo.Ten
                    },
                    DanhGia =   _context.DanhGias
                        .Where(dg => dg.ChiTietHoaDon.ID == cthd.ID)
                        .Select(dg => new
                        {
                            dg.ID,
                            dg.BinhLuan,
                            dg.Sao,
                            dg.NgayDanhGia,
                            dg.phanHoi,
                            dg.TrangThai
                        })
                        .FirstOrDefault(),
                    HoaDon = new
                    {
                        cthd.HoaDon.ID,
                        cthd.HoaDon.MaHD,
                        cthd.HoaDon.NgayTao,
                        cthd.HoaDon.NgayThanhToan,
                        cthd.HoaDon.NgayNhanHang,
                        cthd.HoaDon.TenNguoiNhan,
                        cthd.HoaDon.SDT,
                        cthd.HoaDon.Email,
                        cthd.HoaDon.DiaChi,
                        cthd.HoaDon.TongTien,
                        cthd.HoaDon.TienShip,
                        cthd.HoaDon.GhiChu,
                        cthd.HoaDon.TrangThaiGiaoHang,
                        KhachHang = new
                        {
                            cthd.HoaDon.KhachHang.IDKhachHang,
                            cthd.HoaDon.KhachHang.Ten,
                            cthd.HoaDon.KhachHang.Email,
                            cthd.HoaDon.KhachHang.SDT
                            // Add any additional required fields from KhachHang
                        }
                    }
                })
                .FirstOrDefaultAsync();

            if (chiTietHoaDon == null)
            {
                return NotFound("Chi tiết hóa đơn không tồn tại.");
            }

            return Ok(chiTietHoaDon);
        }

        [HttpGet("DanhGiaVaKhachHang/{chiTietSanPhamId}")]
        public async Task<IActionResult> GetDanhGiaVaKhachHang(Guid chiTietSanPhamId)
        {
            var result = await _idchiTietHoaDon.GetDanhGiaVaKhachHangBySanPhamIdAsync(chiTietSanPhamId);
            if (result == null)
            {
                return NotFound("Không tìm thấy đánh giá hoặc khách hàng.");
            }
            return Ok(result);
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
