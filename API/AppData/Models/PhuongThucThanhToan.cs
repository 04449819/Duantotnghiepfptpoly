using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AppData.Models
{
	public class PhuongThucThanhToan
	{
		public Guid Id { get; set; }
		public string ten { get; set; }
		public string Thongtin { get; set; }
		public int trangThai { get; set; }

		public virtual List<HoaDon>? HoaDons { get; set; }
	}
}
