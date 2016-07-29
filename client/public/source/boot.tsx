//проверка совместимости
import {BrowserVersion} from './utils/detector';
let root = document.getElementById("app");
if ((BrowserVersion.name == 'IE' || BrowserVersion.name == 'MSIE' ) 
        && (+BrowserVersion.version) < 10) {
    root.innerHTML = '<h3>Ваша версия браузера не поддерживается</h3>';
    throw 'Требуется обновление браузера';
}

//загрузка приложения
//moment.locale('ru');
import {Dashboard} from './components';

if (root)
    ReactDOM.render(
        <Dashboard />
        , root);
    
    
