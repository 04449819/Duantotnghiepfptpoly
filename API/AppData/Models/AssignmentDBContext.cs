﻿using Microsoft.EntityFrameworkCore;
using System.Reflection;

namespace AppData.Models
{
    public class AssignmentDBContext : DbContext
    {
        public AssignmentDBContext()
        {
        }
        public AssignmentDBContext(DbContextOptions options) : base(options)
        {
        }
        public DbSet<ChiTietGioHang> ChiTietGioHangs { get; set; }
        public DbSet<ChiTietSanPham> ChiTietSanPhams { get; set; }
        public DbSet<MauSac> MauSacs { get; set; }
        public DbSet<KichCo> KichCos { get; set; }
        public DbSet<ChatLieu> ChatLieus { get; set; }
        public DbSet<ChiTietHoaDon> ChiTietHoaDons { get; set; }
        public DbSet<GioHang> GioHangs { get; set; }
        public DbSet<HoaDon> HoaDons { get; set; }
        public DbSet<KhuyenMai> KhuyenMais { get; set; }
        public DbSet<LichSuTichDiem> LichSuTichDiems { get; set; }
        public DbSet<LoaiSP> LoaiSPs { get; set; }
        public DbSet<KhachHang> KhachHangs { get; set; }
        public DbSet<KhuyenMaiCTSanPham> KhuyenMaiCTSanPhams { get; set; }
        public DbSet<NhanVien> NhanViens { get; set; }
        public DbSet<DanhGia> DanhGias { get; set; }
        public DbSet<QuyDoiDiem> QuyDoiDiems { get; set; }
        public DbSet<SanPham> SanPhams { get; set; }
        public DbSet<VaiTro> VaiTros { get; set; }
        public DbSet<Voucher> Vouchers { get; set; }
        public DbSet<Anh> Anhs { get; set; }
        public DbSet<DiaChiKhachHang> diaChiKhachHangs { get;set; }
        public DbSet<CoAo> CoAos { get; set; }
		public DbSet<PhuongThucThanhToan> phuongThucThanhToans { get; set; }
        public DbSet<Hoanhangsanpham> Hoanhangsanphams { get; set; }
		protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {

			 optionsBuilder.UseSqlServer(@"Data Source=LAPTOP-3CIJFN74\SQLEXPRESS;Initial Catalog=duantotnghiepfptpoly;Integrated Security=True");





		}




		//THUYNHU\SQLEXPRESS
		//DESKTOP-UOIH77U\SQLEXPRESS
		//LAPTOP-A15NGLBG\SQLEXPRESS
		// lam DESKTOP-S6G7NFV\SQLEXPRESS // 1AppBanQuanAoThoiTrangNam
		//LAPTOP-G189FU38\SQLEXPRESS
		//optionsBuilder.UseSqlServer(@"Data Source=LAPTOP-6CVPDDRJ\SQLEXPRESS;Initial Catalog=duantotnghiepfpt;Integrated Security=True");
		protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.ApplyConfigurationsFromAssembly(Assembly.GetExecutingAssembly());
        }
}
}
