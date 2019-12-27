import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styles from './accordion.module.css';

class Accordion extends Component {
    static propTypes = {
        children: PropTypes.instanceOf(Object).isRequired,
    };

    constructor(props) {
        super(props);
    }

    render() {
        const {
            children,
        } = this.props;

        return (
            <div className={styles.accordion}>
                {children}
            </div>
            );
    }
}

export default Accordion;
