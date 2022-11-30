using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using DAL;
using DAL.Classes;

namespace BLL
{
    public abstract class BllBillDetails
    {
        public static List<RoomResit> RoomResit(int id)
        {
            List<RoomResit> roomResit = DalBillDetails.RoomResit(id);

            var firstOrDefault = roomResit.FirstOrDefault();
            if (firstOrDefault != null && firstOrDefault.Breakfast)
            {
                foreach (RoomResit item in roomResit)
                {
                    if (item.ProductCode == 8) item.PricePerNight += 70;

             

                }

            }
            return roomResit;
        }
        public static bool AddCharge(Charge charge)
        {
            return DalBillDetails.AddCharge(charge);
        }
    }
}
