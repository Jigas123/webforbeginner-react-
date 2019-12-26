import React, { Component } from 'react';
import { TabContent, TabPane, Nav, NavItem, NavLink, Row, Col } from 'reactstrap';
import classnames from 'classnames';

import {TechnologyDocumentation} from '../table/technologyDocumentation';
import {AllTopic} from '../table/allTopic';

class TechnologyDetailTab extends Component {
    constructor(props){
        super(props)
        this.state = {
            activeTab : '2',
        }
    }

    toggle = tab => {
        if(this.state.activeTab !== tab) this.setState({activeTab : tab})
    }

    render() {
        const {activeTab} = this.state;
        return (
            <div>
                <Nav tabs className="w-100">
                    <NavItem>
                        <NavLink
                            className={classnames({ active: activeTab === '1' })}
                            onClick={() => { this.toggle('1'); }}
                        >
                            Topics
                        </NavLink>
                    </NavItem>
                    <NavItem>
                        <NavLink
                            className={classnames({ active: activeTab === '2' })}
                            onClick={() => { this.toggle('2'); }}
                        >
                            Documentation
                        </NavLink>
                    </NavItem>
                </Nav>
                <TabContent activeTab={activeTab} className="pt-3">
                    <TabPane tabId="1">
                        <Row className="pb-3">
                            <Col sm="12">
                                <h4 className="commonText">All Topic</h4>
                            </Col>
                        </Row>
                        <div>
                            <AllTopic TechnologyTopic = {this.props.TechnologyTopic} deleteTopic = {this.props.deleteTopic}/>
                        </div>
                    </TabPane>
                    <TabPane tabId="2">
                        <Row className="pb-3">
                            <Col sm="12">
                                <h4 className="commonText">All Document</h4>
                            </Col>
                        </Row>
                        <div>
                            <TechnologyDocumentation editDocumentation = {this.props.editDocumentation} deleteDocumentation = {this.props.deleteDocumentation} documentation = {this.props.documentation}/>
                        </div>
                    </TabPane>
                </TabContent>
            </div>
        );
    }
}

export default TechnologyDetailTab;
