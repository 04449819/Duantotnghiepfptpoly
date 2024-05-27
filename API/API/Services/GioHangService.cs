using API.IServices;
using ShopOnlineModel.Data;
using ShopOnlineModel.Entities;
using ShopOnlineModel.Repositories;
using ShopOnlineModel.Repositories.Contracts;

namespace API.Services
{
    public class GioHangService : IGioHangService
    {
        private readonly IAllRepository<GioHang> repos;
        private readonly ISanPhamService iSanPhamService;
        ShopOnlineDBContext context = new ShopOnlineDBContext();
        public GioHangService() 
        { 
            repos = new AllRepository<GioHang>(context, context.GioHangs);
            iSanPhamService = new SanPhamService(context);
        }

        public bool Add(Guid idKhachHang, DateTime ngayTao)
        {
            GioHang gioHang = new GioHang();
            gioHang.IDKhachHang = idKhachHang;
            gioHang.NgayTao = ngayTao;
            return repos.Add(gioHang);
        }

        public async Task<bool> AddCart(ChiTietGioHang chiTietGioHang)
        {
            try
            {
                var temp = context.ChiTietGioHangs.FirstOrDefault(x => x.IDNguoiDung == chiTietGioHang.IDNguoiDung && x.IDCTSP == chiTietGioHang.IDCTSP);
                if (temp != null)
                {
                    temp.SoLuong += chiTietGioHang.SoLuong;
                    context.ChiTietGioHangs.Update(temp);
                }
                else
                {
                    context.ChiTietGioHangs.Add(chiTietGioHang);
                }
                await context.SaveChangesAsync();
                return true;
            }
            catch (Exception e)
            {
                return false;
            }
        }

        public bool Delete(Guid id)
        {
            var gioHang = repos.GetAll().FirstOrDefault(x => x.IDKhachHang == id);
            if (gioHang != null)
            {
                return repos.Delete(gioHang);
            }
            else
            {
                return false;
            }
        }

        public async Task<bool> DeleteCart(Guid idNguoiDung)
        {
            try
            {
                var lstChiTietGioHang = context.ChiTietGioHangs.Where(x => x.IDNguoiDung == idNguoiDung).ToList();
                context.ChiTietGioHangs.RemoveRange(lstChiTietGioHang);
                await context.SaveChangesAsync();
                return true;
            }
            catch (Exception e)
            {
                return false;
            }
        }

        public async Task<bool> DeleteCartbyIDCTSP(Guid idctsp, Guid idNguoiDung)
        {
            try
            {
                var lstChiTietGioHang = context.ChiTietGioHangs.Where(x => x.IDNguoiDung == idNguoiDung && x.IDCTSP == idctsp);
                context.ChiTietGioHangs.RemoveRange(lstChiTietGioHang);
                await context.SaveChangesAsync();
                return true;
            }
            catch (Exception e)
            {
                return false;
            }
        }

        public List<GioHang> GetAll()
        {
            return repos.GetAll().ToList();
        }

        public GioHang GetById(Guid id)
        {
            return repos.GetAll().FirstOrDefault(x => x.IDKhachHang == id);
        }

        public bool Update(Guid id, DateTime ngaySua)
        {
            var gioHang = repos.GetAll().FirstOrDefault(x => x.IDKhachHang == id);
            if (gioHang != null)
            {
                gioHang.NgayTao = ngaySua;
                return repos.Update(gioHang);
            }
            else
            {
                return false;
            }
        }

        public async Task<bool> UpdateCart(Guid idctsp, int soluong, Guid idNguoiDung)
        {
            try
            {
                ChiTietGioHang lstChiTietGioHang = context.ChiTietGioHangs.First(x => x.IDNguoiDung == idNguoiDung && x.IDCTSP == idctsp);
                lstChiTietGioHang.SoLuong = soluong;
                context.ChiTietGioHangs.Update(lstChiTietGioHang);
                await context.SaveChangesAsync();
                return true;
            }
            catch (Exception e)
            {
                return false;
            }
        }
    }
}
