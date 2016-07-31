using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace server.DTO
{
    /// <summary>
    /// DTO для грида
    /// </summary>
    public class DtoGridData
    {
        /// <summary>
        /// Данные текущей запрашиваемой страницы
        /// </summary>
        public DtoGridPage CurrentPage { get; set; }

        /// <summary>
        /// Общее кол-во страниц (зависит от CountPerPage)
        /// </summary>
        public int TotalPageCount { get; set; }

        /// <summary>
        /// Кол-во строк на страницу
        /// </summary>
        public int CountPerPage { get; set; }

        //todo: доделать стратегию буферизации: 1) загрузка доп данных вперед на N страниц, 2) назад, 3)назад и вперед
        //
        /// <summary>
        /// Буфер для доп.страниц
        /// </summary>
        public IEnumerable<DtoGridPage> Buffer { get; set; } 
    }
}