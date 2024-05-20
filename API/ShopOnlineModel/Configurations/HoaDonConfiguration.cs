using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using ShopOnlineModel.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ShopOnlineModel.Configurations
{
	internal class HoaDonConfiguration : IEntityTypeConfiguration<HoaDon>
	{
		public void Configure(EntityTypeBuilder<HoaDon> builder)
		{
			builder.ToTable("HoaDon");
			builder.HasKey(x => x.ID);
			builder.Property(x => x.NgayTao).HasColumnType("datetime");
			builder.Property(x => x.NgayThanhToan).HasColumnType("datetime");
			builder.Property(x => x.NgayNhanHang).HasColumnType("datetime");
			builder.Property(x => x.TenNguoiNhan).HasColumnType("nvarchar(100)");
			builder.Property(x => x.SDT).HasColumnType("nvarchar(10)");
			builder.Property(x => x.Email).HasColumnType("nvarchar(50)");
			builder.Property(x => x.DiaChi).HasColumnType("nvarchar(100)");
			builder.Property(x => x.GhiChu).HasColumnType("nvarchar(100)");
			builder.Property(x => x.TienShip).HasColumnType("int");
			builder.Property(x => x.TrangThaiGiaoHang).HasColumnType("int");
			builder.HasOne(x => x.NhanVien).WithMany(x => x.HoaDons).HasForeignKey(x => x.IDNhanVien);
			builder.HasOne(x => x.Voucher).WithMany(x => x.HoaDons).HasForeignKey(x => x.IDVoucher);
		}
	}
}
