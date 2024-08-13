using AppAPI.IServices;
using AppData.IRepositories;
using AppData.Models;
using AppData.ViewModels;
using Microsoft.EntityFrameworkCore;
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

        public Task DeleteDiaChi(Guid id)
        {
            throw new NotImplementedException();
        }

        public Task<IEnumerable<DiaChiKhachHang>> GetAllDiaChi()
        {
            throw new NotImplementedException();
        }

        public async Task<DiaChiKhachHang> GetDiaChiById(Guid id)
        {
            return await _context.diaChiKhachHangs
                .Include(d => d.KhachHang)
                .FirstOrDefaultAsync(d => d.Id == id);
        }

        public Task UpdateDiaChi(Guid id, DCKHViewModel request)
        {
            throw new NotImplementedException();
        }
    }
}
