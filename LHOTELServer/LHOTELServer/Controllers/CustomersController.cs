using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

using System.Net;
using System.Net.Http;
using System.Web.Http;
using DAL;
using BLL;
using Newtonsoft.Json.Linq;


namespace LHOTELServer.Controllers
{
    [System.Web.Http.RoutePrefix("api/Customers")]
    public class CustomersController : ApiController
    {
        [System.Web.Http.HttpPut]
        [System.Web.Http.Route("~/GetOccupiedRoomsByCustomerId")]
        public IHttpActionResult GetOccupiedRoomsByCustomerId([FromBody] JObject data)
        {
            try
            {
                int id = data["id"].ToObject<int>();
                return Ok(BllCustomers.GetOccupiedRoomsByCustomerId(id));
            }
            catch (Exception)
            {
                return BadRequest();
            }
        }
        [System.Web.Http.HttpPost]
        [System.Web.Http.Route("~/GetDBCustomerById")]
        public IHttpActionResult GetDBCustomerById([FromBody] JObject data)
        {
            try
            {
                int CustomerID = data["Customer_ID"].ToObject<int>();


                return Ok(BllCustomers.GetDBCustomerById(CustomerID));
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }

        }

        [System.Web.Http.HttpPost]
        [System.Web.Http.Route("~/GetCustomerByMailAndPassword")]
        public IHttpActionResult GetCustomerByMailAndPassword([FromBody] JObject data)
        {
            try
            {
                int id = data["id"].ToObject<int>();
                string password = data["password"].ToObject<string>();
                return Ok(BllCustomers.GetCustomerByMailAndPassword(id, password));
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }

        }

        [System.Web.Http.HttpGet]
        [System.Web.Http.Route("~/GetCustomerByIDAndMail")]
        public IHttpActionResult GetCustomerByIDAndMail([FromBody] JObject data)
        {
            try
            {
                int id = data["customerID"].ToObject<int>();
                string mail = data["mail"].ToObject<string>();
                return Ok(BllCustomers.GetCustomerByIDAndMail(id, mail));
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }


        [System.Web.Http.HttpPost]
        [System.Web.Http.Route("~/AddNewCustomer")]
        public IHttpActionResult AddNewCustomer([FromBody] Customer customer)
        {
            try
            {
                

                return Ok(BllCustomers.AddNewCustomer(customer));
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }





        [System.Web.Http.HttpPut]
        [System.Web.Http.Route("~/AlterCustomerById")]
        public IHttpActionResult AlterCustomerById([FromBody] Customer customer)
        {
            try
            {
                return Ok(BllCustomers.AlterCustomerById(customer));
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }


        //  האם אנחנו נירצה שהלקוח יוכל להוסיף חיוב לעצמו 
        //  או שהוא יוסיף את הבקשה לחיוב כמשימה ואז אחד העובדים יחייב אותו

    }
}