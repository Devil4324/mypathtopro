function renderProjects(data = getProjects()) {

    const container =
        document.getElementById("projectsContainer");

    if (!container) return;

    container.innerHTML = "";

    if (data.length === 0) {

        container.innerHTML = `
        <div class="project-item">
            <h3>No Projects Found</h3>
            <p>Add a project from Control Room.</p>
        </div>
        `;

        return;

    }

    [...data].reverse().forEach(project => {

        container.innerHTML += `

        <div class="project-item">

            <div onclick="toggleProject(${project.id})">

                <h3>${project.title}</h3>

                <p>${project.date || ""}</p>

            </div>

            <div
            id="project-${project.id}"
            class="project-details">

                <p>
                ${project.description || ""}
                </p>

                ${project.github ? `

                <a
                href="${project.github}"
                target="_blank"
                class="github-link">

                Source Code

                </a>

                ` : ""}

            </div>

        </div>

        `;

    });

}

function toggleProject(id) {

    const project =
        document.getElementById(`project-${id}`);

    if (project) {

        project.classList.toggle("show");

    }

}

function searchProjects() {

    const keyword =
        document
        .getElementById("searchProject")
        .value
        .toLowerCase()
        .trim();

    const filtered =
        getProjects().filter(project =>

            project.title
                .toLowerCase()
                .includes(keyword)

            ||

            project.description
                .toLowerCase()
                .includes(keyword)

        );

    renderProjects(filtered);

}

renderProjects();
