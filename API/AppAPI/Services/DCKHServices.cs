using AppAPI.IServices;
using AppData.IRepositories;
using AppData.Models;
using AppData.ViewModels;
using Microsoft.EntityFrameworkCore;
using Org.BouncyCastle.Crypto;
using System;

namespace AppAPI.Services
{
    public class DCKHServices : IDCKHServices
    {
        private readonly AssignmentDBContext _context;

        public DCKHServices()
        {
            _context = new AssignmentDBContext();
        }

        public async Task<DiaChiKhachHang> AddDiaChi(DCKHViewModel request)
        {
            var diaChi = new DiaChiKhachHang
            {
                Id = Guid.NewGuid(),
                KhachHangID = request.KhachHangID,
                DiaChi = request.DiaChi,
                TrangThai = request.TrangThai
            };

           await _context.diaChiKhachHangs.AddAsync(diaChi);
            await _context.SaveChangesAsync();

            return diaChi;
        }

        public bool DeleteDC(Guid id)
        {
            try
            {
                var kh =  _context.diaChiKhachHangs.FirstOrDefault(x => x.Id == id);
                if (kh != null)
                {
                    _context.diaChiKhachHangs.Remove(kh);
                    _context.SaveChanges();
                    return true;
                }
                return false;
            }
            catch (Exception)
            {

                return false;
            };
        }


        public Task<IEnumerable<DiaChiKhachHang>> GetAllDiaChi()
        {
            throw new NotImplementedException();
        }

        public async Task<List<DiaChiKhachHang>> GetChiTietSPBHById(Guid idhd)
        {
            var chiTietHoaDons = await _context.diaChiKhachHangs
                                   .Where(cthd => cthd.KhachHangID == idhd)
                                   /*  .Include(cthd => cthd.HoaDon)*/ // Nạp đối tượng HoaDon liên quan
                                   .ToListAsync(); // Sử dụng ToListAsync() để thực hiện lấy dữ liệu bất đồng bộ

            return chiTietHoaDons;

        }

        public async Task<DiaChiKhachHang> GetDiaChiById(Guid id)
        {
            return await _context.diaChiKhachHangs
                .Include(d => d.KhachHang)
                .FirstOrDefaultAsync(d => d.Id == id);
        }

        public async Task UpdateDiaChi(Guid id, DCKHViewModel request)
        {
            throw new NotImplementedException();
        }
    }
}
