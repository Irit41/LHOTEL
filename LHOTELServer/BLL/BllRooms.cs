
using System.Collections.Generic;

using DAL;

namespace BLL
{
    public abstract class BllRooms
    {
        public static List<Room> GetAvailableRooms()
        {
            Queue<Room> allRooms = DalRooms.GetAvailableRooms();
            List<Room> rooms = new List<Room>();
            while (allRooms.Count > 1)
            {
                Room tempRoom = allRooms.Dequeue();

                while (allRooms.Count > 0 && tempRoom.RoomType == allRooms.Peek().RoomType)
                {
                    tempRoom.Amount += 1;
                    allRooms.Dequeue();
                }
                rooms.Add(tempRoom);
            }
            return rooms;
        }
        public static bool SaveRoomReservation(NewReservation reservation)
        {
            return DalRooms.SaveRoomReservation(reservation);
        }
        public static List<ExistingReservation> FindCustomerReservations(int id)
        {
            return DalRooms.FindCustomerReservations(id);

        }
        public static bool CheckIn(string id, string exitDate)
        {
            return DalRooms.CheckIn(id, exitDate);
        }
        public static bool CheckOut(string id, string exitDate)
        {
            return DalRooms.CheckOut(id, exitDate);

        }
        public static bool CheckInWithExistingUser(NewReservation reservation)
        {
            return DalRooms.CheckInWithExistingUser(reservation);

        }
        public static bool CheckInWithoutExistingUser(NewReservation reservation)
        {
            return DalRooms.CheckInWithoutExistingUser(reservation);

        }
        public static bool DeleteReservation(int id)
        {
            return DalRooms.DeleteReservation(id);
        }
        public static Dictionary<string, List<RoomsHistory>> GetAllCustomersHistory(int id)
        {
            List<RoomsHistory> historyList = DalRooms.GetAllCustomersHistory(id);
            Dictionary<string, List<RoomsHistory>> allHistoryDict =
                new Dictionary<string, List<RoomsHistory>>
                {
                    { "Rooms", new List<RoomsHistory> ()},
                    { "Product",  new List<RoomsHistory> () }
                };
            foreach (RoomsHistory data in historyList)
            {
                if (data.ProductCode == 8) allHistoryDict["Rooms"].Add(data); else allHistoryDict["Product"].Add(data);



            }

            return allHistoryDict;
        }

    }
}
