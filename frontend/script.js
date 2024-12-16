const form = document.getElementById("cddForm");
const list = document.getElementById("cddList");

const fetchData = () => {
    fetch("http://localhost:3306/cdd")
        .then((res) => res.json())
        .then((data) => {
            list.innerHTML = "";
            data.forEach((cdd) => {
                list.innerHTML += `<li>${cdd.codigo} - ${cdd.descricao} (${cdd.area})</li>`;
            });
        });
};

form.addEventListener("submit", (e) => {
    e.preventDefault();
    const codigo = document.getElementById("codigo").value;
    const descricao = document.getElementById("descricao").value;
    const area = document.getElementById("area").value;

    fetch("http://localhost:3306/cdd", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ codigo, descricao, area }),
    }).then(() => fetchData());
});

fetchData();
