document.getElementById("login-btn").addEventListener("click", async function(event) {
    event.preventDefault(); 

    var username = document.getElementById("username").value;
    var password = document.getElementById("password").value;

    const login = {
        Username: username,
        Password: password,
    };

    try {
        const baseUrl = "https://localhost:7168/Admin/Login"; 
        const res = await fetch(baseUrl, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(login),
        });

        if (res.ok) {
            window.location.href = "admin_dash.html";
        } else {
            alert(await res.text()); 
        }
    } catch (err) {
        console.error(err);
        alert("An error occurred during login.");
    }
});
 