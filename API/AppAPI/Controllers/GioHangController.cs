using AppAPI.IServices;
using AppAPI.Services;
using AppData.Models;
using AppData.ViewModels;
using AppData.ViewModels.SanPham;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Newtonsoft.Json;
using System;
using System.ComponentModel.DataAnnotations;
using System.Runtime.InteropServices;
using System.Threading.Tasks;
using static System.Net.Mime.MediaTypeNames;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace AppAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class GioHangController : ControllerBase
    {
        private readonly IGioHangServices gioHangServices;
		private readonly AssignmentDBContext _dbcontext;
		public GioHangController(IGioHangServices gioHangServices)
        {
            this.gioHangServices = gioHangServices;
            this._dbcontext = new AssignmentDBContext();
        }
        // GET: api/<GioHangController>
        [HttpGet]
        public List<GioHang> Get()
        {
            return gioHangServices.GetAll();
        }

        // GET api/<GioHangController>/5
        [HttpGet("{id}")]
        public GioHang Get(Guid id)
        {
            return gioHangServices.GetById(id);
        }


        // POST api/<GioHangController>
        [HttpPost]
        public bool Post(Guid IdKhachHang, DateTime ngaytao)
        {
            return gioHangServices.Add(IdKhachHang, ngaytao);
        }

        // PUT api/<GioHangController>/5
        [HttpPut("{id}")]
        public bool Put(Guid id, DateTime ngaytao)
        {
            var gioHang = gioHangServices.GetById(id);
            if (gioHang != null)
            {
                return gioHangServices.Update(gioHang.IDKhachHang, ngaytao);
            }
            else
            {
                return false;
            }
        }

        // DELETE api/<GioHangController>/5
        [HttpDelete("{id}")]
        public bool Delete(Guid id)
        {
            var gioHang = gioHangServices.GetById(id);
            if (gioHang != null)
            {
                return gioHangServices.Delete(gioHang.IDKhachHang);
            }
            else
            {
                return false;
            }
        }
        [HttpDelete("Deletebyid")]
        public bool Deletebyidctsp(Guid idctsp, Guid idNguoiDung)
        {
            return gioHangServices.DeleteCartbyIDCTSP(idctsp,idNguoiDung).Result;
        }
        [HttpPut("UpdateCart")]
        public bool UpdateCart(Guid idctsp, int soluong, Guid idNguoiDung)
        {
            return gioHangServices.UpdateCart(idctsp,soluong, idNguoiDung).Result;
        }
        [HttpGet("GetCart")]
        public GioHangViewModel GetCart(string request)
        {
            var lst = JsonConvert.DeserializeObject<List<GioHangRequest>>(request); 
            return gioHangServices.GetCart(lst);
        }
        [HttpGet("GetCartLogin")]
        public GioHangViewModel GetCartLogin(string idNguoiDung)
        {
            return gioHangServices.GetCartLogin(idNguoiDung);
        }
        [HttpPost("AddCart")]
        public bool AddCart(ChiTietGioHang chiTietGioHang)
        {
            return gioHangServices.AddCart(chiTietGioHang).Result;
        }


		#region giohangonl
		[HttpDelete("deleteSaningiohangct")]
		public async Task<IActionResult> GetDSgiohangbyid(Guid idnguoidung, Guid idsp)
		{
            var check = await _dbcontext.ChiTietGioHangs.FirstOrDefaultAsync(p => p.IDNguoiDung == idnguoidung && p.IDCTSP == idsp);
            try
            {
				if (check != null)
				{
					_dbcontext.Remove(check);
					await _dbcontext.SaveChangesAsync();
					return Ok("Đã xóa sản phẩm");
				}
                return BadRequest("Sản phẩm không tồn tại trong giỏ hàng");
			}
            catch (Exception)
            {

                throw;
            }
		}


		[HttpPost("Addchitietgiohang")]
		public async Task<IActionResult> Addchitietgiohang(string idnguoidung,string idctsp,int soluong)
		{
			if (idnguoidung == null || idctsp == null || soluong == null)
			{
				return BadRequest("Dữ liệu đầu vào không hợp lệ");
			}

			var sanPham = await _dbcontext.ChiTietSanPhams.FirstOrDefaultAsync(sp => sp.ID == Guid.Parse(idctsp));
			if (sanPham == null)
			{
				return BadRequest("Không tìm thấy sản phẩm");
			}

			var check = _dbcontext.ChiTietGioHangs.FirstOrDefault(p => p.IDCTSP == Guid.Parse(idctsp) && p.IDNguoiDung == Guid.Parse(idnguoidung));
			if(check != null) { return BadRequest("Sản phẩm đã có trong giỏ hàng"); }

			if (soluong >= sanPham.SoLuong)
			{
				return BadRequest("Số lượng trong kho không đủ");
			}

			try
			{
               
				var ctgh = new ChiTietGioHang
				{
					ID = Guid.NewGuid(),
					SoLuong = soluong,
					IDNguoiDung = Guid.Parse(idnguoidung),
					IDCTSP =Guid.Parse(idctsp)
				};

				await _dbcontext.ChiTietGioHangs.AddAsync(ctgh);
				await _dbcontext.SaveChangesAsync();
				return Ok("Thêm thành công");
			}
			catch (DbUpdateException ex)
			{
				// Log exception details here if necessary
				return StatusCode(StatusCodes.Status500InternalServerError, "Lỗi khi cập nhật cơ sở dữ liệu");
			}
			catch (Exception ex)
			{
				// Log exception details here if necessary
				return StatusCode(StatusCodes.Status500InternalServerError, "Có lỗi xảy ra");
			}
		}




		#endregion




	}
}
