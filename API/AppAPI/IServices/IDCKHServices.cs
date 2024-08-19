using AppData.Models;
using AppData.ViewModels;

namespace AppAPI.IServices
{
    public interface IDCKHServices
    {
        Task<DiaChiKhachHang> AddDiaChi(DCKHViewModel request);
        Task<DiaChiKhachHang> GetDiaChiById(Guid id);
        Task<IEnumerable<DiaChiKhachHang>> GetAllDiaChi();
        Task UpdateDiaChi(Guid id, DCKHViewModel request);
        Task DeleteDiaChi(Guid id);

    }
}
