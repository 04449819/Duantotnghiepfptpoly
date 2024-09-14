using AppAPI.IServices;
using AppAPI.Services;
using AppData.Models;
using AppData.ViewModels;
using AppData.ViewModels.BanOffline;
using AppData.ViewModels.SanPham;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Infrastructure;
using Microsoft.EntityFrameworkCore;
using Org.BouncyCastle.Crypto;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.WebSockets;
using System.Runtime.CompilerServices;
using System.Runtime.InteropServices;
using static System.Net.Mime.MediaTypeNames;

namespace AppAPI.Controllers
{


	[Route("api/SanPham")]
    [ApiController]
    public class SanPhamController : ControllerBase
    {
        private readonly ISanPhamService _sanPhamServices;
        AssignmentDBContext _dbcontext = new AssignmentDBContext();

        public SanPhamController(AssignmentDBContext dBContext)
        {
            this._sanPhamServices = new SanPhamService(dBContext);
        }
        #region SanPham

        [HttpGet("getAll")]
        public async Task<IActionResult> GetAllSanPham()
        {
            var listSP = await _sanPhamServices.getAll();
            return Ok(listSP);
        }

        [HttpGet("GetAllSanPhamAdmin")]
        public List<SanPhamViewModelAdmin> GetAllSanPhamAdmin()
        {
			var listSP = _sanPhamServices.GetAllSanPhamAdmin();
            return listSP;
        }
     
        [HttpGet("GetSanPhamById")]
        public async Task<IActionResult> GetSanPhamById(Guid id)
        {
            var sanPham = await _sanPhamServices.GetSanPhamById(id);
            if (sanPham == null) return NotFound();
            return Ok(sanPham);
        }
        [HttpPut("UpdateSanPham")]
        public async Task<bool> UpdateSanPham(SanPhamUpdateRequest request)
        {
            return await _sanPhamServices.UpdateSanPham(request);
        }
        [HttpGet("getByIdLsp/{idLsp}")]
        public async Task<IActionResult> GetSanPhamByIdDanhMuc(Guid idLsp)
        {
            var sanPham = await _sanPhamServices.GetSanPhamByIdDanhMuc(idLsp);
            if (sanPham == null) return NotFound();
            return Ok(sanPham);
        }
        [HttpGet("checkTrungTen")]
        public async Task<IActionResult> CheckTrung(SanPhamRequest request)
        {
            var listSP = _sanPhamServices.CheckTrungTenSP(request);
            return Ok(listSP);
        }
        [HttpPost("timKiemNC")]
        public async Task<IActionResult> TimKiemSanPham(SanPhamTimKiemNangCao sp)
        {
            var listSP = await _sanPhamServices.TimKiemSanPham(sp);
            return Ok(listSP);
        }
        [HttpPost("AddSanPham")]
        public async Task<IActionResult> CreateSanPham(SanPhamRequest request)
        {
            if (request == null) return BadRequest();
            var response = await _sanPhamServices.AddSanPham(request);
            return Ok(response);
        }
        [HttpDelete("UpdateTrangThaiSanPham")]
        public async Task<IActionResult> UpdateTrangThaiSanPham(Guid id, int trangThai)
        {
            await _sanPhamServices.UpdateTrangThaiSanPham(id, trangThai);
            return Ok();
        }
        [HttpPost("AddAnh")]
        public async Task<IActionResult> AddAnhToSanPham(List<AnhRequest> request)
        {
            var reponse = await _sanPhamServices.AddAnhToSanPham(request);
            return Ok(reponse);
        }
        [HttpGet("GetAllAnhSanPham")]
        public List<AnhViewModel> GetAllAnhSanPham(Guid idSanPham)
        {
            return _sanPhamServices.GetAllAnhSanPham(idSanPham);
        }

        [HttpPost("AddImageNoColor")]
        public async Task<bool> AddImageNoColor(Anh anh)
        {
            return await _sanPhamServices.AddImageNoColor(anh);
        }
        [HttpPut("UpdateImage")]
        public async Task<bool> UpdateImage(Anh anh)
        {
            return await _sanPhamServices.UpdateImage(anh);
        }
        [HttpDelete("DeleteImage")]
        public async Task<bool> DeleteImage(string id)
        {
            return await _sanPhamServices.DeleteImage(new Guid(id));
        }
        #endregion

        #region ChiTietSanPham
        [HttpGet("GetAllChiTietSanPhamHome")]
        public async Task<IActionResult> GetAllChiTietSanPhamHome(string idSanPham)
        {
            var lstChiTietSanPham = await _sanPhamServices.GetAllChiTietSanPhamHome(new Guid(idSanPham));
            return Ok(lstChiTietSanPham);
        }
        [HttpGet("GetAllChiTietSanPhamAdmin")]
        public async Task<IActionResult> GetAllChiTietSanPham(Guid idSanPham)
        {
            var lstChiTietSanPham = await _sanPhamServices.GetAllChiTietSanPhamAdmin(idSanPham);
            return Ok(lstChiTietSanPham);
        }
        [HttpPost("AddChiTietSanPhamFromSanPham")]
        public async Task<IActionResult> AddChiTietSanPhamFromSanPham(ChiTietSanPhamUpdateRequest request)
        {
            if (request == null) return BadRequest();
            var response = await _sanPhamServices.AddChiTietSanPhamFromSanPham(request);
            return Ok(response);
        }
        [HttpPost("AddChiTietSanPham")]
        public async Task<IActionResult> AddChiTietSanPham(ChiTietSanPhamAddRequest request)
        {
            if (request == null) return BadRequest();
            var response = await _sanPhamServices.AddChiTietSanPham(request);
            return Ok(response);
        }
        [HttpPut("UpdateSoluongChiTietSanPham")]
        public bool UpdateSoluongChiTietSanPham(ChiTietSanPhamRequest request)
        {
            if (request.SoLuong == null) return false;
            else
            {
                var response = _sanPhamServices.UpdateSoluongChiTietSanPham(request.IDChiTietSanPham, request.SoLuong.Value).Result;
                return response;
            }
        }
        [HttpPut("UpdateGiaBanChiTietSanPham")]
        public int UpdateGiaBanChiTietSanPham(ChiTietSanPhamRequest request)
        {
            if (request.GiaBan == null) return -1;
            else
            {
                var response = _sanPhamServices.UpdateGiaBanChiTietSanPham(request.IDChiTietSanPham, request.GiaBan.Value).Result;
                return response;
            }
        }
        [HttpGet("UpdateTrangThaiChiTietSanPham")]
        public bool UpdateTrangThaiChiTietSanPham(string id)
        {
            var response = _sanPhamServices.UpdateTrangThaiChiTietSanPham(new Guid(id)).Result;
            return response;
        }
        [HttpGet("GetAllChiTietSanPham")]
        public async Task<IActionResult> GetAllChiTietSanPham()
        {
            var sanPham = await _sanPhamServices.GetAllChiTietSanPham();
            return Ok(sanPham);
        }
        [HttpGet("GetIDsanPhamByIdCTSP")]
        public Guid GetIDsanPhamByIdCTSP(Guid idctsp)
        {
            return _sanPhamServices.GetIDsanPhamByIdCTSP(idctsp);
        }
        [HttpGet("DeleteChiTietSanPham")]
        public bool DeleteChiTietSanPham(Guid id)
        {
            return _sanPhamServices.DeleteChiTietSanPham(id).Result;
        }
        [HttpGet("UndoChiTietSanPham")]
        public bool UndoChiTietSanPham(Guid id)
        {
            return _sanPhamServices.UndoChiTietSanPham(id).Result;
        }
        #endregion

