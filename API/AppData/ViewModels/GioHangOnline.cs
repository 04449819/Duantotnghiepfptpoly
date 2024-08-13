using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AppData.ViewModels
{
	public class GioHangOnline
	{

		public Guid id{get;set;}
		public int soluong { get;set;}
		public int soluongmua { get;set;}

		public int giaban { get;set;}
		public Guid idKichCo {get;set;}
		public Guid idMauSac { get; set; }
		public Guid idloaisp { get;set;}
		public string ma { get; set; }
		public string tenkt { get; set; }
		public string tenms { get; set; }
		public string tensp { get; set; }
		public string anh { get; set; }
}
}
