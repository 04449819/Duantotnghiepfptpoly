using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AppData.Models
{
	public class CoAo
	{
		public Guid Id { get; set; }
		[StringLength(20, ErrorMessage = "Tên cổ áo không được vượt quá 20 kí tự ")]
		public string ten { get; set; }
		public int trangThai { get; set; }
		public virtual IEnumerable<SanPham>? SanPhams { get; set; }
	}
}
