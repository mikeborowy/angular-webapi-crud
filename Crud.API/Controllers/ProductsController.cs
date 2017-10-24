using Crud.API.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Web;
using System.Web.Http;
using System.Web.Http.Cors;
using System.Web.Http.Description;

namespace Crud.API.Controllers
{
    [EnableCors(origins: "http://localhost:56141", headers: "*", methods: "*")]
    public class ProductsController : ApiController
    {
        //GET: api/Products
        [ResponseType(typeof(Product))]
        public IHttpActionResult Get()
        {
            try
            {
                var productsRepository = new ProductsRepository();
                var products = productsRepository.Retrieve().AsQueryable();
                return Ok(products);
            }
            catch (Exception ex)
            {
                return InternalServerError(ex);
            }
        }

        //GET: api/Products/5
        //[Authorize]
        [ResponseType(typeof(Product))]
        public IHttpActionResult Get([FromUri]int id)
        {
            try
            {
                //throw new ArgumentNullException("this is a test");
                Product product;
                var productsRepository = new ProductsRepository();

                if (id > 0)
                {
                    var products = productsRepository.Retrieve();
                    product = products.FirstOrDefault(p => p.ProductId == id);
                    if (product == null)
                        return NotFound();
                }
                else
                {
                    product = productsRepository.Create();
                }

                return Ok(product);

            }
            catch (Exception ex)
            {
                return InternalServerError(ex);
            }
        }

        //POST: api/Products
        public IHttpActionResult Post([FromBody] Product product)
        {
            try
            {
                if (product == null)
                    return BadRequest("Product cannot be null");

                if (!ModelState.IsValid)
                    return BadRequest(ModelState);

                var productsRepository = new ProductsRepository();
                var newProduct = productsRepository.Save(product);

                if (newProduct == null)
                    return Conflict();

                var requestUri = Request.RequestUri;
                var newProductId = newProduct.ProductId.ToString();
                var location = requestUri + newProductId;

                return Created<Product>(location, newProduct);
            }
            catch (Exception ex)
            {
                return InternalServerError(ex);
            }
        }

        //PUT: api/Products/5
        public IHttpActionResult Put([FromUri] int id, [FromBody] Product product)
        {
            try
            {
                if (product == null)
                    return BadRequest("Product cannot be null");

                if (!ModelState.IsValid)
                    return BadRequest(ModelState);

                var productsRepository = new ProductsRepository();
                var updatedProduct = productsRepository.Save(id, product);

                if (updatedProduct == null)
                    return NotFound();

                return StatusCode(HttpStatusCode.NoContent);
            }
            catch (Exception ex)
            {
                return InternalServerError(ex);
            }
        }

        //DELETE: api/Products/5
        public IHttpActionResult Delete([FromUri] int id)
        {
            try
            {
                var productsRepository = new ProductsRepository();
                var deleteProduct = productsRepository.Delete(id);

                if (deleteProduct == null)
                    return NotFound();

                return StatusCode(HttpStatusCode.NoContent);
            }
            catch (Exception ex)
            {
                return InternalServerError(ex);
            }
        }

        ////GET: odata/Products?search=WordToSearch
        //public IEnumerable<Product> Get(string search)
        //{
        //    var productsRepository = new ProductsRepository();
        //    var products = productsRepository.Retrieve();

        //    return products.Where( p =>  p.ProductCode.Contains(search));
        //}
    }
}