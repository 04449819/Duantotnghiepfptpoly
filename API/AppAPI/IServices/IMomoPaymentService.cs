using AppData.ViewModels.Momo;

namespace AppAPI.IServices
{
    public interface IMomoPaymentService
    {
        Task<MomoPaymentResponse> CreatePayment(MomoPaymentRequest request);
        bool ValidateCallback(MomoCallbackRequest request);
    }
}
