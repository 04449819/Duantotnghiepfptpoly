using API.IServices;
using ShopOnlineModel.Data;
using ShopOnlineModel.Entities;
using ShopOnlineModel.Repositories;
using ShopOnlineModel.Repositories.Contracts;

namespace API.Services
{
    public class QLNguoiDungService : IQLNguoiDungService
    {
        private readonly IAllRepository<NhanVien> reposNV;
        private readonly IAllRepository<KhachHang> reposKH;
        private readonly ShopOnlineDBContext context;
        public QLNguoiDungService()
        {
            context = new ShopOnlineDBContext();
            reposNV = new AllRepository<NhanVien>(context, context.NhanViens);
            reposKH = new AllRepository<KhachHang>(context, context.KhachHangs);
        }
        public async Task<bool> AddNhanhKH(KhachHang kh)
        {
            try
            {
                KhachHang KH = new KhachHang();
                GioHang gioHang = new GioHang()
                {
                    IDKhachHang = kh.IDKhachHang,
                    NgayTao = DateTime.Now,
                };
                await context.GioHangs.AddAsync(gioHang);
                await context.SaveChangesAsync();

                KH.IDKhachHang = Guid.NewGuid();
                KH.Ten = kh.Ten;
                KH.Email = kh.Email;
                KH.Password = kh.Password; /*MaHoaMatKhau(kh.Password);*/
                KH.SDT = kh.SDT;
                KH.DiemTich = 0;
                KH.TrangThai = 1;
                KH.DiaChi = kh.DiaChi;
                KH.DiemTich = 0;
                await context.KhachHangs.AddAsync(kh);
                await context.SaveChangesAsync();

                return true;
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }

        public Task<bool> ChangePassword(string email, string password, string newPassword)
        {
            throw new NotImplementedException();
        }

        public Task<bool> ForgetPassword(string email)
        {
            throw new NotImplementedException();
        }

        public Task<int> UseDiemTich(int diem, string id)
        {
            throw new NotImplementedException();
        }
    }
}
