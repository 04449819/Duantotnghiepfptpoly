﻿using AppAPI.IServices;
using AppData.IRepositories;
using AppData.Models;
using AppData.Repositories;
using AppData.ViewModels;
using AppData.ViewModels.BanOffline;
using AppData.ViewModels.SanPham;
using Microsoft.EntityFrameworkCore;
using System.Diagnostics;
using Microsoft.EntityFrameworkCore;
using System.Globalization;
using System.Security.Cryptography.Xml;
using System.Text;
using AppData.ViewModels.BanOnline;

namespace AppAPI.Services
{
    public class HoaDonService : IHoaDonService
    {
        private readonly IAllRepository<HoaDon> reposHoaDon;
        private readonly IAllRepository<ChiTietHoaDon> reposChiTietHoaDon;
        private readonly IAllRepository<ChiTietSanPham> repsCTSanPham;
        private readonly IAllRepository<Voucher> reposVoucher;
        private readonly IAllRepository<QuyDoiDiem> reposQuyDoiDiem;
        private readonly IAllRepository<LichSuTichDiem> reposLichSuTichDiem;
        private readonly IAllRepository<KhachHang> reposKhachHang;
        private readonly IAllRepository<SanPham> reposSanPham;
        private readonly IAllRepository<DanhGia> reposDanhGia;
        private readonly IAllRepository<NhanVien> reposNhanVien;
        

        AssignmentDBContext context = new AssignmentDBContext();
        private readonly ILogger<HoaDonService> _logger;
        private readonly IGioHangServices _iGioHangServices;
        private readonly IMomoPaymentService _momoPaymentService;
        private readonly IKhachHangService _ikhachHangService;

        public HoaDonService(ILogger<HoaDonService> logger, IMomoPaymentService momoPaymentService)
        {
            reposHoaDon = new AllRepository<HoaDon>(context, context.HoaDons);
            reposChiTietHoaDon = new AllRepository<ChiTietHoaDon>(context, context.ChiTietHoaDons);
            repsCTSanPham = new AllRepository<ChiTietSanPham>(context, context.ChiTietSanPhams);
            reposVoucher = new AllRepository<Voucher>(context, context.Vouchers);
            reposQuyDoiDiem = new AllRepository<QuyDoiDiem>(context, context.QuyDoiDiems);
            reposLichSuTichDiem = new AllRepository<LichSuTichDiem>(context, context.LichSuTichDiems);
            reposKhachHang = new AllRepository<KhachHang>(context, context.KhachHangs);
            reposSanPham = new AllRepository<SanPham>(context, context.SanPhams);
            //reposPTTT = new AllRepository<PhuongThucThanhToan>(context, context.PhuongThucThanhToans);
            reposDanhGia = new AllRepository<DanhGia>(context, context.DanhGias);
            //reposChiTietPTTT = new AllRepository<ChiTietPTTT>(context, context.ChiTietPTTTs);
            _logger = logger;
            _momoPaymentService = momoPaymentService;
            context = new AssignmentDBContext();
            _iGioHangServices = new GioHangServices();
            _ikhachHangService = new KhachHangService();
        }

        #region Tung
        public bool CreateHoaDonOffline(CreateHoaDonOfflineDTO hoaDonDTO)
        {

            try
            {
                HoaDon hoaDon = new HoaDon
                {
                    ID = Guid.NewGuid(),
                    ChiTietHoaDons = new List<ChiTietHoaDon>(),
                    IDNhanVien = hoaDonDTO.IdNhanVien,
                    TrangThaiGiaoHang = 2,
                    NgayTao = DateTime.Now,
                    GhiChu = "Hóa đơn chờ xử lý",
                    MaHD = "HD" + Guid.NewGuid().ToString().Substring(0, 8).ToUpper(),
                    LoaiHD = 1,
                    phuongThucTTID = Guid.Parse("f1fb9f0b-5db2-4e04-8ba3-84e96f0d820c"),
                };
                reposHoaDon.Add(hoaDon);
                return true;
            }
            catch (Exception)
            {

                return false;
            }
        }

        public bool CreateHoaDonOnline(CreateHoaDonOnlineViewModel chdvm)
        {
            try
            {
                KhachHang? khachHang = null;
                // Kiểm tra dữ liệu đầu vào SDT và Email
                if (chdvm.SDT != null || chdvm.Email != null)
                {
                    // Tìm khách hàng dựa trên SDT hoặc Email
                    khachHang = _ikhachHangService.GetByEmailOrSDT(chdvm.SDT, chdvm.Email);
                }

                HoaDon hoaDon = new HoaDon
                {
                    ID = Guid.NewGuid(),
                    ChiTietHoaDons = new List<ChiTietHoaDon>(),
                    KhachHangID = khachHang != null ? khachHang.IDKhachHang : null,
                    //KhachHangID = null,
                    IDVoucher = chdvm.IdVoucher,
                    phuongThucTTID = chdvm.IdPhuongThucThanhToan,
                    TenNguoiNhan = chdvm.TenKhachHang,
                    Email = chdvm.Email,
                    DiaChi = chdvm.DiaChi,
                    SDT = chdvm.SDT,
                    MaHD = "HD" + Guid.NewGuid().ToString().Substring(0, 8).ToUpper(),
                    GhiChu = chdvm.GhiChu,
                    TienShip = chdvm.TienShip,
                    LoaiHD = 0,
                    TrangThaiGiaoHang = 2,
                    NgayTao = DateTime.Now,
                    NgayThanhToan = DateTime.Now.AddDays(3),
                    NgayNhanHang = DateTime.Now.AddDays(3),
                    TongTien = chdvm.TongTienHoaDon // - giaTriVoucher - chdvm.TienShip
                };
                
                foreach (var sp in chdvm.SanPhams)
                {
                    int giaBan = repsCTSanPham.GetById(sp.IDCTSP).GiaBan;
                    ChiTietHoaDon chiTiet = new ChiTietHoaDon
                    {
                        ID = Guid.NewGuid(),
                        IDHoaDon = hoaDon.ID,
                        IDCTSP = sp.IDCTSP,
                        SoLuong = sp.SoLuongMua,
                        DonGia = sp.SoLuongMua * giaBan,
                        TrangThai = 1
                    };

                    DanhGia ds = new DanhGia
                    {
                        ID = chiTiet.ID,
                        TrangThai = 0
                    };
                    reposDanhGia.Add(ds);

                    hoaDon.ChiTietHoaDons.Add(chiTiet);
                }
                context.HoaDons.Add(hoaDon);
                context.SaveChanges();

                if (hoaDon.KhachHangID.HasValue)
                {
                    //var khachHang = reposKhachHang.GetById(hoaDon.KhachHangID.Value);
                    if (khachHang != null && hoaDon.TongTien > 0)
                    {
                        var quydoi = context.QuyDoiDiems.AsNoTracking().FirstOrDefault(q => q.TrangThai == 1);
                        if (chdvm.SoDiemSuDung > 0)
                        {
                            LichSuTichDiem lichSuTichDiemMoi = new LichSuTichDiem
                            {
                                ID = Guid.NewGuid(),
                                Diem = chdvm.SoDiemSuDung.HasValue ? chdvm.SoDiemSuDung.Value : 0,
                                TrangThai = 0,
                                IDKhachHang = khachHang.IDKhachHang,
                                IDQuyDoiDiem = quydoi.ID,
                                IDHoaDon = hoaDon.ID
                            };

                            khachHang.DiemTich -= lichSuTichDiemMoi.Diem;
                            context.KhachHangs.Update(khachHang);
                            reposLichSuTichDiem.Add(lichSuTichDiemMoi);
                        }

                        LichSuTichDiem lichSuTichDiemMoi1 = new LichSuTichDiem
                        {
                            ID = Guid.NewGuid(),
                            Diem = (int)(hoaDon.TongTien / quydoi.TiLeTichDiem),
                            TrangThai = 1,
                            IDKhachHang = khachHang.IDKhachHang,
                            IDQuyDoiDiem = quydoi.ID,
                            IDHoaDon = hoaDon.ID
                        };

                        khachHang.DiemTich += lichSuTichDiemMoi1.Diem;
                        context.KhachHangs.Update(khachHang);
                        reposLichSuTichDiem.Add(lichSuTichDiemMoi1);
                    }

                    context.SaveChanges();
                }

                return true;
            }
            catch (Exception)
            {

                return false;
            }
        }
        public bool UpdateHoaDonOffline(Guid hoaDonId, UpdateHoaDonDto hoaDonDTO)
        {
            try
            {

                using (var transaction = context.Database.BeginTransaction())
                {
                    var hoaDon = context.HoaDons.Include(hd => hd.ChiTietHoaDons).FirstOrDefault(hd => hd.ID == hoaDonId);
                    if (hoaDon == null)
                    {
                        return false;
                    }
                    if (hoaDon.ChiTietHoaDons == null)
                    {
                        hoaDon.ChiTietHoaDons = new List<ChiTietHoaDon>();
                    }
                    else
                    {
                        hoaDon.ChiTietHoaDons.Clear();
                    }

                    var khachHang = context.KhachHangs.FirstOrDefault(kh => kh.SDT == hoaDonDTO.SDT || kh.Email == hoaDonDTO.Email);
                    var quydoi = context.QuyDoiDiems.Find(Guid.Parse("16bd37c4-cef0-4e92-9bb5-511c43d99037"));

                    // int tongTienSanPham = 0;

                    //foreach (var sp in hoaDonDTO.SanPhams)
                    //{
                    //    var giaBan = repsCTSanPham.GetById(sp.IDCTSP).GiaBan;
                    //    tongTienSanPham += sp.SoLuongMua * giaBan;
                    //}

                    //int giaTriVoucher = 0;
                    if (hoaDonDTO.IdVoucher.HasValue)
                    {
                        Voucher voucher = reposVoucher.GetById(hoaDonDTO.IdVoucher.Value);
                        if (voucher != null && voucher.SoLuong > 0 && hoaDonDTO.TongTienHoaDon >= voucher.SoTienCan &&
                            voucher.NgayApDung <= DateTime.Now && voucher.NgayKetThuc >= DateTime.Now)
                        {
                            //giaTriVoucher = voucher.HinhThucGiamGia == 1 ?
                            //                (int)hoaDonDTO.TongTienHoaDon * voucher.GiaTri / 100 :
                            //                voucher.GiaTri;

                            voucher.SoLuong -= 1;
                            reposVoucher.Update(voucher);
                        }
                    }

                    //int tongTienSauKhiApDungVoucher = tongTienSanPham - giaTriVoucher;


                    int soDiemSuDung = hoaDonDTO.SoDiemSuDung ?? 0;
                    int giaTriDiemSuDung = soDiemSuDung * quydoi.TiLeTieuDiem;

                    // Cập nhật thông tin hóa đơn
                    hoaDon.TenNguoiNhan = hoaDonDTO.TenKhachHang;
                    hoaDon.SDT = hoaDonDTO.SDT;
                    hoaDon.Email = hoaDonDTO.Email;
                    hoaDon.DiaChi = hoaDonDTO.DiaChi;
                    hoaDon.TienShip = hoaDonDTO.TienShip;
                    hoaDon.IDVoucher = hoaDonDTO.IdVoucher;
                    hoaDon.KhachHangID = khachHang != null ? khachHang.IDKhachHang : (Guid?)null;
                    hoaDon.GhiChu = hoaDonDTO.GhiChu;
                    hoaDon.TrangThaiGiaoHang = hoaDonDTO.TrangThaiGiaoHang;
                    //hoaDon.phuongThucTTID = hoaDonDTO.IdPhuongThucThanhToan;
                    hoaDon.TongTien = hoaDonDTO.TongTienHoaDon;


                    // Thêm chi tiết hóa đơn mới
                    foreach (var sp in hoaDonDTO.SanPhams)
                    {
                        var sanPham = repsCTSanPham.GetById(sp.IDCTSP);
                        ChiTietHoaDon chiTiet = new ChiTietHoaDon
                        {
                            ID = Guid.NewGuid(),
                            IDHoaDon = hoaDon.ID,
                            IDCTSP = sp.IDCTSP,
                            SoLuong = sp.SoLuongMua,
                            DonGia = sp.SoLuongMua * sanPham.GiaBan,
                            TrangThai = 1
                        };

                        // Cập nhật số lượng sản phẩm        
                        if (sanPham != null)
                        {
                            sanPham.SoLuong -= sp.SoLuongMua;
                            repsCTSanPham.Update(sanPham);
                        }
                        // Thêm đánh giá mới
                        DanhGia danhGia = new DanhGia
                        {
                            ID = chiTiet.ID,
                            TrangThai = 0
                        };
                        reposDanhGia.Add(danhGia);
                        hoaDon.ChiTietHoaDons.Add(chiTiet);
                    }

                    context.Entry(hoaDon).State = EntityState.Modified;

                    try
                    {
                        context.SaveChanges();
                        transaction.Commit();
                        return true;
                    }
                    catch (DbUpdateConcurrencyException ex)
                    {
                        // Xử lý xung đột đồng thời
                        foreach (var entry in ex.Entries)
                        {
                            if (entry.Entity is HoaDon)
                            {
                                var databaseValues = entry.GetDatabaseValues();
                                if (databaseValues == null)
                                {
                                    // Hóa đơn đã bị xóa từ cơ sở dữ liệu
                                    return false;
                                }
                                else
                                {
                                    // Cập nhật lại giá trị từ cơ sở dữ liệu
                                    entry.OriginalValues.SetValues(databaseValues);
                                }
                            }
                        }
                        // Thử lưu lại
                        context.SaveChanges();
                        transaction.Commit();
                        return true;
                    }
                }
            }
            catch (Exception ex)
            {
                // Xử lý lỗi ở đây
                Console.WriteLine($"Error: {ex.Message}");
                Console.WriteLine($"StackTrace: {ex.StackTrace}");
                return false;
            }
        }

