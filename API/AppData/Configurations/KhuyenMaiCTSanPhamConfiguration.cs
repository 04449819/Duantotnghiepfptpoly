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
	public class KhuyenMaiCTSanPhamConfiguration : IEntityTypeConfiguration<KhuyenMaiCTSanPham>
	{
		public void Configure(EntityTypeBuilder<KhuyenMaiCTSanPham> builder)
		{
			builder.HasKey(p => new { p.IdKhuyenMai,p.IdChiTietSanPham });
		}
	}
}
