import React,{Component} from 'react';
import {Button,Input} from 'reactstrap';
import { AiOutlineCheck } from 'react-icons/ai';
import './collaps.css'

class TechnoDocument extends Component{

    constructor(props){
        super(props)
        this.DocumentMarked = {}
        this.state = {
            DocumentMarked : {}
        }
    }

    callHref = (SelectedDocument) => {
        window.open(SelectedDocument)
    }

    markedTopic = (totalDocument,totalReadableDocument,document) => {
        totalDocument === totalReadableDocument ? (this.DocumentMarked[document] = true) : (this.DocumentMarked[document] = false)
        return true;
    }

    completedTopic = (document) => {
        const {DocumentMarked} = this.state
        if(document in DocumentMarked){
            if(DocumentMarked[document] === true) return (<AiOutlineCheck/>)
        }
    }


    topicDataMapped = () => {
        let totalDocument,totalReadableDocument
        totalDocument = totalReadableDocument = 0
        let mappedObject
        mappedObject = [];
        const {documentation} = this.props;
        const {technologyDocument} = documentation;
        if(technologyDocument && technologyDocument.length > 0){
            technologyDocument.forEach(function (document,i) {
                    mappedObject.push(document.topic)
            })
        }
        mappedObject = [...new Set(mappedObject)];
        if(mappedObject.length > 0) {
            return (
                <div className="accordion mx-auto" id="accordionExample">
                    {mappedObject.map((document, index) => {
                        totalDocument = totalReadableDocument = 0
                        return (
                            <div key={`mainCard${index}`}>
                            <div className="card d-flex p-2" key={`card${index}`}>
                                <div className="card-header d-flex align-items-center justify-content-between" id={index}>
                                    <h2 className="mb-0">
                                        <button className="btn btn-link" type="button" data-toggle="collapse"
                                                data-target={`#get${index}`} aria-expanded="true"
                                                aria-controls={`get${index}`}>
                                            {document}
                                        </button>
                                    </h2>
                                    {this.completedTopic(document)}
                                </div>

                                <div id={`get${index}`} className="collapse" aria-labelledby={`get${index}`}
                                     data-parent="#accordionExample" key={`get${index}`}>
                                    <div className="card-body">
                                    {technologyDocument.filter((documentation, index) => {
                                    if (documentation.topic === document) {
                                        return documentation
                                    }
                                    return 0
                                    }).map((filtredData,index) => {
                                                    let documentSplited
                                                    totalDocument = totalDocument + 1
                                                    console.log("mark as read type : "+typeof filtredData.markAsRead)
                                                    debugger
                                                    if(filtredData.markAsRead === true){
                                                        totalReadableDocument = totalReadableDocument + 1
                                                    }
                                                    let {tutorialLink,documentLink} = filtredData.selectedDocument
                                                    if(tutorialLink)
                                                        documentSplited = tutorialLink.split('\\')

                                                    return (<div className="boxPosition div-hover" key={`link${index}`}>
                                                            <div className="text-box">
                                                                {tutorialLink ? (
                                                                    <><Button color="link" onClick={() => this.callHref(tutorialLink)}>{documentSplited[1].slice(0,45)+'...'}</Button></>
                                                                ) : null
                                                                }
                                                                {documentLink ? (
                                                                    <><br/><Button color="link" onClick={() => this.callHref(documentLink)}>{documentLink.slice(0,45)+'...'}</Button></>
                                                                ) : null}
                                                            </div>
                                                            <div key={`mark${index}`} className="checkboxposition">
                                                                <Input type="checkbox"
                                                                       checked={filtredData.markAsRead}
                                                                       onChange={(e) => this.props.markAsRead(e,filtredData)}/>Mark as Read
                                                            </div>

                                                        </div>
                                                            )
                                                })}
                                    </div>
                                </div>
                            </div>
                                {this.markedTopic(totalDocument,totalReadableDocument,document)}
                            </div>
                        );

                    })
                    }
                </div>
            )
        }
        return <h5 className="commonText">There is no any Documentation</h5>;
    }

    render() {
        return(
            <div key={`mainDiv${1}`}>
                {this.topicDataMapped()}
                {JSON.stringify(this.DocumentMarked) !== JSON.stringify(this.state.DocumentMarked) ?
                    this.setState({DocumentMarked : this.DocumentMarked}) : null}
            </div>
        );
    }
}

export default TechnoDocument;