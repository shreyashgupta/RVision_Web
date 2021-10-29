import react, {useState} from "react";

export default function SubmissionSummary (props)
{
    //featch the test date and total score
    let t = {};

    function viewSubmissionData(event)
    {
        //redirect to the test data page passing in testID as testID={testID of this document}
        event.preventDefault();//remove if not required
    }

    return (
        <div>
            <p>Test ID: {props.testID}</p>
            <p>Test Date: {t.date}</p>
            <p>Total Score: {t.score}</p>
            <p>Obtained Score: {t.obtainedScore}</p>
            <button onClick={viewSubmissionData}>VIEW</button>
        </div>
    );
}