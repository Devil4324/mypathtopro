function checkLogin() {

    const password =
        document.getElementById("password").value;

    if (login(password)) {

        document.getElementById("loginBox")
            .style.display = "none";

        document.getElementById("dashboard")
            .classList.remove("hidden");

    } else {

        alert("Wrong Password");

    }

}

function showSection(id) {

    const sections = [
        "projectForm",
        "journalForm",
        "manageProjects",
        "manageJournals",
       "editProjectForm",
        "editJournalForm",
       "failureForm",
       "manageFailures",
      "editFailureForm",
    ];

    sections.forEach(section => {

        const el =
            document.getElementById(section);

        if (el) {

            el.classList.add("hidden");

        }

    });

    const target =
        document.getElementById(id);

    if (target) {

        target.classList.remove("hidden");

    }

    loadProjects();

loadJournals();

if(typeof loadFailures === "function"){
    loadFailures();
}

if(typeof loadSkillsManager === "function"){
    loadSkillsManager();
}

}

// ====================
// SAVE PROJECT
// ====================

function saveProject() {

    const title =
        document.getElementById("projectTitle").value.trim();

    const description =
        document.getElementById("projectDescription").value.trim();

    const github =
        document.getElementById("projectGithub").value.trim();

    if (!title || !description) {

        alert("Please fill all required fields.");
        return;

    }

    const projects = getProjects();

    projects.push({

        id: Date.now(),

        date: new Date().toLocaleDateString(
            "en-GB",
            {
                day: "2-digit",
                month: "short",
                year: "numeric"
            }
        ),

        title: title,

        description: description,

        github: github

    });

    saveProjects(projects);

    document.getElementById("projectTitle").value = "";
    document.getElementById("projectDescription").value = "";
    document.getElementById("projectGithub").value = "";

    document.getElementById("projectForm")
        .classList.add("hidden");

    alert("Project Saved");

}

// ====================
// SAVE JOURNAL
// ====================

function saveJournal() {

    const title =
        document.getElementById("journalTitle").value.trim();

    const content =
        document.getElementById("journalContent").value.trim();

    if (!title || !content) {

        alert("Please fill all required fields.");
        return;

    }

    const journals = getJournals();

    journals.push({

        id: Date.now(),

        date: new Date().toLocaleDateString(
            "en-GB",
            {
                day: "2-digit",
                month: "short",
                year: "numeric"
            }
        ),

        title: title,

        content: content

    });

    saveJournals(journals);

    document.getElementById("journalTitle").value = "";
    document.getElementById("journalContent").value = "";

    document.getElementById("journalForm")
        .classList.add("hidden");

    alert("Journal Saved");

}

// ====================
// LOAD PROJECTS
// ====================

function loadProjects() {

    const list =
        document.getElementById("projectList");

    if (!list) return;

    list.innerHTML = "";

    const projects = getProjects();

    if (projects.length === 0) {

        list.innerHTML =
            "<p>No projects found.</p>";

        return;

    }

    projects.reverse().forEach(project => {

        list.innerHTML += `

        <div style="
        padding:15px;
        margin-bottom:10px;
        border:1px solid rgba(255,255,255,.1);
        border-radius:10px;">

            <b>${project.title}</b>

            <br>

            <small>${project.date || ""}</small>

            <br><br>

            <button
onclick="editProject(${project.id})">

Edit

</button>

<button
onclick="deleteProject(${project.id})">

Delete

</button>

        </div>

        `;

    });

}

// ====================
// DELETE PROJECT
// ====================

function deleteProject(id) {

    if (!confirm("Delete this project?"))
        return;

    const projects =
        getProjects().filter(
            project => project.id !== id
        );

    saveProjects(projects);

    loadJournals();loadProjects();

}

// ====================
// LOAD JOURNALS
// ====================

function loadJournals() {

    const list =
        document.getElementById("journalList");

    if (!list) return;

    list.innerHTML = "";

    const journals = getJournals();

    if (journals.length === 0) {

        list.innerHTML =
            "<p>No journals found.</p>";

        return;

    }

    journals.reverse().forEach(journal => {

        list.innerHTML += `

        <div style="
        padding:15px;
        margin-bottom:10px;
        border:1px solid rgba(255,255,255,.1);
        border-radius:10px;">

            <b>${journal.title}</b>

            <br>

            <small>${journal.date || ""}</small>

            <br><br>

           <button
onclick="editJournal(${journal.id})">

Edit

</button>

<button
onclick="deleteJournal(${journal.id})">

Delete

</button>

        </div>

        `;

    });

}

// ====================
// DELETE JOURNAL
// ====================

function deleteJournal(id) {

    if (!confirm("Delete this journal?"))
        return;

    const journals =
        getJournals().filter(
            journal => journal.id !== id
        );

    saveJournals(journals);

    loadJournals();

}

// ====================
// EDIT PROJECT
// ====================

function editProject(id){

const project =
getProjects().find(
p => p.id === id
);

if(!project) return;

showSection(
"editProjectForm"
);

document.getElementById(
"editProjectId"
).value = project.id;

document.getElementById(
"editProjectTitle"
).value = project.title;

document.getElementById(
"editProjectDescription"
).value = project.description;

document.getElementById(
"editProjectGithub"
).value = project.github || "";

}

