﻿using AppAPI.IServices;
using AppAPI.Services;
using AppData.Models;
using AppData.ViewModels;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace AppAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class NhanVienController : ControllerBase
    {
        private readonly INhanVienService _nhanVienService;
        private readonly AssignmentDBContext _dbContext;
        public NhanVienController()
        {
            _nhanVienService = new NhanVienService();
            _dbContext = new AssignmentDBContext();
        }
        // GET: api/<NhanVienController>
        [HttpGet("GetAll")]
        public async Task <IActionResult> GetAllNhanVien(int pageIndex, int pageSize)
        {
           var DanhSach =  await _nhanVienService.GetAll(pageIndex, pageSize);
            return Ok(DanhSach);
        }
        [Route("TimKiemNhanVien")]
        [HttpGet]
        public List<NhanVien> GetAllNhanVien(string? name)
        {
            return _dbContext.NhanViens.Where(v => v.Ten.Contains(name) || v.SDT.Contains(name)).ToList();


        }

        // GET api/<NhanVienController>/5
        [Route("GetById")]
        [HttpGet]
        public NhanVien? GetById(Guid id)
        {
            return _nhanVienService.GetById(id);
        }


        // POST api/<NhanVienController>
        [HttpPost("DangKyNhanVien")]
        public async Task<IActionResult> Add(string ten, string email, string password, string sdt, string diachi, int trangthai, Guid idvaitro)
        {
            var tr = await _nhanVienService.Add(ten, email, password, sdt, diachi, trangthai, idvaitro);
            if (tr == null)
            {
                return BadRequest();
            }
            return Ok(tr);
        }

        // PUT api/<NhanVienController>/5
        [HttpPut("{id}")]
        public async Task<IActionResult> Put1(Guid id, string ten, string email, string ?password, string sdt, string diachi, int trangthai)
        {
            if (id == Guid.Empty || string.IsNullOrEmpty(ten) || string.IsNullOrEmpty(email)  || string.IsNullOrEmpty(sdt) || string.IsNullOrEmpty(diachi ))
            {
                return BadRequest("Invalid input parameters.");
            }

            try
            {

                var nv = await _dbContext.NhanViens.FindAsync(id);
                if (nv == null)
                {
                    return NotFound("Employee not found.");
                }
                if (nv.Email == email)
                {
                    nv.Email = email;
                }
                else
                {
                    var checkEmail = _dbContext.KhachHangs.FirstOrDefault(p => p.Email == email);
                    var checkEmailNv = _dbContext.NhanViens.FirstOrDefault(p => p.Email == email);
                    if (checkEmail != null || checkEmailNv != null)
                    {
                        return Ok("1");

                    }
                    nv.Email = email;
                };
                if (nv.SDT == sdt)
                {
                    nv.SDT = sdt;
                }
                else
                {
                    var checksdt = _dbContext.KhachHangs.FirstOrDefault(p => p.SDT == sdt);
                    var checksdtNv = _dbContext.NhanViens.FirstOrDefault(p => p.SDT == sdt);

                    if (checksdt != null || checksdtNv != null)
                    {
                        return Ok("2");

                    }
                    nv.SDT = sdt;
                };

                nv.Ten = ten;
                nv.Email = email;
                if (password != null)
                {
                    nv.PassWord = password;
                }
                // Consider hashing the password before saving
                nv.SDT = sdt;
                nv.DiaChi = diachi;
                nv.TrangThai = trangthai;
               

                _dbContext.NhanViens.Update(nv);
                _dbContext.SaveChanges();

                return Ok("0");
            }
            catch (Exception ex)
            {
                // Log the exception (ex) as needed
                return StatusCode(500, "Internal server error: " + ex.Message);
            }
        }

        // DELETE api/<NhanVienController>/5
        [HttpDelete("{id}")]
        public bool Delete(Guid id)
        {
            if (_nhanVienService.Delete(id))
            {
                return true;
            }
            return false;
        }


    }
}
