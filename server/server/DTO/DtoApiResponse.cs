using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace server.DTO
{
    public class DtoApiResponse<V>
    {
        public string Error { get; set; }
        public V Data { get; set; }
    }
}