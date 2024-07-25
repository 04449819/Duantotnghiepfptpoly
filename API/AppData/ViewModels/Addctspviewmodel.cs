using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AppData.ViewModels
{
	public class Addctspviewmodel
	{
		public Guid Idsp { get; set; }
		public string ma { get; set; }
		public int soluong { get; set; }
		public int giaban { get; set; }
		public int trangthai { get; set; }
		public Guid idmausac { get; set; }
		public Guid idkichthuoc { get; set; }
		public List<string> img { get; set; }
	}
}
