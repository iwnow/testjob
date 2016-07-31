(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
"use strict";
//проверка совместимости

var detector_1 = require('./utils/detector');
var root = document.getElementById("app");
if ((detector_1.BrowserVersion.name == 'IE' || detector_1.BrowserVersion.name == 'MSIE') && +detector_1.BrowserVersion.version < 10) {
    root.innerHTML = '<h3>Ваша версия браузера не поддерживается</h3>';
    throw 'Требуется обновление браузера';
}
//загрузка приложения
moment.locale('ru');
var components_1 = require('./components');
if (root) ReactDOM.render(React.createElement(components_1.Dashboard, null), root);

},{"./components":4,"./utils/detector":14}],2:[function(require,module,exports){
"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var dto = require('../dto');
var services = require('../services');
var cgrid_1 = require('./grid/cgrid');

var Dashboard = function (_React$Component) {
    _inherits(Dashboard, _React$Component);

    function Dashboard(props) {
        _classCallCheck(this, Dashboard);

        var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(Dashboard).call(this, props));

        _this.state = {
            active: DashboardTabs.Emploees,
            gridData: null,
            fetching: false,
            pageNum: 1,
            perPage: 25,
            searchTxt: '',
            showModal: false,
            newEmployee: new dto.DtoEmployee(),
            addOrEdit: false
        };
        return _this;
    }

    _createClass(Dashboard, [{
        key: 'onEmployeesClick',
        value: function onEmployeesClick(e) {
            e.preventDefault();
        }
    }, {
        key: 'setFetching',
        value: function setFetching(b) {
            this.setState({
                fetching: b
            });
        }
    }, {
        key: 'componentWillMount',
        value: function componentWillMount() {
            this.refreshData();
        }
    }, {
        key: 'refreshData',
        value: function refreshData() {
            var _this2 = this;

            this.setFetching(true);
            services.dataService.getDataGrid(this.state.pageNum, this.state.perPage, this.state.searchTxt).then(function (r) {
                return _this2.setState({
                    active: DashboardTabs.Emploees,
                    gridData: r,
                    fetching: false,
                    pageNum: r.CurrentPage.PageNum
                });
            })['catch'](function (err) {
                _this2.setFetching(false);
                _this2.reportError(err);
            });
        }
    }, {
        key: 'reportError',
        value: function reportError(err) {
            services.logger.error(err);
        }
    }, {
        key: 'onSearchChanged',
        value: function onSearchChanged(e) {
            this.setState({
                searchTxt: e.target.value
            });
        }
    }, {
        key: 'onPerPageChanged',
        value: function onPerPageChanged(e) {
            var _this3 = this;

            this.setState({
                perPage: e.target.value,
                pageNum: 1
            }, function () {
                return _this3.refreshData();
            });
        }
    }, {
        key: 'onNumPageChanged',
        value: function onNumPageChanged(e) {
            var _this4 = this;

            this.setState({
                pageNum: e.target.value
            }, function () {
                return _this4.refreshData();
            });
        }
    }, {
        key: 'Search',
        value: function Search(e) {
            var _this5 = this;

            e.preventDefault();
            if (!this.state.searchTxt) return;
            this.setState({
                pageNum: 1
            }, function () {
                return _this5.refreshData();
            });
        }
    }, {
        key: 'openModal',
        value: function openModal(e, edit) {
            e && e.preventDefault();
            if (!edit) this.setState({
                showModal: true,
                newEmployee: new dto.DtoEmployee(),
                addOrEdit: false
            });else {
                this.setState({
                    showModal: true,
                    newEmployee: edit,
                    addOrEdit: true
                });
            }
        }
    }, {
        key: 'closeModal',
        value: function closeModal() {
            this.setState({ showModal: false });
        }
    }, {
        key: 'deleteEmployee',
        value: function deleteEmployee(d) {
            var _this6 = this;

            if (!d) return;
            services.dataService.delEmployee(JSON.stringify([d])).then(function (r) {
                services.logger.log(r);
                _this6.refreshData();
            })['catch'](function (err) {
                services.logger.error(err);
                _this6.setState({
                    fetching: false
                });
            });
        }
        //must immutable.js use, but all must refactor!)

    }, {
        key: 'onNewfnchanged',
        value: function onNewfnchanged(e) {
            var ne = new dto.DtoEmployee();
            ne.Position = new dto.DtoPosition();
            ne.Position.Id = 1;
            Object.assign(ne, this.state.newEmployee);
            ne.FirstName = e.target.value;
            this.setState({
                newEmployee: ne
            });
        }
    }, {
        key: 'onNewlnchanged',
        value: function onNewlnchanged(e) {
            var ne = new dto.DtoEmployee();
            ne.Position = new dto.DtoPosition();
            ne.Position.Id = 1;
            Object.assign(ne, this.state.newEmployee);
            ne.LastName = e.target.value;
            this.setState({
                newEmployee: ne
            });
        }
    }, {
        key: 'onNewphchanged',
        value: function onNewphchanged(e) {
            var ne = new dto.DtoEmployee();
            ne.Position = new dto.DtoPosition();
            ne.Position.Id = 1;
            Object.assign(ne, this.state.newEmployee);
            ne.Phone = e.target.value;
            this.setState({
                newEmployee: ne
            });
        }
    }, {
        key: 'saveNew',
        value: function saveNew() {
            var _this7 = this;

            if (!services.validate.phone(this.state.newEmployee.Phone)) return;
            services.logger.log(this.state.newEmployee);
            this.closeModal();
            this.setState({
                fetching: true
            }, function () {
                if (!_this7.state.addOrEdit) services.dataService.addEmployee(JSON.stringify([_this7.state.newEmployee])).then(function (r) {
                    services.logger.log(r);
                    _this7.refreshData();
                })['catch'](function (err) {
                    services.logger.error(err);
                    _this7.setState({
                        fetching: false
                    });
                });else services.dataService.updEmployee(JSON.stringify([_this7.state.newEmployee])).then(function (r) {
                    services.logger.log(r);
                    _this7.refreshData();
                })['catch'](function (err) {
                    services.logger.error(err);
                    _this7.setState({
                        fetching: false
                    });
                });
            });
        }
    }, {
        key: 'onPositionChanged',
        value: function onPositionChanged(e) {
            var ne = new dto.DtoEmployee();
            ne.Position = new dto.DtoPosition();
            ne.Position.Id = 1;
            Object.assign(ne, this.state.newEmployee);
            ne.Position.Id = e.target.value;
            this.setState({
                newEmployee: ne
            });
        }
    }, {
        key: 'render',
        value: function render() {
            var _this8 = this;

            var components = null;
            switch (this.state.active) {
                case DashboardTabs.Emploees:
                    var cols = [{
                        displayName: 'First Name',
                        name: 'FirstName'
                    }, {
                        displayName: 'Last Name',
                        name: 'LastName'
                    }, {
                        displayName: 'Phone',
                        name: 'Phone'
                    }, {
                        displayName: 'Position',
                        name: 'Position#Name'
                    }];
                    //className="form-control" style={{width:"300px"}} 
                    var perPage = React.createElement("select", { name: "perPage", value: this.state.perPage, onChange: function onChange(e) {
                            return _this8.onPerPageChanged(e);
                        } }, React.createElement("option", { value: "10" }, "10"), React.createElement("option", { value: "25" }, "25"), React.createElement("option", { value: "50" }, "50"));
                    var range = function range(max) {
                        var opts = [];
                        for (var i = 1; i <= max; i++) {
                            opts.push(React.createElement("option", { value: i }, i));
                        }return opts;
                    };
                    var total = this.state.gridData && this.state.gridData.TotalPageCount || 1;
                    var optPage = React.createElement("select", { name: "pageNum", value: this.state.pageNum, onChange: function onChange(e) {
                            return _this8.onNumPageChanged(e);
                        } }, range(total));
                    if (this.state.gridData) components = React.createElement("div", { style: { height: "100%", overflow: "auto" } }, React.createElement("div", { className: "form-inline", role: "form" }, React.createElement("div", { className: "form-group" }, React.createElement("input", { type: "text", placeholder: "Search", className: "form-control", name: "first", style: { width: "300px" }, value: this.state.searchTxt, onChange: function onChange(e) {
                            return _this8.onSearchChanged(e);
                        } }), "  ", React.createElement(ReactBootstrap.Button, { bsStyle: "primary", onClick: function onClick(e) {
                            return _this8.Search(e);
                        }, disabled: this.state.fetching }, "Go"))), React.createElement("div", { style: { marginTop: "10px" } }, React.createElement(ReactBootstrap.Button, { bsStyle: "success", bsSize: "small", onClick: function onClick(e) {
                            return _this8.refreshData();
                        }, disabled: this.state.fetching }, "Refresh"), "  ", React.createElement(ReactBootstrap.Button, { bsStyle: "primary", bsSize: "small", onClick: function onClick(e) {
                            return _this8.openModal(e);
                        }, disabled: this.state.fetching }, "Add employee"), React.createElement("span", { className: "pull-right", style: { marginTop: "10px" } }, "Count per page: ", perPage, "   " + ' ' + "Page: ", optPage)), React.createElement("div", { style: { marginTop: "10px" }, className: "gridd" }, React.createElement(cgrid_1.CGrid, { data: this.state.gridData.CurrentPage.Data, columns: cols, currentPageNum: this.state.gridData.CurrentPage.PageNum, totalPageCount: this.state.gridData.TotalPageCount, fetching: this.state.fetching, onEditClick: function onEditClick(d) {
                            return _this8.openModal(null, d);
                        }, onDeleteClick: function onDeleteClick(d) {
                            return _this8.deleteEmployee(d);
                        } }), React.createElement(ReactBootstrap.Modal, { show: this.state.showModal, onHide: function onHide() {
                            return _this8.closeModal();
                        } }, React.createElement(ReactBootstrap.Modal.Header, { closeButton: true }, React.createElement(ReactBootstrap.Modal.Title, null, this.state.addOrEdit ? 'Edit employee' : 'New employee')), React.createElement(ReactBootstrap.Modal.Body, null, React.createElement("form", { className: "form-vertical", role: "form" }, React.createElement("div", { className: "form-group" }, React.createElement("label", { htmlFor: "first" }, "First Name:"), React.createElement("input", { className: "form-control", placeholder: "name", name: "first", type: "text", autofocus: true, onChange: function onChange(e) {
                            return _this8.onNewfnchanged(e);
                        }, value: this.state.newEmployee.FirstName })), React.createElement("div", { className: "form-group" }, React.createElement("label", { htmlFor: "last" }, "Last Name:"), React.createElement("input", { className: "form-control", placeholder: "last", name: "last", type: "text", autofocus: true, onChange: function onChange(e) {
                            return _this8.onNewlnchanged(e);
                        }, value: this.state.newEmployee.LastName })), React.createElement("div", { className: services.validate.phone(this.state.newEmployee.Phone) ? "form-group" : "form-group has-error" }, React.createElement("label", { htmlFor: "phone" }, "Phone:"), React.createElement("input", { className: "form-control", placeholder: "format:89157324563", name: "phone", type: "text", autofocus: true, onChange: function onChange(e) {
                            return _this8.onNewphchanged(e);
                        }, value: this.state.newEmployee.Phone })), React.createElement("div", { className: "form-group" }, React.createElement("label", { htmlFor: "position" }, "Position:"), React.createElement("select", { name: "position", className: "form-control", value: this.state.newEmployee.Position ? this.state.newEmployee.Position.Id : 1, onChange: function onChange(e) {
                            return _this8.onPositionChanged(e);
                        } }, React.createElement("option", { value: "1" }, "Junior Developer"), React.createElement("option", { value: "2" }, "Middle Developer"), React.createElement("option", { value: "3" }, "Senior Developer"), "//must get dictionary from server")))), React.createElement(ReactBootstrap.Modal.Footer, null, React.createElement(ReactBootstrap.Button, { bsStyle: "primary", onClick: function onClick() {
                            return _this8.saveNew();
                        } }, "Save"), React.createElement(ReactBootstrap.Button, { onClick: function onClick() {
                            return _this8.closeModal();
                        } }, "Cancel")))));
                    break;
                default:
                    break;
            }
            return React.createElement("div", { className: "dashboard" }, React.createElement("nav", { className: "navbar navbar-default", role: "navigation" }, React.createElement("div", { className: "container-fluid" }, React.createElement("div", { className: "navbar-header" }, React.createElement("button", { type: "button", className: "navbar-toggle", "data-toggle": "collapse", "data-target": "#bs-example-navbar-collapse-1" }, React.createElement("span", { className: "sr-only" }, "Toggle navigation"), React.createElement("span", { className: "icon-bar" }), React.createElement("span", { className: "icon-bar" }), React.createElement("span", { className: "icon-bar" })), React.createElement("a", { className: "navbar-brand", href: "javascript:void(0)" }, "JobTest")), React.createElement("div", { className: "collapse navbar-collapse", id: "bs-example-navbar-collapse-1" }, React.createElement("ul", { className: "nav navbar-nav" }, React.createElement("li", { className: this.state.active == DashboardTabs.Emploees ? "active" : "" }, React.createElement("a", { href: "javascript:void(0)", onClick: function onClick(e) {
                    return _this8.onEmployeesClick(e);
                } }, "Employees")))))), React.createElement("div", { className: "tab-board" }, components));
        }
    }]);

    return Dashboard;
}(React.Component);

exports.Dashboard = Dashboard;
(function (DashboardTabs) {
    DashboardTabs[DashboardTabs["Emploees"] = 1] = "Emploees";
})(exports.DashboardTabs || (exports.DashboardTabs = {}));
var DashboardTabs = exports.DashboardTabs;

},{"../dto":7,"../services":11,"./grid/cgrid":3}],3:[function(require,module,exports){
"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var CGrid = function (_React$Component) {
    _inherits(CGrid, _React$Component);

    function CGrid(props) {
        _classCallCheck(this, CGrid);

        return _possibleConstructorReturn(this, Object.getPrototypeOf(CGrid).call(this, props));
    }

    _createClass(CGrid, [{
        key: "onEdit",
        value: function onEdit(e, d) {
            e.preventDefault();
            this.props.onEditClick && this.props.onEditClick(d);
        }
    }, {
        key: "onDelete",
        value: function onDelete(e, d) {
            e.preventDefault();
            this.props.onDeleteClick && this.props.onDeleteClick(d);
        }
    }, {
        key: "render",
        value: function render() {
            var _this2 = this;

            if (this.props.fetching) return React.createElement("div", { className: "fetching" }, React.createElement("span", { className: "spinner" }, React.createElement("i", { className: "icon-spin icon-refresh" })));
            var ths = !this.props.columns ? [] : this.props.columns.map(function (c) {
                return React.createElement("th", null, c.displayName);
            });
            var operName = React.createElement("th", null, "Operations");
            ths.push(operName);
            var data = !this.props.data ? null : this.props.data.map(function (d) {
                var tds = _this2.props.columns.map(function (c) {
                    var oplevel = c.name.split('#');
                    var val = d[oplevel[0]];
                    for (var i = 1; i < oplevel.length; i++) {
                        val = val[oplevel[i]];
                    }return React.createElement("td", { style: { verticalAlign: "middle" } }, val);
                });
                var operBtn = React.createElement("td", { style: { verticalAlign: "middle" } }, React.createElement("button", { className: "btn btn-default", title: "Редактировать", onClick: function onClick(e) {
                        return _this2.onEdit(e, d);
                    } }, React.createElement("span", { className: "glyphicon glyphicon-pencil" })), "         ", React.createElement("button", { className: "btn btn-default", title: "Удалить", onClick: function onClick(e) {
                        return _this2.onDelete(e, d);
                    } }, React.createElement("span", { className: "glyphicon glyphicon-trash" })));
                tds.push(operBtn);
                return React.createElement("tr", { key: d.Id }, tds);
            });
            return React.createElement("div", null, React.createElement("div", { className: "table-responsive" }, React.createElement("table", { className: "table table-bordered" }, React.createElement("thead", null, React.createElement("tr", null, ths)), React.createElement("tbody", null, data))));
        }
    }]);

    return CGrid;
}(React.Component);

exports.CGrid = CGrid;

},{}],4:[function(require,module,exports){
"use strict";

function __export(m) {
    for (var p in m) {
        if (!exports.hasOwnProperty(p)) exports[p] = m[p];
    }
}
__export(require('./dashboard'));

},{"./dashboard":2}],5:[function(require,module,exports){
"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var DtoGridPage = function DtoGridPage() {
  _classCallCheck(this, DtoGridPage);
};

exports.DtoGridPage = DtoGridPage;

var DtoGridData = function DtoGridData() {
  _classCallCheck(this, DtoGridData);
};

exports.DtoGridData = DtoGridData;

},{}],6:[function(require,module,exports){
"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var DtoEmployee = function DtoEmployee() {
  _classCallCheck(this, DtoEmployee);
};

exports.DtoEmployee = DtoEmployee;

},{}],7:[function(require,module,exports){
"use strict";

function __export(m) {
    for (var p in m) {
        if (!exports.hasOwnProperty(p)) exports[p] = m[p];
    }
}
__export(require('./employee'));
__export(require('./position'));
__export(require('./response'));
__export(require('./datagrid'));

},{"./datagrid":5,"./employee":6,"./position":8,"./response":9}],8:[function(require,module,exports){
"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var DtoPosition = function DtoPosition() {
  _classCallCheck(this, DtoPosition);
};

exports.DtoPosition = DtoPosition;

},{}],9:[function(require,module,exports){
"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var DtoApiResponse = function DtoApiResponse() {
  _classCallCheck(this, DtoApiResponse);
};

exports.DtoApiResponse = DtoApiResponse;

},{}],10:[function(require,module,exports){
"use strict";

exports.dataService = {
    getDataGrid: getDataGrid,
    addEmployee: addEmployee,
    updEmployee: updEmployee,
    delEmployee: delEmployee
};
function getDataGrid(numPage, perPage, search) {
    if (numPage < 1) numPage = 1;
    if (perPage < 1) perPage = 10;
    return new Promise(function (res, rej) {
        $.ajax("/api/employee?page=" + numPage + "&perpage=" + perPage + "&search=" + search, {
            success: function success(r, status, hxr) {
                var _r = r;
                if (_r.Error) rej(_r.Error);
                res(_r.Data);
            }
        }).fail(function (err) {
            return rej(err);
        });
    });
}
function addEmployee(data) {
    return new Promise(function (res, rej) {
        $.ajax("/api/employee", {
            type: "POST",
            data: data,
            contentType: "application/json; charset=utf-8",
            dataType: 'json',
            success: function success(r, status, hxr) {
                var _r = r;
                if (_r.Error) rej(_r.Error);
                res(_r.Data);
            }
        }).fail(function (err) {
            return rej(err);
        });
    });
}
function updEmployee(data) {
    return new Promise(function (res, rej) {
        $.ajax("/api/employee", {
            type: "PUT",
            data: data,
            contentType: "application/json; charset=utf-8",
            dataType: 'json',
            success: function success(r, status, hxr) {
                var _r = r;
                if (_r.Error) rej(_r.Error);
                res(_r.Data);
            }
        }).fail(function (err) {
            return rej(err);
        });
    });
}
function delEmployee(data) {
    return new Promise(function (res, rej) {
        $.ajax("/api/employee", {
            type: "DELETE",
            data: data,
            contentType: "application/json; charset=utf-8",
            dataType: 'json',
            success: function success(r, status, hxr) {
                var _r = r;
                if (_r.Error) rej(_r.Error);
                res(_r.Data);
            }
        }).fail(function (err) {
            return rej(err);
        });
    });
}
// function delBook(data) {
// 	return new Promise<boolean>((res, rej) => {
// 		$.ajax("/r/Home/DelBook", {
// 			type: "POST",
// 			data: data,
// 			contentType : "application/json; charset=utf-8",
// 			dataType: 'json',
// 			success: function(r, status, hxr) {
// 				if (r && r.status == 200)
// 					res(r.result);
// 				rej(r.status);
// 			}
// 		}).fail(err => rej(err));
// 	});
// }

},{}],11:[function(require,module,exports){
"use strict";

var validate_1 = require('./validate');
exports.validate = validate_1.validate;
var logger_1 = require('./logger');
exports.logger = logger_1.logger;
var data_1 = require('./data');
exports.dataService = data_1.dataService;

},{"./data":10,"./logger":12,"./validate":13}],12:[function(require,module,exports){
"use strict";

exports.logger = {
    log: function log() {
        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }

        var _o = args.length > 1 ? args.join('\n') : args;
        console ? console.log(_o) : '';
    },
    error: function error() {
        for (var _len2 = arguments.length, args = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
            args[_key2] = arguments[_key2];
        }

        console ? console.error(args) : '';
    }
};

},{}],13:[function(require,module,exports){
"use strict";

exports.validate = {
    mail: function mail(_mail) {
        var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(_mail);
    },
    pass: function pass(p) {
        return !!p;
    },
    phone: function phone(p) {
        return (/^\d+$/.test(p) && p.length == 11
        );
    }
};

},{}],14:[function(require,module,exports){
"use strict";

exports.BrowserVersion = function () {
    var ua = navigator.userAgent,
        tem,
        M = ua.match(/(opera|chrome|safari|firefox|msie|trident(?=\/))\/?\s*(\d+)/i) || [];
    if (/trident/i.test(M[1])) {
        tem = /\brv[ :]+(\d+)/g.exec(ua) || [];
        return 'IE ' + (tem[1] || '');
    }
    if (M[1] === 'Chrome') {
        tem = ua.match(/\b(OPR|Edge)\/(\d+)/);
        if (tem != null) return tem.slice(1).join(' ').replace('OPR', 'Opera');
    }
    M = M[2] ? [M[1], M[2]] : [navigator.appName, navigator.appVersion, '-?'];
    if ((tem = ua.match(/version\/(\d+)/i)) != null) M.splice(1, 1, tem[1]);
    //return M.join(' ');
    return {
        name: M[0],
        version: M[1]
    };
}();

},{}]},{},[1]);
