export default function AssignmentEditor() {
    return (
        <div id="wd-assignments-editor">
            <label htmlFor="wd-name">Assignment Name</label> <br />
            <input id="wd-name" value="A1 - ENV + HTML" /><br /><br />
            <textarea id="wd-description">
                The assignment is available online Submit a link to the landing page of
            </textarea>
            <br />
            <table>
                <tr>
                    <td align="right" valign="top">
                        <label htmlFor="wd-points">Points</label>
                    </td>
                    <td>
                        <input id="wd-points" value={100} />
                    </td>
                </tr>
                <br />
                <tr>
                    <td align="right" valign="top">
                        <label htmlFor="wd-group">Assignment Group</label>
                    </td>
                    <td>
                        <select id="wd-group">
                            <option selected value="ASSIGNMENTS">  ASSIGNMENTS         </option>
                            <option value="QUIZZES">           QUIZZES           </option>
                            <option value="EXAMS">           EXAMS           </option>
                            <option value="PROJECT">           PROJECT           </option>
                        </select>
                    </td>
                </tr>
                <br />
                <tr>
                    <td align="right" valign="top">
                        <label htmlFor="wd-display-grade-as">Display Grade as</label>
                    </td>
                    <td>
                        <select id="wd-display-grade-as">
                            <option selected value="PERCENTAGE">  PERCENTAGE         </option>
                            <option value="LETTER">           LETTER           </option>
                        </select>
                    </td>
                </tr>
                <br />
                <tr>
                    <td align="right" valign="top">
                        <label htmlFor="wd-submission-type">Submission Type</label>
                    </td>
                    <td>
                        <select id="wd-submission-type">
                            <option selected value="ONLINE">  Online         </option>
                            <option value="INPERSON">           In-Person           </option>
                        </select><br />

                        <label>Online Entry Options:</label><br />

                        <input type="checkbox" name="check-type" id="wd-text-entry" />
                        <label htmlFor="wd-chkbox-comedy">Text Entry</label><br />

                        <input type="checkbox" name="check-type" id="wd-website-url" />
                        <label htmlFor="wd-chkbox-drama">Website URL</label><br />

                        <input type="checkbox" name="check-type" id="wd-media-recordings" />
                        <label htmlFor="wd-chkbox-scifi">Media Recordings</label><br />

                        <input type="checkbox" name="check-type" id="wd-student-annotation" />
                        <label htmlFor="wd-chkbox-fantasy">Student Annotations</label>

                        <input type="checkbox" name="check-type" id="wd-file-upload" />
                        <label htmlFor="wd-chkbox-fantasy">File Uploads</label>
                    </td>
                </tr>
                <br />
                <tr>
                    <td align="right" valign="top">
                        <label htmlFor="wd-assign-to">Assign</label>
                    </td>
                    <td>
                        <label htmlFor="wd-assign-to">Assign to</label><br />
                        <input id="wd-assign-to" value="Everyone" /><br />
                        <br />

                        <label htmlFor="wd-due-date">Due</label><br />
                        <input type="date" id="wd-due-date" value="2024-09-20" /><br />
                        <br />

                        <tr>
                            <td>
                                <label htmlFor="wd-available-from">Available From</label><br />
                                <input type="date" id="wd-available-from" value="2024-09-20" />
                            </td>
                            <td>
                                <label htmlFor="wd-available-until">Until</label><br />
                                <input type="date" id="wd-available-until" value="2024-09-20" />
                            </td>
                        </tr>
                    </td>
                </tr>
            </table>
        </div>
    );
}

