using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using DAL;

namespace BLL
{
    public abstract class BllCustomers
    {
       

        public static List<ExistingReservation> GetOccupiedRoomsByCustomerId(int id)
        {
            return DalCustomers.GetOccupiedRoomsByCustomerId(id);
        }




        public static User GetDBCustomerById(int id)
        {
            return DalCustomers.GetDBCustomerById(id);
        }

        public static Customer GetCustomerByMailAndPassword(int id, string password)
        {
            return DalCustomers.GetCustomerByMailAndPassword(id, password);
        }
        public static bool AddNewCustomer(Customer customer)
        {
            return DalCustomers.AddNewCustomer(customer);
        }
        public static Customer GetCustomerByIDAndMail(int id, string mail)
        {
            return DalCustomers.GetCustomerByIDAndMail(id, mail);
        }
        public static bool AlterCustomerById(Customer customer)
        {
            return DalCustomers.AlterCustomerById(customer);
        }
       

    }
}
