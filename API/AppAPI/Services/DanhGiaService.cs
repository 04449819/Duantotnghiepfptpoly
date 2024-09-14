using AppAPI.IServices;
using AppData.IRepositories;
using AppData.Models;
using AppData.Repositories;
using AppData.ViewModels;
using Microsoft.EntityFrameworkCore;

namespace AppAPI.Services
{
    public class DanhGiaService : IDanhGiaService
    {
        private readonly AssignmentDBContext _context;
        private readonly IAllRepository<DanhGia> reposDanhGia;
        public DanhGiaService()
        {
            _context = new AssignmentDBContext();
            reposDanhGia = new AllRepository<DanhGia>(_context, _context.DanhGias);
        }

        public async Task<bool> AnDanhGia(Guid id)
        {
            try
            {
                var dg = await _context.DanhGias.FindAsync(id);
                dg.TrangThai = 3;
                _context.DanhGias.Update(dg);
                await _context.SaveChangesAsync();
                return true;
            }catch(Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }

        public async Task<List<DanhGia>> GetAllUnrespondedReview()
        {
            return await _context.DanhGias
                .Where(x => x.phanHoi == null && (x.BinhLuan != null || x.Sao != null))
                .Include(x => x.ChiTietHoaDon)
                .ToListAsync();
        }
        public  List<DanhGia> GetAll()
        {
            return  _context.DanhGias
                .Include(x => x.ChiTietHoaDon)
                .ToList();
        }
        public async Task<bool> ReplyPhanHoi(Guid idCTHD, string phanHoi)
        {
            try
            {
                DanhGia danhGia = _context.DanhGias.FirstOrDefault(p => p.ID == idCTHD);
                if (danhGia == null)
                {
                    // Không tìm thấy đánh giá với idCTHD tương ứng
                    return false;
                }
                danhGia.phanHoi = phanHoi;
                reposDanhGia.Update(danhGia);
                return true;

            }
            catch (Exception ex)
            {

                // Ghi log lỗi hoặc xử lý lỗi
                Console.WriteLine($"An error occurred: {ex.Message}");
                return false;
            }

        }

        public async Task<List<DanhGiaViewModel>> GetDanhGiaByIdBthe(Guid idbt)
        {
            //var result = await (from dg in _context.DanhGias
            //                    join kh in _context.KhachHangs
            //                    on dg.IDKhachHang equals kh.IDKhachHang
            //                    join bt in _context.BienThes on dg.IDBienThe equals bt.ID
            //                    where bt.ID == idbt && dg.TrangThai != 3
            //                    select new DanhGiaViewModel()
            //                    {
            //                        ID = dg.ID,
            //                        Sao = dg.Sao,
            //                        BinhLuan = dg.BinhLuan,
            //                        TenKH = kh.Ten,
            //                        IDBienThe = dg.IDBienThe,
            //                    }).ToListAsync();
            //return result;
            throw new NotImplementedException();
        }
        public async Task<List<DanhGiaViewModel>> GetDanhGiaByIdSanPham(Guid idsp)
        {
            var query = await (from sp in _context.SanPhams.Where(p => p.ID == idsp)
                               join ctsp in _context.ChiTietSanPhams on sp.ID equals ctsp.IDSanPham
                               join cthd in _context.ChiTietHoaDons on ctsp.ID equals cthd.IDCTSP
                               join dg in _context.DanhGias.Where(p => p.TrangThai == 1) on cthd.ID equals dg.ID
                               join hd in _context.HoaDons on cthd.IDHoaDon equals hd.ID
                               //join lstd in _context.LichSuTichDiems on hd.ID equals lstd.IDHoaDon
                               // kh in _context.KhachHangs on lstd.IDKhachHang equals kh.IDKhachHang
                               join cl in _context.ChatLieus on sp.IDChatLieu equals cl.ID
                               join ms in _context.MauSacs on ctsp.IDMauSac equals ms.ID
                               join kc in _context.KichCos on ctsp.IDKichCo equals kc.ID
                               select new DanhGiaViewModel()
                               {
                                   ID = dg.ID,
                                   Sao = dg.Sao,
                                   BinhLuan = dg.BinhLuan,
                                   TrangThai = dg.TrangThai,
                                   TenKH = _context.KhachHangs.FirstOrDefault(p=>p.IDKhachHang == _context.LichSuTichDiems.FirstOrDefault(p=>p.IDHoaDon == hd.ID).IDKhachHang).Ten,
                                   ChatLieu = cl.Ten,
                                   MauSac = ms.Ten,
                                   KichCo = kc.Ten,
                                   NgayDanhGia = dg.NgayDanhGia
                               }).ToListAsync();
            return query;
            throw new NotImplementedException();
        }

        public async Task<List<ChiTietHoaDon>> GetHDCTChuaDanhGia(Guid idkh)
        {
            var query = await (from kh in _context.KhachHangs
                               join lstd in _context.LichSuTichDiems on kh.IDKhachHang equals lstd.IDKhachHang
                               join hd in _context.HoaDons on lstd.IDHoaDon equals hd.ID
                               join hdct in _context.ChiTietHoaDons on hd.ID equals hdct.IDHoaDon
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
            var query = await (from kh in _context.KhachHangs
                               join lstd in _context.LichSuTichDiems on kh.IDKhachHang equals lstd.IDKhachHang
                               join hd in _context.HoaDons on lstd.IDHoaDon equals hd.ID
                               join hdct in _context.ChiTietHoaDons on hd.ID equals hdct.IDHoaDon
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

        public async Task<bool> SaveDanhgia(Danhgiamodel danhgia)
        {
            if (danhgia == null)
            {
                throw new ArgumentNullException(nameof(danhgia));
            }

            // Chuyển đổi ViewModel thành Entity Model
            var danhGia = new DanhGia
            {
                ID= danhgia.IDcthd,
                BinhLuan = danhgia.BinhLuan,
                Sao = danhgia.Sao,
                NgayDanhGia = danhgia.NgayDanhGia,
                phanHoi = danhgia.PhanHoi,
                TrangThai = danhgia.TrangThai,
            };

            try
            {
                // Lưu vào cơ sở dữ liệu
                _context.DanhGias.Add(danhGia);
                await _context.SaveChangesAsync();
                return true; // Trả về true nếu lưu thành công
            }
            catch (Exception)
            {
                // Xử lý ngoại lệ nếu cần (ghi log, thông báo lỗi, v.v.)
                return false; // Trả về false nếu có lỗi
            }
        }

        //public async Task<Danhgiamodel> SaveDanhGia(Danhgiamodel danhGia)
        //{
        //    try
        //    {

        //            //// Nếu không tìm thấy đánh giá, tạo một đánh giá mới
        //            //var newDanhGia = new Danhgiamodel
        //            //{
        //            //    ID = danhGia.ChiTietHoaDonID, // Tạo GUID mới cho đánh giá
        //            //    Sao = danhGia.Sao,
        //            //    BinhLuan = danhGia.BinhLuan,
        //            //    PhanHoi = danhGia.PhanHoi,
        //            //    TrangThai = 0, // Đánh giá mới sẽ có trạng thái là chưa được cập nhật
        //            //    NgayDanhGia = DateTime.UtcNow,
        //            //};

        //            //await _context.DanhGias.AddAsync(newDanhGia);
        //            //await _context.SaveChangesAsync();

        //            //return newDanhGia;

        //    }
        //    catch (Exception ex)
        //    {
        //        throw new Exception("Có lỗi xảy ra khi lưu đánh giá: " + ex.Message, ex);
        //    }
        //}




        public bool UpdateDanhGia(Guid idCTHD, int soSao, string binhLuan)
        {
            try
            {
                // Kiểm tra reposDanhGia có được khởi tạo không
                if (reposDanhGia == null)
                {
                    throw new InvalidOperationException("Repository is not initialized.");
                }

                // Lấy danh sách đánh giá và tìm đối tượng danhGia
                DanhGia danhGia = reposDanhGia.GetAll().FirstOrDefault(p => p.ID == idCTHD);

                // Kiểm tra danhGia có phải là null không
                if (danhGia == null)    
                {
                    // Không tìm thấy đánh giá với idCTHD tương ứng
                    return false;
                }

                // Cập nhật thông tin của danhGia
                danhGia.BinhLuan = binhLuan;
                danhGia.Sao = soSao;
                danhGia.NgayDanhGia = DateTime.Now;
                danhGia.TrangThai = 1;

                // Cập nhật vào cơ sở dữ liệu
                reposDanhGia.Update(danhGia);
                return true;
            }
            catch (Exception ex)
            {
                // Ghi log lỗi hoặc xử lý lỗi
                Console.WriteLine($"An error occurred: {ex.Message}");
                return false;
            }
        }


    }
}
