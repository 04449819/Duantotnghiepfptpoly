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
	internal class ChatLieuConfiguration : IEntityTypeConfiguration<ChatLieu>
	{
		public void Configure(EntityTypeBuilder<ChatLieu> builder)
		{
			builder.ToTable("ChatLieu");
			builder.HasKey(x => x.ID);
			builder.Property(x => x.Ten).HasColumnType("nvarchar(20)");
			builder.Property(x => x.TrangThai).HasColumnType("int");
		}
	}
}
