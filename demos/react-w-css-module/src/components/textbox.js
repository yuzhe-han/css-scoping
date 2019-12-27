import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styles from './textbox.module.css';

class Textbox extends Component {
    static propTypes = {
        style: PropTypes.object,
        children: PropTypes.any,
    };

    render() {
        const {
            style,
            children,
        } = this.props;

        return (
            <div style={style} className={styles.content}>
                {children}
            </div>
        );
    }
}

export default Textbox;
