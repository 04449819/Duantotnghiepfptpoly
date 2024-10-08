﻿using AppAPI.IServices;
using AppData.IRepositories;
using AppData.Models;
using AppData.Repositories;
using AppData.ViewModels;
using AppData.ViewModels.QLND;
using Microsoft.EntityFrameworkCore;
using Org.BouncyCastle.Asn1.Ocsp;
using Org.BouncyCastle.Crypto.Generators;
using System.Net;
using System.Net.Mail;


namespace AppAPI.Services
{
    public class QuanLyNguoiDungService : IQuanLyNguoiDungService
    {
        private readonly IAllRepository<NhanVien> reposNV;
        private readonly IAllRepository<KhachHang> reposKH;
        AssignmentDBContext context = new AssignmentDBContext();

        public QuanLyNguoiDungService()
        {
            reposNV = new AllRepository<NhanVien>(context, context.NhanViens);
            reposKH = new AllRepository<KhachHang>(context, context.KhachHangs);
        }
        public async Task<bool> ForgetPassword(string email)
        {
            try
            {
                if (string.IsNullOrEmpty(email))
                {
                    return false;
                }
                bool isEmployee = await CheckIfEmployee(email);
                if (isEmployee)
                {
                    string resetToken = GenerateToken();
                    await SaveUserData(email, resetToken, isEmployee);
                    string subject = "Reset Password";
                    string messageBody = "You have requested a password reset. Your reset token is: " + resetToken;
                    await SendEmail(email, subject, messageBody);

                    return true;
                }
                return false;
            }
            catch (Exception)
            {

                throw;

            }
        }
        public async Task<bool> ResetPassword(ResetPasswordRequest model)
        {
            try
            {
                if (string.IsNullOrEmpty(model.Email) || string.IsNullOrEmpty(model.Password))
                {
                    return false;
                }
                bool isEmployee = await CheckIfEmployee(model.Email);

                if (isEmployee)
                {
                    var nv = await context.NhanViens.FirstOrDefaultAsync(a => a.Email == model.Email);
                    if (nv != null)
                    {
                        nv.PassWord = model.Password;
                        await context.SaveChangesAsync();
//                        await SendEmail(nv.Email, "Đổi Mật Khẩu Thành Công", "Mật khẩu của bạn đã được đặt lại thành công.");
                        return true;
                    }

					var kh = await context.KhachHangs.FirstOrDefaultAsync(a => a.Email == model.Email);
					if (kh != null)
					{
						kh.Password = model.Password;

						await context.SaveChangesAsync();
						//                      await SendEmail(kh.Email, "Đặt lại mật khẩu thành công", "Mật khẩu của bạn đã được đặt lại thành công.");
						return true;
					}
				}
                else
                {

                }
  //              await SendEmail(model.Email, "Lỗi Đặt lại Mật khẩu", "Đã xảy ra lỗi khi đặt lại mật khẩu của bạn. Vui lòng thử lại sau.");
                return false;
            }
            catch (Exception) { throw; }
        }
        private string GenerateToken()
        {
            try
            {
                string token = Guid.NewGuid().ToString();
                return token;
            }
            catch (Exception) { throw; }
        }

