import {logger} from '../../services';
import {IGridProps} from './igridprops';

export class CGrid extends React.Component <IGridProps, any> {
    constructor(props) {
        super(props);
    }

    onEdit(e, d) {
        e.preventDefault();
        this.props.onEditClick && this.props.onEditClick(d); 
    }

    onDelete(e, d) {
        e.preventDefault();
        this.props.onDeleteClick && this.props.onDeleteClick(d);
    }

    render() {        
        if (this.props.fetching)
            return (
                <div className="fetching">
                <span className="spinner"><i className="icon-spin icon-refresh"></i></span>
                </div>
            );
        let ths = !this.props.columns ? [] : this.props.columns.map(c => {
            return (
                <th>{c.displayName}</th>
            );
        });
        let operName = (
            <th>Operations</th>
        );
        ths.push(operName);
        const data = !this.props.data ? null : this.props.data.map(d => {
            let tds = this.props.columns.map(c => {
                let oplevel = c.name.split('#');
                let val = d[oplevel[0]];
                for (let i=1;i<oplevel.length;i++)
                    val = val[oplevel[i]];
                return (
                    <td style={{verticalAlign: "middle"}}>
                        {val} 
                    </td>
                );
            });
            let operBtn = (
                <td style={{verticalAlign: "middle"}}>
                    <button className="btn btn-default" title="Редактировать" onClick={(e) => this.onEdit(e, d)}> 
                        <span className="glyphicon glyphicon-pencil"></span>
                    </button>
                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    <button className="btn btn-default" title="Удалить" onClick={(e) => this.onDelete(e, d)}> 
                        <span className="glyphicon glyphicon-trash"></span>
                    </button>
                 </td>
            );
            tds.push(operBtn);
            return (
                <tr key={d.Id}>
                    {tds}
                </tr>
            );
        });
        return (
            <div>
            <div className="table-responsive">
                 <table className="table table-bordered">
                 <thead>
                     <tr>
                         {ths}
                     </tr>
                 </thead>
                 <tbody>
                     {data}
                 </tbody>
                 </table>
             </div>
            </div>
        );
    }
}