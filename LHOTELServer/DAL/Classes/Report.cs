using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DAL.Classes
{
    public class Report
    {
       
        public string Year { get; set; }
        public string Month { get; set; }
        public int Amount { get; set; }
   
    }
    public class ProductReport 
    {

        public int Code { get; set; }
        public string Category { get; set; }
        public string Product { get; set; }
             public int Amount { get; set; }
      
    }
    public class IncomeVsExpense
    {
        public string Date { get; set; }
        public double Sum { get; set; }


    }
}