        public bool ThanhToanDonHang(Guid idHoaDon, int soDiemTru, bool isGiaoHang)
        {
            try
            {
                // Xóa mọi thực thể HoaDon với ID tương ứng đang được theo dõi trong DbContext
                var existingHoaDon = context.ChangeTracker.Entries<HoaDon>()
                                            .FirstOrDefault(e => e.Entity.ID == idHoaDon);

                if (existingHoaDon != null)
                {
                    context.Entry(existingHoaDon.Entity).State = EntityState.Detached;
                }

                var hoaDon = reposHoaDon.GetById(idHoaDon);
                if (hoaDon == null)
                {
                    return false;
                }

                KhachHang khachHang = null;
                if (hoaDon.KhachHangID != null)
                {
                    khachHang = reposKhachHang.GetById((Guid)hoaDon.KhachHangID);
                }

                var quydoi = context.QuyDoiDiems.AsNoTracking().FirstOrDefault(q => q.ID == Guid.Parse("16bd37c4-cef0-4e92-9bb5-511c43d99037"));
                if (quydoi == null)
                {
                    throw new Exception("Quy đổi điểm không tồn tại.");
                }

                hoaDon.NgayThanhToan = DateTime.Now;
                hoaDon.NgayNhanHang = isGiaoHang ? DateTime.Now.AddDays(3) : DateTime.Now;

                // Đính kèm lại HoaDon vào DbContext và cập nhật
                context.Attach(hoaDon);
                reposHoaDon.Update(hoaDon);

                if (khachHang != null && hoaDon.TongTien > 0)
                {
                    if (soDiemTru > 0)
                    {
                        LichSuTichDiem lichSuTichDiemMoi = new LichSuTichDiem
                        {
                            ID = Guid.NewGuid(),
                            Diem = soDiemTru,
                            TrangThai = 0,
                            IDKhachHang = khachHang.IDKhachHang,
                            IDQuyDoiDiem = quydoi.ID,
                            IDHoaDon = hoaDon.ID
                        };

                        khachHang.DiemTich -= lichSuTichDiemMoi.Diem;
                        context.KhachHangs.Update(khachHang);
                        reposLichSuTichDiem.Add(lichSuTichDiemMoi);
                    }

                    LichSuTichDiem lichSuTichDiemMoi1 = new LichSuTichDiem
                    {
                        ID = Guid.NewGuid(),
                        Diem = (int)(hoaDon.TongTien / quydoi.TiLeTichDiem),
                        TrangThai = 1,
                        IDKhachHang = khachHang.IDKhachHang,
                        IDQuyDoiDiem = quydoi.ID,
                        IDHoaDon = hoaDon.ID
                    };

                    khachHang.DiemTich += lichSuTichDiemMoi1.Diem;
                    context.KhachHangs.Update(khachHang);
                    reposLichSuTichDiem.Add(lichSuTichDiemMoi1);
                }

                context.SaveChanges();
                return true;
            }
            catch (Exception)
            {
                return false;
            }
        }

