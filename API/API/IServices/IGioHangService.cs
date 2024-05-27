using ShopOnlineModel.Entities;

namespace API.IServices
{
    public interface IGioHangService
    {
        public bool Add(Guid idKhachHang, DateTime ngayTao);
        public bool Update(Guid id, DateTime ngaySua);
        public bool Delete(Guid id);
        public GioHang GetById(Guid id);
        public List<GioHang> GetAll();
        Task<bool> DeleteCartbyIDCTSP(Guid idctsp, Guid idNguoiDung);
        Task<bool> UpdateCart(Guid idctsp, int soluong, Guid idNguoiDung);
        Task<bool> DeleteCart(Guid idNguoiDung);
        Task<bool> AddCart(ChiTietGioHang chiTietGioHang);
        //GioHangViewModel GetCart(List<GioHangRequest> request);
        //GioHangViewModel GetCartLogin(string idNguoiDung);
    }
}
