const form = document.getElementById("cddForm");
const tableBody = document.getElementById("cddTableBody");
let isEditing = false; 
let editingId = null; 

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
                            <button class="edit" onclick="prepareEdit(${cdd.id}, '${cdd.codigo}', '${cdd.descricao}', '${cdd.area}')">Editar</button>
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

    if (isEditing) {
        fetch(`http://localhost:3000/cdd/${editingId}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ codigo, descricao, area }),
        }).then(() => {
            resetForm();
            fetchData();
        });
    } else {
        fetch("http://localhost:3000/cdd", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ codigo, descricao, area }),
        }).then(() => {
            resetForm();
            fetchData();
        });
    }
});

const deleteCDD = (id) => {
    fetch(`http://localhost:3000/cdd/${id}`, {
        method: "DELETE",
    }).then(() => fetchData());
};

const prepareEdit = (id, codigo, descricao, area) => {
    document.getElementById("codigo").value = codigo;
    document.getElementById("descricao").value = descricao;
    document.getElementById("area").value = area;

    isEditing = true;
    editingId = id;

    form.querySelector("button[type='submit']").textContent = "Salvar Edição";
};

const resetForm = () => {
    form.reset();
    isEditing = false;
    editingId = null;
    form.querySelector("button[type='submit']").textContent = "Adicionar Livro";
};

fetchData();
