function renderJournals(data = getJournals()) {

    const container =
        document.getElementById("journalContainer");

    if (!container) return;

    container.innerHTML = "";

    if (data.length === 0) {

        container.innerHTML = `
        <div class="journal-item">
            <h3>No Journal Entries Found</h3>
            <p>Create an entry from the Control Room.</p>
        </div>
        `;

        return;

    }

    [...data].reverse().forEach(journal => {

        container.innerHTML += `

        <div class="journal-item">

            <div onclick="toggleJournal(${journal.id})">

                <h3>${journal.title}</h3>

                <p>${journal.date || ""}</p>

            </div>

            <div
            id="journal-${journal.id}"
            class="journal-details">

                <p>
                ${journal.content || ""}
                </p>

            </div>

        </div>

        `;

    });

}

function toggleJournal(id) {

    const journal =
        document.getElementById(`journal-${id}`);

    if (journal) {

        journal.classList.toggle("show");

    }

}

function searchJournals() {

    const keyword =
        document
        .getElementById("searchJournal")
        .value
        .toLowerCase()
        .trim();

    const filtered =
        getJournals().filter(journal =>

            journal.title
                .toLowerCase()
                .includes(keyword)

            ||

            journal.content
                .toLowerCase()
                .includes(keyword)

        );

    renderJournals(filtered);

}

renderJournals();