        public async Task<(bool Success, string OrderId, int? Amount)> CreateOrderAsync(CreateHoaDonOnlineViewModel chdvm)
        {
            using var transaction = await context.Database.BeginTransactionAsync();
            try
            {
                var hoaDon = new HoaDon
                {
                    ID = Guid.NewGuid(),
                    ChiTietHoaDons = new List<ChiTietHoaDon>(),
                    KhachHangID = chdvm.IdKhachHang,
                    IDVoucher = chdvm.IdVoucher,
                    phuongThucTTID = chdvm.IdPhuongThucThanhToan, //Guid.Parse("f1fb9f0b-5db2-4e04-8ba3-84e96f0d820c"),
                    TenNguoiNhan = chdvm.TenKhachHang,
                    Email = chdvm.Email,
                    DiaChi = chdvm.DiaChi,
                    SDT = chdvm.SDT,
                    MaHD = "HD" + Guid.NewGuid().ToString().Substring(0, 8).ToUpper(),
                    GhiChu = chdvm.GhiChu,
                    TienShip = chdvm.TienShip,
                    LoaiHD = 0,
                    TrangThaiGiaoHang = 1,
                    NgayTao = DateTime.Now,
                    NgayThanhToan = null, // Set this when payment is confirmed
                    NgayNhanHang = DateTime.Now.AddDays(3),
                    TongTien = chdvm.TongTienHoaDon
                };

                // Add ChiTietHoaDon
                foreach (var sp in chdvm.SanPhams)
                {
                    int giaBan = context.ChiTietSanPhams.Find(sp.IDCTSP).GiaBan;
                    var chiTiet = new ChiTietHoaDon
                    {
                        ID = Guid.NewGuid(),
                        IDHoaDon = hoaDon.ID,
                        IDCTSP = sp.IDCTSP,
                        SoLuong = sp.SoLuongMua,
                        DonGia = sp.SoLuongMua * giaBan,
                        TrangThai = 1
                    };
                    hoaDon.ChiTietHoaDons.Add(chiTiet);

                    var danhGia = new DanhGia
                    {
                        ID = chiTiet.ID,
                        TrangThai = 0
                    };
                    context.DanhGias.Add(danhGia);
                }

                context.HoaDons.Add(hoaDon);

                // Handle customer points
                if (hoaDon.KhachHangID.HasValue)
                {
                    var khachHang = await context.KhachHangs.FindAsync(hoaDon.KhachHangID.Value);
                    if (khachHang != null && hoaDon.TongTien > 0)
                    {
                        var quydoi = await context.QuyDoiDiems.FirstOrDefaultAsync(q => q.TrangThai == 1);
                        if (chdvm.SoDiemSuDung > 0)
                        {
                            var lichSuTichDiemMoi = new LichSuTichDiem
                            {
                                ID = Guid.NewGuid(),
                                Diem = chdvm.SoDiemSuDung ?? 0,
                                TrangThai = 0,
                                IDKhachHang = khachHang.IDKhachHang,
                                IDQuyDoiDiem = quydoi.ID,
                                IDHoaDon = hoaDon.ID
                            };
                            khachHang.DiemTich -= lichSuTichDiemMoi.Diem;
                            context.LichSuTichDiems.Add(lichSuTichDiemMoi);
                        }

                        var lichSuTichDiemMoi1 = new LichSuTichDiem
                        {
                            ID = Guid.NewGuid(),
                            Diem = (int)(hoaDon.TongTien / quydoi.TiLeTichDiem),
                            TrangThai = 1,
                            IDKhachHang = khachHang.IDKhachHang,
                            IDQuyDoiDiem = quydoi.ID,
                            IDHoaDon = hoaDon.ID
                        };
                        khachHang.DiemTich += lichSuTichDiemMoi1.Diem;
                        context.LichSuTichDiems.Add(lichSuTichDiemMoi1);
                    }
                }

                await context.SaveChangesAsync();
                await transaction.CommitAsync();

                return (true, hoaDon.MaHD, hoaDon.TongTien);
            }
            catch (Exception ex)
            {
                await transaction.RollbackAsync();
                _logger.LogError(ex, "Error creating order");
                return (false, null, 0);
            }
        }

        public async Task<bool> UpdateOrderPaymentStatusAsync(string orderId, bool isSuccessful)
        {
            try
            {
                var hoaDon = await context.HoaDons.FirstOrDefaultAsync(h => h.MaHD == orderId);
                if (hoaDon == null)
                {
                    _logger.LogWarning($"Order not found: {orderId}");
                    return false;
                }

                if (isSuccessful)
                {
                    // Thanh toán CK
                    if(hoaDon.phuongThucTTID == Guid.Parse("fab870b4-7a7d-403a-a855-b7431a3c9252"))
                    {
                        hoaDon.NgayThanhToan = DateTime.Now;
                    }
                    else
                    {
                        // Thanh toán COD
                        hoaDon.NgayThanhToan = DateTime.Now.AddDays(3);
                    }
                   
                   
                    //hoaDon.GhiChu = "";

                }
                else
                {
                    hoaDon.GhiChu = "Thanh toán thất bại"; 
                }

                await context.SaveChangesAsync();
                return true;
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, $"Error updating order payment status for order: {orderId}");
                return false;
            }
        }
        #endregion
        public bool CheckHDHasLSGD(Guid idHoaDon)
        {
            var exist = reposLichSuTichDiem.GetAll().Any(c => c.IDHoaDon == idHoaDon);
            if (exist == true)
            {
                return true;
            }
            return false;
        }

        public int CheckVoucher(string ten, int tongtien)
        {
            var voucher = reposVoucher.GetAll().FirstOrDefault(p => p.Ten == ten);
            if (voucher != null)
            {
                if (tongtien >= voucher.SoTienCan && DateTime.Compare(voucher.NgayApDung, DateTime.Now) <= 0 && DateTime.Compare(DateTime.Now, voucher.NgayKetThuc) <= 0 && voucher.SoLuong > 0)
                {
                    if (voucher.HinhThucGiamGia == 1)
                    {
                        tongtien -= voucher.GiaTri;
                        return tongtien;
                    }
                    else
                    {
                        tongtien = tongtien - (tongtien * voucher.GiaTri / 100);
                        return tongtien;
                    }

                }
                else
                {
                    return tongtien;
                }
            }
            else
            {
                return tongtien;
            }
        }

