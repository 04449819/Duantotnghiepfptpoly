using ShopOnlineModel.Entities;

namespace API.IServices
{
    public interface IChiTietHoaDonService
    {
        public List<ChiTietHoaDon> GetAll();
        public Task<bool> SaveCTHoaDon();
        public Task<bool> UpdateSL(Guid id, int sl);
        public Task<bool> DeleteCTHoaDon(Guid id);
        public Task GetHDCTByIdHD(Guid idHD);
    }
}
