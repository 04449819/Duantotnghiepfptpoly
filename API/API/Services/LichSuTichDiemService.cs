using API.IServices;
using ShopOnlineModel.Data;
using ShopOnlineModel.Entities;
using ShopOnlineModel.Repositories;
using ShopOnlineModel.Repositories.Contracts;

namespace API.Services
{
    public class LichSuTichDiemService : ILichSuTichDiemService
    {
        private readonly IAllRepository<LichSuTichDiem> repos;
        ShopOnlineDBContext context = new ShopOnlineDBContext();
        public LichSuTichDiemService()
        {
            repos = new AllRepository<LichSuTichDiem>(context, context.LichSuTichDiems);
        }
        public bool Add(int diem, int trangthai, Guid IdKhachHang, Guid IdQuyDoiDiem, Guid IdHoaDon)
        {
            var lichsu = new LichSuTichDiem();
            lichsu.ID = Guid.NewGuid();
            lichsu.Diem = diem;
            lichsu.TrangThai = trangthai;
            lichsu.IDKhachHang = IdKhachHang;
            lichsu.IDQuyDoiDiem = IdQuyDoiDiem;
            lichsu.IDHoaDon = IdHoaDon;
            return repos.Add(lichsu);
        }

        public bool Delete(Guid Id)
        {
            var lichsu = repos.GetAll().First(x => x.ID == Id);
            if (lichsu != null)
            {

                return repos.Delete(lichsu);
            }
            else
            {
                return false;
            }
        }

        public List<LichSuTichDiem> GetAll()
        {
            return repos.GetAll();
        }

        public LichSuTichDiem GetById(Guid Id)
        {
            return repos.GetAll().First(x => x.ID == Id);
        }

        public bool Update(Guid Id, int diem, int trangthai, Guid IdKhachHang, Guid IdQuyDoiDiem, Guid IdHoaDon)
        {
            var lichsu = repos.GetAll().First(x => x.ID == Id);
            if (lichsu != null)
            {
                lichsu.Diem = diem;
                lichsu.TrangThai = trangthai;
                lichsu.IDKhachHang = IdKhachHang;
                lichsu.IDQuyDoiDiem = IdQuyDoiDiem;
                lichsu.IDHoaDon = IdHoaDon;
                return repos.Update(lichsu);
            }
            else
            {
                return false;
            }
        }
    }
}
