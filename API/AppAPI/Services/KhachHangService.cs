using AppAPI.IServices;
using AppData.IRepositories;
using AppData.Models;
using AppData.Repositories;
using AppData.ViewModels;
using Microsoft.AspNetCore.JsonPatch.Internal;
using Microsoft.EntityFrameworkCore;

namespace AppAPI.Services
{
    public class KhachHangService : IKhachHangService
    {
        AssignmentDBContext _dbContext = new AssignmentDBContext();
        private readonly IAllRepository<KhachHang> _repos;
        public KhachHangService()
        {
            
            _repos = new AllRepository<KhachHang>(_dbContext, _dbContext.KhachHangs);
        }

        public async Task<KhachHang> Add(KhachHangViewModel nv)
        {
            KhachHang kh = new KhachHang()
            {
                IDKhachHang = Guid.NewGuid(),
                Ten = nv.Name,
                Email = nv.Email,
                Password = nv.Password,
                SDT = nv.SDT,
                

            };
            await _dbContext.KhachHangs.AddAsync(kh);
            //await _dbContext.SaveChangesAsync();
            GioHang gh = new GioHang()
            {
                IDKhachHang = kh.IDKhachHang,
                NgayTao = DateTime.Now,
            };
            await _dbContext.GioHangs.AddAsync(gh);
            await _dbContext.SaveChangesAsync();
            return kh;
        }  
        public bool Delete(Guid id)
        {
            try
            {
                var kh = _dbContext.KhachHangs.FirstOrDefault(x => x.IDKhachHang == id);
                if (kh != null)
                {
                    _dbContext.KhachHangs.Remove(kh);
                    _dbContext.SaveChanges();
                    return true;
                }
                return false;
            }
            catch (Exception)
            {

                return false;
            }
        }


        //public List<KhachHang> GetAll()
        //{
        //    return _dbContext.KhachHangs.ToList();
        //}


        public async Task<(List<KhachHangView>, int)> GetAll(int pageIndex, int pageSize)
        {
            var offset = (pageIndex - 1) * pageSize;
            var totalRecords = await _dbContext.KhachHangs.CountAsync();
            var totalPages = (int)Math.Ceiling(totalRecords / (double)pageSize);

            var khachhang = await (from kh in _dbContext.KhachHangs
                                   select new KhachHangView()
                                   {
                                       IDKhachHang = kh.IDKhachHang,
                                       Ten = kh.Ten,
                                       Password = kh.Password,
                                       GioiTinh = kh.GioiTinh,
                                       NgaySinh = kh.NgaySinh,
                                       Email = kh.Email,
                                       SDT = kh.SDT,
                                       DiemTich = kh.DiemTich,
                                       TrangThai = kh.TrangThai,
                                       DiaChi = _dbContext.diaChiKhachHangs.FirstOrDefault(p => p.KhachHangID == kh.IDKhachHang && p.TrangThai == 1) != null ? _dbContext.diaChiKhachHangs.FirstOrDefault(p => p.KhachHangID == kh.IDKhachHang && p.TrangThai == 1).DiaChi : "chưa cập nhật địa chỉ"
                                   }
                                  )
                                 .Skip(offset)
                                 .Take(pageSize)
                                 .ToListAsync();

            return (khachhang, totalPages);
        }

        public Task<List<KhachHangView>> GetAll()
        {
            throw new NotImplementedException();
        }

        public async Task<List<HoaDon>> GetAllHDKH(Guid idkh)
        {
            return await (from hd in _dbContext.HoaDons.AsNoTracking()
                          join lstd in _dbContext.LichSuTichDiems.AsNoTracking() on hd.ID equals lstd.IDHoaDon into lstdGroup
                          from lstd in lstdGroup.DefaultIfEmpty()
                          join kh in _dbContext.KhachHangs.AsNoTracking() on lstd.IDKhachHang equals kh.IDKhachHang into khGroup
                          from kh in khGroup.DefaultIfEmpty()
                          where kh.IDKhachHang == idkh
                          select hd).ToListAsync();
        }

        public KhachHang GetById(Guid id)
        {

            return _dbContext.KhachHangs.FirstOrDefault(x => x.IDKhachHang == id);

        }

     
        public List<KhachHang> GetKMByName(string Ten)
        {
            throw new NotImplementedException();
        }

        public bool Update(KhachHang khachHang)
		{
            var kh = _dbContext.KhachHangs.FirstOrDefault(x => x.IDKhachHang == khachHang.IDKhachHang);
            if (kh != null)
            {
                kh.Ten = khachHang.Ten;
                kh.SDT = khachHang.SDT;
                kh.Email = khachHang.Email;
                kh.GioiTinh = khachHang.GioiTinh;
                kh.NgaySinh = khachHang.NgaySinh;
                kh.TrangThai = khachHang.TrangThai;
                _dbContext.KhachHangs.Update(kh);
                _dbContext.SaveChanges();
                return true;
            }
            return false;
        }

        //public bool Update(KhachHang khachHang)
        //{
        //    var kh = _dbContext.KhachHangs.FirstOrDefault(x => x.IDKhachHang == khachHang.IDKhachHang);
        //    if (kh != null)
        //    {
        //        kh.Ten = khachHang.Ten;
        //        kh.SDT = khachHang.SDT;
        //        kh.Email = khachHang.Email;
        //        kh.Password = khachHang.Password;
        //        kh.GioiTinh = khachHang.GioiTinh;
        //        kh.DiaChi = khachHang.DiaChi;
        //        kh.NgaySinh = khachHang.NgaySinh;
        //        kh.DiemTich = khachHang.DiemTich;
        //        kh.TrangThai = khachHang.TrangThai;
        //        _dbContext.KhachHangs.Update(kh);
        //        _dbContext.SaveChanges();
        //        return true;
        //    }
        //    return false;
        //}

        #region getbyKhachhangEmailorSĐTkiên    
        public KhachHang GetBySDT(string sdt)
		{
			return _dbContext.KhachHangs.FirstOrDefault(c => c.SDT == sdt || c.Email == sdt);
		}
        #endregion

        #region Tung
        public KhachHang? GetByEmailOrSDT(string email, string sdt)
        {
            return _dbContext.KhachHangs.FirstOrDefault(c =>
                (email != null && c.Email == email)
            );
        }
        public int TongHopDiem(Guid idKhachHang)
        {
            // Lấy lịch sử tích điểm của khách hàng có ID tương ứng
            List<LichSuTichDiem> lichSuTichDiems = _dbContext.LichSuTichDiems
                .Where(ls => ls.IDKhachHang == idKhachHang)
                .ToList();

            // Tính tổng điểm dựa trên các trạng thái
            int diemTich = lichSuTichDiems
                .Select(ls =>
                {
                    switch (ls.TrangThai)
                    {
                        case 1: // Tích điểm
                        case 2: // Cộng điểm do hủy
                        case 4: // Cộng điểm do trả
                            return ls.Diem;
                        case 3: // Trừ điểm do trả
                        case 0: // Tiêu điểm
                            return -ls.Diem;
                        default:
                            return 0;
                    }
                })
                .Sum();

            // Cập nhật điểm tích lũy vào khách hàng
            var khachHang = _dbContext.KhachHangs.FirstOrDefault(kh => kh.IDKhachHang == idKhachHang);
            if (khachHang != null)
            {
                khachHang.DiemTich = diemTich;
                _dbContext.SaveChanges();
            }

            return diemTich;
        }

       

        #endregion

   

    }
}
