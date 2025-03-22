function renderTeams(data) {
    console.log("✅ Rendering teams:", data);

    leaderboardContainer.innerHTML = `
        <div class="leaderboard-header">
            <span class="rank-header">Rank</span>
            <span class="name-header">Team Name</span>
            <span class="points-header">Points</span>
        </div>
    `;

    // Convert object to array and compute total points
    const teamsArray = Object.entries(data).map(([id, value]) => {
        const roboraceScore = Number(value.roboraceScore) || 0;
        const robowarScore = Number(value.robowarScore) || 0;
        const totalPoints = roboraceScore + robowarScore;

        return {
            id,
            name: value.teamName || "Unknown Team",
            roboraceScore,
            roboraceTime: value.roboraceTime || "--",
            robowarScore,
            robowarTime: value.robowarTime || "--",
            totalPoints,
        };
    });

    // Sort in descending order based on total points
    teamsArray.sort((a, b) => b.totalPoints - a.totalPoints);

    console.log("🔢 Sorted teams array:", teamsArray);

    let currentRank = 1; // Start ranking from 1
    let previousPoints = null; // To handle ranking for ties

    teamsArray.forEach((team, index) => {
        // If points are the same as the previous team, maintain rank
        if (team.totalPoints !== previousPoints) {
            currentRank = index + 1; // Update rank only if points change
        }

        previousPoints = team.totalPoints; // Store the last team's points

        const entryDiv = document.createElement("div");
        entryDiv.classList.add("leaderboard-entry");

        entryDiv.innerHTML = `
            <div class="elements-inside">
                <span class="rank">${currentRank}</span> 
                <span class="name">${team.name}</span>
                <span class="points">${team.totalPoints}</span>
            </div>
            <div class="details" id="hide">
                <div class="robo-race">
                    <img src="resources/roborace.png" alt="Robo Race" class="race">
                    <hr>
                    <p>Best Time: <span class="race-time">${team.roboraceTime}</span></p>
                    <p>Points: <span class="race-points">${team.roboraceScore}</span></p>
                </div>
                <div class="robo-war">
                    <img src="resources/robowar.png" alt="robo war" class="war">
                    <hr>
                    <table class="robo-table">
                        <tr>
                            <th>M.No</th>
                            <th>Best Time</th>
                            <th>Points</th>
                        </tr>
                        <tr>
                            <td class="match-number">1</td>
                            <td class="best-time">${team.robowarTime}</td>
                            <td class="war-points">${team.robowarScore}</td>
                        </tr>
                    </table>
                </div>
            </div>  
        `;

        leaderboardContainer.appendChild(entryDiv);
    });
}
