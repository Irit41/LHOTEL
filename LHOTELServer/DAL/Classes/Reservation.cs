using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DAL
{
    public class Reservation
    {
        public int CustomerID { set; get; }
        public string FirstName { set; get; }
        public string LastName { set; get; }
        public string Mail { set; get; }
        public string PhoneNumber { set; get; }
        public DateTime EntryDate { set; get; }
        public DateTime ExitDate { set; get; }
        public int AmountOfPeople { set; get; }
        public bool Breakfast { set; get; }
    }

    public class NewReservation : Reservation
    {
        public int EmployeeID { set; get; }
        public string Password { set; get; }
        public int CounterSingle { set; get; }
        public int CounterDouble { set; get; }
        public int CounterSuite { set; get; }
        public string CardHolderName { set; get; }
        public string CreditCardNumber { set; get; }
        public string CreditCardDate { set; get; }
        public int ThreeDigit { set; get; }

    }



    public class ExistingReservation : Reservation
    {
        public int BillNumber { set; get; }
        public DateTime BillDate { set; get; }
        public int CustomerType { set; get; }

        public int RoomNumber { set; get; }
        public int PricePerNight { set; get; }
        public string RoomStatus { set; get; }

    }

    public class RoomsHistory: ExistingReservation
    {
        public string RoomType { set; get; }
        public int NumberOfNights { set; get; }
        public string PaymentMethod { set; get; }
        public DateTime PurchaseDate { set; get; }

    }
}