        //Thanh toan online
        //public DonMuaSuccessViewModel CreateHoaDon(List<ChiTietHoaDonViewModel> chiTietHoaDons, HoaDonViewModel hoaDon)
        //{
        //    try
        //    {
        //        //Tâm - Thêm đơn mua
        //        DonMuaSuccessViewModel donMua = new DonMuaSuccessViewModel()
        //        {
        //            Ten = hoaDon.Ten,
        //            Email = hoaDon.Email,
        //            SDT = hoaDon.SDT,
        //            DiaChi = hoaDon.DiaChi,
        //            PhuongThucThanhToan = hoaDon.PhuongThucThanhToan,
        //            TongTien = hoaDon.TongTien,
        //            GhiChu = hoaDon.GhiChu == null ? "" : hoaDon.GhiChu,
        //            DiemSuDung = hoaDon.Diem == null ? 0 : hoaDon.Diem.Value,
        //            Login = false,
        //            GioHangs = new List<GioHangRequest>()
        //        };
        //        int subtotal = 0;
        //        var voucher = reposVoucher.GetAll().FirstOrDefault(p => p.Ten == hoaDon.TenVoucher);
        //        if (chiTietHoaDons != null)
        //        {
        //            HoaDon hoaDon1 = new HoaDon();
        //            hoaDon1.ID = Guid.NewGuid();
        //            hoaDon1.IDNhanVien = null;
        //            if (voucher != null)
        //            {
        //                hoaDon1.IDVoucher = voucher.ID;
        //                voucher.SoLuong--;
        //                reposVoucher.Update(voucher);
        //                donMua.MaVoucher = voucher.Ten;
        //            }
        //            else
        //            {
        //                hoaDon1.IDVoucher = null;
        //            }
        //            hoaDon1.TenNguoiNhan = hoaDon.Ten;
        //            hoaDon1.MaHD = "HD" + (hoaDon1.ID).ToString().Substring(0, 8).ToUpper();
        //            hoaDon1.SDT = hoaDon.SDT;
        //            hoaDon1.Email = hoaDon.Email;
        //            hoaDon1.NgayTao = DateTime.Now;
        //            //Tam
        //            if (hoaDon.NgayThanhToan != null)
        //            {
        //                hoaDon1.NgayThanhToan = hoaDon.NgayThanhToan;
        //            }
        //            //End
        //            hoaDon1.DiaChi = hoaDon.DiaChi;
        //            hoaDon1.TienShip = hoaDon.TienShip;
        //            hoaDon1.PhuongThucThanhToan = hoaDon.PhuongThucThanhToan;
        //            hoaDon1.TrangThaiGiaoHang = 2;
        //            //hoaDon1.ThueVAT = 10;
        //            hoaDon1.TongTien = hoaDon.TongTien;
        //            hoaDon1.GhiChu = hoaDon.GhiChu;
        //            donMua.ID = hoaDon1.ID.ToString();
        //            if (reposHoaDon.Add(hoaDon1))
        //            {
        //                foreach (var x in chiTietHoaDons)
        //                {
        //                    ChiTietHoaDon chiTietHoaDon = new ChiTietHoaDon();
        //                    chiTietHoaDon.ID = Guid.NewGuid();
        //                    chiTietHoaDon.IDHoaDon = hoaDon1.ID;
        //                    chiTietHoaDon.IDCTSP = x.IDChiTietSanPham;
        //                    chiTietHoaDon.SoLuong = x.SoLuong;
        //                    chiTietHoaDon.DonGia = x.DonGia;
        //                    chiTietHoaDon.TrangThai = 1;
        //                    DanhGia danhGia = new DanhGia();
        //                    danhGia.ID = chiTietHoaDon.ID;
        //                    danhGia.Sao = null;
        //                    danhGia.BinhLuan = null;
        //                    danhGia.TrangThai = 0;
        //                    reposDanhGia.Add(danhGia);
        //                    reposChiTietHoaDon.Add(chiTietHoaDon);
        //                    var CTsanPham = repsCTSanPham.GetAll().FirstOrDefault(p => p.ID == x.IDChiTietSanPham);
        //                    CTsanPham.SoLuong -= chiTietHoaDon.SoLuong;
        //                    if (CTsanPham.SoLuong < 0)
        //                    {
        //                        CTsanPham.SoLuong += chiTietHoaDon.SoLuong;
        //                        reposHoaDon.Delete(hoaDon1);
        //                        return new DonMuaSuccessViewModel()
        //                        {
        //                            TongTien = -1
        //                        };
        //                    }
        //                    else
        //                    {
        //                        subtotal += x.SoLuong * x.DonGia;
        //                        repsCTSanPham.Update(CTsanPham);
        //                    }
        //                    //Tâm
        //                    donMua.GioHangs.Add(new GioHangRequest() { Anh = context.Anhs.First(y => y.IDSanPham == CTsanPham.IDSanPham && y.IDMauSac == CTsanPham.IDMauSac).DuongDan, SoLuong = x.SoLuong, DonGia = x.DonGia, Ten = context.SanPhams.First(y => y.ID == CTsanPham.IDSanPham).Ten, KichCo = context.KichCos.First(y => y.ID == CTsanPham.IDKichCo).Ten, MauSac = context.MauSacs.First(y => y.ID == CTsanPham.IDMauSac).Ten });
        //                }
        //                //tích điểm, dùng điểm
        //                if (hoaDon.IDNguoiDung != null)
        //                {
        //                    QuyDoiDiem quyDoiDiem = reposQuyDoiDiem.GetAll().First(p => p.TrangThai > 0);
        //                    KhachHang khachHang = reposKhachHang.GetAll().FirstOrDefault(p => p.IDKhachHang == hoaDon.IDNguoiDung);
        //                    donMua.Login = true;
        //                    if (quyDoiDiem.TrangThai == 1)
        //                    {
        //                        if (hoaDon.Diem == 0 || hoaDon.Diem == null)
        //                        {
        //                            //khachHang.DiemTich += subtotal / quyDoiDiem.TiLeTichDiem;
        //                            reposKhachHang.Update(khachHang);
        //                            LichSuTichDiem lichSuTichDiem = new LichSuTichDiem()
        //                            {
        //                                ID = Guid.NewGuid(),
        //                                IDKhachHang = hoaDon.IDNguoiDung,
        //                                IDQuyDoiDiem = quyDoiDiem.ID,
        //                                IDHoaDon = hoaDon1.ID,
        //                                Diem = quyDoiDiem.TiLeTichDiem != 0 ? subtotal / quyDoiDiem.TiLeTichDiem : 0,
        //                                TrangThai = 1
        //                            };
        //                            reposLichSuTichDiem.Add(lichSuTichDiem);
        //                            donMua.DiemTich = lichSuTichDiem.Diem;
        //                        }
        //                        //dùng điểm
        //                        else
        //                        {
        //                            if (khachHang.DiemTich >= hoaDon.Diem)
        //                            {
        //                                khachHang.DiemTich = khachHang.DiemTich - hoaDon.Diem;
        //                                reposKhachHang.Update(khachHang);
        //                                LichSuTichDiem lichSuTichDiem = new LichSuTichDiem()
        //                                {
        //                                    ID = Guid.NewGuid(),
        //                                    IDKhachHang = hoaDon.IDNguoiDung,
        //                                    IDQuyDoiDiem = quyDoiDiem.ID,
        //                                    IDHoaDon = hoaDon1.ID,
        //                                    Diem = hoaDon.Diem.Value,
        //                                    TrangThai = 0
        //                                };
        //                                reposLichSuTichDiem.Add(lichSuTichDiem);
        //                            }
        //                        }
        //                    }
        //                    //Vừa tích vừa tiêu
        //                    else if (quyDoiDiem.TrangThai == 2)
        //                    {
        //                        //tích điểm
        //                        //khachHang.DiemTich += subtotal / quyDoiDiem.TiLeTichDiem;
        //                        LichSuTichDiem lichSuTichDiem = new LichSuTichDiem()
        //                        {
        //                            ID = Guid.NewGuid(),
        //                            IDKhachHang = hoaDon.IDNguoiDung,
        //                            IDQuyDoiDiem = quyDoiDiem.ID,
        //                            IDHoaDon = hoaDon1.ID,
        //                            Diem = quyDoiDiem.TiLeTichDiem != 0 ? subtotal / quyDoiDiem.TiLeTichDiem : 0,
        //                            TrangThai = 1
        //                        };
        //                        reposLichSuTichDiem.Add(lichSuTichDiem);
        //                        donMua.DiemTich = lichSuTichDiem.Diem;
        //                        //tiều điểm
        //                        if (khachHang.DiemTich >= hoaDon.Diem && hoaDon.Diem != 0)
        //                        {
        //                            khachHang.DiemTich = khachHang.DiemTich - hoaDon.Diem;
        //                            reposKhachHang.Update(khachHang);
        //                            LichSuTichDiem lichSuTieuDiem = new LichSuTichDiem()
        //                            {
        //                                ID = Guid.NewGuid(),
        //                                IDKhachHang = hoaDon.IDNguoiDung,
        //                                IDQuyDoiDiem = quyDoiDiem.ID,
        //                                IDHoaDon = hoaDon1.ID,
        //                                Diem = hoaDon.Diem.Value,
        //                                TrangThai = 0
        //                            };
        //                            reposLichSuTichDiem.Add(lichSuTieuDiem);
        //                        }

        //                    }
        //                }
        //                if (hoaDon.TrangThai)
        //                {
        //                    _iGioHangServices.DeleteCart(hoaDon.IDNguoiDung.Value);
        //                }

        //                return donMua;
        //            }
        //            else
        //            {
        //                return new DonMuaSuccessViewModel();
        //            }
        //        }
        //        else
        //        {
        //            return new DonMuaSuccessViewModel();
        //        }
        //    }
        //    catch
        //    {
        //        return new DonMuaSuccessViewModel();
        //    }
        //}

        //Bán hàng tại quầy
        
        public bool DeleteHoaDon(Guid id)
        {
            try
            {
                // Lấy hóa đơn cần xóa
                //var hoaDon = reposHoaDon.GetAll().FirstOrDefault(p => p.ID == id);
                var hoaDon = reposHoaDon.GetById(id);
                if (hoaDon == null)
                    throw new Exception("Hóa đơn không tồn tại.");

                // Lấy danh sách chi tiết hóa đơn liên quan
                var lsthdct = reposChiTietHoaDon.GetAll().Where(c => c.IDHoaDon == hoaDon.ID).ToList();

                // Lấy danh sách đánh giá liên quan đến chi tiết hóa đơn
                var deletedg = context.DanhGias.Where(c => lsthdct.Select(x => x.ID).Contains(c.ID)).ToList();

                // Cập nhật lại số lượng sản phẩm trước khi xóa chi tiết hóa đơn
                foreach (var item in lsthdct)
                {
                    var ctsp = repsCTSanPham.GetAll().FirstOrDefault(c => c.ID == item.IDCTSP);
                    if (ctsp != null)
                    {
                        ctsp.SoLuong += item.SoLuong;
                        repsCTSanPham.Update(ctsp);
                    }
                }

                // Xóa các chi tiết hóa đơn
                context.ChiTietHoaDons.RemoveRange(lsthdct);
                context.SaveChanges();

                // Xóa các đánh giá liên quan
                context.DanhGias.RemoveRange(deletedg);
                context.SaveChanges();

                // Cuối cùng, xóa hóa đơn
                context.HoaDons.Remove(hoaDon);
                context.SaveChanges();

                return true;
            }
            catch (Exception e)
            {
                throw new Exception(e.Message);
            }

        }

        //public bool DeletePTTT(Guid id)
        //{
        //    try
        //    {
        //        var pttt = reposPTTT.GetAll().FirstOrDefault(c => c.ID == id);
        //        reposPTTT.Delete(pttt);
        //        return true;

        //    }
        //    catch (Exception ex)
        //    {
        //        throw new Exception(ex.Message, ex);
        //    }
        //}

        public List<ChiTietHoaDon> GetAllChiTietHoaDon(Guid idHoaDon)
        {
            return reposChiTietHoaDon.GetAll().Where(x => x.IDHoaDon == idHoaDon).ToList();
        }
        //public List<ChiTietHoaDon> GetThongtinHoaDon(Guid idHoaDon)
        //{
        //    return context.ChiTietHoaDons.Where(c => c.IDHoaDon == idHoaDon).ToList();
        //}

