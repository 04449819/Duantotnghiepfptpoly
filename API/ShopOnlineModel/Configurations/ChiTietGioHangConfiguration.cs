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
	internal class ChiTietGioHangConfiguration : IEntityTypeConfiguration<ChiTietGioHang>
	{
		public void Configure(EntityTypeBuilder<ChiTietGioHang> builder)
		{
			builder.ToTable("ChiTietGioHang");
			builder.HasKey(x => x.ID);
			builder.Property(x => x.SoLuong).HasColumnType("int").IsRequired();
			builder.HasOne(x => x.ChiTietSanPham).WithMany(x => x.ChiTietGioHangs).HasForeignKey(x => x.IDCTSP);
			builder.HasOne(x => x.GioHang).WithMany(x => x.ChiTietGioHangs).HasForeignKey(x => x.IDNguoiDung);
		}
	}
}