        #region LoaiSP
        [HttpGet("GetAllLoaiSPCha")]
        public async Task<IActionResult> GetAllLoaiSPCha()
        {
            var listLsp = await _sanPhamServices.GetAllLoaiSPCha();
            return Ok(listLsp);
        }
        [HttpGet("GetAllLoaiSPCon")]
        public async Task<IActionResult> GetAllLoaiSPCon(string tenLoaiSPCha)
        {
            var listLsp = await _sanPhamServices.GetAllLoaiSPCon(tenLoaiSPCha);
            return Ok(listLsp);
        }
        #endregion

        #region Other
        [HttpGet("GetAllMauSac")]
        public async Task<IActionResult> GetAllMauSac()
        {
            var lstMauSac = await _sanPhamServices.GetAllMauSac();
            return Ok(lstMauSac);
        }
        [HttpGet("GetAllKichCo")]
        public async Task<IActionResult> GetAllKichCo()
        {
            var lstKichCo = await _sanPhamServices.GetAllKichCo();
            return Ok(lstKichCo);
        }
        [HttpGet("GetAllChatLieu")]
        public async Task<IActionResult> GetAllChatLieu()
        {
            var lstChatLieu = await _sanPhamServices.GetAllChatLieu();
            return Ok(lstChatLieu);
        }
        #endregion

        #region SanPhamBanHang

        [HttpGet("getAllSPTrangChu")]
        public async Task<IActionResult> GetAllSanPhamTrangChu()
        {
            var listSP = await _sanPhamServices.GetAllSanPhamTrangChu();
            return Ok(listSP);
        }
        [HttpGet("getChiTietSPBHById/{idsp}")]
        public async Task<IActionResult> GetChiTietSPBHById(Guid idsp)
        {
            var listSP = await _sanPhamServices.GetChiTietSPBHById(idsp);
            return Ok(listSP);
        }
        [HttpGet("getChiTietCTSPBHById/{idsp}")]
        public async Task<IActionResult> GetChiTietCTSPBHById(Guid idsp)
        {
            var listCTSP = await _sanPhamServices.GetChiTietCTSPBanHang(idsp);
            return Ok(listCTSP);
        }
        #endregion
        [HttpGet("getAllSPhaon")]
        public async Task<IActionResult> GetSanPhamDetailsAsync(Guid hoaDonId)
        {
            // Lấy thông tin từ bảng ChiTietHoaDons dựa trên HoaDonID
            var sanPhamDetails = await _dbcontext.ChiTietHoaDons
                .Where(cthd => cthd.HoaDon.ID == hoaDonId) // Lọc theo HoaDonID
                .Select(cthd => new
                {
                    ID = cthd.ID,
                    SanPhamId = cthd.ChiTietSanPham.IDSanPham,
                    TenSanPham = cthd.ChiTietSanPham.SanPham.Ten,
                    AnhSanPham = _dbcontext.Anhs
                        .Where(a => a.IDChitietsanpham == cthd.ChiTietSanPham.ID)
                        .Select(a => a.DuongDan)
                        .FirstOrDefault(),
                    MauSac = cthd.ChiTietSanPham.MauSac.Ten,
                    KichCo = cthd.ChiTietSanPham.KichCo.Ten,
                    DonGia = cthd.DonGia,
                    SoLuongHoan = _dbcontext.hoanhangsanphams
                        .Where(hhsp => hhsp.ChiTietHoaDon.ID == cthd.ID && hhsp.TrangThaiHoanHang == 1 ) // Lọc theo trạng thái hoàn hàng
                        .Sum(hhsp => hhsp.SoLuong),
                    // Lấy địa chỉ khách hàng từ bảng hoàn sản phẩm
                    DiaChiKhachHang = _dbcontext.hoanhangsanphams
                        .Where(hhsp => hhsp.ChiTietHoaDon.ID == cthd.ID && hhsp.TrangThaiHoanHang == 1) // Lọc theo trạng thái hoàn hàng
                        .Select(hhsp => hhsp.Diachikhachhang)
                        .FirstOrDefault()
                })
                .Where(pd => pd.SoLuongHoan > 0) // Lọc để chỉ lấy những sản phẩm có số lượng hoàn hàng lớn hơn 0
                .ToListAsync(); // Sử dụng ToListAsync để lấy danh sách các chi tiết sản phẩm

            if (sanPhamDetails == null || !sanPhamDetails.Any())
            {
                return NotFound("Không tìm thấy chi tiết sản phẩm cho hóa đơn này.");
            }

            return Ok(sanPhamDetails);
        }


        [HttpGet("getAllchitiethoan")]
        public async Task<IActionResult> GetSanPhamDetailsAsyncs(Guid hoaDonId)
        {
            // Lấy thông tin từ bảng ChiTietHoaDons dựa trên HoaDonID
            var sanPhamDetails = await _dbcontext.ChiTietHoaDons
                .Where(cthd => cthd.HoaDon.ID == hoaDonId) // Lọc theo HoaDonID
                .Select(cthd => new
                {
                    ID = cthd.ID,
                    SanPhamId = cthd.ChiTietSanPham.IDSanPham,
                    TenSanPham = cthd.ChiTietSanPham.SanPham.Ten,
                    AnhSanPham = _dbcontext.Anhs
                        .Where(a => a.IDChitietsanpham == cthd.ChiTietSanPham.ID)
                        .Select(a => a.DuongDan)
                        .FirstOrDefault(),
                    MauSac = cthd.ChiTietSanPham.MauSac.Ten,
                    KichCo = cthd.ChiTietSanPham.KichCo.Ten,
                    DonGia = cthd.DonGia,
                    SoLuongHoan = _dbcontext.hoanhangsanphams
                        .Where(hhsp => hhsp.ChiTietHoaDon.ID == cthd.ID) // Lọc theo trạng thái hoàn hàng
                        .Sum(hhsp => hhsp.SoLuong),
                    // Lấy địa chỉ khách hàng từ bảng hoàn sản phẩm
                    DiaChiKhachHang = _dbcontext.hoanhangsanphams
                        .Where(hhsp => hhsp.ChiTietHoaDon.ID == cthd.ID) // Lọc theo trạng thái hoàn hàng
                        .Select(hhsp => hhsp.Diachikhachhang)
                        .FirstOrDefault()
                })
                .Where(pd => pd.SoLuongHoan > 0) // Lọc để chỉ lấy những sản phẩm có số lượng hoàn hàng lớn hơn 0
                .ToListAsync(); // Sử dụng ToListAsync để lấy danh sách các chi tiết sản phẩm

            if (sanPhamDetails == null || !sanPhamDetails.Any())
            {
                return NotFound("Không tìm thấy chi tiết sản phẩm cho hóa đơn này.");
            }

            return Ok(sanPhamDetails);
        }