        public async Task<bool> CheckIfEmployee(string email)
        {
            try
            {
                if (string.IsNullOrEmpty(email))
                {
                    return false;
                }
                var nv = await context.NhanViens.FirstOrDefaultAsync(a => a.Email == email);
                var kh = await context.KhachHangs.FirstOrDefaultAsync(a => a.Email == email);
                return nv != null || kh != null;
            }
            catch (Exception)
            {

                throw;
            }
        }
        private async Task<bool> SaveUserData(string email, string data, bool isEmployee)
        {
            try
            {
                if (string.IsNullOrEmpty(email))
                {
                    return false;
                }
                if (isEmployee)
                {
                    var nv = await context.NhanViens.FirstOrDefaultAsync(a => a.Email == email);
                    if (nv != null)
                    {
                        nv.PassWord = MaHoaMatKhau(data);
                        await context.SaveChangesAsync();
                        return true;
                    }
                }
                else
                {
                    var kh = await context.KhachHangs.FirstOrDefaultAsync(a => a.Email == email);
                    if (kh != null)
                    {
                        kh.Password = MaHoaMatKhau(data);
                        await context.SaveChangesAsync();
                        return true;
                    }
                }
                return false;
            }
            catch (Exception)
            {

                throw;
            }
        }
        private async Task<bool> SendEmail(string email, string subject, string body)
        {
            try
            {
                var smtpClient = new SmtpClient("smtp.gmail.com", 465);
                smtpClient.UseDefaultCredentials = false;
                smtpClient.EnableSsl = true;
                smtpClient.Credentials = new NetworkCredential("nhu3006a12@gmail.com", "nhucong.");
                var messsage = new MailMessage();
                messsage.From = new MailAddress("nhu3006a12@gmail.com");
                messsage.To.Add(new MailAddress(email));
                messsage.Subject = subject;
                messsage.Body = body;
                await smtpClient.SendMailAsync(messsage);
                return true;
            }
            catch (Exception ex)
            {
                Console.WriteLine("Error sending email: " + ex.Message);
                return false;
            }
        }

        public async Task<bool> ChangePassword(string email, string password, string newPassword)
        {
            try
            {
                var kh = await context.KhachHangs.FirstOrDefaultAsync(h => h.Email == email && h.Password == password);
                if (kh != null)
                {
                    kh.Password = MaHoaMatKhau(newPassword);
                    await context.SaveChangesAsync();
                    return true;
                }
                var nv = await context.NhanViens.FirstOrDefaultAsync(h => h.Email == email && h.PassWord == password);
                if (nv != null)
                {
                    nv.PassWord = MaHoaMatKhau(newPassword);
                    await context.SaveChangesAsync();
                    return true;
                }
                return false;
            }
            catch (Exception)
            {

                throw;

            }
        }

