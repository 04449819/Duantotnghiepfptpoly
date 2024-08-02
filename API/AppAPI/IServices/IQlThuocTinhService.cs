using AppData.Models;
using AppData.ViewModels.SanPham;

namespace AppAPI.IServices
{
    public interface IQlThuocTinhService
    {
		#region Co ao
		Task<List<CoAo>> GetAllCoAo();
		Task<List<CoAo>> GetAllCoAobyName(string name);
		Task<int> DeleteCoAo(Guid id);

		Task<CoAo> AddCoAo(string ten, int trangthai);

		Task<CoAo> UpdateCoAo(Guid id, string ten, int trangthai);
		#endregion
		#region MauSac
		Task<MauSac> AddMauSac(string ten, string ma, int trangthai);
        Task<MauSac> GetMauSacById(Guid id);
        Task<int> DeleteMauSac(Guid id);
        Task<MauSac> UpdateMauSac(Guid id, string ten, string ma, int trangthai);
        Task<List<MauSac>> GetAllMauSac();

        #endregion
        #region Kich Co
        Task<KichCo> AddKichCo(string ten, int trangthai);
        Task<KichCo> GetKickCoById(Guid id);
        Task<int> DeleteKichCo(Guid id);
        Task<KichCo> UpdateKichCo(Guid id, string ten, int trangthai);
        Task<List<KichCo>> GetAllKichCo();

        #endregion
        #region ChatLieu
        Task<ChatLieu> AddChatLieu(string ten, int trangthai);
        Task<ChatLieu> GetChatLieuById(Guid id);
        Task<int> DeleteChatLieu(Guid id);
        Task<ChatLieu> UpdateChatLieu(Guid id, string ten, int trangthai);
        Task<List<ChatLieu>> GetAllChatLieu();

        #endregion
    }
}
