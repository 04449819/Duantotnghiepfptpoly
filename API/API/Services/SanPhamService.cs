using API.IServices;
using Microsoft.EntityFrameworkCore;
using ShopOnlineModel.Data;
using ShopOnlineModel.Entities;

namespace API.Services
{
    public class SanPhamService : ISanPhamService
    {
        private readonly ShopOnlineDBContext _context;
        public SanPhamService(ShopOnlineDBContext dBContext)
        {
            _context = dBContext;
        }
        #region SanPham
        public async Task<bool> UpdateTrangThaiSanPham(Guid id, int trangThai)
        {
            try
            {
                var sanPham = await _context.SanPhams.FirstAsync(x => x.ID == id);
                sanPham.TrangThai = trangThai;
                _context.SanPhams.Update(sanPham);
                await _context.SaveChangesAsync();
                return true;
            }
            catch
            {
                return false;
            }
        }
        public async Task<bool> AddImageNoColor(Anh anh)
        {
            try
            {
                _context.Anhs.Add(anh);
                await _context.SaveChangesAsync();
                return true;

            }
            catch { return false; }
        }
        public async Task<bool> UpdateImage(Anh anh)
        {
            try
            {
                var temp = _context.Anhs.First(x => x.ID == anh.ID);
                temp.DuongDan = anh.DuongDan;
                _context.Anhs.Update(temp);
                await _context.SaveChangesAsync();
                return true;

            }
            catch { return false; }
        }
        public async Task<bool> DeleteImage(Guid id)
        {
            try
            {
                var temp = _context.Anhs.First(x => x.ID == id);
                if (temp.IDMauSac != null)
                {
                    temp.DuongDan = "";
                    _context.Anhs.Update(temp);
                }
                else _context.Anhs.Remove(temp);
                await _context.SaveChangesAsync();
                return true;

            }
            catch { return false; }
        }
        public Guid GetIDsanPhamByIdCTSP(Guid idctsp)
        {
            var ctsp = _context.ChiTietSanPhams.FirstOrDefault(p => p.ID == idctsp);
            return ctsp.IDSanPham;
        }

        #endregion

        #region ChiTietSanPham
        public async Task<bool> DeleteChiTietSanPham(Guid id)
        {
            try
            {
                var chiTietSanPham = await _context.ChiTietSanPhams.FindAsync(id);
                if (chiTietSanPham.TrangThai != 1)
                {
                    chiTietSanPham.TrangThai = 0;
                    _context.ChiTietSanPhams.Update(chiTietSanPham);
                    await _context.SaveChangesAsync();
                    return true;
                }
                return false;
            }
            catch
            {
                return false;
            }
        }
        public async Task<bool> UpdateSoluongChiTietSanPham(Guid id, int soLuong)
        {
            try
            {
                var chiTietSanPham = _context.ChiTietSanPhams.First(x => x.ID == id);
                chiTietSanPham.SoLuong = soLuong;
                _context.ChiTietSanPhams.Update(chiTietSanPham);
                await _context.SaveChangesAsync();
                return true;
            }
            catch
            {
                return false;
            }
        }
        public Task<bool> UpdateChiTietSanPham(ChiTietSanPham chiTietSanPham)
        {
            throw new NotImplementedException();
        }

