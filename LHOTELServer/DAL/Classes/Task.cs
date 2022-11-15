using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DAL
{
    public class Task
    {
        public int TaskCode { set; get; }
        public int EmployeeID { set; get; }
        public string EmployeeName { set; get; }
        public string TaskName { set; get; }
        public int RoomNumber { set; get; }

        public DateTime StartDate { set; get; }
        public string StartTime { set; get; }
        public string EndTime { set; get; }
        public string TaskStatus { set; get; }
        public string Description { set; get; }


    }
}
