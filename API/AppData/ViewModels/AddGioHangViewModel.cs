using AppData.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AppData.ViewModels
{
	public class AddGioHangViewModel
	{
		public int SoLuong { get; set; }
		public Guid IDCTSP { get; set; }
		public Guid IDNguoiDung { get; set; }
	}
}
