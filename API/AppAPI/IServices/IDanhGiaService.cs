using AppData.Models;
using AppData.ViewModels;
using AppData.ViewModels.BanOffline;

namespace AppAPI.IServices
{
    public interface IDanhGiaService
    {
        Task<bool> SaveDanhgia(Danhgiamodel danhgia);
        Task<List<ChiTietHoaDon>> GetHDCTDaDanhGia(Guid idkh);
        Task<List<ChiTietHoaDon>> GetHDCTChuaDanhGia(Guid idkh);
        Task<List<DanhGiaViewModel>> GetDanhGiaByIdSanPham(Guid idsp);
        Task<List<DanhGiaViewModel>> GetDanhGiaByIdBthe(Guid idbt);
        Task<bool> AnDanhGia(Guid id);
        public bool UpdateDanhGia(Guid idCTHD,int soSao,string binhLuan);
        Task<List<DanhGia>> GetAllUnrespondedReview();
        public List<DanhGia> GetAll();
        Task<bool> ReplyPhanHoi(Guid idDanhGia, string phanHoi);
    }
}
