using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DAL
{
    public abstract class DalReceptionist
    {
        public static List<BookedRoom> GetBookedRooms()
        {
            List<BookedRoom> BookedRooms = new List<BookedRoom>();

            try
            {

                SqlDataReader reader = SqlClass.ExcNQReturnReder(@"exec GetBookedRooms");
             


                while (reader.Read())
                {
           
                    BookedRooms.Add(new BookedRoom()
                    {

                        RoomNumber = (int)reader["Room_Number"],
                        BillNumber = (int)reader["Bill_Number"],
                        CustomerID = (int)reader["Customer_ID"],
                        BillDate = (DateTime)reader["Bill_Date"],
                        EntryDate = (DateTime)reader["Entry_Date"],
                        ExitDate = (DateTime)reader["Exit_Date"],
                        AmountOfPeople = (int)reader["Amount_Of_People"],
                        Breakfast = (bool)reader["Breakfast"],
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

            return BookedRooms;


        }

        public static List<ExistingReservation> GetReservedRoomsByCustomerId(int id)
        {
            List<ExistingReservation> CustomerReservations = new List<ExistingReservation>();

            try
            {
                SqlDataReader reader = SqlClass.ExcNQReturnReder($@"exec GetReservedRoomsByCustomerId {id}");
                


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
                SqlClass.CloseDB();
            }
            return CustomerReservations;

        }


    }
}
