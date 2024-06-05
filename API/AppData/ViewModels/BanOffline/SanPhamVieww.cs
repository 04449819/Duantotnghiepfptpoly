using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AppData.ViewModels.BanOffline
{
	public class SanPhamVieww
	{
		public Guid idCTSP { get; set; }
		public string loaiSP { get; set; }
		public string tenchatlieu { get; set; }
		public string tenSanPham { get; set; }
		public int soLuong { get; set; }
		public decimal giaBan { get; set; }
		public DateTime ngayTao { get; set; }
		public int	trangThai { get; set; }
		public decimal giaTriKhuyenMai { get; set; }
		public string tenMau { get; set; }
		public string maMau { get; set; }
		public string duongDanAnh { get; set; }
		public string kichCo { get; set; }
	}
}
