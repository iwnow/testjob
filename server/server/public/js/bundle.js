(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Dashboard = function (_React$Component) {
    _inherits(Dashboard, _React$Component);

    function Dashboard(props) {
        _classCallCheck(this, Dashboard);

        var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(Dashboard).call(this, props));

        _this.state = {
            active: DashboardTabs.Emploees
        };
        return _this;
    }

    _createClass(Dashboard, [{
        key: "onEmployeesClick",
        value: function onEmployeesClick(e) {
            e.preventDefault();
        }
    }, {
        key: "render",
        value: function render() {
            var _this2 = this;

            var children = null;
            switch (this.state.active) {
                case DashboardTabs.Emploees:
                    children = React.createElement("div", null, "employee tab");
                    break;
                default:
                    break;
            }
            return React.createElement("div", { className: "dashboard" }, React.createElement("nav", { className: "navbar navbar-default", role: "navigation" }, React.createElement("div", { className: "container-fluid" }, React.createElement("div", { className: "navbar-header" }, React.createElement("button", { type: "button", className: "navbar-toggle", "data-toggle": "collapse", "data-target": "#bs-example-navbar-collapse-1" }, React.createElement("span", { className: "sr-only" }, "Toggle navigation"), React.createElement("span", { className: "icon-bar" }), React.createElement("span", { className: "icon-bar" }), React.createElement("span", { className: "icon-bar" })), React.createElement("a", { className: "navbar-brand", href: "javascript:void(0)" }, "JobTest")), React.createElement("div", { className: "collapse navbar-collapse", id: "bs-example-navbar-collapse-1" }, React.createElement("ul", { className: "nav navbar-nav" }, React.createElement("li", { className: this.state.active == DashboardTabs.Emploees ? "active" : "" }, React.createElement("a", { href: "javascript:void(0)", onClick: function onClick(e) {
                    return _this2.onEmployeesClick(e);
                } }, "Employees")))))), React.createElement("div", { className: "tab-board" }, children));
        }
    }]);

    return Dashboard;
}(React.Component);

exports.Dashboard = Dashboard;
(function (DashboardTabs) {
    DashboardTabs[DashboardTabs["Emploees"] = 1] = "Emploees";
})(exports.DashboardTabs || (exports.DashboardTabs = {}));
var DashboardTabs = exports.DashboardTabs;

},{}],2:[function(require,module,exports){
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
        key: "render",
        value: function render() {
            return React.createElement("div", null, "grid");
        }
    }]);

    return CGrid;
}(React.Component);

exports.CGrid = CGrid;

},{}],3:[function(require,module,exports){
"use strict";

function __export(m) {
    for (var p in m) {
        if (!exports.hasOwnProperty(p)) exports[p] = m[p];
    }
}
__export(require('./dashboard'));
__export(require('./grid'));

},{"./dashboard":1,"./grid":2}],4:[function(require,module,exports){
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

},{}],5:[function(require,module,exports){
"use strict";
//проверка совместимости

var detector_1 = require('./utils/detector');
var root = document.getElementById("app");
if ((detector_1.BrowserVersion.name == 'IE' || detector_1.BrowserVersion.name == 'MSIE') && +detector_1.BrowserVersion.version < 10) {
    root.innerHTML = '<h3>Ваша версия браузера не поддерживается</h3>';
    throw 'Требуется обновление браузера';
}
//загрузка приложения
//moment.locale('ru');
var components_1 = require('./components');
if (root) ReactDOM.render(React.createElement(components_1.Dashboard, null), root);

},{"./components":3,"./utils/detector":4}]},{},[5]);