        #region LoaiSanPhamBanHangOflineKien
        [HttpGet("getAllThongTinSPBanHang")]
		public async Task<IActionResult> GetAllThongTinSanPham()
		{
			var loaiSPs = await _dbcontext.LoaiSPs.Where(p=> p.TrangThai != 0).ToListAsync();
			var chatLieus = await _dbcontext.ChatLieus.Where(p => p.TrangThai != 0).ToListAsync();
            var coAos = await _dbcontext.CoAos.Where(p => p.trangThai != 0).ToListAsync(); 
            var thongTinSP = new ThongTinSanPham() 
            {
                loaiSPs = loaiSPs,
                chatLieus = chatLieus,
                coAos = coAos,
            };

            return Ok(thongTinSP);
		}
        #endregion
        [HttpGet("getAllSPBanHa222ng")]
        public async Task<IActionResult> GetSanPhamByHoaDonId(Guid hoaDonId)
        {
            // Lấy thông tin hóa đơn với các chi tiết sản phẩm liên quan
            var hoaDon = await _dbcontext.HoaDons
                .Where(hd => hd.ID == hoaDonId)
                .Select(hd => new
                {
                    hd.ID,
                    hd.MaHD,
                    hd.NgayTao,
                    hd.NgayThanhToan,
                    hd.NgayNhanHang,
                    hd.TenNguoiNhan,
                    hd.SDT,
                    hd.Email,
                    hd.DiaChi,
                    TongTien = hd.ChiTietHoaDons.Sum(cthd => cthd.DonGia * cthd.SoLuong),
                    hd.TienShip,
                    hd.GhiChu,
                    hd.TrangThaiGiaoHang,
                    SanPhamDetails = hd.ChiTietHoaDons.Select(cthd => new
                    {
                        cthd.ID,
                        SanPhamId = cthd.ChiTietSanPham.IDSanPham,
                        TenSanPham = cthd.ChiTietSanPham.SanPham.Ten,
                        AnhSanPham = _dbcontext.Anhs
                            .Where(a => a.IDChitietsanpham == cthd.ChiTietSanPham.ID)
                            .Select(a => a.DuongDan)
                            .FirstOrDefault(),
                        MauSac = cthd.ChiTietSanPham.MauSac.Ten,
                        KichCo = cthd.ChiTietSanPham.KichCo.Ten,
                        DonGia = cthd.DonGia,
                        SoLuong = cthd.SoLuong,
                        // Thêm thông tin về hoàn hàng nếu có
                        Hoanhangsanpham = _dbcontext.hoanhangsanphams
                            .Where(hhsp => hhsp.ChiTietHoaDon.ID == cthd.ID)
                            .Select(hhsp => new
                            {
                                hhsp.ID,
                                hhsp.SoLuong,
                                hhsp.Diachikhachhang,
                                hhsp.Ngayhoanhang,
                                hhsp.Mota,
                                TrangThaiHoanHang = hhsp.TrangThaiHoanHang
                            })
                            .FirstOrDefault()
                    })
                })
                .FirstOrDefaultAsync();

            if (hoaDon == null)
            {
                return NotFound("Hóa đơn không tồn tại.");
            }

            return Ok(hoaDon);
        }



        #region SanPhamBanHangOflineKien
        [HttpGet("getAllSPBanHang")]
			public async Task<IActionResult> GetAllSanPhamBanHang(int currentPage, int productsPerPage)
			{
				int totalProducts = await _dbcontext.SanPhams.CountAsync();
				int totalPages = (int)Math.Ceiling((double)totalProducts / productsPerPage);

				var pagedProducts = await _dbcontext.SanPhams.Where(p => p.TrangThai != 0)
					.Skip((currentPage - 1) * productsPerPage)
					.Take(productsPerPage)
					.Select( a => new Sanphamptview
					{
						ID = a.ID,
						Ten = a.Ten,
						Ma = a.Ma,
						MoTa = a.MoTa,
						TrangThai = a.TrangThai,
						giaBan = _dbcontext.ChiTietSanPhams
								   .Where(p => p.IDSanPham == a.ID)
								   .Select(p => p.GiaBan)
								   .FirstOrDefault(),
						IDLoaiSP = a.IDLoaiSP,
						IDChatLieu = a.IDChatLieu,
						IDCoAo = a.idCoAo,
						anhs = _dbcontext.ChiTietSanPhams
								  .Where(p => p.IDSanPham == a.ID)
								  .Join(_dbcontext.Anhs, b => b.ID, c => c.IDChitietsanpham, (b, c) => new Anh
								  {
									  ID = c.ID,
									  DuongDan = c.DuongDan,
									  TrangThai = c.TrangThai,
									  IDChitietsanpham = c.IDChitietsanpham,
								  }).ToList(),
						chatLieu =  _dbcontext.ChatLieus.Where(p => p.ID == a.IDChatLieu).Select(p => p.Ten).FirstOrDefault(),
						loaiSanPham = _dbcontext.LoaiSPs.Where(p => p.ID == a.IDLoaiSP).Select(p => p.Ten).FirstOrDefault(),
						coAo = _dbcontext.CoAos.Where(p => p.Id == a.idCoAo).Select(p => p.ten).FirstOrDefault(),
					})
					.OrderByDescending(p => p.TrangThai).ToListAsync();

			// Prepare the paginated result
			var sanPhamPhangTrang = new PhanTrangSanPham
			{
				sanPham = pagedProducts,
				SoTrang = totalPages
			};

			return Ok(sanPhamPhangTrang);
		}

		[HttpGet("getAllQLSP")]
		public async Task<IActionResult> GetAllQLSanPham(int currentPage, int productsPerPage)
		{
			int totalProducts = await _dbcontext.SanPhams.CountAsync();
			int totalPages = (int)Math.Ceiling((double)totalProducts / productsPerPage);

			var pagedProducts = await _dbcontext.SanPhams
				.Skip((currentPage - 1) * productsPerPage)
				.Take(productsPerPage)
				.Select(a => new Sanphamptview
				{
					ID = a.ID,
					Ten = a.Ten,
					Ma = a.Ma,
					MoTa = a.MoTa,
					TrangThai = a.TrangThai,
					giaBan = _dbcontext.ChiTietSanPhams
							   .Where(p => p.IDSanPham == a.ID)
							   .Select(p => p.GiaBan)
							   .FirstOrDefault(),
					IDLoaiSP = a.IDLoaiSP,
					IDChatLieu = a.IDChatLieu,
					IDCoAo = a.idCoAo,
					anhs = _dbcontext.ChiTietSanPhams
							  .Where(p => p.IDSanPham == a.ID)
							  .Join(_dbcontext.Anhs, b => b.ID, c => c.IDChitietsanpham, (b, c) => new Anh
							  {
								  ID = c.ID,
								  DuongDan = c.DuongDan,
								  TrangThai = c.TrangThai,
								  IDChitietsanpham = c.IDChitietsanpham,
							  }).ToList(),
					chatLieu = _dbcontext.ChatLieus.Where(p => p.ID == a.IDChatLieu).Select(p => p.Ten).FirstOrDefault(),
					loaiSanPham = _dbcontext.LoaiSPs.Where(p => p.ID == a.IDLoaiSP).Select(p => p.Ten).FirstOrDefault(),
					coAo = _dbcontext.CoAos.Where(p => p.Id == a.idCoAo).Select(p => p.ten).FirstOrDefault(),
				})
				.OrderByDescending(p => p.TrangThai).ToListAsync();

			// Prepare the paginated result
			var sanPhamPhangTrang = new PhanTrangSanPham
			{
				sanPham = pagedProducts,
				SoTrang = totalPages
			};

			return Ok(sanPhamPhangTrang);
		}

