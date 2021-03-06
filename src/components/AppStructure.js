import React from 'react';
import AppToolbar from './AppToolbar';

import {RouteTransition} from 'react-router-transition';
import spring from 'react-motion/lib/spring';

export class AppStructure extends React.Component {

    render() {
        const fadeConfig = {stiffness: 200, damping: 22};
        const slideConfig = {stiffness: 330, damping: 30};

        return (
            <div>
                <AppToolbar/>
                <div id="contentContainer">

                    <RouteTransition
                        pathname={this.props.location.pathname}
                        atEnter={{
                            opacity: 0,
                            offset: 100
                        }}
                        atLeave={{
                            opacity: spring(0, fadeConfig),
                            offset: spring(-100, slideConfig),
                        }}
                        atActive={{
                            opacity: spring(1, slideConfig),
                            offset: spring(0, slideConfig),
                        }}
                        mapStyles={styles => (
                            {
                                opacity: styles.opacity,
                                transform: `translateX(${styles.offset}%)`,
                                position: 'absolute',
                                top: 64,
                                width: '100%',
                                bottom: 0
                            }
                        )}
                    >
                        {this.props.children}
                    </RouteTransition>
                </div>
            </div>
        );
    }
}

export default AppStructure;