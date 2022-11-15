using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DAL.Classes
{
    public class RoomResit
    {
        public int BillNumber { set; get; }
        public int CustomerID { set; get; }
        public DateTime BillDate { set; get; }
        public int RoomNumber { set; get; }
        public string RoomType { set; get; }
        public decimal PricePerNight { set; get; }
        public decimal Amount { set; get; }
        public bool Breakfest { set; get; }
        public DateTime EntryDate { set; get; }
        public DateTime ExitDate { set; get; }
        public int NumberOfNights { set; get; }
        public string PaymentMethod { set; get; }
        public int ProductCode { set; get; }

    }
}
