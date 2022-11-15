using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DAL
{
    public class Room
    {

        public int RoomNumber { set; get; }
        public string RoomType { set; get; }
        public int PricePerNight { set; get; }
        public string Details { set; get; }

        public int Amount { set; get; }
    }
   
    public class BookedRoom : Room
    {
        
        public int BillNumber { set; get; }
        public int CustomerID { set; get; }
        public DateTime BillDate { set; get; }
        public int CustomerType { set; get; }
        public DateTime EntryDate { set; get; }
        public DateTime ExitDate { set; get; }
        public int AmountOfPeople { set; get; }
        public bool Breakfast { set; get; }
        public string RoomStatus { set; get; }
    }
}
