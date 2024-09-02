using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AppData.Models
{
	public class Hoanhangsanpham
	{
		public Guid ID { get; set; }
		public Guid Idchitiethoadon { get; set; }
		public int SoLuong { get; set; }
		public string Diachikhachhang { get; set; }
		public DateTime Ngayhoanhang { get; set; }
		public string Mota { get; set; }
		public int TrangThaiHoanHang { get; set; }
		// xác giao hàng. đang vận chuyển.  hoàn hàng thnahf công t
		public virtual ChiTietHoaDon ChiTietHoaDon { get; set; }

	}
}
