using AppData.Models;
using AppData.ViewModels.SanPham;

namespace AppAPI.IServices
{
    public interface ILoaiSPService
    {
        #region LoaiSP
        Task<List<LoaiSP>> GetAllLoaiSP(int page, int totalPage, string tenLoaiSP);
        Task<LoaiSP> GetLoaiSPById(Guid id);
        Task<LoaiSP> SaveLoaiSP(LoaiSPRequest lsp);
        Task<bool> DeleteLoaiSP(Guid id);
        bool CheckTrungLoaiSP(LoaiSPRequest lsp);
        Task<LoaiSP> AddSpCha(string ten, int trangthai);
        #endregion
    }
}
