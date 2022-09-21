const dragArea = document.querySelector(".dragArea");
const dragText = dragArea.querySelector("p");
const button = dragArea.querySelector('button');
const input = dragArea.querySelector("#input-file");

button.addEventListener("click", (e) => {
    input.click();
});

input.addEventListener("change", (e) =>{
    files = input.files;
    dragArea.classList.add("active");
    showFile(files);
    dragArea.classList.remove("active");
});

dragArea.addEventListener("dragover", e =>{
    e.preventDefault();
    dragArea.classList.add("active");
    dragText.textContent = "Suelta para subir las fotos";
});

dragArea.addEventListener("dragleave", e =>{
    e.preventDefault();
    dragArea.classList.remove("active");
    dragText.textContent = "Arrastrar y soltar fotos aqui";
});

dragArea.addEventListener("drop", e =>{
    e.preventDefault();
    files = e.dataTransfer.files;
    showFiles(files);
    dragArea.classList.remove("active");
    dragText.textContent = "Arrastrar y soltar fotos aqui";
});

function showFiles(files) {
    if(files.length === undefined) {
        processFile(files);
    }else{
        for(const file of files){
            processFile(file);
        }
    }
}

function processFile(file) {
    const docType = file.type;
    const validExtensions = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif'];

    if(validExtensions.includes(docType)){
        const fileReader = new FileReader();
        const id = `file-${Math.random().toString(32).substring(7)}`;

        fileReader.addEventListener('load', e =>{
        const fileUrl = fileReader.result;
        const image = `
        <div id="${id}" class="file-container"> 
            <img src="${fileUrl}" alt="${file.name}" width="50px">
            <div class="status">
                <span>${file.name}</span>
                <span class="status-text">Loading...</span>
            </div>
        </div>
        `;
        const html = document.querySelector("#preview").innerHTML;
        document.querySelector("#preview").innerHTML = image + html;    
        });

        fileReader.readAsDataURL(file);
        uploadFile(file, id);
    }else{
        alert("Tipo de archivo no válido");
    }
}

async function uploadFile(file, id) {
    const formData = new FormData();
    formData.append("file", file);

    try {
        const response = await fetch("http://localhost:3000/upload",{
            method: "POST",
            body: formData,
        });
    
    const responseText = await response.text();
    console.log(responseText);

    document.querySelector(
        `#${id} .status-text`
        ).innerHTML = `<span class="success">Archivo cargado exitosamente...</span>`;
        } catch (error) {
            document.querySelector(
                `#${id} .status-text`
            ).innerHTML = `<span class="failure">El archivo no pudo subirse correctamente...</span>`;

        }
    }
