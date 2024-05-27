using API.IServices;
using Microsoft.EntityFrameworkCore;
using ShopOnlineModel.Data;
using ShopOnlineModel.Entities;

namespace API.Services
{
    public class LoaiSanPhamService : ILoaiSanPhamService
    {
        ShopOnlineDBContext context = new ShopOnlineDBContext();
        public LoaiSanPhamService() 
        {
            context = new ShopOnlineDBContext();
        }
        public async Task<LoaiSanPham> AddSpCha(Guid idLoaiSPCha, string ten, int trangthai)
        {
            try
            {
                var check = context.LoaiSPs.FirstOrDefaultAsync(x => x.Ten == ten && x.IDLoaiSPCha != idLoaiSPCha);
                if (check != null)
                {
                    return null;
                }
                LoaiSanPham lsp = new LoaiSanPham()
                {
                    IDLoaiSPCha = Guid.NewGuid(),
                    Ten = ten,
                    TrangThai = 1
                };
                context.LoaiSPs.Add(lsp);
                context.SaveChanges();
                return lsp;
            }
            catch (Exception)
            {

                throw;
            }
        }

        public async Task<bool> DeleteLoaiSP(Guid id)
        {
            try
            {
                var lsp = await context.LoaiSPs.FindAsync(id);
                if (lsp == null) throw new Exception($"Không tìm thấy Loại sản phẩm: {id}");
                // Check LoaiSP đag đc sử dụng k
                if (context.SanPhams.Any(c => c.IDLoaiSP == id)) return false;
                context.LoaiSPs.Remove(lsp);
                await   context.SaveChangesAsync();
                return true;
            }
            catch (Exception)
            {

                throw;
            }
        }

        public async Task<List<LoaiSanPham>> GetAllLoaiSP()
        {
            try
            {
                return await context.LoaiSPs.AsNoTracking().OrderByDescending(x => x.TrangThai).ToListAsync();
            }
            catch (Exception) { throw; }
        }

        public async Task<LoaiSanPham> GetLoaiSPById(Guid id)
        {
            try
            {
                return await context.LoaiSPs.FindAsync(id);
            }
            catch (Exception)
            {

                throw;
            }
        }
    }
}
