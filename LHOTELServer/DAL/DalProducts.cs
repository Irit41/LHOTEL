using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DAL
{
    public abstract class DalProducts
    {
        public static List<Product> GetAllProducts()
        {
            List<Product> products = new List<Product>();

            try
            {
                SqlDataReader reader = SqlClass.ExcNQReturnReder(@"exec GetAllProducts");
               
                while (reader.Read())
                {
                    products.Add(new Product()
                    {
                        ProductCode = (int)reader["Product_Code"],
                        CategoryNumber = (int)reader["Category_Number"],
                        ProductName = (string)reader["Description"],
                        PricePerUnit = (decimal)reader["Price_Per_Unit"],
                        DiscountPercentage = (decimal)reader["Discount_Percentage"]
                    });
                }
            }
            catch (Exception e)
            {
                Console.WriteLine(e.Message);
                
            }
            return products;

        }

        public static Product GetProductById(int id)
        {
            Product product = null;

            try
            {
                SqlDataReader reader = SqlClass.ExcNQReturnReder($@"exec GetProductById {id}");
                
                while (reader.Read())
                {
                    product = new Product()
                    {
                        ProductCode = (int)reader["Product_Code"],
                        CategoryNumber = (int)reader["Category_Number"],
                          ProductName = (string)reader["Description"],
                        PricePerUnit = (decimal)reader["Price_Per_Unit"],
                        DiscountPercentage = (decimal)reader["Discount_Percentage"]
                    };
                }
            }
            catch (Exception e)
            {
                Console.WriteLine(e.Message);
            }
            finally
            {
                SqlClass.CloseDB();
            }
            return product;

        }


    }
}
