using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DAL
{
    public class EmployeeBasicDetails
    {
        
        public int EmployeeID { set; get; }
       
        public string EmployeeName { set; get; }
        public string Description { set; get; }





    }
    public class Employee : EmployeeBasicDetails
    {
       
       
       
        public string PhoneNumber { set; get; }
        public DateTime BirthDate { set; get; }
        public int HourlyWage { set; get; }
        public string Address { set; get; }
        public int EmployeeCode { set; get; }


      

    }
}
