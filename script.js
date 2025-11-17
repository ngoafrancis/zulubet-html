document.getElementById("updated").innerText =
    "Updated: " + new Date().toLocaleString();

async function loadPredictions() {
    try {
        const response = await fetch("predictions.json"); // Or your API endpoint
        const data = await response.json();

        const tbody = document.getElementById("tableBody");
        tbody.innerHTML = "";

        data.forEach(item => {
            const row = `
                <tr>
                    <td>${item.date}</td>
                    <td>${item.match}</td>
                    <td>${item.p1}%</td>
                    <td>${item.px}%</td>
                    <td>${item.p2}%</td>
                    <td>${item.tip}</td>
                    <td>${item.odds1}</td>
                    <td>${item.oddsx}</td>
                    <td>${item.odds2}</td>
                    <td class="ft-green">${item.ft}</td>
                </tr>
            `;
            tbody.innerHTML += row;
        });

    } catch (err) {
        console.error(err);
        document.getElementById("tableBody").innerHTML =
            `<tr><td colspan="10">Failed to load predictions.</td></tr>`;
    }
}

loadPredictions();
