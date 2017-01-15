// /**
//  * Created by Lyisu on 2017/1/1.
//  */
// import React from 'react';
//
// class Header extends React.Component {
//     render() {
//         return(
//             <header><h2>文档编辑</h2></header>
//         );
//     }
// }
// export default Header;

import React from 'react';
import config from '../../package.json';

var t = JSON.stringify(config.dependencies);
class Greeter extends React.Component {
    render() {
        return(
            <div>{t}</div>
        );
    }
}

export default Greeter;