using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ShopOnlineModel.Entities
{
	public class ChiTietGioHang
	{
		public Guid ID { get; set; }
		public int SoLuong { get; set; }
		public Guid IDCTSP { get; set; }
		public Guid IDNguoiDung { get; set; }
		public virtual ChiTietSanPham? ChiTietSanPham { get; set; }
		public virtual GioHang? GioHang { get; set; }
	}
}
