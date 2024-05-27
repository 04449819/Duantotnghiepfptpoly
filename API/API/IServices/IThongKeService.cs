namespace API.IServices
{
    public interface IThongKeService
    {
        decimal DoanhThuNgay(DateTime date);
        decimal DoanhThuThang(int month, int year);
        decimal DoanhThuNam(int year);
        //ThongKeViewModel ThongKe(string startDate, string endDate);
        //List<ThongKeSanPham> ThongKeSanPham();
    }
}
