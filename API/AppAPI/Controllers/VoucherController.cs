using AppAPI.IServices;
using AppData.Models;
using AppData.ViewModels;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace AppAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class VoucherController : ControllerBase
    {
        private  readonly IVoucherServices _services;
        AssignmentDBContext _dbcontext = new AssignmentDBContext();
        public VoucherController(IVoucherServices services)
        {
            _services = services;
        }

        // GET: api/<VoucherController>
        [HttpGet]
        public async Task<IActionResult> Get(int pageIndex, int pageSize)
        {
            // Tính tổng số vouchers có trong database
            int totalVoucher = await _dbcontext.Vouchers.CountAsync();

            // Tính tổng số trang dựa trên tổng số vouchers và pageSize
            int totalPage = (int)Math.Ceiling(totalVoucher / (double)pageSize);

            // Truy vấn và phân trang ngay trong câu lệnh SQL để cải thiện hiệu suất
            var vouchers = await _dbcontext.Vouchers
                                .Skip((pageIndex - 1) * pageSize)
                                .Take(pageSize)
                                .ToListAsync();

            // Trả về dữ liệu và tổng số trang
            return Ok(new { data = vouchers, total = totalPage });
        }

        // GET api/<VoucherController>/5
        [HttpGet("{id}")]
        public Voucher Get(Guid id)
        {
            return _services.GetById(id);
        }

        // POST api/<VoucherController>
        [HttpPost]
        public bool Post(VoucherView voucher)
        {
            return _services.Add(voucher);
        }

        // PUT api/<VoucherController>/5
        [HttpPut("{id}")]
        public bool Put(Guid id, VoucherView voucherview)
        {
            var voucher= _services.GetById(id);
            if(voucher != null)
            {
                return _services.Update(voucher.ID,voucherview);
            }
            else
            {
                return false;   
            }
        }

        // DELETE api/<VoucherController>/5
        [HttpDelete("{id}")]
        public bool Delete(Guid id)
        {
            var voucher = _services.GetById(id);
            if (voucher != null)
            {
                return _services.Delete(voucher.ID);
            }
            else
            {
                return false;
            }
        }
        [HttpGet("GetVoucherByMa")]
        public Voucher? GetVoucherByMa(string ma)
        {
            return _services.GetVoucherByMa(ma);
        }
        [HttpGet("GetAllVoucherByTien")]
        public List<Voucher> GetAllVoucherByTien(int tongTien)
        {
            return _services.GetAllVoucherByTien(tongTien);
        }


        #region Tung
        [HttpGet("fillvoucher/{tongTien}")]
        public async Task<IActionResult> FillVoucher(int tongTien)
        {
            var voucher = _services.FillVoucher(tongTien);
            return Ok(new { voucher });
        }
        [HttpGet("GetAllAvaiableVoucher")]
        public async Task<IActionResult> GetAllAvaiableVoucher()
        {
            var vouchers = _services.GetAllAvaiableVoucher();
            return Ok(new { vouchers });
        }
        [HttpGet("CheckStatusVouchers")]
        public async Task<IActionResult> CheckStatusVouchers()
        {
            var vouchers = _services.CheckStatusVouchers();
            return Ok(new { vouchers });
        }

        #endregion

    }
}
