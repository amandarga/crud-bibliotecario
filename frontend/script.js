const form = document.getElementById("cddForm");
const tableBody = document.getElementById("cddTableBody");

const fetchData = () => {
    fetch("http://localhost:3000/cdd")
        .then((res) => res.json())
        .then((data) => {
            tableBody.innerHTML = "";
            data.forEach((cdd) => {
                tableBody.innerHTML += `
                    <tr>
                        <td>${cdd.id}</td>
                        <td>${cdd.codigo}</td>
                        <td>${cdd.descricao}</td>
                        <td>${cdd.area}</td>
                        <td>
                            <button class="edit" onclick="editCDD(${cdd.id}, '${cdd.codigo}', '${cdd.descricao}', '${cdd.area}')">Editar</button>
                            <button class="delete" onclick="deleteCDD(${cdd.id})">Deletar</button>
                        </td>
                    </tr>
                `;
            });
        });
};

form.addEventListener("submit", (e) => {
    e.preventDefault();
    const codigo = document.getElementById("codigo").value;
    const descricao = document.getElementById("descricao").value;
    const area = document.getElementById("area").value;

    fetch("http://localhost:3000/cdd", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ codigo, descricao, area }),
    }).then(() => {
        form.reset();
        fetchData();
    });
});

const deleteCDD = (id) => {
    fetch(`http://localhost:3000/cdd/${id}`, {
        method: "DELETE",
    }).then(() => fetchData());
};

const editCDD = (id, codigo, descricao, area) => {
    document.getElementById("codigo").value = codigo;
    document.getElementById("descricao").value = descricao;
    document.getElementById("area").value = area;

    form.onsubmit = (e) => {
        e.preventDefault();
        fetch(`http://localhost:3000/cdd/${id}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                codigo: document.getElementById("codigo").value,
                descricao: document.getElementById("descricao").value,
                area: document.getElementById("area").value,
            }),
        }).then(() => {
            form.reset();
            form.onsubmit = null;
            form.addEventListener("submit", submitHandler);
            fetchData();
        });
    };
};

const submitHandler = (e) => {
    e.preventDefault();
    const codigo = document.getElementById("codigo").value;
    const descricao = document.getElementById("descricao").value;
    const area = document.getElementById("area").value;

    fetch("http://localhost:3000/cdd", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ codigo, descricao, area }),
    }).then(() => {
        form.reset();
        fetchData();
    });
};

form.addEventListener("submit", submitHandler);

fetchData();
