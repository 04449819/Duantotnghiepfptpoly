using AppAPI.IServices;
using AppAPI.Services;
using AppData.Models;
using AppData.ViewModels.SanPham;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace AppAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class LoaiSPController : ControllerBase
    {
        private readonly ILoaiSPService _loaiSPService;
        private readonly AssignmentDBContext context;
        public LoaiSPController()
        {
            _loaiSPService = new LoaiSPService();
            context = new AssignmentDBContext();
        }
        #region LoaiSP
   
        [Route("TimKiemLoaiSP")]
        [HttpGet]
        public async Task<IActionResult> GetAllLoaiSP(string name)
        {
            var tr = context.LoaiSPs.Where(v => v.Ten.Contains(name)).ToList();
            return Ok(tr);
        }

        [HttpGet("getById/{id}")]
        public async Task<IActionResult> GetById(Guid id)
        {
            var lsp = await _loaiSPService.GetLoaiSPById(id);
            if (lsp == null) return BadRequest();
            return Ok(lsp);
        }
        [Route("save")]
        [HttpPost, HttpPut]
        public async Task<IActionResult> SaveLoaiSP(LoaiSPRequest lsp)
        {
            if (lsp == null) return BadRequest();
            var loaiSP = await _loaiSPService.SaveLoaiSP(lsp);
            return Ok(loaiSP);
        }

   

        [HttpGet]
        public async Task<IActionResult> GetLoaiSpTheoCha(Guid id)
        {
            // Lấy danh sách các LoaiSPCha
            var listLoaiSpTheoCha = await context.LoaiSPs
              .Where(lsp => lsp.IDLoaiSPCha == id)
              .ToListAsync();
            if (listLoaiSpTheoCha == null)
            {
                return BadRequest();
            }
            return Ok(listLoaiSpTheoCha);
        }

		#endregion

		#region LoaiSpKien
		[HttpGet("getAll")]
		public async Task<IActionResult> GetAll(int page, int totalPage, string? tenLoaiSP)
		{
			var totalProducts = await context.LoaiSPs.CountAsync();
			int totalPages = (int)Math.Ceiling((double)totalProducts / totalPage);
			var listLsp = await _loaiSPService.GetAllLoaiSP( page,  totalPage, tenLoaiSP);
			return Ok(new { listLsp, totalPages });
		}

		[HttpDelete("delete/{id}")]
		public async Task<IActionResult> DeleteLoaiSP(Guid id)
		{
			var loaiSP = await _loaiSPService.DeleteLoaiSP(id);
			return Ok();
		}

		[HttpPost]
		public async Task<IActionResult> AddLoaiSPCha(string ten, int trangthai)
		{
			var tr = await _loaiSPService.AddSpCha(ten, trangthai);
			if (tr == null) return BadRequest();
			return Ok(tr);
		}

		[HttpPut("updateLoaiSP")]
		public async Task<IActionResult> UpdateLoaiSP(Guid id,string name,int trangThai)
		{
            var dt = await context.LoaiSPs.FindAsync(id);
			if(dt != null)
            {
				if(dt.Ten.ToLower().Trim() == name.ToLower().Trim())
				{
					dt.Ten = name.ToUpper();
				}
				else
				{
                    var check = context.LoaiSPs.FirstOrDefault(p => p.Ten.ToLower().Trim() == name.ToLower().Trim());
					if(check != null)
                    {
                        return NotFound("tên đã tồn tại");
					}
					else
					{
						dt.Ten = name.ToUpper();
					}
				}
				dt.TrangThai = trangThai;
				context.LoaiSPs.Update(dt);
				await context.SaveChangesAsync();
                return Ok("Update thành công");
            }
			return NotFound("không tìm thấy loại sản phẩm");
		}
		#endregion

	}
}
