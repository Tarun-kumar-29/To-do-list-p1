import './counting.css'
function Counting({ length, completed_task }) {

    return (
        <>
            <div className="task-counter-box">
                <div className="task-counter">
                    <div className="completed-tasks">
                        <span className="number">{completed_task}</span>
                        <span className="label">Completed Tasks /</span>
                        {/* <span className="label"> Out Of</span> */}
                    </div>
                    <div className="total-tasks">
                        <span className="number">{length}</span>
                        <span className="label">Total Tasks</span>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Counting;