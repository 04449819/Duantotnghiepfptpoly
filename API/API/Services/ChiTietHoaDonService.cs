using API.IServices;
using Microsoft.EntityFrameworkCore;
using ShopOnlineModel.Data;
using ShopOnlineModel.Entities;

namespace API.Services
{
    public class ChiTietHoaDonService : IChiTietHoaDonService
    {
        private readonly ShopOnlineDBContext context;
        public ChiTietHoaDonService()
        {
            context = new ShopOnlineDBContext();
        }
        public async Task<bool> DeleteCTHoaDon(Guid id)
        {
            try
            {
                var exist = context.ChiTietHoaDons.Find(id);
                if (exist == null) throw new Exception($"Không tìm thấy CTHD: {id}");
                //Tăng lại số lượng cho sp
                var ctsp = await context.ChiTietSanPhams.FindAsync(exist.IDCTSP);
                ctsp.SoLuong += exist.SoLuong;
                context.ChiTietSanPhams.Update(ctsp);
                await context.SaveChangesAsync();
                //Xóa đánh giá 
                var danhgia = await context.DanhGias.Where(c => c.ID == id).FirstOrDefaultAsync();
                context.DanhGias.Remove(danhgia);
                await context.SaveChangesAsync();
                context.ChiTietHoaDons.Remove(exist);
                await context.SaveChangesAsync();
                return true;
            }
            catch (Exception ex)
            {
                return false;
            }
        }

        public List<ChiTietHoaDon> GetAll()
        {
            return context.ChiTietHoaDons.ToList();
        }

        public Task GetHDCTByIdHD(Guid idHD)
        {
            throw new NotImplementedException();
        }

        public Task<bool> SaveCTHoaDon()
        {
            throw new NotImplementedException();
        }

        public async Task<bool> UpdateSL(Guid id, int sl)
        {
            try
            {
                var cthd = context.ChiTietHoaDons.Find(id);
                var ctsp = context.ChiTietSanPhams.Find(cthd.IDCTSP);

                var chenhlech = cthd.SoLuong - sl;
                if (chenhlech < 0 && chenhlech * (-1) > ctsp.SoLuong) return false;
                ctsp.SoLuong += chenhlech;
                context.ChiTietSanPhams.Update(ctsp);
                await context.SaveChangesAsync();
                cthd.SoLuong = sl;

                context.ChiTietHoaDons.Update(cthd);
                await context.SaveChangesAsync();
                return true;
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }
    }
}
