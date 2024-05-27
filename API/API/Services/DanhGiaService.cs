using API.IServices;
using Microsoft.EntityFrameworkCore;
using ShopOnlineModel.Data;
using ShopOnlineModel.Entities;
using ShopOnlineModel.Repositories;
using ShopOnlineModel.Repositories.Contracts;

namespace API.Services
{
    public class DanhGiaService : IDanhGiaService
    {
        private readonly ShopOnlineDBContext context;
        private readonly IAllRepository<DanhGia> repos;
        public DanhGiaService()
        {
            context = new ShopOnlineDBContext();
            repos = new AllRepository<DanhGia>(context, context.DanhGias);
        }

        public async Task<bool> AnDanhGia(Guid id)
        {
            try
            {
                var dg = await context.DanhGias.FindAsync(id);
                dg.TrangThai = 3;
                context.DanhGias.Update(dg);
                await context.SaveChangesAsync();
                return true;
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }

        public async Task<List<ChiTietHoaDon>> GetHDCTChuaDanhGia(Guid idkh)
        {
            var query = await(from kh in context.KhachHangs
                              join lstd in context.LichSuTichDiems on kh.IDKhachHang equals lstd.IDKhachHang
                              join hd in context.HoaDons on lstd.IDHoaDon equals hd.ID
                              join hdct in context.ChiTietHoaDons on hd.ID equals hdct.IDHoaDon
                              where kh.IDKhachHang == idkh && hdct.TrangThai == 3
                              select new ChiTietHoaDon()
                              {
                                  ID = hdct.ID,
                                  IDHoaDon = hdct.ID,
                                  IDCTSP = hdct.IDCTSP,
                                  SoLuong = hdct.SoLuong
                              }).ToListAsync();
            return query;
        }

        public async Task<List<ChiTietHoaDon>> GetHDCTDaDanhGia(Guid idkh)
        {
            var query = await(from kh in context.KhachHangs
                              join lstd in context.LichSuTichDiems on kh.IDKhachHang equals lstd.IDKhachHang
                              join hd in context.HoaDons on lstd.IDHoaDon equals hd.ID
                              join hdct in context.ChiTietHoaDons on hd.ID equals hdct.IDHoaDon
                              where kh.IDKhachHang == idkh && hdct.TrangThai == 4
                              select new ChiTietHoaDon()
                              {
                                  ID = hdct.ID,
                                  IDHoaDon = hdct.ID,
                                  IDCTSP = hdct.IDCTSP,
                                  SoLuong = hdct.SoLuong
                              }).ToListAsync();
            return query;
        }

        public Task<DanhGia> SaveDanhGia(DanhGia danhGia)
        {
            throw new NotImplementedException();
        }

        public  bool UpdateDanhGia(Guid idCTHD, int soSao, string? binhLuan)
        {
            try
            {
                DanhGia danhGia = repos.GetAll().FirstOrDefault(p => p.ID == idCTHD);
                danhGia.BinhLuan = binhLuan;
                danhGia.Sao = soSao;
                danhGia.NgayDanhGia = DateTime.Now;
                danhGia.TrangThai = 1;
                repos.Update(danhGia);
                return true;
            }
            catch (Exception)
            {

                throw;
            }
        }
    }
}