        public List<HoaDon> GetAllHDCho()
        {
            return context.HoaDons.Where(c => c.TrangThaiGiaoHang == 1 || c.TrangThaiGiaoHang == 2).OrderByDescending(c => c.TrangThaiGiaoHang).ToList();
        }
        //Nhinh
        public List<HoaDonQL> GetAllHDQly()
        {
            var result = (from hd in context.HoaDons
                          join lstd in context.LichSuTichDiems on hd.ID equals lstd.IDHoaDon into lstdGroup
                          from lstd in lstdGroup.DefaultIfEmpty()
                          join kh in context.KhachHangs on lstd.IDKhachHang equals kh.IDKhachHang into khGroup
                          from kh in khGroup.DefaultIfEmpty()
                          where hd.TrangThaiGiaoHang != 1 && hd.TrangThaiGiaoHang != 0
                          select new HoaDonQL()
                          {
                              Id = hd.ID,
                              MaHD = hd.MaHD,
                              KhachHang = kh != null ? kh.Ten : "Khách lẻ",
                              SDTKH = kh != null ? kh.SDT : null,
                              SDTnhanhang = hd.SDT != null ? hd.SDT : "null",
                              PTTT = context.phuongThucThanhToans.Find(hd.phuongThucTTID).ten,
                              ThoiGian = hd.NgayTao,
                              //                              GiamGia = (from vc in context.Vouchers
                              //                                         where vc.ID == hd.IDVoucher
                              //                                         select vc.TrangThai == 0 ? vc.GiaTri : context.ChiTietHoaDons.Where(c => c.IDHoaDon == hd.ID).ToList().AsEnumerable().Sum(c => c.DonGia * c.SoLuong) / 100 * vc.GiaTri)
                              //.FirstOrDefault(),
                              KhachDaTra = (hd.TrangThaiGiaoHang == 6 || context.phuongThucThanhToans.Find(hd.phuongThucTTID).ten == "VNPay" && hd.TrangThaiGiaoHang != 7) == true ? hd.TongTien : 0,
                              TongTienHang = context.ChiTietHoaDons.Where(c => c.IDHoaDon == hd.ID).ToList().AsQueryable().Sum(c => c.DonGia * c.SoLuong),
                              LoaiHD = hd.LoaiHD,
                              TrangThai = hd.TrangThaiGiaoHang,
                          }).Distinct().ToList();

            return result;
        }
        public List<HoaDon> GetAllHoaDon()
        {
            //return reposHoaDon.GetAll();
            return context.HoaDons
                      .Include(h => h.ChiTietHoaDons)
                      .ToList();
        }
        //public ChiTietHoaDonQL GetCTHDByID(Guid idhd)
        //{
        //    try
        //    {
        //        var lsthdct = (from cthd in context.ChiTietHoaDons
        //                       join ctsp in context.ChiTietSanPhams on cthd.IDCTSP equals ctsp.ID
        //                       join ms in context.MauSacs on ctsp.IDMauSac equals ms.ID
        //                       join kc in context.KichCos on ctsp.IDKichCo equals kc.ID
        //                       join sp in context.SanPhams on ctsp.IDSanPham equals sp.ID
        //                       join km in context.KhuyenMais on ctsp.IDKhuyenMai equals km.ID into kmGroup
        //                       from km in kmGroup.DefaultIfEmpty()
        //                       where cthd.IDHoaDon == idhd
        //                       select new HoaDonChiTietViewModel
        //                       {
        //                           Id = cthd.ID,
        //                           IdHoaDon = cthd.IDHoaDon,
        //                           IdSP = sp.ID,
        //                           Ten = sp.Ten,
        //                           MaCTSP = ctsp.Ma,
        //                           PhanLoai = ms.Ten + " - " + kc.Ten,
        //                           SoLuong = cthd.SoLuong,
        //                           GiaGoc = ctsp.GiaBan,
        //                           GiaLuu = cthd.DonGia == null ? 0 : cthd.DonGia,
        //                           GiaKM = km == null ? ctsp.GiaBan :
        //            (km.TrangThai == 1 ? (int)(ctsp.GiaBan / 100 * (100 - km.GiaTri)) :
        //            (km.GiaTri < ctsp.GiaBan ? (ctsp.GiaBan - (int)km.GiaTri) : 0)),
        //                       }).ToList();

        //        var result = (from hd in context.HoaDons
        //                      join nv in context.NhanViens on hd.IDNhanVien equals nv.ID
        //                      into nvGroup
        //                      from nv in nvGroup.DefaultIfEmpty()
        //                      join lstd in context.LichSuTichDiems on hd.ID equals lstd.IDHoaDon into lstdGroup
        //                      from lstd in lstdGroup.DefaultIfEmpty()
        //                      join kh in context.KhachHangs on lstd.IDKhachHang equals kh.IDKhachHang into khGroup
        //                      from kh in khGroup.DefaultIfEmpty()
        //                      where hd.ID == idhd
        //                      select new ChiTietHoaDonQL
        //                      {
        //                          Id = hd.ID,
        //                          MaHD = hd.MaHD,
        //                          NgayTao = hd.NgayTao,
        //                          NgayThanhToan = hd.NgayThanhToan != null ? hd.NgayThanhToan : null,
        //                          NgayNhanHang = hd.NgayNhanHang != null ? hd.NgayNhanHang : null,
        //                          PTTT = hd.PhuongThucThanhToan,
        //                          NhanVien = nv != null ? nv.Ten : null,
        //                          LoaiHD = hd.LoaiHD,
        //                          KhachHang = kh == null ? "Khách lẻ" : kh.Ten,
        //                          NguoiNhan = hd.TenNguoiNhan != null ? hd.TenNguoiNhan : null,
        //                          DiaChi = hd.DiaChi != null ? hd.DiaChi : null,
        //                          SĐT = hd.SDT != null ? hd.SDT : null,
        //                          Email = hd.Email != null ? hd.Email : null,
        //                          TienShip = hd.TienShip != null ? hd.TienShip : null,
        //                          TrangThai = hd.TrangThaiGiaoHang,
        //                          //ThueVAT = hd.ThueVAT,
        //                          KhachCanTra = hd.TongTien,
        //                          TienKhachTra = (hd.TrangThaiGiaoHang == 6 || hd.PhuongThucThanhToan == "VNPay" && hd.TrangThaiGiaoHang != 7) ? hd.TongTien : 0,
        //                          GhiChu = hd.GhiChu,
        //                          TruTieuDiem = (from lstd in context.LichSuTichDiems
        //                                         join qdd in context.QuyDoiDiems on lstd.IDQuyDoiDiem equals qdd.ID
        //                                         where lstd.IDHoaDon == hd.ID && lstd.TrangThai == 0
        //                                         select lstd.Diem * qdd.TiLeTieuDiem).FirstOrDefault(),
        //                          voucher = (from vc in context.Vouchers
        //                                     where vc.ID == hd.IDVoucher
        //                                     select new Voucher
        //                                     {
        //                                         ID = vc.ID,
        //                                         Ten = vc.Ten,
        //                                         GiaTri = vc.GiaTri,
        //                                         TrangThai = vc.TrangThai,
        //                                         HinhThucGiamGia = vc.HinhThucGiamGia,
        //                                     }).FirstOrDefault(),
        //                          listsp = lsthdct,
        //                          lstlstd = (from lstd in context.LichSuTichDiems
        //                                     where lstd.IDHoaDon == hd.ID
        //                                     select lstd).OrderBy(c => c.TrangThai).ToList()
        //                      }).FirstOrDefault();

        //        return result;
        //    }
        //    catch (Exception ex)
        //    {
        //        throw new Exception(ex.Message);
        //    }
        //}


        //public HoaDonViewModelBanHang GetHDBanHang(Guid id)
        //{
        //    List<HoaDonChiTietViewModel> lsthdct = (from cthd in context.ChiTietHoaDons
        //                                            join ctsp in context.ChiTietSanPhams on cthd.IDCTSP equals ctsp.ID
        //                                            join ms in context.MauSacs on ctsp.IDMauSac equals ms.ID
        //                                            join kc in context.KichCos on ctsp.IDKichCo equals kc.ID
        //                                            join sp in context.SanPhams on ctsp.IDSanPham equals sp.ID
        //                                            join km in context.KhuyenMais.Where(c => c.NgayKetThuc > DateTime.Now && c.TrangThai != 2) on ctsp.IDKhuyenMai equals km.ID
        //                                            into kmGroup
        //                                            from km in kmGroup.DefaultIfEmpty()
        //                                            where cthd.IDHoaDon == id
        //                                            select new HoaDonChiTietViewModel()
        //                                            {
        //                                                Id = cthd.ID,
        //                                                IdHoaDon = cthd.IDHoaDon,
        //                                                IdSP = sp.ID,
        //                                                Ten = sp.Ten,
        //                                                MaCTSP = ctsp.Ma,
        //                                                PhanLoai = ms.Ten + " - " + kc.Ten,
        //                                                SoLuong = cthd.SoLuong,
        //                                                GiaGoc = ctsp.GiaBan,
        //                                                GiaKM = km == null ? ctsp.GiaBan :
        //            (km.TrangThai == 1 ? (int)(ctsp.GiaBan / 100 * (100 - km.GiaTri)) :
        //            (km.GiaTri < ctsp.GiaBan ? (ctsp.GiaBan - (int)km.GiaTri) : 0)),

        //                                            }).AsEnumerable().Reverse().ToList();
        //    var result = (from hd in reposHoaDon.GetAll()
        //                  join lstd in reposLichSuTichDiem.GetAll() on hd.ID equals lstd.IDHoaDon into lstdGroup
        //                  from lstd in lstdGroup.DefaultIfEmpty()
        //                  join kh in reposKhachHang.GetAll() on lstd?.IDKhachHang equals kh?.IDKhachHang into khGroup
        //                  from kh in khGroup.DefaultIfEmpty()
        //                  where hd.ID == id
        //                  select new HoaDonViewModelBanHang()
        //                  {
        //                      Id = hd.ID,
        //                      MaHD = hd.MaHD,
        //                      IdKhachHang = kh?.IDKhachHang,
        //                      TenKhachHang = kh?.Ten,
        //                      lstHDCT = lsthdct,
        //                      GhiChu = hd.GhiChu == null ? "" : hd.GhiChu,
        //                  }).FirstOrDefault();
        //    return result;
        //}
        public HoaDon GetHoaDonById(Guid idhd)
        {
            // return reposHoaDon.GetAll().FirstOrDefault(c => c.ID == idhd);
            return context.HoaDons.Include(x => x.ChiTietHoaDons).FirstOrDefault(p => p.ID == idhd);
        }

