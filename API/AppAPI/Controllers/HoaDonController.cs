using AppAPI.IServices;
using AppAPI.Services;
using AppData.Models;
using AppData.ViewModels;
using AppData.ViewModels.BanOffline;
using AppData.ViewModels.BanOnline;
using AppData.ViewModels.SanPham;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Internal;
using System.Collections.Generic;
using System.Runtime.InteropServices;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace AppAPI.Controllers
{
	[Route("api/[controller]")]
	[ApiController]
	public class HoaDonController : ControllerBase
	{
		private readonly IHoaDonService _iHoaDonService;
        private readonly IVNPayService _iVNPayService;


        public AssignmentDBContext _dbcontext = new AssignmentDBContext();
		public HoaDonController(IVNPayService vnPayService)
		{
			_iHoaDonService = new HoaDonService();
			_iVNPayService = vnPayService;
        }

		// GET: api/<HoaDOnController>
		[HttpGet("GetAll")]
		public List<HoaDon> Get()
		{
			return _iHoaDonService.GetAllHoaDon();
		}
		[HttpGet("GetById/{idhd}")]
		public HoaDon GetById(Guid idhd)
		{
			return _iHoaDonService.GetHoaDonById(idhd);
		}
        [HttpGet("khachhana/{idKhachHang}")]
        public IActionResult GetHoaDonByKhachHangId(Guid idKhachHang)
        {
            if (idKhachHang == Guid.Empty)
            {
                return BadRequest("ID khách hàng không hợp lệ.");
            }

            try
            {
                var hoaDons = _iHoaDonService.GetHoaDonByKhachHangId(idKhachHang);
                if (hoaDons == null || !hoaDons.Any())
                {
                    return NotFound("Không tìm thấy hóa đơn cho khách hàng này.");
                }

                return Ok(hoaDons);
            }
            catch (Exception ex)
            {
                // Ghi log lỗi nếu cần thiết
                return StatusCode(500, $"Lỗi máy chủ: {ex.Message}");
            }
        }
        [HttpGet("khachhang/{idKhachHang}")]
        public async Task<IActionResult> GetDonHangsDaMua(Guid idKhachHang)
        {
            if (idKhachHang == Guid.Empty)
            {
                return BadRequest("ID khách hàng không hợp lệ.");
            }

            try
            {
                var donHangs = await _iHoaDonService.GetDonHangsDaMuaAsync(idKhachHang);
                return Ok(donHangs);
            }
            catch (Exception ex)
            {
                // Ghi log lỗi nếu cần thiết
                return StatusCode(500, $"Lỗi máy chủ: {ex.Message}");
            }
        }
        [HttpGet("TimKiem")]
		public List<HoaDon> TimKiemVaLoc(string ten, int? loc)
		{
			return _iHoaDonService.TimKiemVaLocHoaDon(ten, loc);
		}
		[HttpGet("CheckVoucher")]
		public int CheckVoucher(string ten, int tongtien)
		{
			return _iHoaDonService.CheckVoucher(ten, tongtien);
		}
		[HttpGet("LichSuGiaoDich")]
		public List<HoaDon> LichSuGiaoDich(Guid idNguoidung)
		{
			return _iHoaDonService.LichSuGiaoDich(idNguoidung);
		}
		[HttpGet("LichSuGiaoDich/{idhd}")]
		public LichSuTichDiem LichSuGiaoDichByIdHD(Guid idhd)
		{
			return _iHoaDonService.GetLichSuGiaoDichByIdHD(idhd);
		}
		[HttpGet("CheckLSGDHD/{idhd}")]
		public bool CheckLichSuGiaoDichHD(Guid idhd)
		{
			return _iHoaDonService.CheckHDHasLSGD(idhd);
		}
		[HttpGet("CheckCustomerUseVoucher")]
		public bool CheckKHUseVoucher(Guid idkh, Guid idvoucher)
		{
			return _iHoaDonService.CheckCusUseVoucher(idkh, idvoucher);
		}
		[HttpPost]
		public DonMuaSuccessViewModel CreateHoaDon(HoaDonViewModel hoaDon)
		{
			return _iHoaDonService.CreateHoaDon(hoaDon.ChiTietHoaDons, hoaDon);
		}
		[HttpPost("Offline/{idnhanvien}")]
		public bool CreateHoaDonOffline(Guid idnhanvien)
		{
            var to = new CreateHoaDonOfflineDTO();
            to.IdNhanVien= idnhanvien;
			return _iHoaDonService.CreateHoaDonOffline(to);
		}
		[HttpGet("GetAllHDCho")]
		public IActionResult GetAllHDCho()
		{
			var lsthdcho = _iHoaDonService.GetAllHDCho();
			return Ok(lsthdcho);
		}
		[HttpGet("GetHDBanHang/{idhd}")]
		public IActionResult GetHDBanHang(Guid idhd)
		{
			var lsthdcho = _iHoaDonService.GetHDBanHang(idhd);
			return Ok(lsthdcho);
		}
		[HttpGet("GetAllHDQly")]
		public IActionResult GetAllHDQly()
		{
			var hdql = _iHoaDonService.GetAllHDQly();
			return Ok(hdql);
		}
		[HttpGet("ChiTietHoaDonQL/{idhd}")]
		public IActionResult ChiTietHoaDonQL(Guid idhd)
		{
			var result = _iHoaDonService.GetCTHDByID(idhd);
			return Ok(result);
		}
		[HttpGet("loctheotrngthaigiaohang")]
		public IActionResult hoadontrangthai(int trangthai)
		{
            var result = _iHoaDonService.Loctheotrangthai(trangthai);
            return Ok(result);
        }
		[HttpPut]
		public bool UpdateTrangThai(Guid idhoadon, int trangthai, Guid? idnhanvien)
		{
			return _iHoaDonService.UpdateTrangThaiGiaoHang(idhoadon, trangthai, idnhanvien);
		}


        [HttpPut("UpdateHoaDon")]
        public bool UpDateHoaDon(HoaDonThanhToanRequest hoaDon)
        {
            return _iHoaDonService.UpdateHoaDon(hoaDon);
        }
        [HttpPut("HuyHD")]
        public IActionResult HuyHD(Guid idhd, Guid idnv)
        {
            var result = _iHoaDonService.HuyHD(idhd, idnv);
            return Ok(result);
        }
        [HttpPut("GiaoThanhCong")]
        public IActionResult GiaoThanhCong(Guid idhd, Guid idnv)
        {
            var result = _iHoaDonService.ThanhCong(idhd, idnv);
            return Ok(result);
        }
        [HttpPut("HoanHD")]
        public IActionResult HoanHD(Guid idhd, Guid idnv)
        {
            var result = _iHoaDonService.HoanHang(idhd, idnv);
            return Ok(result);
        }
        [HttpPut("HoanTCHD")]
        public IActionResult HoanTCHD(Guid idhd, Guid idnv)
        {
            var result = _iHoaDonService.HoanHangThanhCong(idhd, idnv);
            return Ok(result);
        }
        [HttpPut("CopyHD")]
        public IActionResult TraHD(Guid idhd, Guid idnv)
        {
            var result = _iHoaDonService.CopyHD(idhd, idnv);
            return Ok(result);
        }

        [HttpPut("UpdateGhichu")]
        public bool UpdateGhiChuHD(Guid idhd, Guid idnv,int trangThai, string ghichu)
        {
            return _iHoaDonService.UpdateGhiChuHD(idhd, idnv,trangThai, ghichu);
        }

        [HttpDelete("deleteHoaDon/{id}")]
        public bool Delete(Guid id)
        {
            return _iHoaDonService.DeleteHoaDon(id);
        }


        //[HttpGet("PhuongThucThanhToan")]
        //public List<PhuongThucThanhToan> GetAllPTTT()
        //{
        //    return _iHoaDonService.GetAllPTTT();
        //}
        //[HttpPost("PhuongThucThanhToan")]
        //public bool CreatePTT(PhuongThucThanhToan pttt)
        //{
        //    return _iHoaDonService.CreatePTTT(pttt);
        //}
        //[HttpPut("PhuongThucThanhToan")]
        //public bool UpdatePTT(PhuongThucThanhToan pttt)
        //{
        //    return _iHoaDonService.UpdatePTTT(pttt);
        //}
        //[HttpDelete("PhuongThucThanhToan/{id}")]
        //public bool DeletePTT(Guid id)
        //{
        //    return _iHoaDonService.DeletePTTT(id);
        //}


        #region DarhboardHoaDonKien

        [HttpGet("getdarhboardHoaDon")]
		public async Task<List<DarhboardHoaDonViewModel>> DarhboardHoaDon(int year)
		{
			var ds = await _dbcontext.HoaDons.Where(p => p.NgayTao.Year == year).ToListAsync();

			var results = ds.GroupBy(
		    	p => p.NgayTao.Month,
	            (key, g) => new DarhboardHoaDonViewModel { tenThang = key, tongTien = g.Sum(x => x.TongTien) }).ToList();

			return results;
		}

		[HttpGet("getdarhboardHoaDonbyMonth")]
		public async Task<List<DarhboarhHoaDonTheoMonthViewMoldel>> DarhboardHoaDonbyMonth(int month,int year)
		{
			var ds = await _dbcontext.HoaDons.Where(p => p.NgayTao.Month == month && p.NgayTao.Year == year).ToListAsync();

			//var results = ds.GroupBy(
			//	p => p.LoaiHD,
			//	(key, g) => new DarhboarhHoaDonTheoMonthViewMoldel { loaiHD = key, tongTien = g.Sum(x => x.TongTien) }).ToList();
			List<DarhboarhHoaDonTheoMonthViewMoldel> results = new List<DarhboarhHoaDonTheoMonthViewMoldel>();

			var tongTienLoaiHD0 = ds.Where(p => p.LoaiHD == 0).Sum(x => x.TongTien);
			var tongTienLoaiHD1 = ds.Where(p => p.LoaiHD == 1).Sum(x => x.TongTien);

			var result1 = new DarhboarhHoaDonTheoMonthViewMoldel
			{
				loaiHD = 0,
				tongTien = tongTienLoaiHD0
			};
			results.Add(result1);

			var result2 = new DarhboarhHoaDonTheoMonthViewMoldel
			{
				loaiHD = 1,
				tongTien = tongTienLoaiHD1
			};
			results.Add(result2);

			return results;
		}
		#endregion
		
        
        #region Tung
		[HttpGet("pptt")]
		public IActionResult GetPhuonThucThanhToan()
		{
			var pptt = _dbcontext.phuongThucThanhToans.ToList();
			return Ok(pptt);
		}
        [HttpPost("CreateHoaDonOffline")]
        public bool CreateHoaDonOffline(CreateHoaDonOfflineDTO dto)
        {
            return _iHoaDonService.CreateHoaDonOffline(dto);
        }
        [HttpPost("CreateHoaDonOnline")]
        public bool CreateHoaDonOnline(CreateHoaDonOnlineViewModel chdvm)
        {
            return _iHoaDonService.CreateHoaDonOnline(chdvm);
        }
        [HttpPut("UpdateHoaDonOffline/{hoaDonId}")]
        public bool UpdateHoaDonOffline(Guid hoaDonId, UpdateHoaDonDto dto)
        {
            return _iHoaDonService.UpdateHoaDonOffline(hoaDonId, dto);
        }

        [HttpPost("ThanhToanVNPay/{idHoaDon}")]
        public IActionResult CreatePayment(Guid idHoaDon,[FromQuery] int soDiemSuDung, [FromQuery] bool isGiaoHang)
        {
            try
            {
                var hoaDon = _iHoaDonService.GetHoaDonById(idHoaDon);
                if (hoaDon == null)
                {
                    return NotFound();
                }
                // Sử dụng tiền mặt để thanh toán 
                if (hoaDon.phuongThucTTID == Guid.Parse("f1fb9f0b-5db2-4e04-8ba3-84e96f0d820c")){
                    // Thành công sẽ cập nhật trạng thái hóa đơn
                    if (_iHoaDonService.ThanhToanDonHang(hoaDon.ID, soDiemSuDung, isGiaoHang))
                    {
                        return Ok("Thanh toan thanh cong!");
                    }
                    else return BadRequest();
                    
                }else  // Thanh toán chuyển khoản 
                {
                    var paymentUrl = _iVNPayService.CreatePaymentUrl(idHoaDon, soDiemSuDung, isGiaoHang);
                    if(paymentUrl != null)
                    {
                        return Ok(new { paymentUrl });
                    }
                    else
                    {
                        return BadRequest();
                    }
                }
               
               

            }
            catch (Exception ex)
            {
                return BadRequest(new { message = ex.Message });
            }
        }

        [HttpGet("callback")]
        public IActionResult PaymentCallback()
        {
            var vnpayData = Request.Query;
            var orderId = vnpayData["vnp_OrderInfo"];
            


            var isValidSignature = _iVNPayService.ValidateCallback(vnpayData);

            if (isValidSignature)
            {
                var vnp_ResponseCode = vnpayData["vnp_ResponseCode"];

                var hoaDon = _iHoaDonService.GetHoaDonById(Guid.Parse(orderId));
                if(hoaDon == null)
                {
                    return BadRequest("Hoa don khong ton tai");
                }
                if (vnp_ResponseCode == "00")
                {
                    int soDiemTru = Convert.ToInt32(vnpayData["vnp_SoDiemDung"]);
                    bool isGiaoHang = Convert.ToBoolean(vnpayData["vnp_IsGiaoHang"]);
                    // Thanh toán thành công, cập nhật database hoặc thực hiện các xử lý khác
                    _iHoaDonService.ThanhToanDonHang(hoaDon.ID, soDiemTru, isGiaoHang);

                    //return Ok(new { message = "Thanh toán thành công" });
                    return Redirect("http://localhost:3000/admin");
                }
                else
                {
                    // Thanh toán thất bại

                    return BadRequest(new { message = "Thanh toán thất bại" });
                }


            }

            else
            {   
                return BadRequest(new { message = "Invalid signature" });
            }
        }
        #endregion
    }
}
