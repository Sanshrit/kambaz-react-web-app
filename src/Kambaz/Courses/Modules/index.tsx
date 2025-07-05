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
                    <div className="wd-title">Week 1 -  Course Introduction, Syllabus, Agenda</div>
                    <ul className="wd-lessons">
                        <li className="wd-lesson">
                            <span className="wd-title">LEARNING OBJECTIVES</span>
                            <ul className="wd-content">
                                <li className="wd-content-item">Introduction to the course</li>
                                <li className="wd-content-item">Learn what is Web Development</li>
                            </ul>
                        </li>
                    </ul>
                    <ul className="wd-lessons">
                        <li className="wd-lesson">
                            <span className="wd-title">READING</span>
                            <ul className="wd-content">
                                <li className="wd-content-item">Full Stack Developer - Chapter 1 - Introduction</li>
                                <li className="wd-content-item">Full Stack Developer - Chapter 2 - Creating User</li>
                            </ul>
                        </li>
                    </ul>
                    <ul className="wd-lessons">
                        <li className="wd-lesson">
                            <span className="wd-title">SLIDES</span>
                            <ul className="wd-content">
                                <li className="wd-content-item">Introduction to Web Development</li>
                                <li className="wd-content-item">Creating an HTTP server with Node.js</li>
                                <li className="wd-content-item">Creating a React Application</li>
                            </ul>
                        </li>
                    </ul>
                </li>
                <li className="wd-module">
                    <div className="wd-title">Week 2 - HTML Fundamentals and Structure</div>
                    <ul className="wd-lessons">
                        <li className="wd-lesson">
                            <span className="wd-title">LEARNING OBJECTIVES</span>
                            <ul className="wd-content">
                                <li className="wd-content-item">Understand HTML document structure</li>
                                <li className="wd-content-item">Learn basic HTML elements and attributes</li>
                            </ul>
                        </li>
                    </ul>
                    <ul className="wd-lessons">
                        <li className="wd-lesson">
                            <span className="wd-title">READING</span>
                            <ul className="wd-content">
                                <li className="wd-content-item">Full Stack Developer - Chapter 3 - HTML Basics</li>
                                <li className="wd-content-item">Full Stack Developer - Chapter 4 - HTML Elements</li>
                            </ul>
                        </li>
                    </ul>
                    <ul className="wd-lessons">
                        <li className="wd-lesson">
                            <span className="wd-title">SLIDES</span>
                            <ul className="wd-content">
                                <li className="wd-content-item">HTML Document Structure</li>
                                <li className="wd-content-item">Common HTML Elements</li>
                                <li className="wd-content-item">HTML Attributes and Properties</li>
                            </ul>
                        </li>
                    </ul>
                </li>
                <li className="wd-module">
                    <div className="wd-title">Week 3 - CSS Styling and Layout</div>
                    <ul className="wd-lessons">
                        <li className="wd-lesson">
                            <span className="wd-title">LEARNING OBJECTIVES</span>
                            <ul className="wd-content">
                                <li className="wd-content-item">Introduction to CSS and styling concepts</li>
                                <li className="wd-content-item">Learn CSS selectors and properties</li>
                            </ul>
                        </li>
                    </ul>
                    <ul className="wd-lessons">
                        <li className="wd-lesson">
                            <span className="wd-title">READING</span>
                            <ul className="wd-content">
                                <li className="wd-content-item">Full Stack Developer - Chapter 5 - CSS Fundamentals</li>
                                <li className="wd-content-item">Full Stack Developer - Chapter 6 - CSS Layout</li>
                            </ul>
                        </li>
                    </ul>
                    <ul className="wd-lessons">
                        <li className="wd-lesson">
                            <span className="wd-title">SLIDES</span>
                            <ul className="wd-content">
                                <li className="wd-content-item">Introduction to CSS</li>
                                <li className="wd-content-item">CSS Selectors and Specificity</li>
                                <li className="wd-content-item">Box Model and Layout Basics</li>
                            </ul>
                        </li>
                    </ul>
                </li>
            </ul>
        </div>
    );
}