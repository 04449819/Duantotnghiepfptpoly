namespace AppAPI.IServices
{
    public interface IVNPayService
    {
        string CreatePaymentUrl(Guid idHoaDon, int soDiemTru, bool isGiaoHang);
        bool ValidateCallback(IQueryCollection query);
    }
}
