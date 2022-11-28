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
        public static Dictionary<string, List<RoomResit>> RoomResit(int id)
        {
            List<RoomResit> roomResit = DalBillDetails.RoomResit(id);
            Dictionary<string, List<RoomResit>> receipts =
                new Dictionary<string, List<RoomResit>>
                {
                    { "Rooms", new List<RoomResit> ()},
                    { "Product",  new List<RoomResit> () }
                };
            foreach (RoomResit receipt in roomResit)
            {
                if (receipt.ProductCode == 8) receipts["Rooms"].Add(receipt); else receipts["Product"].Add(receipt);



            }


            //var firstOrDefault = roomResit.FirstOrDefault();
            //if (firstOrDefault != null && firstOrDefault.Breakfest)
            //{
            //    foreach (RoomResit item in roomResit)
            //    {
            //        if (item.ProductCode == 8)
            //        {
            //            item.PricePerNight += 70;

            //        }



            //    }

            //}
            return receipts;
        }
        public static bool AddCharge(Charge charge)
        {
            return DalBillDetails.AddCharge(charge);
        }
    }
}
