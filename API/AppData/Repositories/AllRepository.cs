﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using AppData.IRepositories;
using AppData.Models;
using Microsoft.EntityFrameworkCore;

namespace AppData.Repositories
{
    public class AllRepository<T> : IAllRepository<T> where T : class
    {
        private readonly AssignmentDBContext context;
        private readonly DbSet<T> dbset;
        public AllRepository()
        {

        }
       
      

        public AllRepository(AssignmentDBContext context, DbSet<T> dbset)
        {
            this.context = context;
            this.dbset = dbset;
        }
        public List<T> GetPaged(int page, int limit)
        {
            return dbset.Skip((page - 1) * limit)
                         .Take(limit)
                         .ToList();
        }
        public int GetTotalCount()
        {
            return dbset.Count();
        }
        public bool Add(T item)
        {
            try
            {
                dbset.Add(item);
                context.SaveChanges();
                return true;
            }
            catch
            {
                return false;
            }
        }

        public bool Delete(T item)
        {
            try
            {
                dbset.Remove(item);
                context.SaveChanges();
                return true;
            }
            catch
            {
                return false;
            }
        }
        public List<T> GetAll()
        {
            return dbset.ToList();
        }
        public bool Update(T item)  
        {
            try
            {
                dbset.Update(item);
                context.SaveChanges();
                return true;
            }
            catch
            {
                return false;
            }
        }

        public T GetById(Guid id)
        {
            return dbset.Find(id);
        }
    }
}
