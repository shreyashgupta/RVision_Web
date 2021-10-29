import React from "react";

function TestItem (props)
{
    //fetch the test details (short) to be displayed here
    const test= {};

    function onClickFunction(event)
    {
        props.updateTest(props.data.TestID);
        event.preventDefault();

    //     const testType= {};//make query from test table 
    //     const summary={};//make query from the submission table
    //    setTest ({
    //         id: testType.testID,
    //         date: testType.date,
    //         duration: testType.duration,
    //         score: testType.score,
    //         maxScore: summary.maxScore,
    //         minScore:  summary.minScore,
    //         avgScore: summary.averageScore,
    //         attemptedBy: summary.count
    //     });
        
    }
    
    return (
                <div className="test shadow-5 pa3 br3 ma5">
                    <label className="db fw6 lh-copy f2">{props.data.CourseId}</label>
                    <label className="db fw6 lh-copy f5">{props.data.TestID}</label>
                    <label className="db fw6 lh-copy f3">Semester : {props.data.Semester}</label>
                    <label className="db fw6 lh-copy f3">Date : {props.data.Date.substring(0,10)}</label>
                    <input
                        onClick={onClickFunction}
                        className="b br2 ph3 pv2 input-reset ba white bg-purple grow pointer f6 dib submit"
                        type="submit"
                        value="Fetch"
                    />
                </div>
    );
}

export default TestItem;