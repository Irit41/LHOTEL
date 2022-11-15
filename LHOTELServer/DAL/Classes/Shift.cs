using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DAL
{
    public class Shift
    {
        public int EmployeeID { set; get; }
        public string EmployeeName { set; get; }
        public int EmployeeCode { set; get; }
        public string Description { set; get; }
        public DateTime Date { set; get; }
        public string EntranceTime { set; get; }
        public string LeavingTime { set; get; }


    }
}
