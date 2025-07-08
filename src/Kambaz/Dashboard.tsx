import { Link } from "react-router-dom";
export default function Dashboard() {
    return (
        <div id="wd-dashboard">
            <h1 id="wd-dashboard-title">Dashboard</h1> <hr />
            <h2 id="wd-dashboard-published">Published Courses (8)</h2> <hr />
            <div id="wd-dashboard-courses">

                <div className="wd-dashboard-course">
                    <Link to="/Kambaz/Courses/1234/Home"
                        className="wd-dashboard-course-link" >
                        <img src="/images/courselogo.jpg" width={200} />
                        <div>
                            <h5> CS1234 React JS </h5>
                            <p className="wd-dashboard-course-title">
                                Full Stack software developer  </p>
                            <button> Go </button>
                        </div>
                    </Link>
                </div>

                <div className="wd-dashboard-course">
                    <Link to="/Kambaz/Courses/2345/Home"
                        className="wd-dashboard-course-link" >
                        <img src="/images/courselogo.jpg" width={200} />
                        <div>
                            <h5> CS2345 Node.js Backend </h5>
                            <p className="wd-dashboard-course-title">
                                Build scalable RESTful APIs </p>
                            <button> Go </button>
                        </div>
                    </Link>
                </div>

                <div className="wd-dashboard-course">
                    <Link to="/Kambaz/Courses/3456/Home"
                        className="wd-dashboard-course-link" >
                        <img src="/images/courselogo.jpg" width={200} />
                        <div>
                            <h5> CS3456 MongoDB </h5>
                            <p className="wd-dashboard-course-title">
                                NoSQL database fundamentals </p>
                            <button> Go </button>
                        </div>
                    </Link>
                </div>

                <div className="wd-dashboard-course">
                    <Link to="/Kambaz/Courses/4567/Home"
                        className="wd-dashboard-course-link" >
                        <img src="/images/courselogo.jpg" width={200} />
                        <div>
                            <h5> CS4567 Express.js </h5>
                            <p className="wd-dashboard-course-title">
                                Server-side JavaScript with Express </p>
                            <button> Go </button>
                        </div>
                    </Link>
                </div>

                <div className="wd-dashboard-course">
                    <Link to="/Kambaz/Courses/5678/Home"
                        className="wd-dashboard-course-link" >
                        <img src="/images/courselogo.jpg" width={200} />
                        <div>
                            <h5> CS5678 HTML & CSS </h5>
                            <p className="wd-dashboard-course-title">
                                Design responsive web pages </p>
                            <button> Go </button>
                        </div>
                    </Link>
                </div>

                <div className="wd-dashboard-course">
                    <Link to="/Kambaz/Courses/6789/Home"
                        className="wd-dashboard-course-link" >
                        <img src="/images/courselogo.jpg" width={200} />
                        <div>
                            <h5> CS6789 TypeScript </h5>
                            <p className="wd-dashboard-course-title">
                                Type-safe JavaScript development </p>
                            <button> Go </button>
                        </div>
                    </Link>
                </div>

                <div className="wd-dashboard-course">
                    <Link to="/Kambaz/Courses/7890/Home"
                        className="wd-dashboard-course-link" >
                        <img src="/images/courselogo.jpg" width={200} />
                        <div>
                            <h5> CS7890 PostgreSQL </h5>
                            <p className="wd-dashboard-course-title">
                                Relational databases and SQL </p>
                            <button> Go </button>
                        </div>
                    </Link>
                </div>

                <div className="wd-dashboard-course">
                    <Link to="/Kambaz/Courses/8901/Home"
                        className="wd-dashboard-course-link" >
                        <img src="/images/courselogo.jpg" width={200} />
                        <div>
                            <h5> CS8901 DevOps Basics </h5>
                            <p className="wd-dashboard-course-title">
                                CI/CD, Docker, and cloud deployment </p>
                            <button> Go </button>
                        </div>
                    </Link>
                </div>

                <div className="wd-dashboard-course">
                </div>
            </div>
        </div>
    );
}