        public LichSuTichDiem GetLichSuGiaoDichByIdHD(Guid idHoaDon)
        {
            return reposLichSuTichDiem.GetAll().FirstOrDefault(c => c.IDHoaDon == idHoaDon);
        }

        public bool HuyHD(Guid idhd, Guid idnv)
        {
            try
            {
                var hd = context.HoaDons.Where(c => c.ID == idhd).FirstOrDefault();
                //Update hd
                hd.IDNhanVien = idnv;
                hd.TrangThaiGiaoHang = 7;
                //hd.TongTien = 0;
                context.HoaDons.Update(hd);
                context.SaveChanges();

                // Cộng lại số lượng hàng
                var lsthdct = context.ChiTietHoaDons.Where(c => c.IDHoaDon == idhd).ToList();
                foreach (var hdct in lsthdct)
                {
                    var ctsp = context.ChiTietSanPhams.FirstOrDefault(c => c.ID == hdct.IDCTSP);
                    ctsp.SoLuong += hdct.SoLuong;
                    context.ChiTietSanPhams.Update(ctsp);
                    context.SaveChanges();
                }

                // Cộng lại số lượng voucher nếu áp dụng
                if (hd.IDVoucher != null)
                {
                    var vc = context.Vouchers.FirstOrDefault(c => c.ID == hd.IDVoucher);
                    vc.SoLuong += 1;
                    context.Vouchers.Update(vc);
                    context.SaveChanges();
                }
                // Cộng lại tiêu điểm cho khách hàng
                var lstlstd = context.LichSuTichDiems.Where(c => c.IDHoaDon == idhd).ToList();
                if (lstlstd.Count != 0)
                {
                    var tieud = lstlstd.Where(c => c.TrangThai == 0).FirstOrDefault();
                    var tichd = lstlstd.Where(c => c.TrangThai == 1).FirstOrDefault();
                    if (lstlstd.Count == 1)
                    {
                        if (tieud != null)
                        {
                            //Cộng điểm kh
                            var kh = context.KhachHangs.Where(c => c.IDKhachHang == tieud.IDKhachHang).FirstOrDefault();
                            kh.DiemTich += tieud.Diem;
                            context.KhachHangs.Update(kh);
                            context.SaveChanges();
                            //Thêm 1 lịch sử trả lại điểm
                            LichSuTichDiem diemtra = new LichSuTichDiem()
                            {
                                ID = new Guid(),
                                IDHoaDon = hd.ID,
                                IDKhachHang = kh.IDKhachHang,
                                Diem = tieud.Diem,
                                TrangThai = 2,
                                IDQuyDoiDiem = tieud.IDQuyDoiDiem,
                            };
                            context.LichSuTichDiems.Add(diemtra);
                            context.SaveChanges();
                            //tieud.Diem = 0;
                            //context.LichSuTichDiems.Update(tieud);
                            //context.SaveChanges();
                        }
                        else
                        {
                            tichd.Diem = 0;
                            context.LichSuTichDiems.Update(tichd);
                            context.SaveChanges();
                        }
                    }
                    if (lstlstd.Count == 2)
                    {
                        //Cộng điểm khách hàng
                        var kh = context.KhachHangs.Where(c => c.IDKhachHang == tieud.IDKhachHang).FirstOrDefault();
                        kh.DiemTich += tieud.Diem;
                        context.KhachHangs.Update(kh);
                        context.SaveChanges();

                        //Thêm 1 lịch sử trả lại điểm
                        LichSuTichDiem diemtra = new LichSuTichDiem()
                        {
                            ID = new Guid(),
                            IDHoaDon = hd.ID,
                            IDKhachHang = kh.IDKhachHang,
                            Diem = tieud.Diem,
                            TrangThai = 2,
                            IDQuyDoiDiem = tieud.IDQuyDoiDiem,
                        };
                        context.LichSuTichDiems.Add(diemtra);
                        context.SaveChanges();
                        //Xóa tích sửa tiêu = 0
                        //context.LichSuTichDiems.Remove(tieud);
                        //context.SaveChanges();


                        //tichd.Diem = 0;
                        //tichd.TrangThai = 2;
                        context.LichSuTichDiems.Remove(tichd);
                        context.SaveChanges();
                    }
                }
                return true;
            }
            catch (Exception ex)
            {
                return false;
            }
        }
        //Copy
        public async Task<bool> CopyHD(Guid idhd, Guid idnv)
        {
            try
            {
                var hd = context.HoaDons.Where(c => c.ID == idhd).FirstOrDefault();
                //hóa đơn chi tiết
                var lsthdct = context.ChiTietHoaDons.Where(c => c.IDHoaDon == idhd).ToList();
                // lịch sử tích điểm
                var lstlstd = context.LichSuTichDiems.Where(c => c.IDHoaDon == idhd).ToList();

                // Tạo hóa đơn mới có sản phẩm y hệt hóa đơn sao chép
                HoaDon hoaDon = new HoaDon();
                hoaDon.ID = Guid.NewGuid();
                hoaDon.NgayTao = DateTime.Now;
                hoaDon.TenNguoiNhan = hd.TenNguoiNhan;
                hoaDon.SDT = hd.SDT;
                hoaDon.DiaChi = hd.DiaChi;
                hoaDon.Email = hd.DiaChi;
                hoaDon.GhiChu = "Copy " + hd.MaHD;
                hoaDon.IDNhanVien = idnv;
                hoaDon.TrangThaiGiaoHang = 0;
                hoaDon.LoaiHD = hd.LoaiHD;
                hoaDon.MaHD = "HD" + (hoaDon.ID).ToString().Substring(0, 8).ToUpper();
                context.HoaDons.Add(hoaDon);
                context.SaveChanges();

                // Tạo chi tiết hóa đơn mới
                foreach (var item in lsthdct)
                {
                    var ctsp = context.ChiTietSanPhams.FirstOrDefault(c => c.ID == item.IDCTSP);
                    if (ctsp.SoLuong > item.SoLuong)
                    {
                        var danhgia = new DanhGia()
                        {
                            ID = new Guid(),
                            TrangThai = 0,
                        };
                        await context.DanhGias.AddAsync(danhgia);
                        await context.SaveChangesAsync();

                        ChiTietHoaDon ct = new ChiTietHoaDon()
                        {
                            ID = danhgia.ID,
                            SoLuong = item.SoLuong,
                            TrangThai = 0,
                            IDCTSP = item.IDCTSP,
                            IDHoaDon = hoaDon.ID
                        };
                        await context.ChiTietHoaDons.AddAsync(ct);
                        await context.SaveChangesAsync();

                        // Trừ số lượng
                        ctsp.SoLuong -= item.SoLuong;
                        context.ChiTietSanPhams.Update(ctsp);
                        await context.SaveChangesAsync();
                    }
                }
                // Nếu có khách hàng -> Tạo lịch sử ms
                var qqd = context.QuyDoiDiems.FirstOrDefault(c => c.TrangThai != 0);
                if (lstlstd.Count != 0)
                {
                    LichSuTichDiem lstd = new LichSuTichDiem()
                    {
                        ID = new Guid(),
                        Diem = 0,
                        TrangThai = 1,
                        IDKhachHang = lstlstd.FirstOrDefault(c => c.IDHoaDon == hd.ID).IDKhachHang,
                        IDHoaDon = hoaDon.ID,
                        IDQuyDoiDiem = qqd.ID,
                    };
                    await context.LichSuTichDiems.AddAsync(lstd);
                    await context.SaveChangesAsync();
                };
                return true;
            }
            catch (Exception ex)
            {
                return false;
            }
        }

        public List<HoaDon> LichSuGiaoDich(Guid idNguoiDung)
        {
            var idhoadon = reposLichSuTichDiem.GetAll().Where(p => p.IDKhachHang == idNguoiDung).ToList();
            List<HoaDon> lichSuGiaoDich = new List<HoaDon>();
            foreach (var item in idhoadon)
            {
                lichSuGiaoDich.Add(reposHoaDon.GetAll().FirstOrDefault(p => p.ID == item.IDHoaDon));
            }
            return lichSuGiaoDich;
        }

