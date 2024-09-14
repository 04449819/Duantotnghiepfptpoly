
using AppAPI.IServices;
using AppAPI.Services;
using AppData.IRepositories;
using AppData.Models;
using AppData.ViewModels;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Text.RegularExpressions;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace AppAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class KhuyenMaiController : ControllerBase
    {
        private readonly IKhuyenMaiServices _khuyenmai;
        private readonly AssignmentDBContext _dbcontext;

        public KhuyenMaiController()
        {
            _dbcontext = new AssignmentDBContext();
            _khuyenmai = new KhuyenMaiServices();
        }

        // GET: api/<KhuyenMaiController>
        [HttpGet]
        

        public async Task<IActionResult> Get(int pageIndex, int pageSize)
        {
            int totalKM = await _dbcontext.KhuyenMais.CountAsync();
            int totalPage = (int)Math.Ceiling(totalKM / (double)pageSize);
            var km = await _dbcontext.KhuyenMais
                                .Skip((pageIndex - 1) * pageSize)
                                .Take(pageSize)
                                .ToListAsync();
            return Ok(new
            {
                Data = km,
                TotalCount = totalPage
            });

        }
        [Route("GetAllCTSPBySP")]
        [HttpGet]
        public async Task<List<AllViewCTSP>> GetAllCTSPBySp(Guid idSanPham)
        {
            if (!_dbcontext.ChiTietSanPhams.Any(c => c.IDSanPham == idSanPham)) throw new Exception($" khong tim thay san pham co id:{idSanPham}");
            var AllCTSP = await (from CTSP in _dbcontext.ChiTietSanPhams.AsNoTracking()
                                 join mausac in _dbcontext.MauSacs.AsNoTracking() on CTSP.IDMauSac equals mausac.ID
                                 join size in _dbcontext.KichCos.AsNoTracking() on CTSP.IDKichCo equals size.ID
                                 join sp in _dbcontext.SanPhams.AsNoTracking() on CTSP.IDSanPham equals sp.ID
                                 where CTSP.IDSanPham == idSanPham
                                 select new AllViewCTSP()
                                 {
                                     ID = CTSP.ID,
                                     MaCTSP=CTSP.Ma,
                                     TenSanPham = sp.Ten,
                                     TenAnh = "",
                                     //IdKhuyenMai = (from km in _dbcontext.KhuyenMais where CTSP.IDKhuyenMai == km.ID select CTSP.IDKhuyenMai).FirstOrDefault(),
                                     IdKhuyenMai = Guid.NewGuid(),
                                     TenMauSac = mausac.Ten,
                                     MaMauSac=mausac.Ma,
                                     TenKichCo = size.Ten,
                                     GiaGoc = CTSP.GiaBan,
                                     GiaKhuyenMai = CTSP.GiaBan,
                                     SoLuong = CTSP.SoLuong,
                                     NgayTao = CTSP.NgayTao,
                                     TrangThai = CTSP.TrangThai
                                 }).ToListAsync();
            return AllCTSP;
        }
        // TimCTSP Theo Id Khuyen Mai
        [Route("GetCTSPByIdKm")]
        [HttpGet]
        public async Task<List<AllViewCTSP>> GetAllCTSPByIdKhuyenMai(Guid idkm)
        {
            if (!_dbcontext.KhuyenMais.Any(c => c.ID == idkm)) throw new Exception($" khong tim thay san pham co id:{idkm}");
            var AllCTSP = await (from CTSP in _dbcontext.ChiTietSanPhams.AsNoTracking()
                                 join mausac in _dbcontext.MauSacs.AsNoTracking() on CTSP.IDMauSac equals mausac.ID
                                 join size in _dbcontext.KichCos.AsNoTracking() on CTSP.IDKichCo equals size.ID
                                 join sp in _dbcontext.SanPhams.AsNoTracking() on CTSP.IDSanPham equals sp.ID

                                 select new AllViewCTSP()
                                 {
                                     ID = CTSP.ID,
                                     TenSanPham = sp.Ten,
                                     //IdKhuyenMai = (from km in _dbcontext.KhuyenMais where CTSP.IDKhuyenMai == km.ID select CTSP.IDKhuyenMai).FirstOrDefault(),
                                     IdKhuyenMai = Guid.NewGuid(),
                                     TenMauSac = mausac.Ten,
                                     TenKichCo = size.Ten,
                                     GiaGoc = CTSP.GiaBan,
                                     GiaKhuyenMai = CTSP.GiaBan,
                                     SoLuong = CTSP.SoLuong,
                                     NgayTao = CTSP.NgayTao,
                                     TrangThai = CTSP.TrangThai
                                 }).Where(x => x.IdKhuyenMai == idkm).ToListAsync();
            return AllCTSP;
        }

        //[Route("GetAllSP")]
        //[HttpGet]

        //public List<AllViewSp> GetAllSP()
        //{

        //    var result = _dbcontext.SanPhams

        //                    .Join(_dbcontext.ChatLieus, sp => sp.IDChatLieu, cl => cl.ID, (sp, cl) => new { sp_cl = sp, chatlieus = cl })
        //                    .Join(_dbcontext.LoaiSPs, sp => sp.sp_cl.IDLoaiSP, lsp => lsp.ID, (sp, lsp) => new { sp_cl_lsp = sp, loaisps = lsp })
        //                    .Join(_dbcontext.ChiTietSanPhams, sp => sp.sp_cl_lsp.sp_cl.ID, ctsp => ctsp.IDSanPham, (sp, ctsp) => new { sp_cl_lsp_ctsp = sp, chitietsps = ctsp })
        //                    .GroupBy(x => x.sp_cl_lsp_ctsp.sp_cl_lsp.sp_cl.ID)
        //                    .Select(group => new AllViewSp {
        //                        ID = group.FirstOrDefault().sp_cl_lsp_ctsp.sp_cl_lsp.sp_cl.ID,
        //                        SoLuongCTSP = group.Sum(x => x.chitietsps.ID != null ? 1 : 0),
        //                        Ten = group.FirstOrDefault().sp_cl_lsp_ctsp.sp_cl_lsp.sp_cl.Ten,
        //                        MoTa = group.FirstOrDefault().sp_cl_lsp_ctsp.sp_cl_lsp.sp_cl.MoTa,
        //                        TenAnh = "",
        //                        IdKhuyenMai = (from km in _dbcontext.KhuyenMais where @group.FirstOrDefault().chitietsps.IDKhuyenMai == km.ID select km.ID).FirstOrDefault(),
                                
        //                        GiaBan = group.FirstOrDefault().chitietsps.GiaBan,
        //                        IDLoaiSP = group.FirstOrDefault().sp_cl_lsp_ctsp.loaisps.ID,
        //                        IDLoaiSPCha = group.FirstOrDefault().sp_cl_lsp_ctsp.loaisps.IDLoaiSPCha,
        //                        IDChatLieu = group.FirstOrDefault().sp_cl_lsp_ctsp.sp_cl_lsp.chatlieus.ID,
        //                        TrangThai = group.FirstOrDefault().sp_cl_lsp_ctsp.sp_cl_lsp.sp_cl.TrangThai
        //                    }).ToList();
        //    return result;

        //}
        //[Route("GetAllSPByKhuyenMai")]
        //[HttpGet]

        //public List<AllViewSp> GetAllSPByKhuyenMai(Guid idkm)
        //{
        //    if (!_dbcontext.KhuyenMais.Any(c => c.ID == idkm)) throw new Exception($" khong tim thay san pham co id:{idkm}");
        //    var result = _dbcontext.SanPhams

        //                   .Join(_dbcontext.ChatLieus, sp => sp.IDChatLieu, cl => cl.ID, (sp, cl) => new { sp_cl = sp, chatlieus = cl })
        //                   .Join(_dbcontext.LoaiSPs, sp => sp.sp_cl.IDLoaiSP, lsp => lsp.ID, (sp, lsp) => new { sp_cl_lsp = sp, loaisps = lsp })
        //                   .Join(_dbcontext.ChiTietSanPhams, sp => sp.sp_cl_lsp.sp_cl.ID, ctsp => ctsp.IDSanPham, (sp, ctsp) => new { sp_cl_lsp_ctsp = sp, chitietsps = ctsp }).Where(x=>x.chitietsps.TrangThai==1)
        //                   .GroupBy(x => x.sp_cl_lsp_ctsp.sp_cl_lsp.sp_cl.ID)
        //                   .Select(group => new AllViewSp
        //                   {
        //                       ID = group.FirstOrDefault().sp_cl_lsp_ctsp.sp_cl_lsp.sp_cl.ID,
        //                       MaSP=group.FirstOrDefault().sp_cl_lsp_ctsp.sp_cl_lsp.sp_cl.Ma,
        //                       SoLuongCTSP = group.Sum(x => x.chitietsps.ID != null ? 1 : 0),
        //                       Ten = group.FirstOrDefault().sp_cl_lsp_ctsp.sp_cl_lsp.sp_cl.Ten,
        //                       MoTa = group.FirstOrDefault().sp_cl_lsp_ctsp.sp_cl_lsp.sp_cl.MoTa,
        //                       TenAnh = "",
        //                       IdKhuyenMai = (from km in _dbcontext.KhuyenMais where @group.FirstOrDefault().chitietsps.IDKhuyenMai == km.ID select km.ID).FirstOrDefault(),
                             
        //                       GiaBan = group.FirstOrDefault().chitietsps.GiaBan,
        //                       IDLoaiSP = group.FirstOrDefault().sp_cl_lsp_ctsp.loaisps.ID,
        //                       IDLoaiSPCha = group.FirstOrDefault().sp_cl_lsp_ctsp.loaisps.IDLoaiSPCha,
        //                       IDChatLieu = group.FirstOrDefault().sp_cl_lsp_ctsp.sp_cl_lsp.chatlieus.ID,
        //                       TrangThai = group.FirstOrDefault().sp_cl_lsp_ctsp.sp_cl_lsp.sp_cl.TrangThai
        //                   }).Where(x => x.IdKhuyenMai == idkm).ToList();
        //    return result;

        //}
        //[Route("GetAllSPByKmLoaiSPChatLieu")]
        //[HttpGet]

        //public async Task<List<AllViewSp>> GetAllSPByKm(Guid? idkm, Guid? idLoaiSP, Guid? idChatLieu)
        //{
        //    if (!_dbcontext.KhuyenMais.Any(c => c.ID == idkm) && !_dbcontext.LoaiSPs.Any(c => c.ID == idLoaiSP) && !_dbcontext.ChatLieus.Any(y => y.ID == idChatLieu)) throw new Exception($" khong tim thay san pham co id:{idkm},{idLoaiSP},{idChatLieu}");
        //    var AllCTSP = (from SP in _dbcontext.SanPhams.AsNoTracking()
        //                   join loaisp in _dbcontext.LoaiSPs.AsNoTracking() on SP.IDLoaiSP equals loaisp.ID
        //                   join chatlieu in _dbcontext.ChatLieus.AsNoTracking() on SP.IDChatLieu equals chatlieu.ID
        //                   join CTSP in _dbcontext.ChiTietSanPhams.AsNoTracking() on SP.ID equals CTSP.IDSanPham
        //                   join km in _dbcontext.KhuyenMais.AsNoTracking() on CTSP.IDKhuyenMai equals km.ID
						  // join anh in _dbcontext.Anhs.AsNoTracking() on SP.ID equals anh.IDSanPham
						  // select new { SP, anh, loaisp, chatlieu, CTSP, km });
        //    // Tim Theo IdKhuyenMai
        //    if (!string.IsNullOrEmpty(idkm.ToString()))
        //    {
        //        AllCTSP = AllCTSP.AsNoTracking().Where(x => x.km.ID == idkm);
        //    }
        //    if (!string.IsNullOrEmpty(idLoaiSP.ToString()))
        //    {
        //        AllCTSP = AllCTSP.AsNoTracking().Where(x => x.loaisp.ID == idLoaiSP);

        //    }
        //    if (!string.IsNullOrEmpty(idChatLieu.ToString()))
        //    {
        //        AllCTSP = AllCTSP.AsNoTracking().Where(x => x.chatlieu.ID == idChatLieu);
        //    }
        //    var result = await AllCTSP.AsNoTracking().Select(c => new AllViewSp() { ID = c.SP.ID,
        //        Ten = c.SP.Ten,
        //        MoTa = c.SP.MoTa,
        //        TenAnh = c.anh.DuongDan,
        //        IdKhuyenMai = c.km.ID,
              
        //        GiaBan = c.CTSP.GiaBan,
        //        IDLoaiSP = c.SP.IDLoaiSP,
        //        IDLoaiSPCha = c.loaisp.IDLoaiSPCha,
        //        IDChatLieu = c.chatlieu.ID,
        //        TrangThai = c.CTSP.TrangThai

        //    }).ToListAsync();
        //    return result;
        //}
        //[Route("GetAllSPNoKM")]
        //[HttpGet]

        //public List<AllViewSp> GetAllSPNoKm(Guid id)
        //{
        //    if (!_dbcontext.KhuyenMais.Any(c => c.ID == id)) throw new Exception($" khong tim thay san pham co id:{id}");
        //    var result = _dbcontext.SanPhams

        //                   .Join(_dbcontext.ChatLieus, sp => sp.IDChatLieu, cl => cl.ID, (sp, cl) => new { sp_cl = sp, chatlieus = cl })
        //                   .Join(_dbcontext.LoaiSPs, sp => sp.sp_cl.IDLoaiSP, lsp => lsp.ID, (sp, lsp) => new { sp_cl_lsp = sp, loaisps = lsp })
        //                   .Join(_dbcontext.ChiTietSanPhams, sp => sp.sp_cl_lsp.sp_cl.ID, ctsp => ctsp.IDSanPham, (sp, ctsp) => new { sp_cl_lsp_ctsp = sp, chitietsps = ctsp }).Where(x=>x.chitietsps.TrangThai==1)
        //                   .GroupBy(x => x.sp_cl_lsp_ctsp.sp_cl_lsp.sp_cl.ID)
        //                   .Select(group => new AllViewSp
        //                   {
        //                       ID = group.FirstOrDefault().sp_cl_lsp_ctsp.sp_cl_lsp.sp_cl.ID,
        //                       MaSP = group.FirstOrDefault().sp_cl_lsp_ctsp.sp_cl_lsp.sp_cl.Ma,
        //                       SoLuongCTSP = group.Sum(x => x.chitietsps.ID != null ? 1 : 0),
        //                       Ten = group.FirstOrDefault().sp_cl_lsp_ctsp.sp_cl_lsp.sp_cl.Ten,
        //                       MoTa = group.FirstOrDefault().sp_cl_lsp_ctsp.sp_cl_lsp.sp_cl.MoTa,
        //                       TenAnh = "",
        //                       IdKhuyenMai = (from km in _dbcontext.KhuyenMais where @group.FirstOrDefault().chitietsps.IDKhuyenMai == km.ID select km.ID).FirstOrDefault(),
                              
        //                       GiaBan = group.FirstOrDefault().chitietsps.GiaBan,
        //                       IDLoaiSP = group.FirstOrDefault().sp_cl_lsp_ctsp.loaisps.ID,
        //                       IDLoaiSPCha = group.FirstOrDefault().sp_cl_lsp_ctsp.loaisps.IDLoaiSPCha,
        //                       IDChatLieu = group.FirstOrDefault().sp_cl_lsp_ctsp.sp_cl_lsp.chatlieus.ID,
        //                       TrangThai = group.FirstOrDefault().sp_cl_lsp_ctsp.sp_cl_lsp.sp_cl.TrangThai
        //                   }).Where(x => x.IdKhuyenMai != id).Where(x => x.TrangThai == 1).ToList();
        //    return result;
        //}
        //[Route("GetAllSPNoKMByLoaiSPChatLieu")]
        //[HttpGet]

        //public List<AllViewSp> TKGetAllSPNoKmByLoaiSPChatLieu(Guid id, Guid? idLoaiSP, Guid? idChatLieu)
        //{
        //    if (!_dbcontext.LoaiSPs.Any(c => c.ID == idLoaiSP) && !_dbcontext.ChatLieus.Any(y => y.ID == idChatLieu)) throw new Exception($" khong tim thay san pham co id:{idLoaiSP},{idChatLieu}");
        //    //var AllCTSP = (from SP in _dbcontext.SanPhams.AsNoTracking()
        //    //               join anh in _dbcontext.Anhs.AsNoTracking() on SP.ID equals anh.IDSanPham
        //    //               join loaisp in _dbcontext.LoaiSPs.AsNoTracking() on SP.IDLoaiSP equals loaisp.ID
        //    //               join chatlieu in _dbcontext.ChatLieus.AsNoTracking() on SP.IDChatLieu equals chatlieu.ID
        //    //               join CTSP in _dbcontext.ChiTietSanPhams.AsNoTracking() on SP.ID equals CTSP.IDSanPham

        //    //               select new { SP, anh, loaisp, chatlieu, CTSP });
        //    //// Tim Theo LoaiSP,Chat Lieu

        //    //if (!string.IsNullOrEmpty(idLoaiSP.ToString()))
        //    //{
        //    //    AllCTSP = AllCTSP.AsNoTracking().Where(x => x.loaisp.ID == idLoaiSP);

        //    //}
        //    //if (!string.IsNullOrEmpty(idChatLieu.ToString()))
        //    //{
        //    //    AllCTSP = AllCTSP.AsNoTracking().Where(x => x.chatlieu.ID == idChatLieu);
        //    //}
        //    //var result = await AllCTSP.AsNoTracking().Select(c => new AllViewSp()
        //    //{
        //    //    ID = c.SP.ID,
        //    //    Ten = c.SP.Ten,
        //    //    MoTa = c.SP.MoTa,
        //    //    TenAnh = c.anh.DuongDan,
        //    //    IdKhuyenMai = (from km in _dbcontext.KhuyenMais where c.CTSP.IDKhuyenMai == km.ID select c.CTSP.IDKhuyenMai).FirstOrDefault(),
        //    //    TongSoSao = c.SP.TongSoSao,
        //    //    TongDanhGia = c.SP.TongDanhGia,
        //    //    GiaBan = c.CTSP.GiaBan,
        //    //    IDLoaiSP = c.SP.IDLoaiSP,
        //    //    IDLoaiSPCha = c.loaisp.IDLoaiSPCha,
        //    //    IDChatLieu = c.chatlieu.ID,
        //    //    TrangThai = c.CTSP.TrangThai

        //    //}).Where(x=>x.IdKhuyenMai!=id).ToListAsync();
        //    //return result;
        //    if (!_dbcontext.KhuyenMais.Any(c => c.ID == id)) throw new Exception($" khong tim thay san pham co id:{id}");
        //    var result = _dbcontext.SanPhams

        //                   .Join(_dbcontext.ChatLieus, sp => sp.IDChatLieu, cl => cl.ID, (sp, cl) => new { sp_cl = sp, chatlieus = cl })
        //                   .Join(_dbcontext.LoaiSPs, sp => sp.sp_cl.IDLoaiSP, lsp => lsp.ID, (sp, lsp) => new { sp_cl_lsp = sp, loaisps = lsp })
        //                   .Join(_dbcontext.ChiTietSanPhams, sp => sp.sp_cl_lsp.sp_cl.ID, ctsp => ctsp.IDSanPham, (sp, ctsp) => new { sp_cl_lsp_ctsp = sp, chitietsps = ctsp }).Where(x => x.chitietsps.TrangThai == 1)
        //                   .GroupBy(x => x.sp_cl_lsp_ctsp.sp_cl_lsp.sp_cl.ID)
        //                   .Select(group => new AllViewSp
        //                   {
        //                       ID = group.FirstOrDefault().sp_cl_lsp_ctsp.sp_cl_lsp.sp_cl.ID,
        //                       SoLuongCTSP = group.Sum(x => x.chitietsps.ID != null ? 1 : 0),
        //                       Ten = group.FirstOrDefault().sp_cl_lsp_ctsp.sp_cl_lsp.sp_cl.Ten,
        //                       MoTa = group.FirstOrDefault().sp_cl_lsp_ctsp.sp_cl_lsp.sp_cl.MoTa,
        //                       TenAnh = "",
        //                       IdKhuyenMai = (from km in _dbcontext.KhuyenMais where @group.FirstOrDefault().chitietsps.IDKhuyenMai == km.ID select km.ID).FirstOrDefault(),
                              
        //                       GiaBan = group.FirstOrDefault().chitietsps.GiaBan,
        //                       IDLoaiSP = group.FirstOrDefault().sp_cl_lsp_ctsp.loaisps.ID,
        //                       IDLoaiSPCha = group.FirstOrDefault().sp_cl_lsp_ctsp.loaisps.IDLoaiSPCha,
        //                       IDChatLieu = group.FirstOrDefault().sp_cl_lsp_ctsp.sp_cl_lsp.chatlieus.ID,
        //                       TrangThai = group.FirstOrDefault().sp_cl_lsp_ctsp.sp_cl_lsp.sp_cl.TrangThai
        //                   }).Where(x => x.IdKhuyenMai != id).ToList();
        //    if (!string.IsNullOrEmpty(idLoaiSP.ToString()))
        //    {
        //        result = result.Where(x => x.IDLoaiSP == idLoaiSP).ToList();

        //    }
        //    if (!string.IsNullOrEmpty(idChatLieu.ToString()))
        //    {
        //        result = result.Where(x => x.IDChatLieu == idChatLieu).ToList();
        //    }
        //    return result;
        //}

        // GET api/<KhuyenMaiController>/5
        [HttpGet("{id}")]
        public KhuyenMai Get(Guid id)
        {
            return _khuyenmai.GetById(id);
        }
        [Route("TimKiemTenKM")]
        [HttpGet]
        public List<KhuyenMai> GetByTen(string Ten)
        {
            return _khuyenmai.GetKMByName(Ten);
        }

        // POST api/<KhuyenMaiController>
        [HttpPost]
        public bool Post(KhuyenMaiView kmv)
        {
            return _khuyenmai.Add(kmv);
        }
        [Route("AddKmVoBT")]
        [HttpPut]
        // PUT api/<KhuyenMaiController>/5 
        public bool AddKMVoBienThe(List<Guid> bienThes, Guid IdKhuyenMai)
        {
            return _khuyenmai.AdKMVoBT(bienThes, IdKhuyenMai);
        }

        // Lam start
        [Route("XoaKmRaBT")]
        [HttpPut]
        // PUT api/<KhuyenMaiController>/5 
        public bool XoaKMRaBienThe(List<Guid> bienThes)
        {
            return _khuyenmai.XoaAllKMRaBT(bienThes);
        }
        //Lam end
        // PUT api/<KhuyenMaiController>/5

        [HttpPut("{id}")]
        public bool Put(KhuyenMaiView kmv)
        {
            var khuyenmai = _khuyenmai.GetById(kmv.ID);
            if (khuyenmai != null)
            {
                return _khuyenmai.Update(kmv);  
            }
            else
            {
                return false;
            }
        }

        // DELETE api/<KhuyenMaiController>/5
        [HttpDelete("{id}")]
        public bool Delete(Guid id)
        {
            var khuyenmai = _khuyenmai.GetById(id);
            if (khuyenmai != null)
            {
                return _khuyenmai.Delete(khuyenmai.ID);
            }
            else
            {
                return false;
            }
        }
        [HttpPost("addkhuyenmaitoCTSP")]
        public async Task<IActionResult> AddKhuyenMaitoCTSP(List<KhuyenMaiModelVieww> IDCTSP, string idkhuyenmai)
        {
            
            var khuyenMai = await _dbcontext.KhuyenMais.FirstOrDefaultAsync(km => km.ID == Guid.Parse(idkhuyenmai));
            var now = DateTime.Now;
            if (khuyenMai != null && khuyenMai.NgayApDung <= now && khuyenMai.NgayKetThuc >= now)
            {
                if (IDCTSP == null || !IDCTSP.Any())
                {
                    return BadRequest("Danh sách IDCTSP rỗng hoặc null");
                }

                foreach (var item in IDCTSP)
                {
                    var dt = await _dbcontext.ChiTietSanPhams.FindAsync(item.id);
                    if (dt != null)
                    {
                        var existingRecord = await _dbcontext.KhuyenMaiCTSanPhams
                            .FirstOrDefaultAsync(kmctsp => kmctsp.IdChiTietSanPham == dt.ID && kmctsp.IdKhuyenMai == Guid.Parse(idkhuyenmai));

                        if (existingRecord == null)
                        {
                            if (item.trangthai == true)
                            {
                                KhuyenMaiCTSanPham kmctsp = new KhuyenMaiCTSanPham
                                {
                                    IdChiTietSanPham = dt.ID,
                                    IdKhuyenMai = Guid.Parse(idkhuyenmai)
                                };
                                _dbcontext.KhuyenMaiCTSanPhams.Add(kmctsp);
                            }
                        }
                        else
                        {
                            if (item.trangthai == false)
                            {
                                _dbcontext.KhuyenMaiCTSanPhams.Remove(existingRecord);
                            }
                        }
                    }
                    else
                    {
                        return NotFound($"Sản phẩm chi tiết với ID {item.id} không tồn tại.");
                    }
                }

                // Lưu các thay đổi vào database
                await _dbcontext.SaveChangesAsync();
            }
           else
           {
             return BadRequest();
           }  

            return Ok("Cập nhật thành công.");


        }
        #region khuyenmaiKien
        [HttpGet("getallkhuyenmai")]
        public async Task<IActionResult> GetAllKhuyenMai()
        {
			try
			{
				var activePromotions = await (
					from a in _dbcontext.KhuyenMais
					where a.NgayApDung <= DateTime.Now && a.NgayKetThuc >= DateTime.Now
					join b in _dbcontext.KhuyenMaiCTSanPhams on a.ID equals b.IdKhuyenMai
					select new
					{
						IdChiTietSanPham = b.IdChiTietSanPham,
						IdKhuyenMai = a.ID,
						GiaTri = a.GiaTri,
						Ten = a.Ten,
						NgayApDung = a.NgayApDung,
						NgayKetThuc = a.NgayKetThuc,
						MoTa = a.MoTa,
						TrangThai = a.TrangThai
					}
				).ToListAsync();

				return Ok(activePromotions);
			}
			catch (Exception ex)
			{
				// Log exception (you can use a logger service if you have one)
				// _logger.LogError(ex, "Error while fetching promotions.");
				throw;  // Or return a custom error response
			}


		}
		//      [HttpPut("addkhuyenmaitoCTSP")]
		//public async Task<IActionResult> AddkhuyenmaitoCTSP(List<KhuyenMaiModelVieww> IDCTSP,string idkhuyenmai)
		//{
		//if (IDCTSP == null || !IDCTSP.Any())
		//{
		//	return BadRequest("Danh sách IDCTSP rỗng hoặc null");
		//}

		//foreach (var id in IDCTSP)
		//{
		//		var dt = await _dbcontext.ChiTietSanPhams.FindAsync(id.id);
		//		if (dt != null)
		//		{
		//			if(id.trangthai == true)
		//			{
		//				dt.IDKhuyenMai = Guid.Parse(idkhuyenmai);
		//			}
		//			else
		//			{
		//				dt.IDKhuyenMai = Guid.Parse("B2B70D39-0658-422B-93B1-C054B374B232");
		//			}
		//			_dbcontext.ChiTietSanPhams.Update(dt);
		//                     _dbcontext.SaveChanges();
		//		}
		//		else
		//		{
		//			return NotFound($"Sản phẩm chi tiết với ID {id} không tồn tại.");
		//		}
		//}



		//// Lưu các thay đổi vào database
		//await _dbcontext.SaveChangesAsync();

		//return Ok("Update thành công.");


		//  }
		#endregion
	}

}
