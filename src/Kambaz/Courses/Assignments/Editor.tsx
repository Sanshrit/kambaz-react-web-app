export default function AssignmentEditor() {
    return (
        <div id="wd-assignments-editor">
            <label htmlFor="wd-name">Assignment Name</label> <br />
            <input id="wd-name" defaultValue="A1 - ENV + HTML" /><br /><br />
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
                        <input id="wd-points" type="number" defaultValue={100} />
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
                        <label htmlFor="wd-text-entry">Text Entry</label><br />

                        <input type="checkbox" name="check-type" id="wd-website-url" />
                        <label htmlFor="wd-website-url">Website URL</label><br />

                        <input type="checkbox" name="check-type" id="wd-media-recordings" />
                        <label htmlFor="wd-media-recordings">Media Recordings</label><br />

                        <input type="checkbox" name="check-type" id="wd-student-annotation" />
                        <label htmlFor="wd-student-annotation">Student Annotations</label>

                        <input type="checkbox" name="check-type" id="wd-file-upload" />
                        <label htmlFor="wd-file-upload">File Uploads</label>
                    </td>
                </tr>
                <br />
                <tr>
                    <td align="right" valign="top">
                        <label htmlFor="wd-assign-to">Assign</label>
                    </td>
                    <td>
                        <label htmlFor="wd-assign-to">Assign to</label><br />
                        <input id="wd-assign-to" defaultValue="Everyone" /><br />
                        <br />

                        <label htmlFor="wd-due-date">Due</label><br />
                        <input type="date" id="wd-due-date" defaultValue="2024-09-20" /><br />
                        <br />

                        <tr>
                            <td>
                                <label htmlFor="wd-available-from">Available From</label><br />
                                <input type="date" id="wd-available-from" defaultValue="2024-09-10" />
                            </td>
                            <td>
                                <label htmlFor="wd-available-until">Until</label><br />
                                <input type="date" id="wd-available-until" defaultValue="2024-09-25" />
                            </td>
                        </tr>
                    </td>
                </tr>
            </table>
            <hr />
            <table width="100%">
                <tr>
                    <td align="right">
                        <button type="button">Cancel</button>{' '} 
                        <button type="button">Save</button>
                    </td>
                </tr>
            </table>
        </div>
    );
}

