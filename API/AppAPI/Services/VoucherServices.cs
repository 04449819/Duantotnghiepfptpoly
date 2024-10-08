﻿using AppAPI.IServices;
using AppData.IRepositories;
using AppData.Models;
using AppData.Repositories;
using AppData.ViewModels;

namespace AppAPI.Services
{
    public class VoucherServices : IVoucherServices
    {
        private readonly IAllRepository<Voucher> _allRepository;
        private readonly IAllRepository<HoaDon> _respoHoaDon;
        AssignmentDBContext context= new AssignmentDBContext();
        public VoucherServices()
        {
            _allRepository= new AllRepository<Voucher>(context,context.Vouchers);
            _respoHoaDon= new AllRepository<HoaDon>(context,context.HoaDons);
        }
        public bool Add(VoucherView voucherview)
        {
            voucherview.Id=Guid.NewGuid();
            var voucher= new Voucher();
            voucher.ID=voucherview.Id;
            voucher.Ten=voucherview.Ten?.Trim();
            voucher.HinhThucGiamGia=voucherview.HinhThucGiamGia;
            voucher.SoTienCan=voucherview.SoTienCan;
            voucher.GiaTri = voucherview.GiaTri;
            voucher.NgayApDung=voucherview.NgayApDung;
            voucher.NgayKetThuc=voucherview.NgayKetThuc;
            if (voucher.NgayApDung > voucher.NgayKetThuc)
            {
                return false;
            }
            voucher.SoLuong=voucherview.SoLuong;
            voucher.MoTa = voucherview.MoTa?.Trim();
            voucher.TrangThai=voucherview.TrangThai;
            return _allRepository.Add(voucher);
        }

        public bool Delete(Guid Id)
        {
            var voucher = _allRepository.GetAll().FirstOrDefault(x => x.ID == Id);
            if (voucher != null)
            {
               
                return _allRepository.Delete(voucher);
            }
            else
            {
                return false;
            }
        }

        public List<Voucher> GetAll()
        {
            return _allRepository.GetAll();
        }

        public Voucher GetById(Guid Id)
        {
            return _allRepository.GetAll().FirstOrDefault(x => x.ID == Id);
        }

        public bool Update(Guid id,VoucherView voucherview)
        {
            var voucher= _allRepository.GetAll().FirstOrDefault(x => x.ID == id);
            if (voucher != null)
            {

                voucher.Ten = voucherview.Ten;
                voucher.HinhThucGiamGia = voucherview.HinhThucGiamGia;
                voucher.SoTienCan = voucherview.SoTienCan;
                voucher.GiaTri = voucherview.GiaTri;
                voucher.NgayApDung = voucherview.NgayApDung;
                voucher.NgayKetThuc = voucherview.NgayKetThuc;
                if (voucher.NgayApDung > voucher.NgayKetThuc)
                {
                    return false;
                }
                voucher.SoLuong = voucherview.SoLuong;
                voucher.MoTa = voucherview.MoTa?.Trim();
                voucher.TrangThai = voucherview.TrangThai;
              
                return _allRepository.Update(voucher);
            }
            else
            {
                return false;
            }
        }
        public Voucher? GetVoucherByMa(string ma)
        {
            return _allRepository.GetAll().FirstOrDefault(x => x.Ten.ToUpper() == ma.ToUpper());
        }
        public List<Voucher> GetAllVoucherByTien(int tongTien) 
        {
            return _allRepository.GetAll().Where(x=>x.NgayApDung<DateTime.Now && x.NgayKetThuc>DateTime.Now && x.SoTienCan<tongTien && x.TrangThai>0 && x.SoLuong>0).ToList();
        }

        #region Tung
        public Voucher? FillVoucher(int tongTien)
        {
            
            var dateNow = DateTime.Now;
            var vouchers = context.Vouchers
                            .Where(x => x.SoTienCan <= tongTien 
                                    && dateNow >= x.NgayApDung 
                                    && dateNow <= x.NgayKetThuc)
                            .ToList();
            if (!vouchers.Any())
            {
                return null;
            }
            var bestVoucher = vouchers
                .Select(vouchers => new
                {
                    Voucher = vouchers,
                    GiaGiam = vouchers.HinhThucGiamGia == 0
                            ? vouchers.GiaTri
                            : tongTien - (tongTien * vouchers.GiaTri / 100)
                })
                .OrderByDescending(v => v.GiaGiam)
                .FirstOrDefault()?.Voucher;
            return bestVoucher;
        }

        public List<Voucher> GetAllAvaiableVoucher()
        {
            DateTime now = DateTime.Now;
            return context.Vouchers
                .Where(voucher =>
                    voucher.TrangThai == 1 &&
                    voucher.NgayApDung <= now &&
                    voucher.NgayKetThuc >= now &&
                    voucher.SoLuong > 0
                )
                .ToList();
        }
        public bool CheckStatusVouchers()
        {
            var now = DateTime.Now;

            // Lọc các voucher hết hạn, hết hàng, hoặc không thỏa mãn điều kiện về GiaTri và SoTienCan
            var expiredOrOutOfStockVouchers = context.Vouchers
                .Where(x => x.SoLuong <= 0 || now < x.NgayApDung || now > x.NgayKetThuc
                            || (x.HinhThucGiamGia == 0 && x.GiaTri > x.SoTienCan)) // Điều kiện mới
                .ToList(); // Chuyển thành danh sách để dùng trong vòng lặp

            // Cập nhật trạng thái của các voucher không hợp lệ
            foreach (var voucher in expiredOrOutOfStockVouchers)
            {
                voucher.TrangThai = 0;
            }

            context.SaveChanges();

            return true;
        }

        #endregion
    }
}
