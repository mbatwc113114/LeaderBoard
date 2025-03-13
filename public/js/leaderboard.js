/*document.querySelectorAll(".leaderboard-entry").forEach(entry => {
    entry.addEventListener("click", function() {
        expandEntry(this);
    });
});
*/

document.addEventListener("DOMContentLoaded", function () {
    const btn = document.getElementById("something");
    const hid = document.getElementById("hide");

    if (btn && hid) {
        btn.addEventListener("mouseover", function () {
            hid.classList.add("active"); // Apply expansion
        });

        btn.addEventListener("mouseout", function () {
            hid.classList.remove("active"); // Remove expansion
        });
    } else {
        console.error("Element with id 'something' or 'hide' not found!");
    }
});
