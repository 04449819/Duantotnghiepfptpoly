namespace AppAPI.IServices
{
    public interface IVNPayService
    {
        string CreatePaymentUrl(Guid idHoaDon);
        bool ValidateCallback(IQueryCollection query);
    }
}
