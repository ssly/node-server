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