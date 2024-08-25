using AppData.Models;
using AppData.ViewModels;

namespace AppAPI.IServices
{
    public interface IDCKHServices
    {
        Task<DiaChiKhachHang> AddDiaChi(DCKHViewModel request);
        Task<DiaChiKhachHang> GetDiaChiById(Guid id);
        public Task<List<DiaChiKhachHang>> GetChiTietSPBHById(Guid idhd);
        Task<IEnumerable<DiaChiKhachHang>> GetAllDiaChi();
        Task UpdateDiaChi(Guid id, DCKHViewModel request);
        public bool DeleteDC(Guid id);

    }
}
