using API.IServices;
using Microsoft.EntityFrameworkCore;
using ShopOnlineModel.Data;
using ShopOnlineModel.Entities;

namespace API.Services
{
    public class NhanVienService : INhanVienService
    {
        private readonly ShopOnlineDBContext context;
        public NhanVienService()
        {
            context = new ShopOnlineDBContext();
        }

        public async Task<NhanVien> Add(string ten, string email, string password, string sdt, string diachi, int trangthai, Guid idvaitro)
        {
            try
            {
                var check = await context.NhanViens.FirstOrDefaultAsync(x => x.Email.Trim().ToUpper() == email.Trim().ToUpper() || x.SDT.Trim().ToUpper() == sdt.Trim().ToUpper());
                if (check != null)
                {
                    return null;
                }
                var vt = context.VaiTros.FirstOrDefault(x => x.Ten == "Nhân viên");
                var nv = new NhanVien();
                nv.ID = Guid.NewGuid();
                nv.Ten = ten;
                nv.Email = email;
                nv.PassWord = password;  // MaHoaMatKhau(password);
                nv.SDT = sdt;
                nv.DiaChi = diachi;
                nv.TrangThai = 1;
                nv.IDVaiTro = vt.ID;
                context.NhanViens.Add(nv);
                context.SaveChanges();
                return nv;
            }
            catch (Exception)
            {

                throw;
            }
        }

        public bool Delete(Guid id)
        {
            try
            {
                var nv = context.NhanViens.FirstOrDefault(nv => nv.ID == id);
                if (nv != null)
                {
                    context.NhanViens.Remove(nv);
                    context.SaveChanges();
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
                return context.NhanViens
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

        public NhanVien? GetById(Guid id)
        {
            try
            {
                var nv = context.NhanViens.FirstOrDefault(nv => nv.ID == id);
                return nv;
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
                var nv = context.NhanViens.FirstOrDefault(x => x.ID == id);
                if (nv != null)
                {
                    nv.Ten = ten;
                    nv.Email = email;
                    nv.PassWord = password;
                    nv.SDT = sdt;
                    nv.DiaChi = diachi;
                    nv.TrangThai = trangthai;
                    nv.IDVaiTro = idvaitro;
                    context.NhanViens.Update(nv);
                    context.SaveChanges();
                    return true;
                }
                return false;

            }
            catch (Exception)
            {

                throw;
            }
        }
        //private string MaHoaMatKhau(string matKhau)
        //{
        //    // Ở đây, bạn có thể sử dụng bất kỳ phương thức mã hóa mật khẩu nào phù hợp
        //    // Ví dụ: sử dụng thư viện BCrypt.Net để mã hóa mật khẩu
        //    var hashedPassword = BCrypt.Net.BCrypt.HashPassword(matKhau);
        //    return hashedPassword;

        //    // Đây chỉ là ví dụ đơn giản, không nên sử dụng trong môi trường thực tế
        //    //return matKhau;
        //}
    }
}
