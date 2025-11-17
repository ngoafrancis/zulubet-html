async function loadPredictions() {
    try {
        const response = await fetch("https://raw.githubusercontent.com/ngoafrancis/zulubet-html/main/zulubet_predictions.json");
        const data = await response.json();

        document.getElementById("updated-time").textContent =
            "Updated: " + new Date().toLocaleString();

        const tbody = document.querySelector("#predictions-table tbody");
        tbody.innerHTML = "";

        data.forEach(match => {
            // Determine TIP badge color
            let badgeClass = "";
            if (match.tip === "1") badgeClass = "win";
            else if (match.tip === "X") badgeClass = "draw";
            else badgeClass = "lose";

            const row = `
                <tr>
                    <td>${match.date}</td>
                    <td class="match">${match.home} vs ${match.away}</td>
                    <td>${match.home_percent}%</td>
                    <td>${match.draw_percent}%</td>
                    <td>${match.away_percent}%</td>
                    <td><span class="badge ${badgeClass}">${match.tip}</span></td>
                </tr>
            `;

            tbody.insertAdjacentHTML("beforeend", row);
        });

    } catch (error) {
        document.getElementById("updated-time").textContent = "Failed to load predictions.";
        console.error("Error loading predictions:", error);
    }
}

loadPredictions();
