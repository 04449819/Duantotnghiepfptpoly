using ShopOnlineModel.Entities;

namespace API.IServices
{
    public interface IQuyDoiDiemService
    {
        public bool Add(int TiLeTichDiem, int TiLeTieuDiem, int TrangThai);
        public bool Update(Guid Id, int TrangThai);
        public bool Delete(Guid Id);
        public QuyDoiDiem GetById(Guid Id);
        public List<QuyDoiDiem> GetAll();
    }
}
