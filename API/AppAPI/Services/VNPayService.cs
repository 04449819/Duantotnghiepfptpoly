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
        private readonly string _version;
        private readonly string _command;
        private readonly string _currCode;
        private readonly string _locale;
        private readonly string _orderType;

        public VNPayService(IConfiguration configuration)
        {
            _hoaDonService = new HoaDonService();
            _configuration = configuration;
            _tmnCode = _configuration["VNPay:TmnCode"];
            _hashSecret = _configuration["VNPay:HashSecret"];
            _paymentUrl = _configuration["VNPay:PaymentUrl"];
            _version = _configuration["VNPay:Version"];
            _command = _configuration["VNPay:Command"];
            _currCode = _configuration["VNPay:CurrCode"];
            _locale = _configuration["VNPay:Locale"];
            _orderType = _configuration["VNPay:OrderType"];
        }
        public string CreatePaymentUrl(Guid idHoaDon)
        {
            var hoaDon = _hoaDonService.GetHoaDonById(idHoaDon);
            var vnpay = new VNPayLibrary();

            vnpay.AddRequestData("vnp_Version", VNPayConfig.Version);
            vnpay.AddRequestData("vnp_Command", "pay");
            vnpay.AddRequestData("vnp_TmnCode", _tmnCode);
            vnpay.AddRequestData("vnp_Amount", (hoaDon.TongTien * 100).ToString());
            vnpay.AddRequestData("vnp_CreateDate", DateTime.Now.ToString("yyyyMMddHHmmss"));
            vnpay.AddRequestData("vnp_CurrCode", "VND");
            vnpay.AddRequestData("vnp_IpAddr", "::1");
            vnpay.AddRequestData("vnp_Locale", "vn");
            vnpay.AddRequestData("vnp_OrderInfo", hoaDon.MaHD);
            vnpay.AddRequestData("vnp_OrderType", "other");
            vnpay.AddRequestData("vnp_ReturnUrl", _configuration["VNPay:ReturnUrl"]);
            vnpay.AddRequestData("vnp_TxnRef", DateTime.Now.Ticks.ToString());

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

            var orderId = query["vnp_TxnRef"];
            var vnpayTranId = query["vnp_TransactionNo"];
            var vnp_ResponseCode = query["vnp_ResponseCode"];
            var vnp_SecureHash = query["vnp_SecureHash"];

            bool checkSignature = vnpay.ValidateSignature(vnp_SecureHash, _hashSecret);

            if (checkSignature)
            {
                if (vnp_ResponseCode == "00")
                {
                    Console.WriteLine("THANH TOÁN THÀNH CÔNG");
                    // Thanh toán thành công
                    return true;
                }
            }

            return false;
        }
    }
}
