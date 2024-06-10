using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Runtime.InteropServices;
using System.Text;
using System.Threading.Tasks;

namespace AppData.Models
{
	public class DiaChiKhachHang
	{
		public Guid Id { get; set; }
		public Guid KhachHangID { get; set; }
		public string DiaChi { get; set; }
		public int TrangThai {get; set;}

		[ForeignKey("KhachHangID")]
		public virtual KhachHang? KhachHang { get; set; }
	}
}
