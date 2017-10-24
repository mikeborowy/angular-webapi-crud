using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;

namespace Crud.API.Models
{
    public class Product
    {
        [Key]
        public int ProductId { get; set; }

        [Required(AllowEmptyStrings =false, ErrorMessage = "Product Name is required")]
        [MinLength(4, ErrorMessage = "Product Name min length is 4 characters")]
        [MaxLength(12, ErrorMessage = "Product Name max length is 12 characters")]
        public string ProductName { get; set; }
        [Required(AllowEmptyStrings = false, ErrorMessage = "Product Code is required")]
        [MinLength(6, ErrorMessage = "Product Code min length is 6 characters")]
        public string ProductCode { get; set; }
        public DateTime ReleaseDate { get; set; }
        public string Description { get; set; }
        public decimal Cost { get; set; }
        public decimal Price { get; set; }
        public string[] Tags { get; set; }
        public string ImageUrl { get; set; }
    }
}