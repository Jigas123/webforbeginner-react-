import React from 'react';
import { FaTrash } from 'react-icons/fa'
import { Table , Button } from 'reactstrap';

const AllTechnology = (props) => {

    const mapAllTechnologies = () => {
        let technologies = props.technologies;
        if(technologies.length > 0){
            return technologies.map((technology,index) => {
                return (
                    <tr key={index}>
                        <th scope="row">{index+1}</th>
                        <td><Button color="link" onClick={() => props.technologyClickHandle(technology._id,technology.technology)}>{technology.technology}</Button></td>
                        <td><FaTrash onClick={() => props.deleteTechnology(technology._id)}/></td>
                    </tr>
                );
            })
        }
    }

    return (
        <Table striped className="commonText">
            <thead>
            <tr>
                <th>#</th>
                <th>Technology</th>
                <th>Delete</th>
            </tr>
            </thead>
            <tbody>
                {mapAllTechnologies()}
            </tbody>
        </Table>
    );
}

export default AllTechnology;