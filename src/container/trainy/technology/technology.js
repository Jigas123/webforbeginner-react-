import React from 'react';
import {ListGroupItem,ListGroup} from 'reactstrap';

const Technology = (props) => {

    const mappedTechnologies = () => {
        if(props.technologies){
            let technologies = props.technologies;
            return technologies.map((technology,index) => {
                return (
                    <ListGroupItem action tag="button"
                                   className="commonText"
                                   onClick={() => props.clickOnTechnology(technology)}
                                   key={index}
                                   value={technology._id}>{technology.technology}</ListGroupItem>
                )
            })
        }
        return <h5 className="commonText">There is no any Technology</h5>
    }

    return (
        <div>
            <ListGroup>
                {mappedTechnologies()}
            </ListGroup>
        </div>
    );
}

export default Technology;