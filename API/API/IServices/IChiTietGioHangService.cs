using ShopOnlineModel.Entities;

namespace API.IServices
{
    public interface IChiTietGioHangService
    {
        public string Add(Guid idCTSP, Guid idKhacHang, int soluong);
        public ChiTietGioHang GetById(Guid id);
        public string Update(Guid id, Guid idCTSP, Guid idKhachHang, int soluong);
        public List<ChiTietGioHang> GetAll();
        public bool Delete(Guid id);
    }
}