        public List<HoaDon> TimKiemVaLocHoaDon(string ten, int? loc)
        {
            string tenLowerCase = ten.ToLower();
            ////    List<HoaDon> timkiem = reposHoaDon.GetAll().Where(p => EF.Functions.Like(p.TenNguoiNhan.ToLower(), $"%{tenLowerCase}%")).ToList();
            //    string tenLowerCase = ten.ToLower();
            //List<HoaDon> timkiem = reposHoaDon.GetAll()
            //    .Where(p => EF.Functions.Like(p.TenNguoiNhan.ToLower(), $"%{tenLowerCase}%"))
            //    .ToList();
            List<HoaDon> timkiem = reposHoaDon.GetAll()
       .Where(p => RemoveVietnameseSigns(p.TenNguoiNhan.ToLower()).StartsWith(RemoveVietnameseSigns(tenLowerCase)))
       .ToList();

            // Sắp xếp nếu có yêu cầu
            if (loc == 0)
            {
                // Sắp xếp tăng dần theo NgayTao
                return timkiem.OrderBy(p => p.NgayTao).ToList();
            }
            else if (loc == 1)
            {
                // Sắp xếp giảm dần theo NgayTao
                return timkiem.OrderByDescending(p => p.NgayTao).ToList();
            }

            // Trả về danh sách đã tìm kiếm mà không sắp xếp
            return timkiem;
        }
        // Hàm loại bỏ dấu tiếng Việt
        private string RemoveVietnameseSigns(string text)
        {
            text = text.Normalize(NormalizationForm.FormD);
            var sb = new StringBuilder();

            foreach (var c in text)
            {
                var uc = CharUnicodeInfo.GetUnicodeCategory(c);
                if (uc != UnicodeCategory.NonSpacingMark)
                {
                    sb.Append(c);
                }
            }

            return sb.ToString().Normalize(NormalizationForm.FormC);
        }

        public bool UpdateGhiChuHD(Guid idhd, Guid idnv,int trangThai, string ghichu)
        {
            try
            {
                var hd = reposHoaDon.GetAll().FirstOrDefault(c => c.ID == idhd);
                if (ghichu == "null")
                {
                    hd.GhiChu = null;
                    hd.IDNhanVien = idnv;
                }
                else
                {
                    hd.TrangThaiGiaoHang= trangThai;
                    hd.GhiChu = ghichu;
                }
                reposHoaDon.Update(hd);
                return true;

            }
            catch (Exception ex)
            {
                return false;
            }
        }
        // Check khách hàng đã dùng voucher này chưa
        public bool CheckCusUseVoucher(Guid idkh, Guid idvoucher)
        {
            var hdkh = (from hd in context.HoaDons
                        join lstd in context.LichSuTichDiems on hd.ID equals lstd.IDHoaDon
                        join kh in context.KhachHangs on lstd.IDKhachHang equals kh.IDKhachHang
                        where kh.IDKhachHang == idkh
                        select hd).ToList();
            if (hdkh == null)
            {
                return false;
            }
            return (hdkh.Any(c => c.IDVoucher == idvoucher) ? true : false);
        }
        //public bool UpdateHoaDon(HoaDonThanhToanRequest hoaDon)
        //{
        //    var update = reposHoaDon.GetAll().FirstOrDefault(p => p.ID == hoaDon.Id);

        //    //Lưu tiền vào hóa đơn chi tiết
        //    var lsthdct = context.ChiTietHoaDons.Where(c => c.IDHoaDon == hoaDon.Id).ToList();
        //    //Xóa hóa đơn chi tiết có số lượng = 0
        //    var delete = lsthdct.Where(c => c.SoLuong == 0).ToList();
        //    context.ChiTietHoaDons.RemoveRange(delete);
        //    context.SaveChanges();

        //    lsthdct = context.ChiTietHoaDons.Where(c => c.IDHoaDon == hoaDon.Id).ToList();
        //    foreach (var item in lsthdct)
        //    {
        //        var result = (from ctsp in context.ChiTietSanPhams
        //                      join km in context.KhuyenMais
        //                          .Where(c => c.NgayKetThuc > DateTime.Now && c.TrangThai != 2)
        //                          on ctsp.IDKhuyenMai equals km.ID into kmGroup
        //                      from km in kmGroup.DefaultIfEmpty()
        //                      where ctsp.ID == item.IDCTSP
        //                      select km != null ? (km.TrangThai == 0 ? (km.GiaTri < ctsp.GiaBan ? (ctsp.GiaBan - km.GiaTri) : 0) : (ctsp.GiaBan * (100 - km.GiaTri) / 100)): ctsp.GiaBan)
        //                     .FirstOrDefault();
        //        item.DonGia = result;
        //        context.ChiTietHoaDons.Update(item);
        //        context.SaveChanges();
        //    }
        //    //Update LSTD tích (ban đầu chỉ có duy nhất 1
        //    var lstd = context.LichSuTichDiems.FirstOrDefault(c => c.IDHoaDon == hoaDon.Id);
        //    if (lstd != null)
        //    {
        //        //Lấy id quy đổi điểm dùng hiện tại
        //        var qdiem = context.QuyDoiDiems.FirstOrDefault(c => c.TrangThai != 0);
        //        if (qdiem.TrangThai == 1) // Chỉ tích hoặc tiêu
        //        {
        //            if (hoaDon.DiemTichHD >= hoaDon.DiemSD) // Trường hợp tích = tiêu = 0
        //            {
        //                lstd.Diem = hoaDon.DiemTichHD;
        //                context.LichSuTichDiems.Update(lstd);
        //                context.SaveChanges();
        //            }
        //            else if (hoaDon.DiemSD > hoaDon.DiemTichHD) // Trường hợp tiêu nhiều hơn tích
        //            {
        //                lstd.Diem = hoaDon.DiemSD;
        //                lstd.TrangThai = 0;
        //                context.LichSuTichDiems.Update(lstd);
        //                context.SaveChanges();
        //            }
        //        }
        //        else if (qdiem.TrangThai == 2) // Vừa tích vừa tiêu
        //        {
        //            if (hoaDon.DiemTichHD != 0)
        //            {
        //                lstd.Diem = hoaDon.DiemTichHD;
        //                context.LichSuTichDiems.Update(lstd);
        //                context.SaveChanges();
        //            }
        //            if (hoaDon.DiemSD != 0)
        //            {
        //                // Tạo lstieudiem
        //                LichSuTichDiem lstieu = new LichSuTichDiem()
        //                {
        //                    ID = new Guid(),
        //                    TrangThai = 0,
        //                    IDHoaDon = hoaDon.Id,
        //                    IDKhachHang = lstd.IDKhachHang,
        //                    Diem = hoaDon.DiemSD,
        //                    IDQuyDoiDiem = qdiem.ID,
        //                };
        //                context.LichSuTichDiems.Add(lstieu);
        //                context.SaveChanges();
        //            }
        //        }
        //        // Thêm điểm cho Khách hàng và trừ
        //        var kh = reposKhachHang.GetAll().FirstOrDefault(c => c.IDKhachHang == lstd.IDKhachHang);
        //        kh.DiemTich += hoaDon.DiemTichHD;
        //        kh.DiemTich -= hoaDon.DiemSD;
        //        reposKhachHang.Update(kh);
        //    }
        //    // Trừ số lượng voucher nếu có
        //    var vc = context.Vouchers.Find(hoaDon.IdVoucher);
        //    if (vc != null)
        //    {
        //        vc.SoLuong -= 1;
        //        context.Vouchers.Update(vc);
        //        context.SaveChanges();
        //    }
        //    // UpdateHD
        //    update.IDNhanVien = hoaDon.IdNhanVien;
        //    update.NgayThanhToan = hoaDon.NgayThanhToan;
        //    update.TrangThaiGiaoHang = hoaDon.TrangThai;
        //    update.TongTien = hoaDon.TongTien;
        //    update.PhuongThucThanhToan = hoaDon.PTTT;
        //    update.IDVoucher = hoaDon.IdVoucher == Guid.Empty ? null : hoaDon.IdVoucher;
        //    return reposHoaDon.Update(update);
        //}