		[HttpGet("getSPBanHangbyName")]
		public async Task<IActionResult> GetSanPhamBanHangByName(string TenSanPham, int currentPage, int productsPerPage)
		{

			var query = _dbcontext.SanPhams
						.Where(p => p.Ten.ToLower().Trim().Contains( TenSanPham.ToLower().Trim()) && p.TrangThai != 0);


			int totalProducts = await query.CountAsync();
			if (totalProducts == 0)
			{
				return Ok("Không tìm thấy sản phẩm");
			}

	
			int totalPages = (int)Math.Ceiling((double)totalProducts / productsPerPage);


			var dssp = await query
						.Skip((currentPage - 1) * productsPerPage)
						.Take(productsPerPage)
						.Select(a => new Sanphamptview
						{
							ID = a.ID,
							Ten = a.Ten,
							Ma = a.Ma,
							MoTa = a.MoTa,
							TrangThai = a.TrangThai,
							giaBan = _dbcontext.ChiTietSanPhams
									  .Where(p => p.IDSanPham == a.ID)
									  .Select(p => p.GiaBan)
									  .FirstOrDefault(),
							IDLoaiSP = a.IDLoaiSP,
							IDChatLieu = a.IDChatLieu,
							anhs = _dbcontext.ChiTietSanPhams
									.Where(p => p.IDSanPham == a.ID)
									.Join(_dbcontext.Anhs,
										  b => b.ID,
										  c => c.IDChitietsanpham,
										  (b, c) => new Anh
										  {
											  ID = c.ID,
											  DuongDan = c.DuongDan,
											  TrangThai = c.TrangThai,
											  IDChitietsanpham = c.IDChitietsanpham
										  })
									.ToList(),
							chatLieu = _dbcontext.ChatLieus.Where(p => p.ID == a.IDChatLieu).Select(p => p.Ten).FirstOrDefault(),
							loaiSanPham = _dbcontext.LoaiSPs.Where(p => p.ID == a.IDLoaiSP).Select(p => p.Ten).FirstOrDefault(),
							coAo = _dbcontext.CoAos.Where(p => p.Id == a.idCoAo).Select(p => p.ten).FirstOrDefault(),
							IDCoAo = a.idCoAo,
						})
						.ToListAsync();

			var sanPhamPhangTrang = new PhanTrangSanPham
			{
				sanPham = dssp,
				SoTrang = totalPages
			};

			return Ok(sanPhamPhangTrang);
		}

		[HttpGet("getSPBanHangbyLoaisp")]
        public async Task<IActionResult> GetSanPhamBanHangByLoai(Guid idloaiSP, Guid idchatLieu,Guid idcoAo, decimal giaMin, decimal giaMax, int currentPage, int productsPerPage)
        {

            var query1 = _dbcontext.SanPhams
                      .Where(p => (idloaiSP.ToString() == "00000000-0000-0000-0000-000000000000" || p.IDLoaiSP == idloaiSP) &&
                                  (idchatLieu.ToString() == "00000000-0000-0000-0000-000000000000" || p.IDChatLieu == idchatLieu) && (idcoAo.ToString() == "00000000-0000-0000-0000-000000000000" || p.idCoAo == idcoAo) && ((giaMin == 0 && giaMax == 0) || _dbcontext.ChiTietSanPhams.FirstOrDefault(a => a.IDSanPham == p.ID).GiaBan >= Math.Min( giaMin,giaMax) && _dbcontext.ChiTietSanPhams.FirstOrDefault(a => a.IDSanPham == p.ID).GiaBan <= Math.Max(giaMin, giaMax)));

            var query = query1.Where(p => p.TrangThai != 0);


			int totalProducts = await query.CountAsync();

            if (totalProducts == 0)
            {
                return Ok("Không tìm thấy sản phẩm");
            }

            int totalPages = (int)Math.Ceiling((double)totalProducts / productsPerPage);


            var dssp = await query
                        .Skip((currentPage - 1) * productsPerPage)
                        .Take(productsPerPage)
                        .Select(a => new Sanphamptview
                        {
                            ID = a.ID,
                            Ten = a.Ten,
                            Ma = a.Ma,
                            MoTa = a.MoTa,
                            TrangThai = a.TrangThai,
                            giaBan = _dbcontext.ChiTietSanPhams
                                      .Where(p => p.IDSanPham == a.ID)
                                      .Select(p => p.GiaBan)
                                      .FirstOrDefault(),
                            IDLoaiSP = a.IDLoaiSP,
                            IDChatLieu = a.IDChatLieu,
                            anhs = _dbcontext.ChiTietSanPhams
                                    .Where(p => p.IDSanPham == a.ID)
                                    .Join(_dbcontext.Anhs,
                                          b => b.ID,
                                          c => c.IDChitietsanpham,
                                          (b, c) => new Anh
                                          {
                                              ID = c.ID,
                                              DuongDan = c.DuongDan,
                                              TrangThai = c.TrangThai,
                                              IDChitietsanpham = c.IDChitietsanpham
                                          })
                                    .ToList()
                        })
                        .ToListAsync();

            var sanPhamPhangTrang = new PhanTrangSanPham
            {
                sanPham = dssp,
                SoTrang = totalPages
            };

            return Ok(sanPhamPhangTrang);
        }


