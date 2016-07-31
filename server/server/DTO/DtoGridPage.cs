using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace server.DTO
{
    /// <summary>
    /// DTO для данных страницы в гриде
    /// </summary>
    public class DtoGridPage
    {
        /// <summary>
        /// Номер страницы
        /// </summary>
        public int PageNum { get; set; }

        /// <summary>
        /// Данные страницы
        /// </summary>
        public IEnumerable<DtoEmployee> Data { get; set; } 
    }
}