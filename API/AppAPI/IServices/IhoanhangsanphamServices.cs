using AppData.Models;
using AppData.ViewModels;

namespace AppAPI.IServices
{
    public interface IhoanhangsanphamServices
    {
        Task<Hoanhangsanpham> CreateAsync(hoanhangviewmodel viewModel);
    }
}
