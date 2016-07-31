using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using Ninject;
using Ninject.Modules;
using server.Contracts;
using server.DTO;
using server.Services;

namespace server
{
    public class IoC
    {
        public static IKernel AppKernel { get; private set; }
        public static void Configure()
        {
            IoC.AppKernel = new StandardKernel(new ModuleDI());
        }
    }

    public class ModuleDI : NinjectModule
    {
        public override void Load()
        {
            this.Bind<IRepositoryService>().To<RepositoryService>();
            this.Bind<IGridProvider<DtoGridData>>().To<GridProvider>();
        }
    }
}