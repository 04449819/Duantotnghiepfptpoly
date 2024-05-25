using API.IServices;
using Microsoft.EntityFrameworkCore;
using ShopOnlineModel.Data;
using ShopOnlineModel.Entities;

namespace API.Services
{
    public class KhachHangService : IKhachHangService
    {
        private readonly ShopOnlineDBContext context;
        public KhachHangService()
        {
            context = new ShopOnlineDBContext();
        }

        public bool Delete(Guid id)
        {
            try
            {
                var kh = context.KhachHangs.FirstOrDefault(x => x.IDKhachHang == id);
                if (kh != null)
                {
                    context.KhachHangs.Remove(kh);
                    context.SaveChanges();
                    return true;
                }
                return false;
            }
            catch (Exception)
            {

                return false;
            }
        }

        public List<KhachHang> GetAll()
        {
            return context.KhachHangs.ToList();
        }

        public async Task<List<HoaDon>> GetAllHDKH(Guid idkh)
        {
            return await(from hd in context.HoaDons.AsNoTracking()
                         join lstd in context.LichSuTichDiems.AsNoTracking() on hd.ID equals lstd.IDHoaDon into lstdGroup
                         from lstd in lstdGroup.DefaultIfEmpty()
                         join kh in context.KhachHangs.AsNoTracking() on lstd.IDKhachHang equals kh.IDKhachHang into khGroup
                         from kh in khGroup.DefaultIfEmpty()
                         where kh.IDKhachHang == idkh
                         select hd).ToListAsync();
        }

        public KhachHang GetById(Guid id)
        {
            return context.KhachHangs.FirstOrDefault(x => x.IDKhachHang == id);
        }

        public KhachHang GetBySDT(string sdt)
        {
            return context.KhachHangs.FirstOrDefault(c => c.SDT == sdt || c.Email == sdt);
        }

        public bool Update(KhachHang khachHang)
        {
            var kh = context.KhachHangs.FirstOrDefault(x => x.IDKhachHang == khachHang.IDKhachHang);
            if (kh != null)
            {
                kh.Ten = khachHang.Ten;
                kh.SDT = khachHang.SDT;
                kh.Email = khachHang.Email;
                kh.Password = khachHang.Password;
                kh.GioiTinh = khachHang.GioiTinh;
                kh.DiaChi = khachHang.DiaChi;
                kh.NgaySinh = khachHang.NgaySinh;
                kh.DiemTich = khachHang.DiemTich;
                kh.TrangThai = khachHang.TrangThai;
                context.KhachHangs.Update(kh);
                context.SaveChanges();
                return true;
            }
            return false;
        }
    }
}
