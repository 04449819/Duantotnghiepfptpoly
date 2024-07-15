using AppAPI.IServices;
using AppData.Models;
using AppData.ViewModels.SanPham;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace AppAPI.Services
{
    public class LoaiSPService : ILoaiSPService
    {
        private readonly AssignmentDBContext _context;
        public LoaiSPService()
        {
            _context = new AssignmentDBContext();
        }
        #region LoaiSP
        public async Task<int> DeleteLoaiSP(Guid id)
        {

            try
            {
				var check = await _context.SanPhams.FirstOrDefaultAsync( p => p.IDLoaiSP == id);
                if (check != null) return 0;
				var lsp = await _context.LoaiSPs.FindAsync(id);
                if (lsp == null) return 2;
				// Check LoaiSP đag đc sử dụng k
				_context.LoaiSPs.Remove(lsp);
                await _context.SaveChangesAsync();
                return 1;
            }
            catch (Exception)
            {

                throw;
            }
        }

   

        public async Task<LoaiSP> GetLoaiSPById(Guid id)
        {
            try
            {
                return await _context.LoaiSPs.FindAsync(id);
            }
            catch (Exception)
            {

                throw;
            }
        }

        public async Task<LoaiSP> SaveLoaiSP(LoaiSPRequest lsp)
        {

            try
            {
                var Lsp = await _context.LoaiSPs.FindAsync(lsp.ID);
                //Check tồn tại
                var existingLoaiSP = await _context.LoaiSPs
            .Where(x => x.Ten.ToUpper().Trim() == lsp.Ten.ToUpper().Trim() && x.ID != lsp.ID)
            .FirstOrDefaultAsync();

                // Throw exception if duplicate name found
                if (existingLoaiSP != null)
                {
                    return null;
                }
                if (Lsp != null) //Update
                {
                    Lsp.Ten = lsp.Ten;
                    Lsp.TrangThai = 1;
                    Lsp.IDLoaiSPCha = lsp.IDLoaiSPCha;
                    _context.LoaiSPs.Update(Lsp);
                    await _context.SaveChangesAsync();
                    return Lsp;
                }
                else // Tạo mới
                {
                    LoaiSP loaiSP = new LoaiSP()
                    {
                        ID = new Guid(),
                        Ten = lsp.Ten,
                        IDLoaiSPCha = lsp.IDLoaiSPCha,
                        TrangThai = 1,
                    };
                    await _context.AddAsync(loaiSP);
                    await _context.SaveChangesAsync();
                    return loaiSP;
                }
            }
            catch (Exception)
            {

                throw;
            }
        }

        public bool CheckTrungLoaiSP(LoaiSPRequest lsp)
        {
            try
            {
                var existingColor = _context.LoaiSPs.FirstOrDefaultAsync(x => x.Ten.Trim().ToUpper() == lsp.Ten.Trim().ToUpper() && x.ID != lsp.ID);

                if (existingColor != null)
                {
                    return false;
                }
                return true;
            }
            catch (Exception)
            {

                throw;
            }
        }


		#endregion
		#region LoaiSanPhamKien
		public async Task<List<LoaiSP>> GetAllLoaiSP(int page, int totalPage, string tenLoaiSP)
		{
			if (page < 1 || totalPage < 1)
			{
				throw new ArgumentException("Page and totalPage must be greater than 0");
			}

			try
			{
				var query = _context.LoaiSPs.AsNoTracking();

				if (!string.IsNullOrEmpty(tenLoaiSP))
				{
					tenLoaiSP = tenLoaiSP.ToLower().Trim();
					query = query.Where(p => p.Ten.ToLower().Trim().Contains(tenLoaiSP));
				}

				query = query.OrderByDescending(x => x.TrangThai)
							 .Skip((page - 1) * totalPage)
							 .Take(totalPage);

				return await query.ToListAsync();
			}
			catch (Exception ex)
			{
				// Ghi log lỗi ở đây (nếu cần)
				throw;
			}
		}

		public async Task<LoaiSP> AddSpCha(string ten, int trangthai)
		{
			try
			{
				var check = await _context.LoaiSPs.FirstOrDefaultAsync(x => x.Ten.ToLower().Trim() == ten.ToLower().Trim());
				if (check != null)
				{
					return null;
				}
				LoaiSP kc = new LoaiSP()
				{
					ID = Guid.NewGuid(),
					Ten = ten.ToUpper(),
					TrangThai = trangthai
				};
				await _context.LoaiSPs.AddAsync(kc);
				await _context.SaveChangesAsync();
				return kc;
			}
			catch (Exception)
			{

				throw;
			}
		}
		#endregion
	}
}
