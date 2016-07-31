import * as dto from '../dto';
import * as services from '../services';
import {CGrid} from './grid/cgrid';

export class Dashboard extends React.Component<any, IDashboardState> {
    constructor(props) {
        super(props);
        this.state = {
            active: DashboardTabs.Emploees,
            gridData: null,
            fetching: false,
            pageNum: 1,
            perPage: 25,
            searchTxt: '',
            showModal: false,
            newEmployee: new dto.DtoEmployee(),
            addOrEdit: false
        }
    }

    onEmployeesClick(e) {
        e.preventDefault();
    }

    setFetching(b: boolean) {
        this.setState({
            fetching: b
        });
    }

    componentWillMount() {
        this.refreshData();
    }

    refreshData() {
        this.setFetching(true);
        services.dataService
            .getDataGrid<dto.DtoGridData>(this.state.pageNum, this.state.perPage, this.state.searchTxt)
            .then(r => this.setState({
                active: DashboardTabs.Emploees,
                gridData: r,
                fetching: false,
                pageNum: r.CurrentPage.PageNum
            }))
            .catch(err => {
                this.setFetching(false);
                this.reportError(err);
            });
    }

    reportError(err) {
        services.logger.error(err);
    }

    onSearchChanged(e) {
        this.setState({
            searchTxt: e.target.value
        });
    }

    onPerPageChanged(e) {
        this.setState({
            perPage: e.target.value,
            pageNum: 1
        }, () => this.refreshData());
    }

    onNumPageChanged(e) {
        this.setState({
            pageNum: e.target.value
        }, () => this.refreshData());
    }

    Search(e) {
        e.preventDefault();
        if (!this.state.searchTxt)
            return;
        this.setState({
            pageNum: 1
        }, () => this.refreshData());
    }

    openModal(e, edit?:dto.DtoEmployee) {
        e && e.preventDefault();
        if (!edit)
            this.setState({ 
                showModal: true,
                newEmployee: new dto.DtoEmployee(),
                addOrEdit: false
            });
        else {
            this.setState({ 
                showModal: true,
                newEmployee: edit,
                addOrEdit: true
            });
        }
    }

    closeModal() {
        this.setState({ showModal: false });
    }

    deleteEmployee(d:dto.DtoEmployee) {
        if (!d)
            return;
        services.dataService
            .delEmployee<number>(JSON.stringify([d]))
            .then(r => {
                services.logger.log(r);
                this.refreshData();
            })
            .catch(err => {
                services.logger.error(err);
                this.setState({
                    fetching: false
                });
            });
    }

    //must immutable.js use, but all must refactor!)
    onNewfnchanged(e) {
        let ne = new dto.DtoEmployee();
        ne.Position = new dto.DtoPosition();
        ne.Position.Id = 1;
        Object.assign(ne, this.state.newEmployee);
        ne.FirstName = e.target.value;
        this.setState({
            newEmployee: ne
        });
    }
    onNewlnchanged(e) {
        let ne = new dto.DtoEmployee();
        ne.Position = new dto.DtoPosition();
        ne.Position.Id = 1;
        Object.assign(ne, this.state.newEmployee);
        ne.LastName = e.target.value;
        this.setState({
            newEmployee: ne
        });
    }
    onNewphchanged(e) {
        let ne = new dto.DtoEmployee();
        ne.Position = new dto.DtoPosition();
        ne.Position.Id = 1;
        Object.assign(ne, this.state.newEmployee);
        ne.Phone = e.target.value;
        this.setState({
            newEmployee: ne
        });
    }

