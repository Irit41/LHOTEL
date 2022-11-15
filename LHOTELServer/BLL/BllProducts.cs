using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using DAL;

namespace BLL
{
    public abstract class BllProducts
    {
        public static List<Product> GetProducts()
        {
            return DalProducts.GetAllProducts();
        }
        public static Product GetProductById(int id)
        {
            return DalProducts.GetProductById(id);
        }
      
    }
}
