const url = "https://raw.githubusercontent.com/ngoafrancis/zulubet-html/main/zulubet_predictions.json";

async function loadPredictions() {
    try {
        const res = await fetch(url);
        const data = await res.json();

        document.getElementById("updatedTime").innerHTML =
            "Updated: " + new Date().toLocaleString();

        const tbody = document.getElementById("tableBody");
        tbody.innerHTML = "";

        data.forEach(match => {
            const max = Math.max(match.home_percent, match.draw_percent, match.away_percent);

            function colorCell(p) {
                return `<span class="percent ${p === max ? 'green' : ''}">${p}%</span>`;
            }

            tbody.innerHTML += `
                <tr>
                    <td>${match.date}</td>

                    <td>
                        <img src="${match.flag}" class="team-flag">
                        <a class="team-link" href="#">${match.home} - ${match.away}</a>
                    </td>

                    <td>${colorCell(match.home_percent)}</td>
                    <td>${colorCell(match.draw_percent)}</td>
                    <td>${colorCell(match.away_percent)}</td>

                    <td class="tip">${match.tip}</td>

                    <td>${match.home_odd}</td>
                    <td>${match.draw_odd}</td>
                    <td>${match.away_odd}</td>

                    <td><span class="percent green">${match.result}</span></td>
                </tr>
            `;
        });

    } catch (e) {
        document.getElementById("tableBody").innerHTML =
            `<tr><td colspan="10" style="color:red;">Failed to load predictions.</td></tr>`;
    }
}

loadPredictions();