function updateProject(){

const id =
Number(
document.getElementById(
"editProjectId"
).value
);

const projects =
getProjects();

const project =
projects.find(
p => p.id === id
);

if(!project) return;

project.title =
document.getElementById(
"editProjectTitle"
).value;

project.description =
document.getElementById(
"editProjectDescription"
).value;

project.github =
document.getElementById(
"editProjectGithub"
).value;

saveProjects(projects);

alert("Project Updated");

showSection(
"manageProjects"
);

}

// ====================
// EDIT JOURNAL
// ====================

function editJournal(id){

const journal =
getJournals().find(
j => j.id === id
);

if(!journal) return;

showSection(
"editJournalForm"
);

document.getElementById(
"editJournalId"
).value = journal.id;

document.getElementById(
"editJournalTitle"
).value = journal.title;

document.getElementById(
"editJournalContent"
).value = journal.content;

}

function updateJournal(){

const id =
Number(
document.getElementById(
"editJournalId"
).value
);

const journals =
getJournals();

const journal =
journals.find(
j => j.id === id
);

if(!journal) return;

journal.title =
document.getElementById(
"editJournalTitle"
).value;

journal.content =
document.getElementById(
"editJournalContent"
).value;

saveJournals(journals);

alert("Journal Updated");

showSection(
"manageJournals"
);

}
function saveFailure(){

    const mistake =
        document.getElementById(
            "failureMistake"
        ).value.trim();

    const fix =
        document.getElementById(
            "failureFix"
        ).value.trim();

    const lesson =
        document.getElementById(
            "failureLesson"
        ).value.trim();

    if(!mistake || !fix || !lesson){

        alert(
            "Fill all fields."
        );

        return;

    }

    const failures =
        getFailures();

    failures.push({

        id: Date.now(),

        date: new Date().toLocaleDateString(
            "en-GB",
            {
                day:"2-digit",
                month:"short",
                year:"numeric"
            }
        ),

        mistake,
        fix,
        lesson

    });

    saveFailures(failures);

    document.getElementById(
        "failureMistake"
    ).value = "";

    document.getElementById(
        "failureFix"
    ).value = "";

    document.getElementById(
        "failureLesson"
    ).value = "";

    alert("Failure Log Saved");

    document
        .getElementById(
            "failureForm"
        )
        .classList.add(
            "hidden"
        );

}


function loadFailures(){

const list =
document.getElementById(
"failureList"
);

if(!list) return;

list.innerHTML = "";

const failures =
getFailures();

if(failures.length === 0){

list.innerHTML =
"<p>No failure logs found.</p>";

return;

}

failures.reverse().forEach(failure=>{

list.innerHTML += `

<div style="
padding:15px;
margin-bottom:10px;
border:1px solid rgba(255,255,255,.1);
border-radius:10px;">

<b>${failure.date}</b>

<br><br>

<button
onclick="editFailure(${failure.id})">

Edit

</button>

<button
onclick="deleteFailure(${failure.id})">

Delete

</button>

</div>

`;

});

}


function editFailure(id){

const failure =
getFailures().find(
f => f.id === id
);

if(!failure) return;

showSection(
"editFailureForm"
);

document.getElementById(
"editFailureId"
).value = failure.id;

document.getElementById(
"editFailureMistake"
).value = failure.mistake;

document.getElementById(
"editFailureFix"
).value = failure.fix;

document.getElementById(
"editFailureLesson"
).value = failure.lesson;

}
function deleteFailure(id){

if(
!confirm(
"Delete this failure log?"
)
) return;

const failures =
getFailures().filter(
failure =>
failure.id !== id
);

saveFailures(
failures
);

loadFailures();

}function updateFailure(){

const id =
Number(
document.getElementById(
"editFailureId"
).value
);

const failures =
getFailures();

const failure =
failures.find(
f => f.id === id
);

if(!failure) return;

failure.mistake =
document.getElementById(
"editFailureMistake"
).value;

failure.fix =
document.getElementById(
"editFailureFix"
).value;

failure.lesson =
document.getElementById(
"editFailureLesson"
).value;

saveFailures(
failures
);

alert(
"Failure Updated"
);

showSection(
"manageFailures"
);

}
function loadSkillsManager(){

const skills = getSkills();

document.getElementById(
"linuxSkill"
).value = skills.linux || 0;

document.getElementById(
"pythonSkill"
).value = skills.python || 0;

document.getElementById(
"cyberSkill"
).value = skills.cybersecurity || 0;

document.getElementById(
"networkSkill"
).value = skills.networking || 0;

document.getElementById(
"cloudSkill"
).value = skills.cloud || 0;

}

function saveSkillsManager(){

const skills = {

linux: Number(
document.getElementById(
"linuxSkill"
).value
),

python: Number(
document.getElementById(
"pythonSkill"
).value
),

cybersecurity: Number(
document.getElementById(
"cyberSkill"
).value
),

networking: Number(
document.getElementById(
"networkSkill"
).value
),

cloud: Number(
document.getElementById(
"cloudSkill"
).value
)

};

saveSkills(skills);

alert("Skills Updated");

}