		[HttpGet("getSPBanHangbyLocQLSP")]
		public async Task<IActionResult> GetSanPhamBanHangByLocQLSP(Guid idloaiSP, Guid idchatLieu, Guid idcoAo, decimal giaMin, decimal giaMax, int? trangthai, int currentPage, int productsPerPage)
		{
			var result1 = await _dbcontext.ChiTietSanPhams
				.GroupBy(ctsp => ctsp.IDSanPham)
				.Select(group => new
				{
					IDSanPham = group.Key,
					TongSoLuong = group.Sum(x => x.SoLuong)
				})
				.ToListAsync();

			var result = (from a in result1
						  join b in _dbcontext.SanPhams on a.IDSanPham equals b.ID
						  select new
						  {
							  sp = b,
							  soluong = a.TongSoLuong
						  }).ToList();

			var query = result
				.Where(p =>
					(idloaiSP == Guid.Empty || p.sp.IDLoaiSP == idloaiSP) &&
					(idchatLieu == Guid.Empty || p.sp.IDChatLieu == idchatLieu) &&
					(idcoAo == Guid.Empty || p.sp.idCoAo == idcoAo) &&
					(trangthai == null || p.sp.TrangThai == trangthai) &&
					(giaMin == 0 && giaMax == 10000 || p.soluong >= Math.Min(giaMin, giaMax) && p.soluong <= Math.Max(giaMin, giaMax)))
				.ToList();

			int totalProducts = query.Count();

			if (totalProducts == 0)
			{
				return Ok("Không tìm thấy sản phẩm");
			}

			int totalPages = (int)Math.Ceiling((double)totalProducts / productsPerPage);

			var dssp = query
				.Skip((currentPage - 1) * productsPerPage)
				.Take(productsPerPage)
				.Select(a => new Sanphamptview
				{
					ID = a.sp.ID,
					Ten = a.sp.Ten,
					Ma = a.sp.Ma,
					MoTa = a.sp.MoTa,
					TrangThai = a.sp.TrangThai,
					giaBan = _dbcontext.ChiTietSanPhams
						.Where(p => p.IDSanPham == a.sp.ID)
						.Select(p => p.GiaBan)
						.FirstOrDefault(),
					IDLoaiSP = a.sp.IDLoaiSP,
					IDChatLieu = a.sp.IDChatLieu,
					anhs = _dbcontext.ChiTietSanPhams
						.Where(p => p.IDSanPham == a.sp.ID)
						.Join(_dbcontext.Anhs,
							  b => b.ID,
							  c => c.IDChitietsanpham,
							  (b, c) => new Anh
							  {
								  ID = c.ID,
								  DuongDan = c.DuongDan,
								  TrangThai = c.TrangThai,
								  IDChitietsanpham = c.IDChitietsanpham
							  })
						.ToList(),
					chatLieu = _dbcontext.ChatLieus.Where(p => p.ID == a.sp.IDChatLieu).Select(p => p.Ten).FirstOrDefault(),
					loaiSanPham = _dbcontext.LoaiSPs.Where(p => p.ID == a.sp.IDLoaiSP).Select(p => p.Ten).FirstOrDefault(),
					coAo = _dbcontext.CoAos.Where(p => p.Id == a.sp.idCoAo).Select(p => p.ten).FirstOrDefault(),
				}).OrderByDescending(p => p.TrangThai)
				.ToList();

			var sanPhamPhangTrang = new PhanTrangSanPham
			{
				sanPham = dssp,
				SoTrang = totalPages
			};

			return Ok(sanPhamPhangTrang);
		}

		[HttpGet("getSanPhamBanChay")]
		public async Task<IActionResult> GetSanPhamBanChay()
		{
			var dssp = await _dbcontext.SanPhams.Take(7).ToListAsync();
			return Ok(dssp);
		}

		//[HttpGet("getSanPhamLoaiSP")]
		//public async Task<IActionResult> GetSanbyLoaiSanPhamBan()
		//{
		//	var dslsp = await (from a in _dbcontext.sa)

		//	return Ok(dslsp);
		//}

		#endregion
		#region ChitietSanPhamBanHangOflineKien

        [HttpGet("getChiTietSPBanHangbyIDsp")]
        public async Task<IActionResult> GetChiTietSanPhamByIDSP(Guid idsp)
        {
            var idchatlieu = await _dbcontext.SanPhams.Where(a => a.ID == idsp).Select(b => b.IDChatLieu).FirstOrDefaultAsync();
            var Tenchatlieu = await _dbcontext.ChatLieus
                .Where(c => c.ID == idchatlieu).Select(p => p.Ten).FirstOrDefaultAsync();
			var idcoao = await _dbcontext.SanPhams.Where(a => a.ID == idsp).Select(b => b.idCoAo).FirstOrDefaultAsync();
            var tenCoAo = await _dbcontext.CoAos.Where(p => p.Id == idcoao).Select(p => p.ten).FirstOrDefaultAsync();

			var DSCTSP = await _dbcontext.ChiTietSanPhams
                .Where(x => x.IDSanPham == idsp).ToListAsync();

            var dsctspview = (from a in DSCTSP.Where(p => p.TrangThai != 0)
                              select new
                              {
                                  id = a.ID,
                                  idsp = a.IDSanPham,
                                  tenchatlieu = Tenchatlieu,
								  tencoao = tenCoAo,
								  mactsp = a.Ma,
								  GiaBan = a.GiaBan,
                                  SoLuong = a.SoLuong,
								  //khuyenMai = _dbcontext.KhuyenMais.Where(b => b.ID == a.IDKhuyenMai).Select(b=>b.GiaTri).FirstOrDefault(),
								  khuyenMai = (from b in _dbcontext.KhuyenMaiCTSanPhams
											   join km in _dbcontext.KhuyenMais
											   on b.IdKhuyenMai equals km.ID
											   where b.IdChiTietSanPham == a.ID
													 && km.TrangThai == 1
													 && km.NgayApDung < DateTime.Today
													 && DateTime.Today < km.NgayKetThuc
											   select km.GiaTri).FirstOrDefault(),
								  MauSac = _dbcontext.MauSacs.Where(b => b.ID == a.IDMauSac && b.TrangThai == 1).Select(b => b.Ma).FirstOrDefault(),
                                  kichco = _dbcontext.KichCos.Where(b => b.ID == a.IDKichCo && b.TrangThai == 1).Select(b => b.Ten).FirstOrDefault(),
                                  img = _dbcontext.Anhs.Where(b => b.IDChitietsanpham == a.ID && b.TrangThai == 1).Select(b => b.DuongDan),
                                  trangthai = a.TrangThai,
                              }).ToList();
            return Ok( dsctspview);
		}


