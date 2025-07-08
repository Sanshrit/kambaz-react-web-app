export default function Lab1() {
    return (
        <div id="wd-lab1">
            <h2>Lab 1</h2>
            <h3>HTML Examples</h3>
            <div id="wd-h-tag">
                <h4>Heading Tags</h4>
                Text documents are often broken up into several sections and subsections. Each section is usually prefaced with a short title or heading that attempts to summarize the topic of the section it precedes. For instance this paragraph is preceded by the heading Heading Tags. The font of the section headings are usually larger and bolder than their subsection headings. This document uses headings to introduce topics such as HTML Documents, HTML Tags, Heading Tags, etc. HTML heading tags can be used to format plain text so that it renders in a browser as large headings. There are 6 heading tags for different sizes: h1, h2, h3, h4, h5, and h6. Tag h1 is the largest heading and h6 is the smallest heading.
            </div>
            <div id="wd-p-tag">
                <h4>Paragraph Tag</h4>
                <p id="wd-p-1">
                    This is a paragraph. We often separate a long set of sentences with vertical spaces to make the text easier to read. Browsers ignore vertical white spaces and render all the text as one single set of sentences. To force the browser to add vertical spacing, wrap the paragraphs you want to separate with the paragraph tag
                </p>
                <p id="wd-p-2">
                    This is the first paragraph. The paragraph tag is used to format vertical gaps between long pieces of text like this one.
                </p>
                <p id="wd-p-3">
                    This is the second paragraph. Even though there is a deliberate white gap between the paragraph above and this paragraph, by default browsers render them as one contiguous piece of text as shown here on the right.
                </p>
                <p id="wd-p-4">
                    This is the third paragraph. Wrap each paragraph with the paragraph tag to tell browsers to render the gaps.
                </p>
            </div>
            <div id="wd-lists">
                <h4>List Tags</h4>
                <h5>Ordered List Tag</h5>
                How to make pancakes:
                <ol id="wd-pancakes">
                    <li>Mix dry ingredients.</li>
                    <li>Add wet ingredients.</li>
                    <li>Stir to combine.</li>
                    <li>Heat a skillet or griddle.</li>
                    <li>Pour batter onto the skillet.</li>
                    <li>Cook until bubbly on top.</li>
                    <li>Flip and cook the other side.</li>
                    <li>Serve and enjoy!</li>
                </ol>
            </div>
            My favorite recipe - French Toast:
            <ol id="wd-your-favorite-recipe">
                <li>Start with collecting eggs, milk, vanilla essence, sugar and cinammon powder.</li>
                <li>Break the eggs into a bowl and whisk them well.</li>
                <li>Add milk, vanilla essence, sugar and cinammon powder to the eggs and whisk until no lumps remain.</li>
                <li>Heat a non-stick pan over medium heat.</li>
                <li>Dip slices of bread into the egg mixture, ensuring they are well coated.</li>
                <li>Place the coated bread slices onto the heated pan.</li>
                <li>Cook until golden brown on both sides, about 2-3 minutes per side.</li>
                <li>Serve hot with maple syrup, powdered sugar,fresh fruit or Nutella.</li>
            </ol>
            <h5>Unordered List Tag</h5>
            My favorite books (in no particular order)
            <ul id="wd-my-books">
                <li>Dune</li>
                <li>Lord of the Rings</li>
                <li>Ender's Game</li>
                <li>Red Mars</li>
                <li>The Forever War</li>
            </ul>
            Your favorite books (in no particular order)
            <ul id="wd-your-books">
                <li>Magnus Chase</li>
                <li>The Diary of a Wimpy Kid</li>
                <li>The Girl on the Train</li>
                <li>Harry Potter</li>
            </ul>
            <div id="wd-tables">
                <h4>Table Tag</h4>
                <table border={1} width="100%">
                    <thead>
                        <tr>
                            <th>Quiz</th>
                            <th>Topic</th>
                            <th>Date</th>
                            <th>Grade</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>Q1</td>
                            <td>HTML</td>
                            <td>2/3/21</td>
                            <td>85</td>
                        </tr>
                        <tr>
                            <td>Q2</td>
                            <td>CSS</td>
                            <td>2/10/21</td>
                            <td>90</td>
                        </tr>
                        <tr>
                            <td>Q3</td>
                            <td>JavaScript</td>
                            <td>2/17/21</td>
                            <td>95</td>
                        </tr>
                        <tr>
                            <td>Q4</td>
                            <td>React</td>
                            <td>2/24/21</td>
                            <td>85</td>
                        </tr>
                        <tr>
                            <td>Q5</td>
                            <td>Node.js</td>
                            <td>3/3/21</td>
                            <td>90</td>
                        </tr>
                        <tr>
                            <td>Q6</td>
                            <td>Express</td>
                            <td>3/10/21</td>
                            <td>95</td>
                        </tr>
                        <tr>
                            <td>Q7</td>
                            <td>MongoDB</td>
                            <td>3/17/21</td>
                            <td>90</td>
                        </tr>
                        <tr>
                            <td>Q8</td>
                            <td>GraphQL</td>
                            <td>3/24/21</td>
                            <td>90</td>
                        </tr>
                        <tr>
                            <td>Q9</td>
                            <td>TypeScript</td>
                            <td>3/31/21</td>
                            <td>95</td>
                        </tr>
                        <tr>
                            <td>Q10</td>
                            <td>Web Development</td>
                            <td>4/7/21</td>
                            <td>85</td>
                        </tr>

                    </tbody>
                    <tfoot>
                        <tr>
                            <td colSpan={3}>Average</td>
                            <td>90</td>
                        </tr>
                    </tfoot>
                </table>
            </div>
            <div id="wd-images">
                <h4>Image tag</h4>
                Loading an image from the internet: <br />
                <img id="wd-starship" width="400px" src="https://www.staradvertiser.com/wp-content/uploads/2021/08/web1_Starship-gap2.jpg" />
                <br />
                Loading a local image:
                <br />
                <img id="wd-teslabot" src="/images/teslabot.jpg" height="200px" />
            </div>
            <div id="wd-forms">
                <h4>Form Elements</h4>
                <form id="wd-text-fields">
                    <h5>Text Fields</h5>
                    <label htmlFor="wd-text-fields-username">Username:</label>
                    <input placeholder="jdoe" id="wd-text-fields-username" /> <br />
                    <label htmlFor="wd-text-fields-password">Password:</label>
                    <input type="password" defaultValue="123@#$asd" id="wd-text-fields-password" />
                    <br />
                    <label htmlFor="wd-text-fields-first-name">First name:</label>
                    <input type="text" title="John" id="wd-text-fields-first-name" /> <br />
                    <label htmlFor="wd-text-fields-last-name">Last name:</label>
                    <input type="text" placeholder="Doe"
                        defaultValue="Wonderland"
                        title="The last name"
                        id="wd-text-fields-last-name" />
                    <h5>Text boxes</h5>
                    <label>Biography:</label><br />
                    <textarea id="wd-textarea" cols={30} rows={10}>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis eu enim turpis. Vivamus non vulputate ligula. Duis feugiat nunc vitae augue hendrerit, in pellentesque arcu posuere. Aenean est velit, viverra vel mauris eget, condimentum maximus tellus. Mauris sit amet mauris scelerisque, malesuada nunc ut, pharetra massa. Cras auctor dolor metus, vel consequat tellus mollis ornare. Nunc sed venenatis sem, iaculis vulputate eros. Cras lacus massa, convallis ac vehicula a, luctus eu eros.

                        Etiam in arcu ac odio auctor ullamcorper vitae ac erat. Duis gravida consequat arcu a placerat. Proin venenatis nunc non nibh mollis accumsan. Ut dictum risus quis lectus gravida eleifend. Nunc consectetur nunc diam, sit amet laoreet turpis lobortis quis. Nulla vel arcu quam. Duis quis porttitor lacus. Morbi vehicula ligula quis convallis accumsan. Nam accumsan, sapien nec hendrerit tempus, eros odio eleifend nibh, eu porttitor erat enim eget urna. Praesent a turpis tincidunt, euismod lectus elementum, vehicula nulla.

                        Curabitur varius vitae est sit amet consectetur. Nulla facilisi. Suspendisse sit amet lorem odio. Vestibulum imperdiet porttitor augue sed sodales. Sed tincidunt risus ut urna gravida, scelerisque interdum mauris finibus. Nullam ligula est, placerat eu imperdiet sed, sagittis sit amet arcu. Nullam mattis iaculis scelerisque. Etiam sit amet imperdiet purus. In vulputate viverra eros, nec egestas ante aliquet id. Duis vitae tellus rutrum, pellentesque lorem vitae, pulvinar enim. Nunc vel consectetur leo.

                        Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Sed fermentum nec dui ac dictum. Vestibulum non nisl ac lacus cursus imperdiet vel ullamcorper nunc. Cras ac pulvinar mauris, eget semper urna. Phasellus ultrices magna eu consequat pretium. Interdum et malesuada fames ac ante ipsum primis in faucibus. Phasellus ut libero augue. Praesent justo purus, tempor eget ante at, tincidunt euismod urna. Fusce nibh orci, sodales in consectetur et, molestie vel ante.

                        Aliquam orci urna, malesuada sed ipsum non, accumsan maximus arcu. Phasellus est ipsum, rutrum non eros id, imperdiet semper arcu. Duis est massa, aliquam non purus pulvinar, rutrum ultrices purus. Donec tristique augue turpis, et malesuada est venenatis eget. Maecenas eu nisl ac est euismod pretium. Ut vel felis finibus, bibendum mauris sit amet, mollis metus. Curabitur quis lobortis nulla, et pretium enim. Nulla facilisi. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Ut ullamcorper nunc augue, pellentesque tincidunt ipsum commodo ut.</textarea>

                    <h5 id="wd-buttons">Buttons</h5>
                    <button type="button"
                        onClick={() => alert("Life is Good!")}
                        id="wd-all-good">
                        Hello World!
                    </button>


                    <h5>File upload</h5>
                    <input id="wd-upload-button" type="file" />

                    <h5 id="wd-radio-buttons">Radio buttons</h5>

                    <label>Favorite movie genre:</label><br />

                    <input type="radio" name="radio-genre" id="wd-radio-comedy" />
                    <label htmlFor="wd-radio-comedy">Comedy</label><br />

                    <input type="radio" name="radio-genre" id="wd-radio-drama" />
                    <label htmlFor="wd-radio-drama">Drama</label><br />

                    <input type="radio" name="radio-genre" id="wd-radio-scifi" />
                    <label htmlFor="wd-radio-scifi">Science Fiction</label><br />
                    <input type="radio" name="radio-genre" id="wd-radio-fantasy" />
                    <label htmlFor="wd-radio-fantasy">Fantasy</label>

                    <h5 id="wd-checkboxes">Checkboxes</h5>
                    <label>Favorite movie genre:</label><br />

                    <input type="checkbox" name="check-genre" id="wd-chkbox-comedy" />
                    <label htmlFor="wd-chkbox-comedy">Comedy</label><br />

                    <input type="checkbox" name="check-genre" id="wd-chkbox-drama" />
                    <label htmlFor="wd-chkbox-drama">Drama</label><br />

                    <input type="checkbox" name="check-genre" id="wd-chkbox-scifi" />
                    <label htmlFor="wd-chkbox-scifi">Science Fiction</label><br />

                    <input type="checkbox" name="check-genre" id="wd-chkbox-fantasy" />
                    <label htmlFor="wd-chkbox-fantasy">Fantasy</label>

                    <h4 id="wd-dropdowns">Dropdowns</h4>

                    <h5>Select one</h5>
                    <label htmlFor="wd-select-one-genre"> Favorite movie genre: </label><br />
                    <select id="wd-select-one-genre">
                        <option value="COMEDY">Comedy</option>
                        <option value="DRAMA">Drama</option>
                        <option selected value="SCIFI">
                            Science Fiction</option>
                        <option value="FANTASY">Fantasy</option>
                    </select>

                    <h5>Select many</h5>
                    <label htmlFor="wd-select-many-genre"> Favorite movie genres: </label><br />
                    <select multiple id="wd-select-many-genre">
                        <option value="COMEDY" selected> Comedy          </option>
                        <option value="DRAMA">           Drama           </option>
                        <option value="SCIFI" selected> Science Fiction </option>
                        <option value="FANTASY">         Fantasy         </option>
                    </select>

                    <h4>Other HTML field types</h4>

                    <label htmlFor="wd-text-fields-email"> Email: </label>
                    <input type="email"
                        placeholder="jdoe@somewhere.com"
                        id="wd-text-fields-email" /><br />

                    <label htmlFor="wd-text-fields-salary-start"> Starting salary:</label>
                    <input type="number"
                        defaultValue="100000"
                        placeholder="1000"
                        id="wd-text-fields-salary-start" /><br />

                    <label htmlFor="wd-text-fields-rating"> Rating: </label>
                    <input type="range"
                        defaultValue="4"
                        max="5"
                        placeholder="Doe"
                        id="wd-text-fields-rating" /><br />

                    <label htmlFor="wd-text-fields-dob"> Date of birth: </label>
                    <input type="date"
                        defaultValue="2000-01-21"
                        id="wd-text-fields-dob" /><br />
                </form>
            </div>
            <h4>Anchor tag</h4>
            Please <a href="https://www.lipsum.com" id="wd-lipsum">click here</a> to get dummy text<br />
            <h4>Link to Github</h4>
            Please <a href="https://github.com/Sanshrit/kambaz-react-web-app" id="wd-github">click here</a> to access the code repository<br />
        </div>
    );
}
