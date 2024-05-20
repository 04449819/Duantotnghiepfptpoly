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
	internal class VoucherConfiguration : IEntityTypeConfiguration<Voucher>
	{
		public void Configure(EntityTypeBuilder<Voucher> builder)
		{
			builder.ToTable("Voucher");
			builder.HasKey(x => x.ID);
			builder.Property(x => x.Ten).HasColumnType("nvarchar(50)");
			builder.Property(x => x.HinhThucGiamGia).HasColumnType("int");
			builder.Property(x => x.SoTienCan).HasColumnType("int");
			builder.Property(x => x.GiaTri).HasColumnType("int");
			builder.Property(x => x.NgayApDung).HasColumnType("datetime");
			builder.Property(x => x.NgayKetThuc).HasColumnType("datetime");
			builder.Property(x => x.SoLuong).HasColumnType("int");
			builder.Property(x => x.MoTa).HasColumnType("nvarchar(50)");
			builder.Property(x => x.TrangThai).HasColumnType("int");
		}
	}
}
