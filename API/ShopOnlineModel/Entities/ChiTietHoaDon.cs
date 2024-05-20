using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ShopOnlineModel.Entities
{
	public class ChiTietHoaDon
	{
		public Guid ID { get; set; }
		public int DonGia { get; set; }
		public int SoLuong { get; set; }
		public int TrangThai { get; set; }
		public Guid IDCTSP { get; set; }
		public Guid IDHoaDon { get; set; }
		public virtual HoaDon? HoaDon { get; set; }
		public virtual ChiTietSanPham? ChiTietSanPham { get; set; }
		public virtual DanhGia? DanhGia { get; set; }
	}
}
