using ShopOnlineModel.Entities;

namespace API.IServices
{
    public interface IKhachHangService
    {
        //Task<KhachHang> Add(KhachHangViewModel nv);
        public KhachHang GetById(Guid id);
        public KhachHang GetBySDT(string sdt);
        public bool Delete(Guid id);
        public bool Update(KhachHang khachHang);
        public List<KhachHang> GetAll();
        public Task<List<HoaDon>> GetAllHDKH(Guid idkh);
    }
}
