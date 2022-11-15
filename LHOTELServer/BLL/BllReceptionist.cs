using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using DAL;

namespace BLL
{
    public abstract class BllReceptionist
    {
        public static List<BookedRoom> GetBookedRooms()
        {
            return DalReceptionist.GetBookedRooms();
        }
        public static List<ExistingReservation> GetReservedRoomsByCustomerId(int id)
        {
            return DalReceptionist.GetReservedRoomsByCustomerId(id);
        }

    }
}
