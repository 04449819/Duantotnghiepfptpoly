using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AppData.Models
{
	public class KhuyenMaiCTSanPham
	{
		public Guid IdKhuyenMai	 { get; set;}
		public Guid IdChiTietSanPham { get; set;}
		[ForeignKey("IdKhuyenMai")]
		public virtual KhuyenMai? khuyenMai { get; set; }
		[ForeignKey("IdChiTietSanPham")]
		public virtual ChiTietSanPham? chiTietSanPham { get; set; }
	}
}
