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
	internal class ChiTietHoaDonConfiguration : IEntityTypeConfiguration<ChiTietHoaDon>
	{
		public void Configure(EntityTypeBuilder<ChiTietHoaDon> builder)
		{
			builder.ToTable("ChiTietHoaDon");
			builder.HasKey(x => x.ID);
			builder.Property(x => x.DonGia).HasColumnType("int");
			builder.Property(x => x.SoLuong).HasColumnType("int");
			builder.Property(x => x.TrangThai).HasColumnType("int");
			builder.HasOne(x => x.HoaDon).WithMany(x => x.ChiTietHoaDons).HasForeignKey(x => x.IDHoaDon);
			builder.HasOne(x => x.ChiTietSanPham).WithMany(x => x.ChiTietHoaDons).HasForeignKey(x => x.IDCTSP);
		}
	}
}
