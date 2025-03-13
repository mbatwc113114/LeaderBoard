/*document.querySelectorAll(".leaderboard-entry").forEach(entry => {
    entry.addEventListener("click", function() {
        expandEntry(this);
    });
});
*/

document.addEventListener("DOMContentLoaded", function() {
    const btn = document.getElementById("something");
   const hid = document.getElementById("hide");
    if (btn) { 

        btn.addEventListener("mouseover", function() {
            let detailsDiv = btn.nextElementSibling; 
            if (hid) { 
                hid.classList.remove("details");
                hid.classList.add("expanded-details");
            }
        });

        btn.addEventListener("mouseout", function() {
            let detailsDiv = btn.nextElementSibling; 
            if (hid) { 
                hid.classList.remove("expanded-details");
                hid.classList.add("details");
            }
        });

    } else {
        console.error("Element with id 'something' not found!");
    }
}); // This is the correct closing brace

