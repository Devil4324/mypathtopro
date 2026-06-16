// ====================
// PROJECTS
// ====================

function getProjects() {

    try {

        return JSON.parse(
            localStorage.getItem("projects")
        ) || [];

    } catch {

        return [];

    }

}

function saveProjects(projects) {

    localStorage.setItem(
        "projects",
        JSON.stringify(projects)
    );

}

// ====================
// JOURNALS
// ====================

function getJournals() {

    try {

        return JSON.parse(
            localStorage.getItem("journals")
        ) || [];

    } catch {

        return [];

    }

}

function saveJournals(journals) {

    localStorage.setItem(
        "journals",
        JSON.stringify(journals)
    );

}

// ====================
// SKILLS
// ====================

function getSkills() {

    try {

        return JSON.parse(
            localStorage.getItem("skills")
        ) || {

            linux: 20,
            python: 30,
            cybersecurity: 10,
            networking: 5,
            cloud: 0,
            ai: 0

        };

    } catch {

        return {

            linux: 20,
            python: 30,
            cybersecurity: 10,
            networking: 5,
            cloud: 0,
            ai: 0

        };

    }

}

function saveSkills(skills) {

    localStorage.setItem(
        "skills",
        JSON.stringify(skills)
    );

}
// ====================
// FAILURE LOGS
// ====================

function getFailures() {

    try {

        return JSON.parse(
            localStorage.getItem("failures")
        ) || [];

    } catch {

        return [];

    }

}

function saveFailures(failures) {

    localStorage.setItem(
        "failures",
        JSON.stringify(failures)
    );

}