    saveNew() {
        if (!services.validate.phone(this.state.newEmployee.Phone))
            return;
        services.logger.log(this.state.newEmployee);
        this.closeModal();
        this.setState({
            fetching: true
        }, () => {
            if (!this.state.addOrEdit) //new)
                services.dataService
                    .addEmployee<number>(JSON.stringify([this.state.newEmployee]))
                    .then(r => {
                        services.logger.log(r);
                        this.refreshData();
                    })
                    .catch(err => {
                        services.logger.error(err);
                        this.setState({
                            fetching: false
                        });
                    });
            else //edit
                services.dataService
                    .updEmployee<number>(JSON.stringify([this.state.newEmployee]))
                    .then(r => {
                        services.logger.log(r);
                        this.refreshData();
                    })
                    .catch(err => {
                        services.logger.error(err);
                        this.setState({
                            fetching: false
                        });
                    });
        });
    }

    onPositionChanged(e) {
        let ne = new dto.DtoEmployee();
        ne.Position = new dto.DtoPosition();
        ne.Position.Id = 1;
        Object.assign(ne, this.state.newEmployee);
        ne.Position.Id = e.target.value;
        this.setState({
            newEmployee: ne
        });
    }

    render() {
        let components = null;
        switch (this.state.active) {
            case DashboardTabs.Emploees:
                let cols = [{
                    displayName: 'First Name',
                    name: 'FirstName'
                },{
                    displayName: 'Last Name',
                    name: 'LastName'
                },{
                    displayName: 'Phone',
                    name: 'Phone'
                },{
                    displayName: 'Position',
                    name: 'Position#Name'
                }];
                //className="form-control" style={{width:"300px"}} 
                let perPage = (
                    <select name="perPage" 
                    value={this.state.perPage} onChange={(e) => this.onPerPageChanged(e)}>
                        <option  value="10">10</option>
                        <option  value="25">25</option>
                        <option  value="50">50</option>
                    </select>
                );
                let range = (max) => {
                    let opts = [];
                    for(let i = 1; i <= max; i++)
                        opts.push(
                            <option  value={i}>{i}</option>
                        );
                    return opts;
                };
                let total = this.state.gridData && this.state.gridData.TotalPageCount || 1;
                let optPage = (
                        <select name="pageNum" 
                    value={this.state.pageNum} onChange={(e) => this.onNumPageChanged(e)}>
                        {range(total)}
                    </select>
                    );
                if (this.state.gridData)
                    components = (

                        <div style={{height: "100%", overflow: "auto"}}>
                        <div className="form-inline" role="form">
                        <div className="form-group">
                        <input type="text" placeholder="Search" className="form-control" name="first" style={{width:"300px"}}
                            value={this.state.searchTxt} onChange={(e) => this.onSearchChanged(e)}/>
                        &nbsp;&nbsp;                        
                            <ReactBootstrap.Button
                                bsStyle="primary"
                                onClick={(e) => this.Search(e)}
                                disabled={this.state.fetching}
                            >
                            Go
                            </ReactBootstrap.Button>
                        </div>
                        </div>
                        <div style={{marginTop: "10px"}}>
                        <ReactBootstrap.Button
                                bsStyle="success"
                                bsSize="small"
                                onClick={(e) => this.refreshData()}
                                disabled={this.state.fetching}
                            >
                            Refresh
                            </ReactBootstrap.Button>
                            &nbsp;&nbsp; 
                            <ReactBootstrap.Button
                                bsStyle="primary"
                                bsSize="small"
                                onClick={(e) => this.openModal(e)}
                                disabled={this.state.fetching}
                            >
                            Add employee
                            </ReactBootstrap.Button>
                            
                            <span className="pull-right" style={{marginTop: "10px"}}>
                            Count per page: {perPage} &nbsp;&nbsp; 
                            Page: {optPage}
                            </span>
                         </div>
                        <div style={{marginTop: "10px"}} className="gridd">
                        
                        <CGrid
                            data={this.state.gridData.CurrentPage.Data}
                            columns={cols}
                            currentPageNum={this.state.gridData.CurrentPage.PageNum}
                            totalPageCount={this.state.gridData.TotalPageCount}
                            fetching={this.state.fetching}
                            onEditClick={(d) => this.openModal(null, d) }
                            onDeleteClick={(d) => this.deleteEmployee(d)}
                        ></CGrid>

                        <ReactBootstrap.Modal show={this.state.showModal} onHide={() => this.closeModal()}>
                            <ReactBootstrap.Modal.Header closeButton>
                                <ReactBootstrap.Modal.Title>{this.state.addOrEdit ? 'Edit employee' : 'New employee'}</ReactBootstrap.Modal.Title>
                            </ReactBootstrap.Modal.Header>
                            <ReactBootstrap.Modal.Body>
                                <form className="form-vertical" role="form">
                                <div className="form-group">
                                    <label htmlFor="first">First Name:</label>                              
                                            <input className="form-control" placeholder="name" name="first" type="text" autofocus 
                                            onChange={(e) => this.onNewfnchanged(e)}
                                            value={this.state.newEmployee.FirstName}/>
                                </div>
                                <div className="form-group">
                                    <label htmlFor="last">Last Name:</label>                              
                                            <input className="form-control" placeholder="last" name="last"  type="text" autofocus 
                                            onChange={(e) => this.onNewlnchanged(e)}
                                            value={this.state.newEmployee.LastName}/>
                                </div>
                                <div className={services.validate.phone(this.state.newEmployee.Phone) ?  "form-group" : "form-group has-error" }>
                                    <label htmlFor="phone">Phone:</label>                              
                                            <input className="form-control" placeholder="format:89157324563" name="phone"  type="text" autofocus 
                                            onChange={(e) => this.onNewphchanged(e)}
                                            value={this.state.newEmployee.Phone}/>
                                </div>
                                <div className="form-group">
                                    <label htmlFor="position">Position:</label>        
                                        <select name="position" className="form-control"
                                        value={this.state.newEmployee.Position ? 
                                                this.state.newEmployee.Position.Id : 1} 
                                                onChange={(e) => this.onPositionChanged(e)}>
                                            <option  value="1">Junior Developer</option>
                                            <option  value="2">Middle Developer</option>
                                            <option  value="3">Senior Developer</option>
                                            //must get dictionary from server
                                        </select>                     
                                </div>
                                </form>  

                            </ReactBootstrap.Modal.Body>
                            <ReactBootstrap.Modal.Footer>
                                <ReactBootstrap.Button bsStyle="primary" 
                                    onClick={() => this.saveNew()}>
                                    Save
                                </ReactBootstrap.Button>
                                <ReactBootstrap.Button onClick={() => this.closeModal()}>Cancel</ReactBootstrap.Button>
                            </ReactBootstrap.Modal.Footer>
                        </ReactBootstrap.Modal>

                        </div>
                        </div>
                    );
                break;
            default:
                break;
        }

        return (
            <div className="dashboard">
				<nav className="navbar navbar-default" role="navigation">
                    <div className="container-fluid">
                    
                    <div className="navbar-header">
                    <button type="button" className="navbar-toggle" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1">
                            <span className="sr-only">Toggle navigation</span>
                            <span className="icon-bar"></span>
                            <span className="icon-bar"></span>
                            <span className="icon-bar"></span>
                        </button>
                    <a className="navbar-brand" href="javascript:void(0)">JobTest</a>
                    </div>

                    
                    <div className="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
                    <ul className="nav navbar-nav">
                        <li className={this.state.active == DashboardTabs.Emploees ? "active" : "" }><a href="javascript:void(0)" onClick={(e) => this.onEmployeesClick(e)}>Employees</a></li>
                    </ul>
                    
                    </div>
                    </div>
                </nav>
                <div className="tab-board">
                    {components}
                </div>
			</div>
        );
    }
}

export enum DashboardTabs {
    Emploees = 1
}

export interface IDashboardState {
    active?: DashboardTabs;
    gridData?: dto.DtoGridData;
    fetching?: boolean;
    searchTxt?: string;
    perPage?: number;
    pageNum?: number;
    showModal?:boolean;
    newEmployee?: dto.DtoEmployee;
    addOrEdit?: boolean;
}