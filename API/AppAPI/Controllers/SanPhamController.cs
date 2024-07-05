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
using System.Collections.Generic;
using System.Net;
using System.Net.WebSockets;
using System.Runtime.CompilerServices;
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
                                  (idchatLieu.ToString() == "00000000-0000-0000-0000-000000000000" || p.IDChatLieu == idchatLieu) && (idcoAo.ToString() == "00000000-0000-0000-0000-000000000000" || p.idCoAo == idcoAo) && ((giaMin == 0 && giaMax == 0) || _dbcontext.ChiTietSanPhams.FirstOrDefault(a => a.IDSanPham == p.ID).GiaBan >= giaMin && _dbcontext.ChiTietSanPhams.FirstOrDefault(a => a.IDSanPham == p.ID).GiaBan <= giaMax));

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

		#endregion
		#region ChitietSanPhamBanHangOflineKien
		[HttpGet("GetChiTietSanPhamByIDChiTietSanPham")]
		public  async Task<IActionResult> GetChiTietSanPhamByID(Guid id)
		{
			var response =  _sanPhamServices.GetChiTietSanPhamByID(id);
			return Ok(response);
		}
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
                                  trangthai = true
                              }).ToList();
            return Ok( dsctspview);
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
						Ten = DataThem.tenSanpham,
						Ma = DataThem.ma,
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
							Ma = item.ma,
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



		#endregion
	}
}
