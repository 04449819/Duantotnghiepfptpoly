using API.IServices;
using Microsoft.EntityFrameworkCore;
using ShopOnlineModel.Data;
using ShopOnlineModel.Entities;

namespace API.Services
{
    public class QLThuocTinhService : IQLThuocTinhService
    {
        private readonly ShopOnlineDBContext context;
        public QLThuocTinhService()
        {
            context = new ShopOnlineDBContext();
        }
        public async Task<ChatLieu> AddChatLieu(string ten, int trangthai)
        {
            try
            {
                var existingColor = await context.ChatLieus.FirstOrDefaultAsync(x => x.Ten.Trim().ToUpper() == ten.Trim().ToUpper());
                if (existingColor != null)
                {
                    return null;
                }
                ChatLieu kc = new ChatLieu()
                {
                    ID = Guid.NewGuid(),
                    Ten = ten,
                    TrangThai = 1
                };
                context.ChatLieus.Add(kc);
                context.SaveChanges();
                return kc;

            }
            catch (Exception)
            {

                throw;

            }
        }

        public async Task<KichCo> AddKichCo(string ten, int trangthai)
        {
            try
            {
                var existingColor = await context.KichCos.FirstOrDefaultAsync(x => x.Ten.Trim().ToUpper() == ten.Trim().ToUpper());
                if (existingColor != null)
                {
                    return null;
                }
                KichCo kc = new KichCo()
                {
                    ID = Guid.NewGuid(),
                    Ten = ten,
                    TrangThai = 1
                };
                context.KichCos.Add(kc);
                context.SaveChanges();
                return kc;
            }
            catch (Exception)
            {

                throw;
            }
        }

        public async Task<MauSac> AddMauSac(string ten, string ma, int trangthai)
        {
            try
            {
                var existingColor = await context.MauSacs.FirstOrDefaultAsync(x => x.Ten.Trim().ToUpper() == ten.Trim().ToUpper());
                if (existingColor != null)
                {
                    return null;
                }
                bool isHasHash = ma.StartsWith("#");
                MauSac kc = new MauSac()
                {
                    ID = Guid.NewGuid(),
                    Ten = ten,
                    Ma = isHasHash ? ma : $"#{Uri.EscapeDataString(ma)}",
                    TrangThai = 1
                };
                context.MauSacs.Add(kc);
                context.SaveChanges();
                return kc;
            }
            catch (Exception)
            {
                throw;
            }
        }

        public async Task<bool> DeleteChatLieu(Guid id)
        {
            try
            {
                var nv = await context.ChatLieus.FirstOrDefaultAsync(nv => nv.ID == id);
                if (nv != null)
                {
                    context.ChatLieus.Remove(nv);
                    context.SaveChanges();
                    return true;
                }
                return false;
            }
            catch (Exception)
            {

                throw;
            }
        }

        public async Task<bool> DeleteKichCo(Guid id)
        {
            try
            {
                var nv = await context.KichCos.FirstOrDefaultAsync(nv => nv.ID == id);
                if (nv != null)
                {
                    context.KichCos.Remove(nv);
                    context.SaveChanges();
                    return true;
                }
                return false;
            }
            catch (Exception) { throw; }
        }

        public async Task<bool> DeleteMauSac(Guid id)
        {
            try
            {
                var nv = await context.MauSacs.FirstOrDefaultAsync(nv => nv.ID == id);
                if (nv != null)
                {
                    context.MauSacs.Remove(nv);
                    context.SaveChanges();
                    return true;
                }
                return false;
            }
            catch (Exception)
            {

                throw;

            }
        }

        public async Task<List<ChatLieu>> GetAllChatLieu()
        {
            try
            {
                return await context.ChatLieus.OrderByDescending(x => x.TrangThai).ToListAsync();
            }
            catch (Exception)
            {

                throw;

            }
        }

        public async Task<List<KichCo>> GetAllKichCo()
        {
            try
            {
                return await context.KichCos.OrderByDescending(x => x.TrangThai).ToListAsync();
            }
            catch (Exception) { throw; }
        }

        public async Task<List<MauSac>> GetAllMauSac()
        {
            try
            {
                return await context.MauSacs.OrderByDescending(x => x.TrangThai).ToListAsync();
            }
            catch (Exception)
            {

                throw;
            }
        }

        public async Task<ChatLieu> GetChatLieuById(Guid id)
        {
            try
            {
                var nv = await context.ChatLieus.FirstOrDefaultAsync(nv => nv.ID == id);
                return nv;
            }
            catch (Exception)
            {

                throw;
            }
        }

        public async Task<KichCo> GetKickCoById(Guid id)
        {
            var nv = await context.KichCos.FirstOrDefaultAsync(nv => nv.ID == id);
            return nv;
        }

        public async Task<MauSac> GetMauSacById(Guid id)
        {
            try
            {
                var nv = await context.MauSacs.FirstOrDefaultAsync(nv => nv.ID == id);
                return nv;
            }
            catch (Exception) { throw; }
        }

        public async Task<ChatLieu> UpdateChatLieu(Guid id, string ten, int trangthai)
        {
            try
            {
                var nv = await context.ChatLieus.FirstOrDefaultAsync(x => x.ID == id);
                if (nv != null)
                {
                    var existingColor = await context.ChatLieus.FirstOrDefaultAsync(x => x.Ten.Trim().ToUpper() == ten.Trim().ToUpper());
                    if (existingColor != null)
                    {
                        return null; // Trả về null để báo hiệu tên trùng
                    }
                    nv.Ten = ten;
                    nv.TrangThai = 1;
                    context.ChatLieus.Update(nv);
                    context.SaveChanges();
                    return nv;
                }

                return null;
            }
            catch (Exception)
            {

                throw;
            }
        }

        public async Task<KichCo> UpdateKichCo(Guid id, string ten, int trangthai)
        {
            try
            {
                var nv = await context.KichCos.FirstOrDefaultAsync(x => x.ID == id);
                if (nv != null)
                {
                    var existingColor = await context.KichCos.FirstOrDefaultAsync(x => x.Ten.Trim().ToUpper() == ten.Trim().ToUpper());
                    if (existingColor != null)
                    {
                        return null; // Trả về null để báo hiệu tên trùng
                    }
                    nv.Ten = ten;
                    nv.TrangThai = 1;
                    context.KichCos.Update(nv);
                    context.SaveChanges();
                    return nv;
                }

                return null;
            }
            catch (Exception)
            {

                throw;
            }
        }

        public async Task<MauSac> UpdateMauSac(Guid id, string ten, string ma, int trangthai)
        {
            try
            {
                var nv = await context.MauSacs.FirstOrDefaultAsync(x => x.ID == id);
                if (nv != null)
                {
                    var existingColor = await context.MauSacs.FirstOrDefaultAsync(x => x.Ten.Trim().ToUpper() == ten.Trim().ToUpper());
                    if (existingColor != null)
                    {
                        return null;
                    }
                    bool isHasHash = ma.StartsWith("#");
                    nv.Ten = ten;
                    nv.Ma = isHasHash ? ma : $"#{Uri.EscapeDataString(ma)}";
                    nv.TrangThai = 1;
                    context.MauSacs.Update(nv);
                    context.SaveChanges();
                    return nv;
                }

                return null;

            }
            catch (Exception)
            {

                throw;
            }
        }
    }
}
