using System;

using System.Web.Http;
using BLL;

using Newtonsoft.Json.Linq;

namespace LHOTELServer.Controllers
{
    [System.Web.Http.RoutePrefix("api/Products")]

    public class ProductsController : ApiController
    {
        [System.Web.Http.HttpGet]
        [System.Web.Http.Route("~/GetProducts")]
        public IHttpActionResult GetProducts()
        {
            try
            {
                return Ok(BllProducts.GetProducts());
            }
            catch (Exception)
            {
                return BadRequest();
            }

        }

        [System.Web.Http.HttpGet]
        [System.Web.Http.Route("~/GetProductById")]
        public IHttpActionResult GetProductById([FromBody] JObject data)
        {
            try
            {
                int id = data["id"].ToObject<int>();
                return Ok(BllProducts.GetProductById(id));
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }


    }
}