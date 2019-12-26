import React from 'react';
import {FaTrash,FaEdit} from 'react-icons/fa';
import { Table, NavLink , Button } from 'reactstrap';

export const TechnologyDocumentation = (props) => {

    const callHref = (SelectedDocument) => {
        window.open(SelectedDocument)
    }

    const mapAllDocument = () => {
        let documents = props.documentation.technologyDocument;
        if(documents !== undefined && documents.length > 0){
            return (
                    <Table striped className="commonText">
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>Topic</th>
                                <th>Selected Document</th>
                                <th>Edit</th>
                                <th>Delete</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                documents.map((document,index) => {
                                    let tutorialLinkSplited,tutorialLink,documentLink
                                    if(document.selectedDocument.tutorialLink !== undefined)
                                        tutorialLink = document.selectedDocument.tutorialLink
                                    if(document.selectedDocument.documentLink !== undefined)
                                        documentLink = document.selectedDocument.documentLink

                                    if(tutorialLink){
                                        let tutorialLinkSplit = tutorialLink.split('\\')
                                        tutorialLinkSplited = tutorialLinkSplit[1]
                                    }
                                    return (
                                        <tr key={index}>
                                            <th scope="row">{index+1}</th>
                                            <td><NavLink>{document.topic}</NavLink></td>
                                            <td>{tutorialLink ? (
                                                    <><Button color="link" onClick={() => callHref(tutorialLink)}>{tutorialLinkSplited.slice(0,45)+'...'}</Button></>
                                                ) : null
                                            }
                                            {documentLink  ? (
                                                <><br/><Button color="link" onClick={() => callHref(documentLink)}>{documentLink.slice(0,45)+'...'}</Button></>
                                            ) : null}
                                            </td>
                                            <td><FaEdit onClick={() => props.editDocumentation(document)}/></td>
                                            <td><FaTrash color="danger" onClick={() => props.deleteDocumentation(document._id)} /></td>
                                        </tr>
                                    );
                                })
                            }
                        </tbody>
                    </Table>
                    )


        }
        return <h5 className="commonText">There is no any Documentation</h5>
    }

    return (
        <div>
            {mapAllDocument()}
        </div>
    );
}