﻿using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AppData.ViewModels
{
	public class KhachHangAddView
	{
		public string Ten { get; set; }

		public int? GioiTinh { get; set; }

		public DateTime? NgaySinh { get; set; }
		[EmailAddress]

		public string Email { get; set; }


        public string? DiaChi { get; set; }

		public string? SDT { get; set; }
	}
}
