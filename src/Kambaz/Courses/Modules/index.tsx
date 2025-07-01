export default function Modules() {
    return (
        <div>
            {/* Implement Collapse All button, View Progress button, etc. */}
            <button type="button"
                id="wd-collapse-all" >
                Collapse All
            </button>{' '}
            <button type="button"
                id="wd-view-progress">
                View Progress
            </button>{' '}
            <select id="wd-select-publish">
                <option selected value="COMEDY"> Publish All          </option>
                <option value="Select">           Select           </option>
            </select>{' '}
            <button type="button"
                id="wd-add-module">
                + Module
            </button>
            <ul id="wd-modules">
                <li className="wd-module">
                    <div className="wd-title">Week 1</div>
                    <ul className="wd-lessons">
                        <li className="wd-lesson">
                            <span className="wd-title">LEARNING OBJECTIVES</span>
                            <ul className="wd-content">
                                <li className="wd-content-item">Introduction to the course</li>
                                <li className="wd-content-item">Learn what is Web Development</li>
                            </ul>
                        </li>
                    </ul>
                </li>
                <li className="wd-module">
                    <div className="wd-title">Week 2</div>
                </li>
                <li className="wd-module">
                    <div className="wd-title">Week 3</div>
                </li>
            </ul>
        </div>
    );
}
