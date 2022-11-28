using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DAL
{
    public abstract class DalRooms
    {
        public static Queue<Room> GetAvailableRooms()
        {
            Queue<Room> rooms = new Queue<Room>();

            try
            {
                SqlDataReader reader = SqlClass.ExcNQReturnReder($@"SELECT * FROM  AvailableRooms() order by Room_Number");
               
                
                while (reader.Read())
                {
                    rooms.Enqueue(new Room()
                    {
                      
                        RoomType = (string)reader["Room_Type"],
                        PricePerNight = (int)reader["Price_Per_Night"],
                        Details = (string)reader["Details"],
                        Amount = 1

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
            return rooms;
        }

        public static List<ExistingReservation> FindCustomerReservations(int id)
        {
            List<ExistingReservation> rooms = new List<ExistingReservation>();

            try
            {
                SqlDataReader reader = SqlClass.ExcNQReturnReder($@"exec FindCustomerReservations {id}");
              
                while (reader.Read())
                {
                    rooms.Add(new ExistingReservation()
                    {
                        RoomNumber = (int)reader["Room_Number"],
                        BillNumber = (int)reader["Bill_Number"],
                        CustomerID = (int)reader["Customer_ID"],
                        BillDate= (DateTime)reader["Bill_Date"],
                        EntryDate = (DateTime)reader["Entry_Date"],
                        ExitDate = (DateTime)reader["Exit_Date"],
                        AmountOfPeople = (int)reader["Amount_Of_People"],
                        Breakfast = (bool)reader["Breakfast"],
                        RoomStatus = (string)reader["Room_Status"],
                    });
                }
            }
            catch (Exception e )
            {
                Console.WriteLine(e.Message);
               
            }
            finally
            {
                SqlClass.CloseDB();
            }
            return rooms;

        }

        public static bool SaveRoomReservation(NewReservation roomReservation)
        {
            try
            {
                string str = $@"exec SaveRoomReservation {roomReservation.CustomerID},'{roomReservation.CardHolderName}'
                ,'{roomReservation.CreditCardDate}',{roomReservation.ThreeDigit},'{roomReservation.CreditCardNumber}'
                ,{roomReservation.EmployeeID},{roomReservation.CounterSingle},{roomReservation.CounterDouble}
                ,{roomReservation.CounterSuite},'{roomReservation.EntryDate:yyyy - MM - dd}'
                ,'{roomReservation.ExitDate:yyyy - MM - dd}',{roomReservation.AmountOfPeople},{roomReservation.Breakfast}";
                str = str.Replace("\r\n", string.Empty);
                int result = SqlClass.ExeNonQuery(str);
                return result > 1;

            }
            catch (Exception e)
            {
                Console.WriteLine(e.Message);
                return false;
            }
            finally
            {
                SqlClass.CloseDB();
            }
        }
        public static bool CheckIn(string id, string entryDate)
        {
            try
            {
                string str = $@"exec CheckIn {id},'{entryDate}'";
                str = str.Replace("\r\n", string.Empty);
                int result = SqlClass.ExeNonQuery(str);
                return result > 1;

            }
            catch (Exception e)
            {
                Console.WriteLine(e.Message);
                return false;
            }
            finally
            {
                SqlClass.CloseDB();
            }
        }

        public static bool CheckOut(string id, string exitDate)
        {
            try
            {
                string str = $@"exec CheckOut {id},'{exitDate}'";
                str = str.Replace("\r\n", string.Empty);
                int result = SqlClass.ExeNonQuery(str);
                return result > 1;

            }
            catch (Exception e)
            {
                Console.WriteLine(e.Message);
                return false;
            }
            finally
            {
                SqlClass.CloseDB();
            }
        }

        public static bool CheckInWithExistingUser(NewReservation reservation)
        {
            try
            {
                string str = $@"exec CheckIn_With_Existing_User {reservation.CustomerID},'{reservation.CardHolderName}'
,'{reservation.CreditCardDate}',{reservation.ThreeDigit},'{reservation.CreditCardNumber}'
,{reservation.EmployeeID},{reservation.CounterSingle},{reservation.CounterDouble},
{reservation.CounterSuite},'{reservation.EntryDate:yyyy - MM - dd}'
,'{reservation.ExitDate:yyyy - MM - dd}',{reservation.AmountOfPeople},{reservation.Breakfast}";
                str = str.Replace("\r\n", string.Empty);
                int result = SqlClass.ExeNonQuery(str);
                return result > 1;

            }
            catch (Exception e)
            {
                Console.WriteLine(e.Message);
                return false;
            }
            finally
            {
                SqlClass.CloseDB();
            }
        }


        public static bool CheckInWithoutExistingUser(NewReservation reservation)
        {
            try
            {
                string str = $@"exec CheckIn_Without_Existing_User {reservation.CustomerID},
'{reservation.FirstName}','{reservation.LastName}','{reservation.Mail}','{reservation.Password}',
'{reservation.PhoneNumber}',
'{reservation.CardHolderName}',
'{reservation.CreditCardDate}',{reservation.ThreeDigit},
'{reservation.CreditCardNumber}',{reservation.EmployeeID},
{reservation.CounterSingle},{reservation.CounterDouble},
{reservation.CounterSuite},
'{reservation.EntryDate:yyyy-MM-dd}',
'{reservation.ExitDate:yyyy-MM-dd}',{reservation.AmountOfPeople},{reservation.Breakfast}";
                str = str.Replace("\r\n", string.Empty);
                int result = SqlClass.ExeNonQuery(str);
                return result > 1;

            }
            catch (Exception e)
            {
                Console.WriteLine(e.Message);
                return false;
            }
            finally
            {
                SqlClass.CloseDB();
            }
        }

        public static bool DeleteReservation(int id)
        {
            try
            {
                string str = $@"exec DeleteReservation {id}";
                str = str.Replace("\r\n", string.Empty);
                int result = SqlClass.ExeNonQuery(str);
                return result > 1;
            }
            catch (Exception)
            {
                return false;
            }
            finally
            {
                SqlClass.CloseDB();
            }
        }


        public static  List<RoomsHistory> GetAllCustomersHistory(int id)
        {
            List<RoomsHistory> rooms = new List<RoomsHistory>();

            try
            {
                SqlDataReader reader = SqlClass.ExcNQReturnReder($@"exec GetAllCustomersHistory {id}");
                
                while (reader.Read())
                {
                    rooms.Add(new RoomsHistory()
                    {
                        RoomNumber = (int)reader["Room_Number"],
                        BillNumber = (int)reader["Bill_Number"],
                        CustomerID = (int)reader["Customer_ID"],
                        BillDate = (DateTime)reader["Bill_Date"],
                        AmountOfPeople = (int)reader["Amount_Of_People"],
                        EntryDate = (DateTime)reader["Entry_Date"],
                        ExitDate = (DateTime)reader["Exit_Date"],
                        Breakfast = (bool)reader["Breakfast"],
                        RoomType = (string)reader["Room_Type"],
                        PricePerNight = (int)reader["Price_Per_Night"],
                        NumberOfNights = (int)reader["Number_Of_Nights"],
                        PaymentMethod = (string)reader["Payment_Method"],
                       ProductCode = (int)reader["Product_Code"],
                    });
                }
            }
            catch (Exception e )
            {
                Console.WriteLine(e.Message);
                
            }
            finally
            {
                SqlClass.CloseDB();
            }
            return rooms;

        }
    }

}
