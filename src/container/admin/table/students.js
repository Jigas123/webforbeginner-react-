import React from 'react'
import {Button, Table} from "reactstrap";
import {withRouter} from "react-router-dom";

export const Students = (props) => {

    const clickOnTrainy = (singleTrainy) => {
        props.history.push({pathname : `/admin/trainyrecord`,state : {trainyInfo : singleTrainy}})
    }

    const mapTrainyData = () => {
        const {trainyData} = props
        debugger
        if(trainyData.length > 0){
                return (
                    <Table striped className="commonText">
                        <thead>
                        <tr>
                            <th>#</th>
                            <th>Trainy</th>
                            <th>Technology Info</th>
                            <th>Registered at</th>
                        </tr>
                        </thead>
                        <tbody>
                        {trainyData.map((singleTrainy,index) => {
                            let {name,indTime} = singleTrainy
                            let completed = singleTrainy.status.complete.map(technology => technology+". ")
                            let running = singleTrainy.status.running.map(technology => technology+". ")
                            let pending = singleTrainy.status.pending.map(technology => technology+". ")
                            debugger
                            return (
                                <tr key={`trainy${index}`}>
                                    <th scope="row">{index+1}</th>
                                    <td><Button color="link" onClick={() => clickOnTrainy(singleTrainy)}>{name}</Button></td>
                                    <td className="text-nowrap">Complete: {completed}<br/>
                                                                    Running: {running}<br/>
                                                                    Pending: {pending}
                                    </td>
                                    <td>{indTime}</td>
                                </tr>
                            )
                        })
                        }
                        </tbody>
                    </Table>
                );
        }
        return <h5 className="commonText">There is no any trainy</h5>;
    }
        return (
            <div>
                {mapTrainyData()}
            </div>
        );
}

export default withRouter(Students);
