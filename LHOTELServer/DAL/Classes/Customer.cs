using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DAL
{
    public class User
    {
        public int CustomerID { set; get; }
        public int CustomerType { set; get; }
        public string FirstName { set; get; }
        public string LastName { set; get; }
        public string Mail { set; get; }
        public string Password { set; get; }
        public string PhoneNumber { set; get; }

    }
    public class Customer : User
    {
        public string CardHolderName { set; get; }
        public string CreditCardNumber { set; get; }
        public string CreditCardDate { set; get; }
        public int ThreeDigit { set; get; }
    }
}
