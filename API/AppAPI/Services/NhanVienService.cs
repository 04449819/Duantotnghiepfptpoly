﻿using AppAPI.IServices;
using AppData.IRepositories;
using AppData.Models;
using AppData.Repositories;
using AppData.ViewModels;
using Microsoft.EntityFrameworkCore;
using System.ComponentModel.DataAnnotations;

namespace AppAPI.Services
{
    public class NhanVienService : INhanVienService
    {
        private readonly
        AssignmentDBContext _dbContext;

        public NhanVienService()
        {
            _dbContext = new AssignmentDBContext();
        }

        public bool Delete(Guid id)
        {

            try
            {
                var nv = _dbContext.NhanViens.FirstOrDefault(nv => nv.ID == id);
                if (nv != null)
                {
                    _dbContext.NhanViens.Remove(nv);
                    _dbContext.SaveChanges();
                    return true;
                }
                return false;
            }
            catch (Exception)
            {

                throw;
            }
        }

        public List<NhanVien> GetAll()
        {
            try
            {
                return _dbContext.NhanViens
                        .Include(u => u.VaiTro)
                        .Where(u => u.VaiTro.Ten == "Nhân viên")
                        .OrderByDescending(u => u.TrangThai)
                        .ToList();
            }
            catch (Exception)
            {

                throw;
            }
        }

        public bool Update(Guid id, string ten, string email, string password, string sdt, string diachi, int trangthai, Guid idvaitro)
        {
            try
            {
                var nv = _dbContext.NhanViens.FirstOrDefault(x => x.ID == id);
                if (nv != null)
                {
                    nv.Ten = ten;
                    nv.Email = email;
                    nv.PassWord = password;
                    nv.SDT = sdt;
                    nv.DiaChi = diachi;
                    nv.TrangThai = trangthai;
                    nv.IDVaiTro = idvaitro;
                    _dbContext.NhanViens.Update(nv);
                    _dbContext.SaveChanges();
                    return true;
                }
                return false;

            }
            catch (Exception)
            {

                throw;
            }
        }
        private string MaHoaMatKhau(string matKhau)
        {
            // Ở đây, bạn có thể sử dụng bất kỳ phương thức mã hóa mật khẩu nào phù hợp
            // Ví dụ: sử dụng thư viện BCrypt.Net để mã hóa mật khẩu
            var hashedPassword = BCrypt.Net.BCrypt.HashPassword(matKhau);
            return hashedPassword;

            // Đây chỉ là ví dụ đơn giản, không nên sử dụng trong môi trường thực tế
            //return matKhau;
        }
        public async Task<NhanVien> Add(string ten, string email, string password, string sdt, string diachi, int trangthai, Guid idVaiTro)
        {
            try
            {
                var check = await _dbContext.NhanViens.FirstOrDefaultAsync(x => x.Email.Trim().ToUpper() == email.Trim().ToUpper() || x.SDT.Trim().ToUpper() == sdt.Trim().ToUpper());
                var check1 = await _dbContext.KhachHangs.FirstOrDefaultAsync(x => x.Email.Trim().ToUpper() == email.Trim().ToUpper() || x.SDT.Trim().ToUpper() == sdt.Trim().ToUpper());
                if (check != null || check1 != null)
                {
                    return null;
                }
                var vt = _dbContext.VaiTros.FirstOrDefault(x => x.Ten == "Nhân viên");
                var nv = new NhanVien();
                nv.ID = Guid.NewGuid();
                nv.Ten = ten;
                nv.Email = email;
                nv.PassWord = password;
                nv.SDT = sdt;
                nv.DiaChi = diachi;
                nv.TrangThai = trangthai;
                nv.IDVaiTro = vt.ID;
                _dbContext.NhanViens.Add(nv);
                _dbContext.SaveChanges();
                return nv;
            }
            catch (Exception)
            {

                throw;
            }
        }

        public NhanVien GetById(Guid id)
        {
            try
            {
                var nv = _dbContext.NhanViens.FirstOrDefault(nv => nv.ID == id);
                return nv;
            }
            catch (Exception)
            {

                throw;
            }
        }

        public async Task<(List<NhanVien>, int)> GetAll(int pageIndex, int pageSize)
        {
        var offset = (pageIndex - 1) * pageSize;
            var totalRecords = await _dbContext.NhanViens.CountAsync();
            var totalPages = (int)Math.Ceiling(totalRecords / (double)pageSize);

            var NhanVien = await (from nv in _dbContext.NhanViens
                                  .Where (p => p.IDVaiTro.ToString() == "952C1A5D-74FF-4DAF-BA88-135C5440809C")
                                   select new NhanVien()
                                   {
                                       ID = nv.ID,
                                       Ten = nv.Ten,
                                       Email = nv.Email,
                                       PassWord = nv.PassWord,
                                       SDT = nv.SDT,
                                       DiaChi = nv.DiaChi,
                                       TrangThai = nv.TrangThai,                       
                                   }
                                )
                               .Skip(offset)
                               .Take(pageSize)
                               .ToListAsync();
            return (NhanVien, totalPages);
        }
    }
}