        public async Task<int> UpdateGiaBanChiTietSanPham(Guid id, int giaBan)
        {
            try
            {
                var chiTietSanPham = _context.ChiTietSanPhams.First(x => x.ID == id);
                chiTietSanPham.GiaBan = giaBan;
                _context.ChiTietSanPhams.Update(chiTietSanPham);
                await _context.SaveChangesAsync();
                if (chiTietSanPham.IDKhuyenMai != null)
                {
                    var khuyenMai = await _context.KhuyenMais.FirstAsync(x => x.ID == chiTietSanPham.IDKhuyenMai);
                    if (khuyenMai.NgayKetThuc > DateTime.Now && khuyenMai.TrangThai == 1)
                    {
                        giaBan = GetKhuyenMai(khuyenMai.GiaTri, giaBan, khuyenMai.TrangThai);
                    }
                }
                return giaBan;
            }
            catch
            {
                return -1;
            }
        }
        public async Task<bool> UpdateTrangThaiChiTietSanPham(Guid id)
        {
            try
            {
                var chiTietSanPhamNew = _context.ChiTietSanPhams.FirstOrDefault(x => x.ID == id);
                var chiTietSanPhamOld = _context.ChiTietSanPhams.FirstOrDefault(x => (x.TrangThai == 1) && x.IDSanPham == chiTietSanPhamNew.IDSanPham);
                if (chiTietSanPhamOld != null)
                {
                    chiTietSanPhamOld.TrangThai = 2;
                    _context.ChiTietSanPhams.Update(chiTietSanPhamOld);
                }
                if (chiTietSanPhamNew != null)
                {
                    chiTietSanPhamNew.TrangThai = 1;
                    _context.ChiTietSanPhams.Update(chiTietSanPhamNew);
                }
                await _context.SaveChangesAsync();
                return true;
            }
            catch
            {
                return false;
            }
        }
        public async Task<bool> UndoChiTietSanPham(Guid id)
        {
            try
            {
                var chiTietSanPham = await _context.ChiTietSanPhams.FindAsync(id);
                chiTietSanPham.TrangThai = 2;
                _context.ChiTietSanPhams.Update(chiTietSanPham);
                await _context.SaveChangesAsync();
                return true;
            }
            catch
            {
                return false;
            }
        }
        #endregion
        #region LoaiSanPham
        public Task<LoaiSanPham> GetLoaiSPById(Guid id)
        {
            throw new NotImplementedException();
        }
        public async Task<bool> DeleteLoaiSP(Guid id)
        {
            try
            {
                var loaiSP = await _context.LoaiSPs.FindAsync(id);
                loaiSP.TrangThai = 0;
                return true;
            }
            catch
            {
                return false;
            }
        }
        public async Task<List<LoaiSanPham>> GetAllLoaiSPCha()
        {
            return await _context.LoaiSPs.Where(x => x.IDLoaiSPCha == null && x.TrangThai == 1).ToListAsync();
        }
        public async Task<List<LoaiSanPham>?> GetAllLoaiSPCon(string tenLoaiSPCha)
        {
            var loaiSPCha = await _context.LoaiSPs.Where(x => x.IDLoaiSPCha == null).FirstOrDefaultAsync(x => x.Ten == tenLoaiSPCha);
            if (loaiSPCha != null)
            {
                return await _context.LoaiSPs.Where(x => x.IDLoaiSPCha == loaiSPCha.ID && x.TrangThai == 1).ToListAsync();
            }
            else return null;
        }
        public Task<List<ChiTietSanPham>> GetAllChiTietSanPham(Guid idSanPham)
        {
            throw new NotImplementedException();
        }
        #endregion
        #region Other

        public int GetKhuyenMai(int giaTri, int giaSP, int trangThai)
        {
            var tienKhuyenMai = giaSP;
            //var khuyenMai = _context.KhuyenMais.First(x => x.ID == idKhuyenMai);
            if (trangThai == 0)
            {
                tienKhuyenMai -= giaTri;
            }
            else if (trangThai == 1)
            {
                tienKhuyenMai -= (giaTri * giaSP) / 100;
            }
            return tienKhuyenMai < 0 ? 0 : tienKhuyenMai;
        }
        public void DeleteKhuyenMai(Guid id)
        {
            var item = _context.ChiTietSanPhams.First(x => x.ID == id);
            item.IDKhuyenMai = null;
            _context.ChiTietSanPhams.Update(item);
            _context.SaveChanges();
        }
        public async Task<List<ChatLieu>> GetAllChatLieu()
        {
            return await _context.ChatLieus.Where(x => x.TrangThai == 1).ToListAsync();
        }
        public async Task<List<KichCo>> GetAllKichCo()
        {
            return await _context.KichCos.Where(x => x.TrangThai == 1).ToListAsync();
        }
        public async Task<List<MauSac>> GetAllMauSac()
        {
            return await _context.MauSacs.Where(x => x.TrangThai == 1).ToListAsync();
        }
        
        #endregion




















    }
}
