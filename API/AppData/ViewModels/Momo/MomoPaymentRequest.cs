using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AppData.ViewModels.Momo
{
    public class MomoPaymentRequest
    {
        public string OrderId { get; set; }
        public int? Amount { get; set; }
        public string OrderInfo { get; set; }
    }
}
