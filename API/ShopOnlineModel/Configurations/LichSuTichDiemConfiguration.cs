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
	internal class LichSuTichDiemConfiguration : IEntityTypeConfiguration<LichSuTichDiem>
	{
		public void Configure(EntityTypeBuilder<LichSuTichDiem> builder)
		{
			builder.ToTable("LichSuTichDiem");
			builder.HasKey(x => x.ID);
			builder.Property(x => x.Diem).HasColumnType("int");
			builder.Property(x => x.TrangThai).HasColumnType("int");
			builder.HasOne(x => x.KhachHang).WithMany(x => x.LichSuTichDiems).HasForeignKey(x => x.IDKhachHang);
			builder.HasOne(x => x.QuyDoiDiem).WithMany(x => x.LichSuTichDiems).HasForeignKey(x => x.IDQuyDoiDiem);
			builder.HasOne(x => x.HoaDon).WithMany(x => x.LichSuTichDiems).HasForeignKey(x => x.IDHoaDon);
		}
	}
}
