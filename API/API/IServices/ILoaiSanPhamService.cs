using ShopOnlineModel.Entities;

namespace API.IServices
{
    public interface ILoaiSanPhamService
    {
        Task<List<LoaiSanPham>> GetAllLoaiSP();
        Task<LoaiSanPham> GetLoaiSPById(Guid id);
        //Task<LoaiSanPham> SaveLoaiSP(LoaiSPRequest lsp);
        Task<bool> DeleteLoaiSP(Guid id);
        //bool CheckTrungLoaiSP(LoaiSPRequest lsp);
        Task<LoaiSanPham> AddSpCha(Guid idLoaiSPCha, string ten, int trangthai);
    }
}
