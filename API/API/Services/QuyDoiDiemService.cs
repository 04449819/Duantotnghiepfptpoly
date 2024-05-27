using API.IServices;
using ShopOnlineModel.Data;
using ShopOnlineModel.Entities;
using ShopOnlineModel.Repositories;
using ShopOnlineModel.Repositories.Contracts;

namespace API.Services
{
    public class QuyDoiDiemService : IQuyDoiDiemService
    {
        private readonly IAllRepository<QuyDoiDiem> repos;
        private readonly ShopOnlineDBContext context;
        public QuyDoiDiemService()
        {
            context = new ShopOnlineDBContext();
            repos = new AllRepository<QuyDoiDiem>(context, context.QuyDoiDiems);
        }
        public bool Add(int TiLeTichDiem, int TiLeTieuDiem, int TrangThai)
        {
            var quydoidiem = new QuyDoiDiem();
            quydoidiem.ID = Guid.NewGuid();
            quydoidiem.TiLeTichDiem = TiLeTichDiem;
            quydoidiem.TiLeTieuDiem = TiLeTieuDiem;
            quydoidiem.TrangThai = TrangThai;
            return repos.Add(quydoidiem);
        }

        public bool Delete(Guid Id)
        {
            var quydoidiem = repos.GetAll().FirstOrDefault(x => x.ID == Id);
            if (quydoidiem != null)
            {

                return repos.Delete(quydoidiem);
            }
            else
            {
                return false;
            }
        }

        public List<QuyDoiDiem> GetAll()
        {
            return repos.GetAll();
        }

        public QuyDoiDiem GetById(Guid Id)
        {
            return repos.GetAll().FirstOrDefault(x => x.ID == Id);
        }

        public bool Update(Guid Id, int TrangThai)
        {
            var quydoidiem = repos.GetAll().FirstOrDefault(x => x.ID == Id);
            if (quydoidiem != null)
            {
                //quydoidiem.SoDiem = sodiem;
                //quydoidiem.TiLeTichDiem = TiLeTichDiem;
                //quydoidiem.TiLeTieuDiem = TiLeTieuDiem;
                quydoidiem.TrangThai = TrangThai;
                return repos.Update(quydoidiem);
            }
            else
            {
                return false;
            }
        }
    }
}
