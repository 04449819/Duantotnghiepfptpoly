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
	internal class GioHangConfiguration : IEntityTypeConfiguration<GioHang>
	{
		public void Configure(EntityTypeBuilder<GioHang> builder)
		{
			builder.ToTable("GioHang");
			builder.HasKey(x => x.IDKhachHang);
			builder.Property(x => x.NgayTao).HasColumnType("datetime");
			builder.HasOne(x => x.KhachHang).WithOne(x => x.GioHang).HasForeignKey<KhachHang>();
		}
	}
}