        public async Task<LoginViewModel> Login(string lg, string password, List<GioHangOnline>? listgh)
        {
            try
            {
                var nv = await context.NhanViens.FirstOrDefaultAsync(a => (a.Email == lg || a.SDT == lg) /*&& a.PassWord == password*/ );
                if (nv != null && nv.PassWord == password)
                {
                    if (nv.TrangThai == 1)
                    {
                        return new LoginViewModel
                        {
                            Id = nv.ID,
                            Email = nv.Email,
                            Ten = nv.Ten,
                            DiaChinv = nv.DiaChi,
                            SDT = nv.SDT,
                            chucNang =  context.VaiTros.FirstOrDefault(p => p.ID == nv.IDVaiTro) != null ? context.VaiTros.FirstOrDefault(p => p.ID == nv.IDVaiTro).Ten : "",
                            vaiTro = 0
                        };
                    }
                    else if (nv.TrangThai == 0) // Check for locked account
                    {
                        return new LoginViewModel
                        {
                            IsAccountLocked = true,
                            Message = "Bạn không có quyền truy cập vào tài khoản này."
                        };
                    }
                }
                var kh = await context.KhachHangs.FirstOrDefaultAsync(x => (x.Email == lg || x.SDT == lg) /*&& x.Password == password*/);
                if (kh != null && kh.Password == password)
                {

					if (listgh != null)
					{
						foreach (var item in listgh)
						{
							var sanPham = await context.ChiTietSanPhams.FirstOrDefaultAsync(sp => sp.ID == item.id);
							var check = await context.ChiTietGioHangs.FirstOrDefaultAsync(p => p.IDCTSP == item.id && p.IDNguoiDung == kh.IDKhachHang);
							if (sanPham != null && check == null && item.soluongmua <= sanPham.SoLuong)
							{
								try
								{
									var ctgh = new ChiTietGioHang
									{
										ID = Guid.NewGuid(),
										SoLuong = item.soluongmua,
										IDNguoiDung = kh.IDKhachHang,
										IDCTSP = item.id
									};

									await context.ChiTietGioHangs.AddAsync(ctgh);
								}
								catch (Exception)
								{
									// Log lỗi ở đây
								}
							}
						}
						await context.SaveChangesAsync();
					}


					var dckh = await context.diaChiKhachHangs.Where(p => p.KhachHangID == kh.IDKhachHang).ToListAsync();
                    return new LoginViewModel
                    {
                        Id = kh.IDKhachHang,
                        Email = kh.Email,
                        Ten = kh.Ten,
                        SDT = kh.SDT,
                        DiemTich = kh.DiemTich,
                        //DiaChi = dckh.DiaChi,
                        DiaChi = dckh,
                        GioiTinh = kh.GioiTinh,
                        NgaySinh = kh.NgaySinh,
                        mk = kh.Password,
						chiTietGioHang =  (from a in context.ChiTietGioHangs.Where(p => p.IDNguoiDung == kh.IDKhachHang)
												join b in context.ChiTietSanPhams on a.IDCTSP equals b.ID
												join c in context.SanPhams on b.IDSanPham equals c.ID
												join d in context.KichCos on b.IDKichCo equals d.ID
												join e in context.MauSacs on b.IDMauSac equals e.ID
                                                select new GioHangOnline()
												{
													    id = a.IDCTSP,
                                                        soluong = b.SoLuong,
													    soluongmua = 1,
													    giaban = b.GiaBan,
													    idKichCo = b.IDKichCo,
													    idMauSac = b.IDMauSac,
													    idloaisp = c.IDLoaiSP,
													    ma = b.Ma,
													    tenkt = d.Ten,
													    tenms = e.Ten,
													    tensp = c.Ten,
													    anh = context.Anhs.OrderBy(p => p.DuongDan).FirstOrDefault(p => p.IDChitietsanpham == b.ID).DuongDan,
												}).ToList(),
					vaiTro = 1
                    };
                }
                return new LoginViewModel
                {
                    Message = "Email hoặc password không chính xác"
                };
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

        //public async Task<object> Login(string email, string password)
        //{
        //    var nv = await context.NhanViens.FirstOrDefaultAsync(a => a.Email == email && a.PassWord == password);
        //    if (nv != null)
        //    {
        //        return nv;
        //    }
        //    var kh = await context.KhachHangs.FirstOrDefaultAsync(x => x.Email == email && x.Password == password);
        //    if (kh != null)
        //    {
        //        return kh;
        //    }
        //    return null;
        //}

        public async Task<KhachHang> RegisterKhachHang(KhachHangViewModel khachHang)
        {
            try
            {
                var existingKhachHang = await context.KhachHangs.FirstOrDefaultAsync(kh => kh.Email == khachHang.Email || kh.SDT == khachHang.SDT);
                if (existingKhachHang != null)
                {
                    return null; // Tài khoản đã tồn tại
                }
                KhachHang kh = new KhachHang()
                {
                    IDKhachHang = Guid.NewGuid(),
                    Ten = khachHang.Name,
                    Email = khachHang.Email,
                    Password = MaHoaMatKhau(khachHang.Password),
                    SDT = khachHang.SDT,
                    DiemTich = 0,
                    TrangThai = 1,
                };
                await context.KhachHangs.AddAsync(kh);
                GioHang gioHang = new GioHang()
                {
                    IDKhachHang = kh.IDKhachHang,
                    NgayTao = DateTime.Now,
                };
                await context.GioHangs.AddAsync(gioHang);
                await context.SaveChangesAsync();
                return kh;
            }
            catch (Exception)
            {

                throw;
            }


        }


        public async Task<NhanVien> RegisterNhanVien(NhanVienViewModel nhanVien)
        {
            try
            {
                var kh = new NhanVien
                {
                    ID = Guid.NewGuid(),
                    Ten = nhanVien.Name,
                    Email = nhanVien.Email,
                    PassWord = MaHoaMatKhau(nhanVien.Password),
                    IDVaiTro = nhanVien.IDVaiTro
                };
                context.NhanViens.Add(kh);
                await context.SaveChangesAsync();
                return kh;
            }
            catch (Exception)
            {

                throw;
            }         
        }

        public async Task<bool> ChangePassword(ChangePasswordRequest request)
        {
            try
            {
                var kh = await context.KhachHangs.FirstOrDefaultAsync(h => h.IDKhachHang == request.ID);
                if (kh != null)
                {
                        kh.Password = request.NewPassword;
                        await context.SaveChangesAsync();
                        return true;
                }
                var nv = await context.NhanViens.FirstOrDefaultAsync(h => h.ID == request.ID);
                if (nv != null)
                {
                        nv.PassWord = request.NewPassword;
                        await context.SaveChangesAsync();
                        return true;
                }
                return false;
            }
            catch (Exception)
            {

                throw;
            }
        }

        public async Task<int> UseDiemTich(int diem, string id)
        {
            try
            {
                var khachHang = context.KhachHangs.First(x => x.IDKhachHang == new Guid(id));
                var quyDoiDiem = context.QuyDoiDiems.First(x => x.TrangThai > 0);

                if (quyDoiDiem == null)
                {
                    return 0;
                }
                else if (diem > khachHang.DiemTich)
                {
                    return 0;
                }
                else
                {
                    return diem * quyDoiDiem.TiLeTieuDiem;
                }
            }
            catch (Exception)
            {

                throw;

            }
        }

        //public async Task<LoginViewModel> UpdateProfile(LoginViewModel loginViewModel)
        //{
        //    try
        //    {
        //        var kh = await context.KhachHangs.FirstOrDefaultAsync(h => h.IDKhachHang == loginViewModel.Id);
        //        if (kh != null)
        //        {

        //            kh.Ten = loginViewModel.Ten;
        //            kh.SDT = loginViewModel.SDT;
        //            kh.DiaChi = loginViewModel.DiaChi;
        //            kh.NgaySinh = loginViewModel.NgaySinh;
        //            kh.GioiTinh = loginViewModel.GioiTinh;
        //            kh.Email = loginViewModel.Email;
        //            //context.KhachHangs.Update(kh);
        //            context.SaveChangesAsync();
        //            return new LoginViewModel
        //            {
        //                Id = loginViewModel.Id,
        //                Email = loginViewModel.Email,
        //                Ten = loginViewModel.Ten,
        //                SDT = loginViewModel.SDT,
        //                DiemTich = kh.DiemTich,
        //                GioiTinh = loginViewModel.GioiTinh,
        //                NgaySinh = loginViewModel.NgaySinh,
        //                DiaChi = loginViewModel.DiaChi,
        //                vaiTro = loginViewModel.vaiTro,
        //            };

        //        }
        //        var nv = await context.NhanViens.FirstOrDefaultAsync(h => h.ID == loginViewModel.Id);
        //        if (nv != null)
        //        {
        //            nv.Ten = loginViewModel.Ten;
        //            nv.SDT = loginViewModel.SDT;
        //            nv.DiaChi = loginViewModel.DiaChi;
        //            nv.Email = loginViewModel.Email;
        //            context.SaveChangesAsync();
        //            return new LoginViewModel
        //            {
        //                Id = loginViewModel.Id,
        //                Email = loginViewModel.Email,
        //                Ten = loginViewModel.Ten,
        //                SDT = loginViewModel.SDT,
        //                GioiTinh = loginViewModel.GioiTinh,
        //                NgaySinh = loginViewModel.NgaySinh,
        //                DiaChi = loginViewModel.DiaChi,
        //                vaiTro = loginViewModel.vaiTro,
        //            };
        //        }

        //        return null;
        //    }
        //    catch (Exception)
        //    {

        //        throw;

        //    }
        //}
        //End
        //Nhinh thêm
        public async Task<bool> AddNhanhKH(KhachHangVieww kh)
        {
            try
            {
                KhachHang KH = new KhachHang();
                DiaChiKhachHang dckh = new DiaChiKhachHang();
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
                KH.Password = MaHoaMatKhau(kh.Password);
                KH.SDT = kh.SDT;
                KH.DiemTich = 0;
                KH.TrangThai = 1;
                KH.DiemTich = 0;
                await context.KhachHangs.AddAsync(KH);
                await context.SaveChangesAsync();

                dckh.Id = Guid.NewGuid();
                dckh.KhachHangID = KH.IDKhachHang;
                dckh.DiaChi = kh.DiaChi;
                dckh.TrangThai = 1;


				return true;
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }

		public Task<LoginViewModel> UpdateProfile(LoginViewModel loginViewModel)
		{
			throw new NotImplementedException();
		}
	}
}
