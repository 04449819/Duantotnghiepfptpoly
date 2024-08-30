using AppAPI.IServices;
using AppData.VNPay;

namespace AppAPI.Services
{
    public class VNPayService : IVNPayService
    {
        private readonly IHoaDonService _hoaDonService;
        private readonly IConfiguration _configuration;
        private readonly string _tmnCode;
        private readonly string _hashSecret;
        private readonly string _paymentUrl;
        

        public VNPayService(IConfiguration configuration)
        {
            _hoaDonService = new HoaDonService();
            _configuration = configuration;
            _tmnCode = _configuration["VNPay:TmnCode"];
            _hashSecret = _configuration["VNPay:HashSecret"];
            _paymentUrl = _configuration["VNPay:PaymentUrl"];
            
        }
        public string CreatePaymentUrl(Guid idHoaDon, int soDiemTru, bool isGiaoHang)
        {
            var hoaDon = _hoaDonService.GetHoaDonById(idHoaDon);
            var vnpay = new VNPayLibrary();
            
                vnpay.AddRequestData("vnp_Version", VNPayConfig.Version);
       
                vnpay.AddRequestData("vnp_TmnCode", _tmnCode);
                vnpay.AddRequestData("vnp_Amount", (hoaDon.TongTien * 100).ToString());
                vnpay.AddRequestData("vnp_CreateDate", DateTime.Now.ToString("yyyyMMddHHmmss"));
          
                vnpay.AddRequestData("vnp_OrderInfo", Convert.ToString(hoaDon.ID));
                vnpay.AddRequestData("vnp_ReturnUrl", _configuration["VNPay:ReturnUrl"]);
                vnpay.AddRequestData("vnp_TxnRef", DateTime.Now.Ticks.ToString());
                vnpay.AddRequestData("vnp_SoDiemDung", soDiemTru.ToString());
                vnpay.AddRequestData("vnp_IsGiaoHang", isGiaoHang ? "1" : "0");



            return vnpay.CreateRequestUrl(_paymentUrl, _hashSecret);
        }

        public bool ValidateCallback(IQueryCollection query)
        {
            var vnpay = new VNPayLibrary();
            foreach (var (key, value) in query)
            {
                if (!string.IsNullOrEmpty(key) && key.StartsWith("vnp_"))
                {
                    vnpay.AddResponseData(key, value);
                }
            }
            var vnp_ResponseCode = query["vnp_ResponseCode"];
            var vnp_SecureHash = query["vnp_SecureHash"];

            bool checkSignature = vnpay.ValidateSignature(vnp_SecureHash, _hashSecret);

            if (checkSignature)
            {
                if (vnp_ResponseCode == "00")
                {
                    return true;
                }
            }

            return false;
        }
    }
}
