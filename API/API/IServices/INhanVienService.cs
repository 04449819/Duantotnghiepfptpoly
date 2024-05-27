using ShopOnlineModel.Entities;

namespace API.IServices
{
    public interface INhanVienService
    {
        Task<NhanVien> Add(string ten, string email, string password, string sdt, string diachi, int trangthai, Guid idvaitro);
        public NhanVien? GetById(Guid id);
        public bool Delete(Guid id);
        public bool Update(Guid id, string ten, string email, string password, string sdt, string diachi, int trangthai, Guid idvaitro);
        public List<NhanVien> GetAll();
    }
}
