using DAL.Classes;
using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DAL
{
    public abstract class DalBillDetails
    {


        public static List<RoomResit> RoomResit(int id)
        {
            List<RoomResit> roomResit = new List<RoomResit>();
            try
            {
                SqlDataReader reader = SqlClass.ExcNQReturnReder($@"exec Room_Resit {id}");
              

                 

                while (reader.Read())
                {
                    roomResit.Add( new RoomResit()
                    {
                        BillNumber = (int)reader["Bill_Number"],
                        CustomerID = (int)reader["Customer_ID"],
                        BillDate = (DateTime)reader["Bill_Date"],
                        RoomNumber = (int)reader["Room_Number"],
                        RoomType = (string)reader["Room_Type"],
                        PricePerNight = (decimal)reader["Price_Per_Night"],
                        Amount = (decimal)reader["Amount_Of_People"],
                        Breakfest = (bool)reader["Breakfast"],
                        EntryDate = (DateTime)reader["Entry_Date"],
                        ExitDate = (DateTime)reader["Exit_Date"],
                        NumberOfNights = (int)reader["Number_Of_Nights"],
                        PaymentMethod = (string)reader["Payment_Method"],
                        ProductCode = (int)reader["Product_Code"],
                    });
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
            return roomResit;
        }


        public static bool AddCharge(Charge charge)
        {
            try
            {
                string str = $@"exec AddNewBill_Detail {charge.CustomerID},{charge.RoomNumber},
'{charge.ProductDec}',{charge.Amount},'{charge.PaymentMethod}'";
                str = str.Replace("\r\n", string.Empty);
                int result = SqlClass.ExeNonQuery(str);
                return result == 1;
                   
            }
            catch (Exception e)
            {
                Console.WriteLine(e.Message);
                return false;
            }
            finally
            {
                SqlClass.CloseDB();
            }
        }
    }
}
