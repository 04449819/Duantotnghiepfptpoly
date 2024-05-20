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
	internal class LoaiSPConfiguration : IEntityTypeConfiguration<LoaiSanPham>
	{
		public void Configure(EntityTypeBuilder<LoaiSanPham> builder)
		{
			builder.ToTable("LoaiSP");
			builder.HasKey(x => x.ID);
			builder.Property(x => x.Ten).HasColumnType("nvarchar(30)").IsRequired();
			builder.Property(x => x.TrangThai).HasColumnType("int");
			builder.HasOne(x => x.LoaiSPCha).WithMany().HasForeignKey(x => x.IDLoaiSPCha);
		}
	}
}
