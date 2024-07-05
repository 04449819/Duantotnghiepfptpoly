using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AppData.ViewModels
{
	public class ADDSanPhamViewModel
	{
		//tenSanpham: TTSanPham.ten,
  //      ma: TTSanPham.ma,
  //      mota: TTSanPham.mota,
  //      trangThai: 2,
  //      idloaisp: TTSanPham.loaisp,
  //      idchatlieu: TTSanPham.chatlieu,
  //      idCoAo: TTSanPham.coao,
  //      listctsp: ttctspp,

		public string tenSanpham { get; set; }
		public string ma { get; set; }
		public string mota { get; set; }
		public int trangThai { get; set; }
		public Guid idloaisp { get; set; }
		public Guid idchatlieu { get; set; }
		public Guid idCoAo { get; set; }

		public List<ADDChiTietSanPhamModel> listctsp { get; set; }
	}
}