		[HttpGet("getChiTietSPBanHangbyIDsp1")]
		public async Task<IActionResult> GetChiTietSanPhamByIDSP1(Guid idsp)
		{
			var idchatlieu = await _dbcontext.SanPhams.Where(a => a.ID == idsp).Select(b => b.IDChatLieu).FirstOrDefaultAsync();
			var Tenchatlieu = await _dbcontext.ChatLieus
				.Where(c => c.ID == idchatlieu).Select(p => p.Ten).FirstOrDefaultAsync();
			var idcoao = await _dbcontext.SanPhams.Where(a => a.ID == idsp).Select(b => b.idCoAo).FirstOrDefaultAsync();
			var tenCoAo = await _dbcontext.CoAos.Where(p => p.Id == idcoao).Select(p => p.ten).FirstOrDefaultAsync();

			var DSCTSP = await _dbcontext.ChiTietSanPhams
				.Where(x => x.IDSanPham == idsp).ToListAsync();

			var dsctspview = (from a in DSCTSP
							  select new
							  {
								  id = a.ID,
								  idsp = a.IDSanPham,
								  tenchatlieu = Tenchatlieu,
								  tencoao = tenCoAo,
								  mactsp = a.Ma,
								  GiaBan = a.GiaBan,
								  SoLuong = a.SoLuong,
								  //khuyenMai = _dbcontext.KhuyenMais.Where(b => b.ID == a.IDKhuyenMai).Select(b=>b.GiaTri).FirstOrDefault(),
								  khuyenMai = (from b in _dbcontext.KhuyenMaiCTSanPhams
											   join km in _dbcontext.KhuyenMais
											   on b.IdKhuyenMai equals km.ID
											   where b.IdChiTietSanPham == a.ID
													 && km.TrangThai == 1
													 && km.NgayApDung < DateTime.Today
													 && DateTime.Today < km.NgayKetThuc
											   select km.GiaTri).FirstOrDefault(),
								  MauSac = _dbcontext.MauSacs.Where(b => b.ID == a.IDMauSac && b.TrangThai == 1).Select(b => b.Ma).FirstOrDefault(),
								  kichco = _dbcontext.KichCos.Where(b => b.ID == a.IDKichCo && b.TrangThai == 1).Select(b => b.Ten).FirstOrDefault(),
								  img = _dbcontext.Anhs.Where(b => b.IDChitietsanpham == a.ID && b.TrangThai == 1).Select(b => b.DuongDan),
								  trangthai = a.TrangThai,
							  }).ToList();
			return Ok(dsctspview);
		}
		[HttpGet("GetChiTietSanPhamByIDKM")]
		public async Task<IActionResult> GetChiTietSanPhamByIDKM(Guid id)
		{
			//var idchatlieu = await _dbcontext.SanPhams.Where(a => a.ID == idsp).Select(b => b.IDChatLieu).FirstOrDefaultAsync();
			//var Tenchatlieu = await _dbcontext.ChatLieus
			//	.Where(c => c.ID == idchatlieu).Select(p => p.Ten).FirstOrDefaultAsync();

			//var DSCTSP = await _dbcontext.ChiTietSanPhams
			//	.Where(x => x.IDKhuyenMai == id).ToListAsync();
			var DSCTSP = await (from a in _dbcontext.KhuyenMaiCTSanPhams.Where(p => p.IdKhuyenMai == id)

								join b in _dbcontext.ChiTietSanPhams on a.IdChiTietSanPham equals b.ID
                                select b)
			.Where(p => p.TrangThai != 0).ToListAsync();

			

			var dsctspview = (from a in DSCTSP
							  select new
							  {
								  id = a.ID,
								  idsp = a.IDSanPham,
								  tenSanPham = _dbcontext.SanPhams.FirstOrDefault(d => d.ID == a.IDSanPham).Ten,
								  tenchatlieu = _dbcontext.ChatLieus.FirstOrDefault(p => p.ID == _dbcontext.SanPhams.FirstOrDefault(b => b.ID == a.IDSanPham).IDChatLieu).Ten,
								  GiaBan = a.GiaBan,
								  SoLuong = a.SoLuong,
								  //khuyenMai = _dbcontext.KhuyenMais.Where(b => b.ID == a.IDKhuyenMai && b.TrangThai == 1).Select(b => b.GiaTri).FirstOrDefault(),
								  khuyenMai = (from b in _dbcontext.KhuyenMaiCTSanPhams
														   join km in _dbcontext.KhuyenMais
														   on b.IdKhuyenMai equals km.ID
														   where b.IdChiTietSanPham == a.ID
																 && km.TrangThai == 1
																 && km.NgayApDung < DateTime.Today
																 && DateTime.Today < km.NgayKetThuc
														   select km.GiaTri).FirstOrDefault(),
								  MauSac = _dbcontext.MauSacs.Where(b => b.ID == a.IDMauSac && b.TrangThai == 1).Select(b => b.Ma).FirstOrDefault(),
								  kichco = _dbcontext.KichCos.Where(b => b.ID == a.IDKichCo && b.TrangThai == 1).Select(b => b.Ten).FirstOrDefault(),
								  img = _dbcontext.Anhs.Where(b => b.IDChitietsanpham == a.ID && b.TrangThai == 1).Select(b => b.DuongDan),
								  trangthai = true
							  }).ToList();
			return Ok(dsctspview);
		}
		#endregion
		#region add san pham 
		[HttpPost("images")]
		public async Task<IActionResult> UploadImages([FromForm] List<IFormFile> images)
		{
			if (images == null || images.Count == 0)
				return BadRequest("bạn chưa chọn ảnh để upload.");

			var paths = new List<string>();
			foreach (var image in images)
			{
				if (image.Length == 0)
					continue;

				var path = Path.Combine(Directory.GetCurrentDirectory(), "wwwroot/images", image.FileName);

				using (var stream = new FileStream(path, FileMode.Create))
				{
					await image.CopyToAsync(stream);
				}

				paths.Add($"/images/{image.FileName}");
			}

			return Ok("thêm thành công !");
		}

		[HttpPost("addSanPhamQLSP")]
		public async Task<IActionResult> AddSanPhamQLSP([FromBody] ADDSanPhamViewModel DataThem)
		{
			if (DataThem == null)
			{
				return BadRequest("Dữ liệu không hợp lệ");
			}

			var sp = await _dbcontext.SanPhams.FirstOrDefaultAsync(p => p.Ten.ToLower().Trim() == DataThem.tenSanpham.ToLower().Trim() || p.Ma == DataThem.ma);
            if (sp != null) return BadRequest("Tên hoặc mã sản phẩm đã tồn tại");
            var checkctsp = true;
			foreach (var item in DataThem.listctsp)
			{
				var ctspcheck = await _dbcontext.ChiTietSanPhams.FirstOrDefaultAsync(p => p.Ma == item.ma);
                if (ctspcheck != null) return BadRequest("Tên hoặc mã sản phẩm đã tồn tại");
			}
			//if(checkctsp == false) return BadRequest("Tên hoặc mã sản phẩm đã tồn tại");
			using (var transaction = await _dbcontext.Database.BeginTransactionAsync())
			{
				try
				{
					var sanpham = new SanPham
					{
						ID = Guid.NewGuid(),
						Ten = DataThem.tenSanpham.ToUpper(),
						Ma = DataThem.ma.ToUpper(),
						MoTa = DataThem.mota,
						TrangThai = 2,
						IDLoaiSP = DataThem.idloaisp,
						IDChatLieu = DataThem.idchatlieu,
						idCoAo = DataThem.idCoAo
					};

					foreach (var item in DataThem.listctsp)
					{
						var ctsp = new ChiTietSanPham
						{
							ID = Guid.NewGuid(),
							Ma = item.ma.ToUpper(),
							SoLuong = item.soluong,
							GiaBan = item.giaban,
							NgayTao = DateTime.Now,
							TrangThai = 2,
							IDSanPham = sanpham.ID,
							IDMauSac = item.idmausac,
							IDKichCo = item.idkichthuoc
						};

						foreach (var a in item.img)
						{
							var anh = new Anh
							{
								ID = Guid.NewGuid(),
								DuongDan = a.DuongDan,
								TrangThai = 1,
								IDChitietsanpham = ctsp.ID
							};
							await _dbcontext.Anhs.AddAsync(anh);
						}

						await _dbcontext.ChiTietSanPhams.AddAsync(ctsp);
					}

					await _dbcontext.SanPhams.AddAsync(sanpham);
					await _dbcontext.SaveChangesAsync();

					await transaction.CommitAsync();

					return Ok("Sản phẩm đã được thêm thành công");
				}
				catch (Exception ex)
				{
					await transaction.RollbackAsync();
					return StatusCode(500, $"Lỗi trong quá trình thêm sản phẩm: {ex.Message}");
				}
			}
		}


