using AppData.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AppData.ViewModels
{
	public class ADDChiTietSanPhamModel
	{
		//ma: p.mactsp,
  //          soluong: p.soluong,
  //          giaban: p.giaban,
  //          trangthai: 2,
  //          idmausac: p.idmausac,
  //          idkichthuoc: p.idkichthuoc,
  //          img: p.img,

		public string ma { get; set; }
		public int soluong { get; set; }
		public int giaban { get; set; }
		public int trangthai { get; set; }
		public Guid idmausac { get; set; }
		public Guid idkichthuoc { get; set; }
		public List<ADDImgModel> img { get; set; }
	}
}
