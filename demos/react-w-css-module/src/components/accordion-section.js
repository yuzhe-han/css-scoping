import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styles from './accordion-section.module.css'

class AccordionSection extends Component {
    static propTypes = {
        children: PropTypes.instanceOf(Object).isRequired,
        includeAccordionContent: PropTypes.bool,
        className: PropTypes.string,
        title: PropTypes.string.isRequired,
        isExpanded: PropTypes.bool,
    };

    static defaultProps = {
        includeAccordionContent: true,
        isExpanded: true,
    }

    constructor(props) {
        super(props);

        this.state = {isExpanded: props.isExpanded}
        this.toggle = this.toggle.bind(this);
    }

    toggle = () => {
        this.setState(state => ({ isExpanded: !state.isExpanded}));
    }

    render() {
        const {
            props: { title, includeAccordionContent, children, className },
            state: { isExpanded },
        } = this;

        return (
            <div className={className}>
                <button className={styles.trigger} onClick={this.toggle}  aria-expanded={isExpanded}>
                    <span className={styles.title}>
                        {title}
                        <span className={styles.icon}></span>
                    </span>
                </button>
                <div id="sect" className={styles.panel} hidden={!isExpanded}>
                    {includeAccordionContent? <div className={styles.content}> Accordion Content</div> : null}
                    <br />
                    {children}
                </div>
            </div>);
    }
}

export default AccordionSection;
