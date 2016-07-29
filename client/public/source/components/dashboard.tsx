import * as models from '../models';

export class Dashboard extends React.Component<any, IDashboardState> {
    constructor(props) {
        super(props);
        this.state = {
            active: DashboardTabs.Emploees
        }
    }

    onEmployeesClick(e) {
        e.preventDefault();
    }

    render() {
        let children = null;
        switch (this.state.active) {
            case DashboardTabs.Emploees:
                children = (
                    <div>employee tab</div>
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
                    {children}
                </div>
			</div>
        );
    }
}

export enum DashboardTabs {
    Emploees = 1
}

export interface IDashboardState {
    active: DashboardTabs;
}