        public bool UpdateTrangThaiGiaoHang(Guid idHoaDon, int trangThai, Guid? idNhanVien)
        {
            var update = reposHoaDon.GetAll().FirstOrDefault(p => p.ID == idHoaDon);
            List<ChiTietHoaDon> chitiethoadon = reposChiTietHoaDon.GetAll().Where(p => p.IDHoaDon == idHoaDon).ToList();
            if (update != null)
            {
                if (trangThai == 5)
                {
                    foreach (var item in chitiethoadon)
                    {
                        var CTsanPham = repsCTSanPham.GetAll().FirstOrDefault(p => p.ID == item.IDCTSP);
                        CTsanPham.SoLuong += item.SoLuong;
                        repsCTSanPham.Update(CTsanPham);
                    }
                }
                else if (trangThai == 3)
                {
                    foreach (var item in chitiethoadon)
                    {
                        var CTsanPham =  repsCTSanPham.GetAll().FirstOrDefault(p => p.ID == item.IDCTSP);
                        if (CTsanPham != null)
                        {
                            CTsanPham.SoLuong -= item.SoLuong;
                             repsCTSanPham.Update(CTsanPham);
                        }
                    }
                }
                if (trangThai == 6)
                {
                    var lstlstd = context.LichSuTichDiems.Where(c => c.IDHoaDon == idHoaDon).ToList();
                    if (lstlstd.Count != 0)
                    {
                        var td = lstlstd.Where(c => c.TrangThai == 1).FirstOrDefault();
                        if (td != null)
                        {
                            var kh = context.KhachHangs.Where(c => c.IDKhachHang == td.IDKhachHang).FirstOrDefault();
                            kh.DiemTich += td.Diem;
                            context.KhachHangs.Update(kh);
                            context.SaveChanges();
                        }
                    }
                    update.NgayThanhToan = update.NgayThanhToan == null ? DateTime.Now : update.NgayThanhToan;
                    update.NgayNhanHang = update.NgayNhanHang == null ? DateTime.Now : update.NgayNhanHang;
                }
                
                update.TrangThaiGiaoHang = trangThai;
                update.IDNhanVien = idNhanVien;
                reposHoaDon.Update(update);
                return true;
            }
            else
            {
                return false;
            }
        }
        //Giao thành công
        public bool ThanhCong(Guid idhd, Guid idnv) // Chỉ cho đơn online
        {
            try
            {
                var hd = context.HoaDons.FirstOrDefault(c => c.ID == idhd);
                hd.TrangThaiGiaoHang = 6;
                hd.IDNhanVien = idnv;
                hd.NgayNhanHang = DateTime.Now;
                hd.NgayThanhToan = DateTime.Now;
                context.HoaDons.Update(hd);
                context.SaveChanges();
                //Cộng tích điểm cho khách
                var lstlstd = context.LichSuTichDiems.Where(c => c.IDHoaDon == idhd).ToList();
                if (lstlstd.Count != 0)
                {
                    var td = lstlstd.Where(c => c.TrangThai == 1).FirstOrDefault();
                    if (td != null)
                    {
                        //Trừ điểm kh
                        var kh = context.KhachHangs.Where(c => c.IDKhachHang == td.IDKhachHang).FirstOrDefault();
                        kh.DiemTich += td.Diem;
                        context.KhachHangs.Update(kh);
                        context.SaveChanges();
                    }
                }
                return true;
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }
        // Hoàn hàng
        public bool HoanHang(Guid idhd, Guid idnv)
        {
            try
            {
                var hd = context.HoaDons.FirstOrDefault(c => c.ID == idhd);
                hd.TrangThaiGiaoHang = 4;
                hd.IDNhanVien = idnv;

                //Trừ đi điểm tích của khách hàng nếu có
                var lstlstd = context.LichSuTichDiems.Where(c => c.IDHoaDon == idhd).ToList();
                if (lstlstd.Count != 0)
                {
                    var td = lstlstd.Where(c => c.TrangThai == 1).FirstOrDefault();
                    if (td != null)
                    {
                        //Trừ điểm kh
                        var kh = context.KhachHangs.Where(c => c.IDKhachHang == td.IDKhachHang).FirstOrDefault();
                        kh.DiemTich -= td.Diem;
                        context.KhachHangs.Update(kh);
                        context.SaveChanges();
                        // Tạo 1 lịch sử trừ điểm 
                        LichSuTichDiem diemtru = new LichSuTichDiem()
                        {
                            ID = new Guid(),
                            IDHoaDon = hd.ID,
                            IDKhachHang = kh.IDKhachHang,
                            Diem = td.Diem,
                            TrangThai = 3,
                            IDQuyDoiDiem = td.IDQuyDoiDiem,
                        };
                        context.LichSuTichDiems.Add(diemtru);
                        context.SaveChanges();
                        //Cập nhật tích điểm
                        //td.Diem = 0;
                        //context.LichSuTichDiems.Update(td);
                        //context.SaveChanges();
                    }
                }
                context.HoaDons.Update(hd);
                context.SaveChanges();
                return true;
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }
        // Hoàn hàng thành công
        public bool HoanHangThanhCong(Guid idhd, Guid idnv)
        {
            try
            {
                var hd = context.HoaDons.FirstOrDefault(c => c.ID == idhd);
                hd.TrangThaiGiaoHang = 5;
                hd.IDNhanVien = idnv;
                hd.TongTien = 0;
                context.HoaDons.Update(hd);
                context.SaveChanges();

                // Cộng lại số lượng hàng
                var lsthdct = context.ChiTietHoaDons.Where(c => c.IDHoaDon == idhd).ToList();
                foreach (var hdct in lsthdct)
                {
                    var ctsp = context.ChiTietSanPhams.FirstOrDefault(c => c.ID == hdct.IDCTSP);
                    ctsp.SoLuong += hdct.SoLuong;
                    context.ChiTietSanPhams.Update(ctsp);
                    context.SaveChanges();
                }

                // Cộng lại số lượng voucher nếu áp dụng
                if (hd.IDVoucher != null)
                {
                    var vc = context.Vouchers.FirstOrDefault(c => c.ID == hd.IDVoucher);
                    vc.SoLuong += 1;
                    context.Vouchers.Update(vc);
                    context.SaveChanges();
                }
                // Cộng lại điểm khách hàng dùng cho hóa đơn
                var lstlstd = context.LichSuTichDiems.Where(c => c.IDHoaDon == idhd).ToList();
                if (lstlstd.Count != 0)
                {
                    var tieud = lstlstd.Where(c => c.TrangThai == 0).FirstOrDefault();
                    if (tieud != null)
                    {
                        //Cộng điểm kh
                        var kh = context.KhachHangs.Where(c => c.IDKhachHang == tieud.IDKhachHang).FirstOrDefault();
                        kh.DiemTich += tieud.Diem;
                        context.KhachHangs.Update(kh);
                        context.SaveChanges();
                        //Thêm 1 lịch sử trả lại điểm cho đơn hoàn thành công
                        LichSuTichDiem diemtra = new LichSuTichDiem()
                        {
                            ID = new Guid(),
                            IDHoaDon = hd.ID,
                            IDKhachHang = kh.IDKhachHang,
                            Diem = tieud.Diem,
                            TrangThai = 4,
                            IDQuyDoiDiem = tieud.IDQuyDoiDiem,
                        };
                        context.LichSuTichDiems.Add(diemtra);
                        context.SaveChanges();
                        //if (lsthdct.Count == 2)
                        //{
                        //    context.LichSuTichDiems.Remove(tieud);
                        //    context.SaveChanges();
                        //}
                        //else
                        //{
                        //    //Cập nhật tích điểm
                        //    tieud.Diem = 0;
                        //    context.LichSuTichDiems.Update(tieud);
                        //    context.SaveChanges();
                        //}
                    }

                }
                return true;
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }

        public DonMuaSuccessViewModel CreateHoaDon(List<ChiTietHoaDonViewModel> chiTietHoaDons, HoaDonViewModel hoaDon)
        {
            throw new NotImplementedException();
        }

        public bool UpdateHoaDon(HoaDonThanhToanRequest hoaDon)
        {
            throw new NotImplementedException();
        }

        public HoaDonViewModelBanHang GetHDBanHang(Guid id)
        {
            throw new NotImplementedException();
        }


        public ChiTietHoaDonQL GetCTHDByID(Guid idhd)
        {
            throw new NotImplementedException();
        }

        public List<HoaDon> Loctheotrangthai(int loc)
        {
            // Get all invoices and filter based on the delivery status
            List<HoaDon> timkiem = reposHoaDon.GetAll()
                .Where(p => p.TrangThaiGiaoHang == loc )
                .ToList();

            return timkiem;
        }

       
    

		

       
          
        

       

        public async Task<IEnumerable<HoaDonViewModel>> GetDonHangsDaMuaAsync(Guid idKhachHang)
        {
            var donHangsDaMua = await context.HoaDons
              .Where(hd => hd.KhachHangID == idKhachHang && hd.NgayThanhToan.HasValue)
              .Select(hd => new HoaDonViewModel
              {
                  ChiTietHoaDons = hd.ChiTietHoaDons.Select(ct => new ChiTietHoaDonViewModel
                  {
                      IDChiTietSanPham = ct.ID,
                      SoLuong = ct.SoLuong,
                      DonGia = ct.DonGia,

                  }).ToList(),
                  id =hd.ID,
                  Ten = hd.TenNguoiNhan,
                  SDT = hd.SDT,
                  Email = hd.Email,
                  DiaChi = hd.DiaChi,
                  TienShip = hd.TienShip,
                  TongTien = hd.TongTien ?? 0,
                  IDNhanVien = hd.IDNhanVien,
                  IDNguoiDung = hd.KhachHangID,
                  NgayThanhToan = hd.NgayThanhToan,
                  GhiChu = hd.GhiChu
              })
              .ToListAsync();

            return donHangsDaMua;
        }

        //public List<HoaDon> GetHoaDonByKhachHangId(Guid idKhachHang)
        //{
        //    return context.HoaDons
        //           .Include(h => h.ChiTietHoaDons)
        //               .ThenInclude(ct => ct.ChiTietSanPham) // Bao gồm thông tin ChiTietSanPham
        //                   .ThenInclude(ctsp => ctsp.SanPham) // Bao gồm thông tin SanPham
        //               .ThenInclude(ct => ct.ChiTietSanPhams) // Bao gồm thông tin ChiTietSanPham cho ChiTietHoaDon
        //                   .ThenInclude(ctsp => ctsp.Anhs) // Bao gồm thông tin Anh từ ChiTietSanPham
        //           .Where(h => h.KhachHangID == idKhachHang)
        //           .ToList();
        //}

        public List<HoaDon> GetHoaDonByKhachHangId(Guid idKhachHang)
        {
            return context.HoaDons
                   //.Include(h => h.ChiTietHoaDons)
                   .Where(h => h.KhachHangID == idKhachHang)
                   .ToList();
        }
     
      
    }



}

