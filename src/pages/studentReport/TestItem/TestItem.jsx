import React from "react";

function TestItem (props)
{
    //fetch the test details (short) to be displayed here
    const test= {};

    function getSummary(event)
    {
        props.getSummary(props.data.TestID);
        event.preventDefault();
    }
    function viewSubmission(event)
    {
        localStorage.setItem("SID",props.data.SubmissionID);
        if(window.location.port){
            window.location.assign(`http://${window.location.hostname}:${window.location.port}/student/viewSubmission`);
        }
        else
            window.location.assign(`http://${window.location.hostname}/student/viewSubmission`);

    }
    
    return (
                <div className="test shadow-5 pa3 br3 ma5">
                    <label className="db fw6 lh-copy f2">{props.CourseId}</label>
                    <label className="db fw6 lh-copy f5">{props.data.SubmissionID}</label>
                    <label className="db fw6 lh-copy f5">Date : {props.data.Date.substring(0,10)}</label>
                    <label className="db fw6 lh-copy f5">Score : {props.data.Score}</label>
                    {/* <label className="db fw6 lh-copy f3">Date : {props.data.Date.substring(0,10)}</label> */}
                    <input
                        onClick={viewSubmission}
                        className="b br2 ph3 ma2 pv2 input-reset ba white bg-purple grow pointer f6 dib"
                        type="submit"
                        value="View Submission"
                    />
                    {/* <input
                        onClick={getSummary}
                        className="b br2 ph3 ma2 pv2 input-reset ba white bg-dark-gray grow pointer f6 dib"
                        type="submit"
                        value="Get Summary"
                    /> */}
                </div>
    );
}

export default TestItem;