		[HttpPost("AddChitietSanPhamQLSP")]
		public async Task<IActionResult> AddChitietSanPhamQLSP([FromBody] List<Addctspviewmodel> DataThem)
		{
			foreach (var item in DataThem)
			{
				var ctspcheck = await _dbcontext.ChiTietSanPhams.FirstOrDefaultAsync(p => p.Ma == item.ma);
				if (ctspcheck != null) return BadRequest("Tên hoặc mã sản phẩm đã tồn tại");
			}

			using (var transaction = await _dbcontext.Database.BeginTransactionAsync())
			{
				try
				{


					foreach (var item in DataThem)
					{
						var ctsp = new ChiTietSanPham
						{
							ID = Guid.NewGuid(),
							Ma = item.ma.ToUpper(),
							SoLuong = item.soluong,
							GiaBan = item.giaban,
							NgayTao = DateTime.Now,
							TrangThai = 2,
							IDSanPham = DataThem[0].Idsp,
							IDMauSac = item.idmausac,
							IDKichCo = item.idkichthuoc
						};

						foreach (var a in item.img)
						{
							var anh = new Anh
							{
								ID = Guid.NewGuid(),
								DuongDan = a,
								TrangThai = 1,
								IDChitietsanpham = ctsp.ID
							};
							await _dbcontext.Anhs.AddAsync(anh);
						}

						await _dbcontext.ChiTietSanPhams.AddAsync(ctsp);
					}

					var sp = await _dbcontext.SanPhams.FindAsync(DataThem[0].Idsp);
					sp.TrangThai = 2;
					_dbcontext.SanPhams.Update(sp);
					await _dbcontext.SaveChangesAsync();

					await transaction.CommitAsync();

					return Ok("Sản phẩm đã được thêm thành công");
				}
				catch (Exception ex)
				{
					await transaction.RollbackAsync();
					return StatusCode(500, $"Lỗi trong quá trình thêm sản phẩm: {ex.Message}");
				}
			}
		}

		[HttpDelete("deleteSanPham")]
        public async Task<IActionResult> DeleteSanPham(Guid id)
        {
			try
			{
				var check = await _dbcontext.ChiTietSanPhams.FirstOrDefaultAsync(p => p.IDSanPham == id);
				if (check != null)
				{
					return BadRequest("Cần xóa các chi tiết sản phẩm trước khi xóa sản phẩm");
				}
				var sp = await _dbcontext.SanPhams.FindAsync(id);
				if (sp == null)
				{
					return BadRequest("Sản phẩm không tồn tại");
				}
				_dbcontext.SanPhams.Remove(sp);
				await _dbcontext.SaveChangesAsync();
				return Ok($"Xóa thành công sản phẩm {sp.Ma} ");

			}
			catch (Exception)
			{

				return BadRequest("Sản phẩm đã được liên kết không thể xóa");
			}
        }

		[HttpDelete("deleteChitietSanPham")]
		public async Task<IActionResult> DeleteChitietSanPham(Guid id)
		{
			try
			{
				var check = await _dbcontext.ChiTietHoaDons.FirstOrDefaultAsync(p => p.IDCTSP == id);
				if (check != null)
				{
					return BadRequest("Sản phầm đã được bán không thể xóa");
				}
				var check1 = await _dbcontext.ChiTietGioHangs.FirstOrDefaultAsync(p => p.IDCTSP == id);
				if (check1 != null)
				{
					return BadRequest("Sản phầm đã được có trong giỏ hàng không thể xóa");
				}
				var ctsp = await _dbcontext.ChiTietSanPhams.FindAsync(id);
				if (ctsp == null)
				{
					return BadRequest("Sản phẩm không tồn tại");
				}
				var listAnh = await _dbcontext.Anhs.Where(p => p.IDChitietsanpham == id).ToListAsync();
				foreach (var item in listAnh)
				{
					_dbcontext.Anhs.Remove(item);
				}
				var listkm = await _dbcontext.KhuyenMaiCTSanPhams.Where(p => p.IdChiTietSanPham == id).ToListAsync();
				foreach (var item in listkm)
				{
					_dbcontext.KhuyenMaiCTSanPhams.Remove(item);
				}
				_dbcontext.ChiTietSanPhams.Remove(ctsp);
				var check2 = await _dbcontext.ChiTietSanPhams.FirstOrDefaultAsync(p => p.IDSanPham == ctsp.IDSanPham && p.ID != id);
				if (check2 == null)
				{
					var sp = await _dbcontext.SanPhams.FirstOrDefaultAsync(p => p.ID == _dbcontext.ChiTietSanPhams.Find(id).IDSanPham);
					sp.TrangThai = 0;
					_dbcontext.SanPhams.Update(sp);
				}

				await _dbcontext.SaveChangesAsync();
				return Ok($"Xóa thành công sản phẩm {ctsp.Ma} ");

			}
			catch (Exception)
			{

				return BadRequest("Sản phẩm đã được liên kết không thể xóa");
			}
		}

