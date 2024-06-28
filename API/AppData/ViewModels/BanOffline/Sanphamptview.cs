using AppData.Models;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AppData.ViewModels.BanOffline
{
	public class Sanphamptview
	{
		public Guid ID { get; set; }
		[StringLength(200, ErrorMessage = "Ten san pham khong duoc dai qua 40 tu.")]
		public string Ten { get; set; }
		public string? Ma { get; set; }
		public string? MoTa { get; set; }
		public decimal? giaBan { get; set; }
		public int TrangThai { get; set; }
		public List<Anh> anhs { get; set;}
		public Guid IdSanPham { get; set; }
		public Guid IDLoaiSP { get; set; }
		public Guid IDChatLieu { get; set; }
		public string chatLieu { get; set; }
		public string loaiSanPham{ get; set; }
	}
}
