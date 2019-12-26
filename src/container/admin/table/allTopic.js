import React from 'react';
import {FaTrash} from 'react-icons/fa';
import { Table , Button } from 'reactstrap';

export const AllTopic = (props) => {
    const mapAllTopic = () => {
        let TechnologyTopic = props.TechnologyTopic;
        if(TechnologyTopic.length > 0){
            return (
                    <Table striped className="commonText">
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>Topic</th>
                                <th>Delete</th>
                            </tr>
                        </thead>
                        <tbody>
                            {TechnologyTopic.map((topic,index) => {
                                return (
                                <tr key={index}>
                                <th scope="row">{index+1}</th>
                                <td><Button color="link">{topic.topic}</Button></td>
                                <td><FaTrash onClick={() => props.deleteTopic(topic._id)}/></td>
                                </tr>
                                )})
                            }
                        </tbody>
                    </Table>
                    )
        }
        return <h5 className="commonText">There is no any Topic</h5>;
    }

    return (
            <div>
                {mapAllTopic()}
            </div>
    );
}