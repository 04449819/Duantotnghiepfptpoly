using AppData.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AppData.ViewModels.SanPham
{
	public class ThongTinSanPham
	{
		public List<LoaiSP> loaiSPs { get; set; }
		public List<ChatLieu> chatLieus { get; set;}
		public List<CoAo> coAos { get; set; }
	}
}
