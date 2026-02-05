
**CODE 1 - File: **  

[               
       <label for="alterationLevel">Level of difficulty:</label>
                    <select id="alterationLevel-diff" class="alteration-select">
                        <option value="" data-link="" hidden></option>
                        <option value="simple" data-link="">simple</option>
                        <option value="intermediate" data-link="">intermediate</option>
                        <option value="difficult" data-link="">difficult</option>
                    </select>         
]


**ERROR/ISSUE:**
[The label's for attribute doesn't match any element id. This might prevent the browser from correctly autofilling the form and accessibility tools from working correctly.

To fix this issue, make sure the label's for attribute references the correct id of a form field.

**REQUEST:**
fix it