		[HttpPut("UpdateSanPhamQLSP")]
		public async Task<IActionResult> DeleteChitietSanPham(Guid id , string ten,string ma,string mota,Guid loaisp,Guid chatlieu,Guid coao)
		{
			try
			{
				var sp = await _dbcontext.SanPhams.FindAsync(id);
				if (sp == null) return BadRequest("San phầm không tồn tại");
				var check = await _dbcontext.SanPhams.FirstOrDefaultAsync(p => (p.Ten.ToLower().Trim() == ten.ToLower().Trim() && p.ID != id) || (p.Ma.ToLower().Trim() == ma.ToLower().Trim() && p.ID != id));
				if (check != null) return BadRequest("Tên hoặc mã sản phầm bị trùng khớp với sản phẩm khác");
				sp.Ten = ten.ToUpper();
				sp.Ma = ma.ToUpper();
				sp.MoTa = mota;
				sp.IDLoaiSP = loaisp;
				sp.IDChatLieu = chatlieu;
				sp.idCoAo = coao;
				_dbcontext.SanPhams.Update(sp);
				await _dbcontext.SaveChangesAsync();
				return Ok("Sửa thành công sản phẩm");
			}
			catch (Exception)
			{

				return BadRequest("Sản phẩm không thể sửa");
			}

		}
		[HttpPut("UpdateChiTietSanPhamQLSP")]
		public async Task<IActionResult> UpdateChitietSanPham(Guid id, int? soLuong, int? giaBan, int trangThai)
		{
			var sp = await _dbcontext.ChiTietSanPhams.FindAsync(id);

			if (sp == null)
			{
				return BadRequest("Sản phẩm không tồn tại");
			}

			var sanPham = await _dbcontext.SanPhams.FirstOrDefaultAsync(x => x.ID == sp.IDSanPham);

			if (sanPham == null)
			{
				return BadRequest("Sản phẩm cha không tồn tại");
			}

			var activeChiTiet = await _dbcontext.ChiTietSanPhams
				.Where(p => p.IDSanPham == sp.IDSanPham && p.ID != id)
				.ToListAsync();


			switch (trangThai)
			{
				case 1:
					var ctsp = await _dbcontext.ChiTietSanPhams.FirstOrDefaultAsync(p => p.IDSanPham == sanPham.ID && p.TrangThai == 2 && p.ID != sp.ID);
					if (ctsp == null) sanPham.TrangThai = 1; break;
				case 2:
					sanPham.TrangThai = 2; break;
				case 0:
					var ctsp1 = await _dbcontext.ChiTietSanPhams.FirstOrDefaultAsync(p => p.IDSanPham == sanPham.ID && p.TrangThai != 0 && p.ID != sp.ID);
					if (ctsp1 == null) sanPham.TrangThai = 0; break;
				default:
					break;
			}




			_dbcontext.SanPhams.Update(sanPham);

			if (soLuong.HasValue)
			{
				sp.SoLuong = soLuong.Value;
			}

			if (giaBan.HasValue)
			{
				sp.GiaBan = giaBan.Value;
			}

			sp.TrangThai = trangThai;

			_dbcontext.ChiTietSanPhams.Update(sp);
			await _dbcontext.SaveChangesAsync();
			return Ok("Sửa chi tiết sản phẩm thành công");
		}





		#endregion

		#region sanphambanhangonl
		[HttpGet("getLoaiSPbanhangonl")]
		public async Task<IActionResult> GetAllLSPSanPhamonl()
		{
			var listlSP = await (from lsp in _dbcontext.LoaiSPs
								 where lsp.TrangThai == 1
								 join sp in _dbcontext.SanPhams on lsp.ID equals sp.IDLoaiSP
								 where sp.TrangThai != 0
								 join spct in _dbcontext.ChiTietSanPhams on sp.ID equals spct.IDSanPham
								 where spct.TrangThai != 0
								 join a in _dbcontext.Anhs on spct.ID equals a.IDChitietsanpham
								 where a.TrangThai != 0
								 group new { lsp, a } by lsp.ID into g
								 select new
								 {
									 id = g.Key,
									 images = g.Select(x => x.a.DuongDan).ToList(),
									 title = g.FirstOrDefault().lsp.Ten
								 }).ToListAsync();

			return Ok(listlSP);
		}

		[HttpGet("getSPbanhangonl")]
		public async Task<IActionResult> GetAllSanPhamonl(Guid? loaiSanPham,int? sapxep, Guid ? idkt, Guid? idms,int? giaMin,int? GiaMax, int currentPage, int productsPerPage)
		{





			var listlSP = await (
				from spct in _dbcontext.ChiTietSanPhams
				where spct.TrangThai != 0 && spct.SoLuong > 0
				join sp in _dbcontext.SanPhams on spct.IDSanPham equals sp.ID
				join kt in _dbcontext.KichCos on spct.IDKichCo equals kt.ID
				join ms in _dbcontext.MauSacs on spct.IDMauSac equals ms.ID
				join a in _dbcontext.Anhs on spct.ID equals a.IDChitietsanpham into anhs
				from a in anhs.DefaultIfEmpty()
				group new { spct,a, sp, kt, ms } by new { spct.IDSanPham, spct.IDMauSac } into g
				select new
				{
					id = g.Key.IDSanPham,
					idMauSac = g.Key.IDMauSac,
					ctsp = g.Select(p => new
					{
						id = p.spct.ID,
						ma = p.spct.Ma,
						soluong = p.spct.SoLuong,
						giaban = p.spct.GiaBan,
						ngaytao = p.spct.NgayTao,
						trangthai = p.spct.TrangThai,
						tensp = p.sp.Ten,
						p.spct.IDMauSac,
						p.spct.IDKichCo,
						tenkt = p.kt.Ten,
						tenms = p.ms.Ten,
						//anh = _dbcontext.Anhs.FirstOrDefault(x => x.IDChitietsanpham == p.spct.ID).DuongDan,
						anh = p.a != null ? p.a.DuongDan : null,
						idloaisp = p.sp.IDLoaiSP,
					}).ToList()
				}).ToListAsync();


			var filteredProducts = listlSP
			.Where(p => (loaiSanPham == null || p.ctsp[0].idloaisp == loaiSanPham) &&
						(idkt == null || p.ctsp.FirstOrDefault(p => p.IDKichCo == idkt) != null ) &&
						(idms == null || p.ctsp[0].IDMauSac == idms) &&
						(giaMin == null || p.ctsp.Any(ctsp => ctsp.giaban >= giaMin)) &&
					(GiaMax == null || p.ctsp.Any(ctsp => ctsp.giaban <= GiaMax)));



			if (sapxep == 1)
			{
				filteredProducts = filteredProducts
					.OrderByDescending(p => p.ctsp.Min(ctsp => ctsp.giaban));
			}
			else if (sapxep == 2)
			{
				filteredProducts = filteredProducts
					.OrderBy(p => p.ctsp.Min(ctsp => ctsp.giaban));
			}
			else if (sapxep == 3)
			{
				filteredProducts = filteredProducts
					.OrderByDescending(p => p.ctsp.Min(ctsp => ctsp.ngaytao));
			}

			var pagedProducts = filteredProducts
	       .Skip((currentPage - 1) * productsPerPage)
	       .Take(productsPerPage)
	       .ToList();

			int totalProducts = filteredProducts.Where(p => p.ctsp[0].idloaisp == loaiSanPham || loaiSanPham == null).Count();
			int totalPages = (int)Math.Ceiling((double)totalProducts / productsPerPage);
			return Ok(new {sp = pagedProducts, sotrang = totalPages });


		}

		[HttpGet("GetChiTietSanPhamByIDChiTietSanPham")]
		public async Task<IActionResult> GetChiTietSanPhamByID(string id)
		{
			var response = _sanPhamServices.GetChiTietSanPhamByID(id);
			return Ok(response);
		}

		#endregion


        #region Tung
        [HttpGet("GetChiTietSanPhamByIdHD")]
        public async Task<IActionResult> GetChiTietSanPhamByIdHD(Guid hoaDonId)
        {
            var response = _sanPhamServices.GetChiTietSanPhamByIdHD(hoaDonId);
            return Ok(response);
        }
        #endregion

    }
}
