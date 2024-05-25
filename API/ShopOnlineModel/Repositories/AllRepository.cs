using Microsoft.EntityFrameworkCore;
using ShopOnlineModel.Data;
using ShopOnlineModel.Repositories.Contracts;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ShopOnlineModel.Repositories
{
    public class AllRepository<T> : IAllRepository<T> where T : class
    {
        private readonly ShopOnlineDBContext context;
        private readonly DbSet<T> dbSet;
        public AllRepository() { }
        public AllRepository(ShopOnlineDBContext context, DbSet<T> dbSet)
        {
            this.context = context;
            this.dbSet = dbSet;
        }
        public bool Add(T item)
        {
            try
            {
                dbSet.Add(item);
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
                dbSet.Remove(item);
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
            return dbSet.ToList();
        }

        public bool Update(T item)
        {
            try
            {
                dbSet.Update(item);
                context.SaveChanges();
                return true;
            }
            catch
            {
                return false;
            }
        }
    }
}
