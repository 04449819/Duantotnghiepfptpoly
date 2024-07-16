using AppAPI.IServices;
using AppAPI.Services;
using AppData.IRepositories;
using AppData.Models;
using AppData.Repositories;
using AppData.ViewModels;
using AppData.ViewModels.SanPham;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System;
using System.ComponentModel.DataAnnotations;
using System.Runtime.ConstrainedExecution;
using System.Security;
using System.Threading.Tasks;

namespace AppAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class KhachHangController : ControllerBase
    {
        private readonly IKhachHangService _khachHangService;
        private readonly AssignmentDBContext _dbcontext;
        public KhachHangController()
        {
            _khachHangService = new KhachHangService();
            _dbcontext = new AssignmentDBContext();
            
        }
        [HttpGet]

        public async Task<IActionResult> GetAll(int pageIndex = 1, int pageSize = 10)
        {
            var result = await _khachHangService.GetAll(pageIndex, pageSize);
            return Ok(new { Data = result.Item1, TongTrang = result.Item2 });

        }
        //public IActionResult GetAllKhachHang(int pageIndex, int pageSize)
        //{
        //    var khv = _khachHangService.GetAll(pageIndex, pageSize);
        //    return Ok(khv);
        //}
        // GET: api/<SanPhamController>
        //[HttpGet]
        //public async Task<IActionResult> GetAllKhachHang()
        //{
        //    var ds = await _khachHangService.GetAll();
        //    return Ok(ds);
        //}
        [Route("TimKiemKH")]
        [HttpGet]
        public async Task<IActionResult> GetAllKhachHang(string? Ten, string? SDT)
        {
            var kh = await _dbcontext.KhachHangs.Where(x => x.SDT.Contains(SDT) || x.Ten.Contains(Ten) || x.SDT.Contains(SDT) || x.Ten.Contains(Ten)).Select(p => new {
                id = p.IDKhachHang,
                Ten=p.Ten,
                GioiTinh=p.GioiTinh,
                NgaySinh=p.NgaySinh,
                SDT=p.SDT,
                DiemTich=p.DiemTich,
                TrangThai=p.TrangThai,
                DiaChi = _dbcontext.diaChiKhachHangs.FirstOrDefault(a=>a.KhachHangID==p.IDKhachHang && a.TrangThai==1).DiaChi,
            }).ToListAsync();
            return Ok(kh);
        }

        //public Guid IDKhachHang { get; set; }
        //[Required]
        //public string Ten { get; set; }
        //[Required]
        //public string Password { get; set; }
        //public int? GioiTinh { get; set; }
        //public DateTime? NgaySinh { get; set; }
        //[EmailAddress]
        //public string? Email { get; set; }
        //public string? SDT { get; set; }
        //public int? DiemTich { get; set; }
        //public int? TrangThai { get; set; }
        //public virtual GioHang? GioHang { get; set; }
        //public virtual IEnumerable<LichSuTichDiem>? LichSuTichDiems { get; set; }
        //public virtual IEnumerable<DiaChiKhachHang>? DiaChiKhachHangs { get; set; }






        [Route("GetById")]
        [HttpGet]
        public KhachHang GetById(Guid id)
        {
            return _khachHangService.GetById(id);
        }
        [HttpGet("GetKhachHangByEmail")] 
        public KhachHangViewModel GetKhachHangByEmail(string email)
        {
            var temp = _dbcontext.KhachHangs.FirstOrDefault(x => x.Email == email);
            if (temp != null)
            {
                var khachHang = new KhachHangViewModel()
                {
                    Id = temp.IDKhachHang,
                    Email = temp.Email
                };
                return khachHang;
            }
            else return new KhachHangViewModel();
        }

   
		[HttpGet("ChangeForgotPassword")]
        public async Task<bool> ChangeForgotPassword(string id, string password)
        {
            try
            {
                var tempID = new Guid(id);  
                var temp = _dbcontext.KhachHangs.First(x => x.IDKhachHang == tempID);
                temp.Password = MaHoaMatKhauS(password);
                _dbcontext.Update(temp);
                await _dbcontext.SaveChangesAsync();
                return true;
            }
            catch (Exception ex)
            {
                return false;
            }
        }
        private string MaHoaMatKhauS(string matKhau)
        {
            // Ở đây, bạn có thể sử dụng bất kỳ phương thức mã hóa mật khẩu nào phù hợp
            // Ví dụ: sử dụng thư viện BCrypt.Net để mã hóa mật khẩu
            var hashedPassword = BCrypt.Net.BCrypt.HashPassword(matKhau);
            return hashedPassword;

            // Đây chỉ là ví dụ đơn giản, không nên sử dụng trong môi trường thực tế
            //return matKhau;
        }
        //Nhinh
      
        [HttpGet("getAllHDKH")]
        public async Task<List<HoaDon>> GetAllHDKH(Guid idkh)
        {
            return await _khachHangService.GetAllHDKH(idkh);
        }

        // GET api/<SanPhamController>/5
        [Route("PostKHView")]
        [HttpPost]
        public bool PostKHView(KhachHangView khv)
        {
			var idkhv = Guid.NewGuid();
            KhachHang kh = new KhachHang();
            kh.IDKhachHang = idkhv;
            kh.Ten = khv.Ten?.Trim();
            kh.Password = MaHoaMatKhau(khv.Password).Trim();
            kh.GioiTinh=khv.GioiTinh;
            kh.NgaySinh=khv.NgaySinh;
            kh.Email = khv.Email?.Trim();
            //kh.DiaChi=khv.DiaChi?.Trim();
            kh.SDT = khv.SDT?.Trim();
            kh.TrangThai=1;
            kh.DiemTich = kh.DiemTich;
            _dbcontext.KhachHangs.Add(kh);
            GioHang gh= new GioHang();
            gh.IDKhachHang=kh.IDKhachHang;
            gh.NgayTao=DateTime.Now;
            _dbcontext.GioHangs.Add(gh);
            DiaChiKhachHang dckh = new DiaChiKhachHang();
			dckh.Id = Guid.NewGuid();
            dckh.KhachHangID = kh.IDKhachHang;
            dckh.DiaChi = khv.DiaChi?.Trim();
            dckh.TrangThai = 1;
            _dbcontext.diaChiKhachHangs.Add(dckh);
			_dbcontext.SaveChanges();
            return true;
        }

	

		private string MaHoaMatKhau(string matKhau)
        {
            // Ở đây, bạn có thể sử dụng bất kỳ phương thức mã hóa mật khẩu nào phù hợp
            // Ví dụ: sử dụng thư viện BCrypt.Net để mã hóa mật khẩu
            var hashedPassword = BCrypt.Net.BCrypt.HashPassword(matKhau);
            return hashedPassword;

            // Đây chỉ là ví dụ đơn giản, không nên sử dụng trong môi trường thực tế
            //return matKhau;
        }


        // POST api/<SanPhamController>
        [HttpPost]
        public async Task<IActionResult> Post(KhachHangViewModel khachHang)
        {
            var kh = await _khachHangService.Add(khachHang);
            if (kh == null)
            {
                return BadRequest();
            }

            return Ok("Đăng ký thành công");
        }
        // PUT api/<SanPhamController>/5
        //[Route("PutKhView")]
        //[HttpPut]
        //public bool PutKhView(KhachHangView khv)
        //{
        //    var kh = _khachHangService.GetById(khv.IDKhachHang);
        //    if (kh != null)
        //    {
                
        //        kh.Ten = khv.Ten?.Trim();
        //        //kh.Password = MaHoaMatKhau(khv.Password);
        //        //kh.GioiTinh = khv.GioiTinh;
        //        kh.NgaySinh = khv.NgaySinh;
        //        //kh.Email = khv.Email;
        //        kh.DiaChi = khv.DiaChi?.Trim();
        //        //kh.SDT = khv.SDT;
        //        //kh.TrangThai = khv.TrangThai;
                
        //        _dbcontext.KhachHangs.Update(kh);
        //        _dbcontext.SaveChanges();
        //        return true;
        //    }
        //    return false;

        //}

        // DELETE api/<SanPhamController>/5
        [HttpDelete("{id}")]
        public bool Delete(Guid id)
        {
            var result = _khachHangService.Delete(id);
            return result;
        }
		#region khachHangHoang
		#endregion
		#region KhachHangKien
		[HttpGet("getBySDT")]
		public async Task<IActionResult> GetBySDT(string sdt)
		{
            var diachinull = "";
			var khachhang = _khachHangService.GetBySDT(sdt);
			var diachi = await _dbcontext.diaChiKhachHangs.FirstOrDefaultAsync(p => p.KhachHangID == khachhang.IDKhachHang && p.TrangThai == 1);
			if(diachi == null) return Ok(new { khachhang, diachinull });
			return Ok(new {khachhang,diachi.DiaChi});
		}

		[Route("PostKHView1")]
		[HttpPost]
		public bool PostKHView1(KhachHangView khv)
		{
			var idkhv = Guid.NewGuid();
			KhachHang kh = new KhachHang();
			kh.IDKhachHang = idkhv;
			kh.Ten = khv.Ten?.Trim();
			kh.Password = khv.Password;
			kh.GioiTinh = khv.GioiTinh;
			kh.NgaySinh = khv.NgaySinh;
			NhanVien nhanvien = _dbcontext.NhanViens.FirstOrDefault(p => p.Email == khv.Email || p.SDT == khv.SDT);
			KhachHang khachhang = _dbcontext.KhachHangs.FirstOrDefault(p => p.Email == khv.Email || p.SDT == khv.SDT);
			if (nhanvien != null || khachhang != null)
			{
				return false;
			}
			kh.Email = khv.Email?.Trim();
			kh.SDT = khv.SDT?.Trim();
			kh.TrangThai = khv.TrangThai;
			kh.DiemTich = khv.DiemTich;
			_dbcontext.KhachHangs.Add(kh);
			GioHang gh = new GioHang();
			gh.IDKhachHang = kh.IDKhachHang;
			gh.NgayTao = DateTime.Now;
			_dbcontext.GioHangs.Add(gh);
			DiaChiKhachHang dckh = new DiaChiKhachHang();
			dckh.Id = Guid.NewGuid();
			dckh.KhachHangID = kh.IDKhachHang;
			dckh.DiaChi = khv.DiaChi?.Trim();
			dckh.TrangThai = 1;
			_dbcontext.diaChiKhachHangs.Add(dckh);
			_dbcontext.SaveChanges();
			return true;
		}

		[HttpGet("checkEmail")]
		public async Task<IActionResult> GetKhachHangByEmail1(string email)
		{
			var temp = await _dbcontext.KhachHangs.FirstOrDefaultAsync(x => x.Email == email);
			var temp1 = await _dbcontext.NhanViens.FirstOrDefaultAsync(x => x.Email == email);
			if (temp != null || temp1 != null)
			{
				return Ok(1);
			}
			return Ok(0);

		}

		[HttpGet("checkSDT")]
		public async Task<IActionResult> GetKhachHangBySDT(string sdt)
		{
			var temp = await _dbcontext.KhachHangs.FirstOrDefaultAsync(x => x.SDT == sdt);
			var temp1 = await _dbcontext.NhanViens.FirstOrDefaultAsync(x => x.SDT == sdt);
			if (temp != null || temp1 != null)
			{
				return Ok(1);
			}
			return Ok(0);

		}

        [HttpPut("updatekhachhang")]
        public async Task<IActionResult> UpdateKhachHangBySDT(Guid id, KhachHangAddView khachHang)
		{

            var check = await _dbcontext.KhachHangs.FindAsync(id);
			if (check == null)
			{
				return NotFound("Khách hàng không tồn tại");
			}
			check.Ten = khachHang.Ten;
            check.GioiTinh = khachHang.GioiTinh;
            check.NgaySinh = khachHang.NgaySinh;
			if(check.Email == khachHang.Email)
            {
				check.Email = khachHang.Email;
			}
			else
			{
                var checkEmail = _dbcontext.KhachHangs.FirstOrDefault(p => p.Email == khachHang.Email);
                var checkEmailNv = _dbcontext.NhanViens.FirstOrDefault(p => p.Email == khachHang.Email);
                if (checkEmail != null || checkEmailNv != null)
                {
                    return Ok("Email đã tồn tại");
					
				}
				check.Email = khachHang.Email;
			};
			if (check.SDT == khachHang.SDT)
			{
				check.SDT = khachHang.SDT;
			}
			else
			{
				var checksdt = _dbcontext.KhachHangs.FirstOrDefault(p => p.SDT == khachHang.SDT);
                var checksdtNv = _dbcontext.NhanViens.FirstOrDefault(p => p.SDT == khachHang.SDT);
             
                if (checksdt != null || checksdtNv != null )
				{
					return Ok("SĐT đã tồn tại");

				}
				check.SDT = khachHang.SDT;
			};

			var diachi = await _dbcontext.diaChiKhachHangs.FirstOrDefaultAsync(p => p.KhachHangID == id && p.TrangThai == 1);
			if(diachi != null)
			{
				diachi.DiaChi = khachHang.DiaChi;
				_dbcontext.diaChiKhachHangs.Update(diachi);
			}
			else
			{
                DiaChiKhachHang dcKhangHang = new DiaChiKhachHang();
				dcKhangHang.Id = Guid.NewGuid();
                dcKhangHang.KhachHangID = id;
				dcKhangHang.DiaChi = khachHang.DiaChi;
                dcKhangHang.TrangThai = 1;
				await _dbcontext.diaChiKhachHangs.AddAsync(dcKhangHang);
			}

			 _dbcontext.KhachHangs.Update(check);
			await _dbcontext.SaveChangesAsync();
			return Ok("Update thành công");
		}
		#endregion
	}
}
