﻿using AppData.Models;
using AppData.ViewModels;
using AppData.ViewModels.BanOffline;

namespace AppAPI.IServices
{
    public interface IChiTietHoaDonService
    {
        public List<ChiTietHoaDon> GetAllCTHoaDon();
        public  List<ChiTietHoaDon> GetChiTietSPId(Guid idsp);
        public Task<List<ChiTietHoaDon>> GetChiTietSPBHById(Guid idhd);
        public Task<bool> SaveCTHoaDon(HoaDonChiTietRequest chiTietHoaDon);
        public Task<bool> UpdateSL(Guid id,int sl);
        public Task<bool> DeleteCTHoaDon(Guid id);
        public Task<List<HoaDonChiTietViewModel>> GetHDCTByIdHD(Guid idhd);
        Task<List<ThongTinDGModel>> GetDanhGiaVaKhachHangBySanPhamIdAsync(Guid sanPhamId);

    }
}
