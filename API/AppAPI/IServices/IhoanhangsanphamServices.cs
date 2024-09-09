using AppData.Models;
using AppData.ViewModels;

namespace AppAPI.IServices
{
    public interface IhoanhangsanphamServices
    {
        Task<Hoanhangsanpham> CreateAsync(hoanhangviewmodel viewModel);
        Task<Hoanhangsanpham> UpdateStatusAsync(Guid id, int newStatus);
        Task<IEnumerable<Hoanhangsanpham>> GetAllAsync();
    }
}
