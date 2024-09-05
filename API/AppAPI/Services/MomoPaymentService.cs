using AppAPI.IServices;
using AppData.ViewModels.Momo;
using Newtonsoft.Json;
using System.Security.Cryptography;
using System.Text;

namespace AppAPI.Services
{
    public class MomoPaymentService : IMomoPaymentService
    {
        private readonly IHttpClientFactory _clientFactory;
        private readonly ILogger<MomoPaymentService> _logger;
        private const string PartnerCode = "MOMOBKUN20180529";
        private const string AccessKey = "klm05TvNBzhg7h7j";
        private const string SecretKey = "at67qH6mk8w5Y1nAyMoYKMWACiEi2bsa";
        private const string ApiEndpoint = "https://test-payment.momo.vn/v2/gateway/api/create";
        public MomoPaymentService(IHttpClientFactory clientFactory, ILogger<MomoPaymentService> logger)
        {
            _clientFactory = clientFactory;
            _logger = logger;
        }

        public async Task<MomoPaymentResponse> CreatePayment(MomoPaymentRequest request)
        {
            var orderInfo = CreateOrderInfo(request.Amount, request.OrderId);
            var signature = ComputeSignature(orderInfo);
            var jsonPayload = CreateJsonPayload(orderInfo, signature);

            _logger.LogInformation($"Sending request to Momo: {jsonPayload}");

            var client = _clientFactory.CreateClient();
            var response = await client.PostAsync(ApiEndpoint, new StringContent(jsonPayload, Encoding.UTF8, "application/json"));

            var responseContent = await response.Content.ReadAsStringAsync();
            _logger.LogInformation($"Received response from Momo: {responseContent}");

            if (response.IsSuccessStatusCode)
            {
                var paymentResponse = JsonConvert.DeserializeObject<MomoPaymentResponse>(responseContent);
                if (paymentResponse.ResultCode == 0)
                {
                    return paymentResponse;
                }
                else
                {
                    _logger.LogWarning($"Momo returned non-zero result code: {paymentResponse.ResultCode}, Message: {paymentResponse.Message}");
                    throw new Exception($"Momo payment creation failed: {paymentResponse.Message}");
                }
            }
            else
            {
                _logger.LogError($"HTTP request failed with status code: {response.StatusCode}, Content: {responseContent}");
                throw new Exception($"Failed to create Momo payment. Status code: {response.StatusCode}");
            }
        }

        public bool ValidateCallback(MomoCallbackRequest request)
        {

            //var rawSignature = $"accessKey={request.AccessKey}&amount={request.Amount}&extraData={request.ExtraData}&message={request.Message}&orderId={request.OrderId}&orderInfo={request.OrderInfo}&orderType={request.OrderType}&partnerCode={request.PartnerCode}&payType={request.PayType}&requestId={request.RequestId}&responseTime={request.ResponseTime}&resultCode={request.ResultCode}&transId={request.TransId}";
            //var checkSignature = ComputeHmacSha256(rawSignature, SecretKey);

            //return checkSignature.Equals(request.Signature, StringComparison.OrdinalIgnoreCase);
            // AccessKey không có trong callback, nên chúng ta sẽ sử dụng AccessKey từ cấu hình
            string accessKey = AccessKey;

            // ExtraData có thể trống, nên chúng ta sẽ sử dụng giá trị mặc định nếu nó trống
            string extraData = string.IsNullOrEmpty(request.ExtraData) ? "" : request.ExtraData;

            var rawSignature = $"accessKey={accessKey}&amount={request.Amount}&extraData={extraData}&message={request.Message}&orderId={request.OrderId}&orderInfo={request.OrderInfo}&orderType={request.OrderType}&partnerCode={request.PartnerCode}&payType={request.PayType}&requestId={request.RequestId}&responseTime={request.ResponseTime}&resultCode={request.ResultCode}&transId={request.TransId}";
            var checkSignature = ComputeHmacSha256(rawSignature, SecretKey);

            return checkSignature.Equals(request.Signature, StringComparison.OrdinalIgnoreCase);
        }

        private object CreateOrderInfo(int? amount, string maHD)
        {
            return new
            {
                accessKey = AccessKey,
                partnerCode = PartnerCode,
                partnerName = "Test",
                storeId = "MomoTestStore",
                requestType = "captureWallet",
                ipnUrl = "https://yourdomain.com/momo-ipn",
                redirectUrl = "https://localhost:7095/api/HoaDon/redirect",
                orderId = maHD, //$"{DateTime.UtcNow.Ticks}:{Guid.NewGuid()}",
                amount = amount.ToString(),
                lang = "vi",
                orderInfo = $"Thanh toan cho don hang {DateTime.Now:yyyyMMddHHmmss}",
                requestId = Guid.NewGuid().ToString(),
                extraData = ""

            };
        }

        private string ComputeSignature(dynamic orderInfo)
        {
            var rawSignature = $"accessKey={AccessKey}&amount={orderInfo.amount}&extraData={orderInfo.extraData}&ipnUrl={orderInfo.ipnUrl}&orderId={orderInfo.orderId}&orderInfo={orderInfo.orderInfo}&partnerCode={orderInfo.partnerCode}&redirectUrl={orderInfo.redirectUrl}&requestId={orderInfo.requestId}&requestType={orderInfo.requestType}";
            return ComputeHmacSha256(rawSignature, SecretKey);
        }

        private string CreateJsonPayload(dynamic orderInfo, string signature)
        {
            return JsonConvert.SerializeObject(new
            {
                partnerCode = orderInfo.partnerCode,
                partnerName = orderInfo.partnerName,
                storeId = orderInfo.storeId,
                requestType = orderInfo.requestType,
                ipnUrl = orderInfo.ipnUrl,
                redirectUrl = orderInfo.redirectUrl,
                orderId = orderInfo.orderId,
                amount = orderInfo.amount,
                lang = orderInfo.lang,
                orderInfo = orderInfo.orderInfo,
                requestId = orderInfo.requestId,
                extraData = orderInfo.extraData,
                signature = signature,
                accessKey = orderInfo.accessKey,
            });
        }

        private static string ComputeHmacSha256(string message, string secret)
        {
            var key = Encoding.UTF8.GetBytes(secret);
            var messageBytes = Encoding.UTF8.GetBytes(message);

            using (var hmac = new HMACSHA256(key))
            {
                var hashBytes = hmac.ComputeHash(messageBytes);
                return BitConverter.ToString(hashBytes).Replace("-", "").ToLower();
            }
        }
    }
}
