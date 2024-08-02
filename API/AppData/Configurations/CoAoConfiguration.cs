using AppData.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AppData.Configurations
{
	internal class CoAoConfiguration : IEntityTypeConfiguration<CoAo>
	{
		public void Configure(EntityTypeBuilder<CoAo> builder)
		{
			builder.ToTable("CoAo");
			builder.HasKey(x => x.Id);
			builder.Property(x => x.ten).HasColumnType("nvarchar(20)");
			builder.Property(x => x.trangThai).HasColumnType("int");
		}
	}
}
