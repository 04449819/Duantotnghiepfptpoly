using ShopOnlineModel.Entities;

namespace API.IServices
{
    public interface IQLNguoiDungService
    {
        //Task<LoginViewModel> Login(string lg, string password);
        //Task<KhachHang> RegisterKhachHang(KhachHangViewModel khachHang);
        //Task<NhanVien> RegisterNhanVien(NhanVienViewModel nhanVien);
        Task<bool> ChangePassword(string email, string password, string newPassword);
        //Task<bool> ChangePassword(ChangePasswordRequest request);
        Task<bool> ForgetPassword(string email);
        //Task<LoginViewModel> UpdateProfile(LoginViewModel loginViewModel);
        //Task<bool> ResetPassword(ResetPasswordRequest model);
        public Task<int> UseDiemTich(int diem, string id);
       
        Task<bool> AddNhanhKH(KhachHang kh);
    }
}
