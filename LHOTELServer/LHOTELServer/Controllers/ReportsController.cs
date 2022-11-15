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

    [System.Web.Http.RoutePrefix("api/Reports")]

    public class ReportsController : ApiController
    {
        [System.Web.Http.HttpGet]
        [System.Web.Http.Route("~/NumberOfVisitorsPerMonth")]
        public IHttpActionResult NumberOfVisitorsPerMonth()
        {
            try
            {
                return Ok(BllReports.NumberOfVisitorsPerMonth());
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }


        [System.Web.Http.HttpGet]
        [System.Web.Http.Route("~/AmountOfProductsPurchased")]
        public IHttpActionResult AmountOfProductsPurchased()
        {
            try
            {
                return Ok(BllReports.AmountOfProductsPurchased());
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }


        [System.Web.Http.HttpGet]
        [System.Web.Http.Route("~/NumberOfTasksPerMonth")]
        public IHttpActionResult NumberOfTasksPerMonth()
        {
            try
            {
                return Ok(BllReports.NumberOfTasksPerMonth());
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }

        [System.Web.Http.HttpPut]
        [System.Web.Http.Route("~/ProductPurchaseByName")]
        public IHttpActionResult ProductPurchaseByName([FromBody] JObject data)
        {
            try
            {
                string name = data["name"].ToObject<string>();
                return Ok(BllReports.ProductPurchaseByName(name));
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }

        [System.Web.Http.HttpGet]
        [System.Web.Http.Route("~/IncomeAndExpenses")]
        public IHttpActionResult IncomeAndExpenses()
        {
            try
            {
                return Ok(BllReports.IncomeAndExpenses());
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }
    }
}