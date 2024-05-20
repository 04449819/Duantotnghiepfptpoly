using Microsoft.EntityFrameworkCore;
using ShopOnlineModel.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Reflection;
using System.Text;
using System.Threading.Tasks;

namespace ShopOnlineModel.Data
{
	internal class ShopOnlineDBContext : DbContext
	{
        public ShopOnlineDBContext()
        {
            
        }

		public ShopOnlineDBContext(DbContextOptions options) : base(options)
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
		public DbSet<LoaiSanPham> LoaiSPs { get; set; }
		public DbSet<KhachHang> KhachHangs { get; set; }
		public DbSet<NhanVien> NhanViens { get; set; }
		public DbSet<DanhGia> DanhGias { get; set; }
		public DbSet<QuyDoiDiem> QuyDoiDiems { get; set; }
		public DbSet<SanPham> SanPhams { get; set; }
		public DbSet<VaiTro> VaiTros { get; set; }
		public DbSet<Voucher> Vouchers { get; set; }
		public DbSet<Anh> Anhs { get; set; }

		protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
		{
			optionsBuilder.UseSqlServer(@"Data Source=LAPTOP-6CVPDDRJ\SQLEXPRESS;Initial Catalog=duantotnghiepfptpoly;Integrated Security=True;TrustServerCertificate=True");
		}

		protected override void OnModelCreating(ModelBuilder modelBuilder)
		{
			modelBuilder.ApplyConfigurationsFromAssembly(Assembly.GetExecutingAssembly());
		}
	}
}
