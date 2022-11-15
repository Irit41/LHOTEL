using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Security.Cryptography;
using static BCrypt.Net.BCrypt;


namespace DAL
{
    public abstract class DalCustomers
    {
        public static List<ExistingReservation> GetOccupiedRoomsByCustomerId(int id)
        {
            List<ExistingReservation> CustomerReservations = new List<ExistingReservation>();

            try
            {
                SqlDataReader reader = SqlClass.ExcNQReturnReder($@"exec GetOccupiedRoomsByCustomerId {id}");
             

                while (reader.Read())
                {
                    CustomerReservations.Add(new ExistingReservation()
                    {
                        BillNumber = (int)reader["Bill_Number"],
                        BillDate = (DateTime)reader["Bill_Date"],
                        CustomerID = (int)reader["Customer_ID"],
                        CustomerType = (int)reader["Customers_Type"],
                        FirstName = (string)reader["First_Name"],
                        LastName = (string)reader["Last_Name"],
                        Mail = (string)reader["Mail"],
                        PhoneNumber = (string)reader["Phone_Number"],
                        EntryDate = (DateTime)reader["Entry_Date"],
                        ExitDate = (DateTime)reader["Exit_Date"],
                        AmountOfPeople = (int)reader["Amount_Of_People"],
                        Breakfast = (bool)reader["Breakfast"],
                        RoomNumber = (int)reader["Room_Number"],
                        PricePerNight = (int)reader["Price_Per_Night"],
                        RoomStatus = (string)reader["Room_Status"],

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
            return CustomerReservations;
        }

        public static User GetDBCustomerById(int id)
        {
            User user = null;
            try
            {
                SqlDataReader reader = SqlClass.ExcNQReturnReder($@"exec GetDBCustomerById {id}");
               
               
                while (reader.Read())
                {
                    user = new User()
                    {
                        CustomerID = (int)reader["Customer_ID"],
                        CustomerType = (int)reader["Customer_Type"],
                        FirstName = (string)reader["First_Name"],
                        LastName = (string)reader["Last_Name"],
                        Mail = (string)reader["Mail"],

                        PhoneNumber = (string)reader["Phone_Number"],

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
            return user;
        }
        public static Customer GetCustomerById(int id)
        {
            Customer customer = null;
            try
            {
        
                SqlDataReader reader = SqlClass.ExcNQReturnReder($@"exec GetCustomerById {id}");
               
               
                while (reader.Read())
                {
                    customer = new Customer()
                    {
                        CustomerID = (int)reader["Customer_ID"],
                        CustomerType = (int)reader["Customer_Type"],
                        FirstName = (string)reader["First_Name"],
                        LastName = (string)reader["Last_Name"],
                        Mail = (string)reader["Mail"],
                        Password = (string)reader["Password"],
                        PhoneNumber = (string)reader["Phone_Number"],
                        CardHolderName = (string)reader["Card_Holder_Name"],
                        CreditCardNumber = (string)reader["Credit_Card_Number"],
                        CreditCardDate = (string)reader["Credit_Card_Date"],
                        ThreeDigit = (int)reader["Three_Digit"],
                       
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
            return customer;
        }

        public static Customer GetCustomerByMail(string mail)
        {
            Customer customer = null;

            try
            {
                SqlDataReader reader = SqlClass.ExcNQReturnReder($@"exec GetCustomerByMail '{mail}'");
               

                
                while (reader.Read())
                {
                    customer = new Customer()
                    {
                        CustomerID = (int)reader["Customer_ID"],
                        CustomerType = (int)reader["Customer_Type"],
                        FirstName = (string)reader["First_Name"],
                        LastName = (string)reader["Last_Name"],
                        Mail = (string)reader["Mail"],
                        Password = (string)reader["Password"],
                        PhoneNumber = (string)reader["Phone_Number"],
                        CardHolderName = (string)reader["Card_Holder_Name"],
                        CreditCardNumber = (string)reader["Credit_Card_Number"],
                        CreditCardDate = (string)reader["Credit_Card_Date"],
                        ThreeDigit = (int)reader["Three_Digit"],
                       
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
            return customer;
        }

        public static Customer GetCustomerByMailAndPassword(int id, string password)
        {
            try
            {
                Customer customer = GetCustomerById(id);
            


                if (customer != null && password == customer.Password)
                    return customer;
                else
                    return null;

            }
            catch (Exception e)
            {
                Console.WriteLine(e.Message);
                return null;
            }
            finally
            {
                SqlClass.CloseDB();
            }
        }


        public static bool AddNewCustomer(Customer customer)
        {
            try
            {
                if (GetCustomerByMail(customer.Mail) == null)
                {


                    string str = $@"exec AddNewCustomer {customer.CustomerID},
1,'{customer.FirstName}','{customer.LastName}','{customer.Mail}',
'{customer.Password}','{customer.PhoneNumber}','{customer.CardHolderName}',
'{customer.CreditCardDate}',{customer.ThreeDigit},'{customer.CreditCardNumber}'";
                    str = str.Replace("\r\n", string.Empty);
                    int rowsAffected = SqlClass.ExeNonQuery(str);
                    if (rowsAffected == 1)
                        return true;
                }
                return false;
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

        public static Customer GetCustomerByIDAndMail(int id, string mail)
        {
            Customer customer = null;
            try
            {
                SqlDataReader reader = SqlClass.ExcNQReturnReder($@"exec GetCustomerByIDAndMail '{id}','{mail}'");
               
                
                while (reader.Read())
                {
                    customer = new Customer()
                    {
                        CustomerID = (int)reader["Customer_ID"],
                        CustomerType = (int)reader["Customer_Type"],
                        FirstName = (string)reader["First_Name"],
                        LastName = (string)reader["Last_Name"],
                        Mail = (string)reader["Mail"],
                        Password = (string)reader["Password"],
                        PhoneNumber = (string)reader["Phone_Number"],
                        CardHolderName = (string)reader["Card_Holder_Name"],
                        CreditCardDate = (string)reader["Credit_Card_Date"],
                        ThreeDigit = (int)reader["Three_Digit"],
                        CreditCardNumber = (string)reader["Credit_Card_Number"]
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
            return customer;
        }

        public static bool AlterCustomerById(Customer customer)
        {
            try
            {
                Customer findCustomer = GetCustomerById(customer.CustomerID);
                if (findCustomer == null)
                {
                    return false;
                }
                string str = $@"exec AlterCustomerById {customer.CustomerID},{customer.CustomerType},
        '{customer.FirstName}','{customer.LastName}','{customer.Mail}','{customer.Password}',
        '{customer.PhoneNumber}','{customer.CardHolderName}','{customer.CreditCardDate}'
        ,{customer.ThreeDigit},'{customer.CreditCardNumber}'";
                str = str.Replace("\r\n", string.Empty);
                int result = SqlClass.ExeNonQuery(str);
                return result == 1;
                   
            }
            catch (Exception e)
            {
                Console.WriteLine(e.Message);
                return true;
            }
            finally
            {
                SqlClass.CloseDB();
            }
        }
    }
}
