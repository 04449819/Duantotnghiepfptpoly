using API.IServices;
using ShopOnlineModel.Data;
using ShopOnlineModel.Entities;
using ShopOnlineModel.Repositories;
using ShopOnlineModel.Repositories.Contracts;

namespace API.Services
{
    public class ChiTietGioHangService : IChiTietGioHangService
    {
        private readonly IAllRepository<ChiTietGioHang> repos;
        private readonly IAllRepository<ChiTietSanPham> chitietsanphams;
        ShopOnlineDBContext context = new ShopOnlineDBContext();
        public ChiTietGioHangService()
        {
            repos = new AllRepository<ChiTietGioHang>(context, context.ChiTietGioHangs);
            chitietsanphams = new AllRepository<ChiTietSanPham>(context, context.ChiTietSanPhams);
        }

        public string Add(Guid idCTSP, Guid idKhacHang, int soluong)
        {
            ChiTietGioHang ctgh = new ChiTietGioHang();
            ctgh.ID = Guid.NewGuid();
            ctgh.IDCTSP = idCTSP;
            ctgh.IDNguoiDung = idKhacHang;
            ctgh.SoLuong = soluong;
            if (repos.GetAll().Exists(p => p.IDCTSP == idCTSP && p.IDNguoiDung == idKhacHang))
            {
                Guid id = repos.GetAll().Find(p => p.IDCTSP == idCTSP && p.IDNguoiDung == idKhacHang).IDNguoiDung;
                ChiTietGioHang ctgh1 = repos.GetAll().Find(p => p.IDCTSP == idCTSP && p.IDNguoiDung == idKhacHang);
                if(ctgh.SoLuong + soluong > chitietsanphams.GetAll().Find(p => p.ID == idCTSP).SoLuong)
                {
                    return "so luong trong kho khong du";
                }
                else
                {
                    ctgh1.SoLuong = ctgh1.SoLuong + soluong;
                    return repos.Update(ctgh1).ToString();
                }
            }
            else
            {
                return repos.Add(ctgh).ToString();
            }
        }

        public bool Delete(Guid id)
        {
            var ctgh = repos.GetAll().FirstOrDefault(x => x.ID == id);
            if(ctgh != null)
            {
               return repos.Delete(ctgh);
            }
            return false;
        }

        public List<ChiTietGioHang> GetAll()
        {
            return repos.GetAll().ToList();
        }

        public ChiTietGioHang GetById(Guid id)
        {
            return repos.GetAll().FirstOrDefault(x => x.ID == id);
        }

        public string Update(Guid id, Guid idCTSP, Guid idKhachHang, int soluong)
        {
            var chiTietGioHang = repos.GetAll().FirstOrDefault(x => x.ID == id);
            if (chiTietGioHang != null)
            {
                chiTietGioHang.IDCTSP = idCTSP;
                chiTietGioHang.IDNguoiDung = idKhachHang;
                chiTietGioHang.SoLuong = soluong;
                if (repos.GetAll().Exists(x => x.IDCTSP == idCTSP && x.IDNguoiDung == idKhachHang))
                {

                    ChiTietGioHang chiTietGioHang1 = repos.GetAll().Find(p => p.IDCTSP == idCTSP && p.IDNguoiDung == idKhachHang);
                    if (chiTietGioHang1.SoLuong > chitietsanphams.GetAll().Find(x => x.ID == idCTSP).SoLuong)
                    {
                        return "so luong trong kho khong du";
                    }
                    else
                    {
                        chiTietGioHang1.SoLuong = soluong;
                        return repos.Update(chiTietGioHang1).ToString();
                    }
                }
                else
                {
                    return repos.Update(chiTietGioHang).ToString();
                }
            }
            else
            {
                return "";
            }
        }
    }
}
