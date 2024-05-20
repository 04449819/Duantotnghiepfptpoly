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
	internal class SanPhamConfiguration : IEntityTypeConfiguration<SanPham>
	{
		public void Configure(EntityTypeBuilder<SanPham> builder)
		{
			builder.ToTable("SanPham");
			builder.HasKey(x => x.ID);
			builder.Property(x => x.Ten).HasColumnType("nvarchar(200)");
			builder.Property(x => x.Ma).HasColumnType("nvarchar(10)");
			builder.Property(x => x.MoTa).HasColumnType("nvarchar(300)");
			builder.Property(x => x.TrangThai).HasColumnType("int");
			builder.HasOne(x => x.LoaiSP).WithMany(x => x.SanPhams).HasForeignKey(x => x.IDLoaiSP);
			builder.HasOne(x => x.ChatLieu).WithMany(x => x.SanPhams).HasForeignKey(x => x.IDChatLieu);
		}
	}
}
