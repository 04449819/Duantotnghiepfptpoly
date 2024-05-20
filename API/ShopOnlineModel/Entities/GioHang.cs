using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ShopOnlineModel.Entities
{
	public class GioHang
	{
		public Guid IDKhachHang { get; set; }
		public DateTime NgayTao { get; set; }
		public virtual KhachHang? KhachHang { get; set; }
		public virtual IEnumerable<ChiTietGioHang> ChiTietGioHangs { get; set; }
	}
}
