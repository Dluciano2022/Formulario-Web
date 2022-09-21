const $d = document; 
const $main = $d.querySelector(".dragArea");
const $dragArea = $d.querySelector(".dragArea");

const dragText = dragArea.querySelector("p");
const button = dragArea.querySelector("button");
const input = dragArea.querySelector("#input-file");
let files;

button.addEventListener ("click", (e) =>  { 
    input.click();
});

input.addEventListener('change', (e) => {
    files = this.files;
    dragArea.classList.add('active');
    showFiles(files);
    dragArea.classList.remove("active");
});

const uploader = (file) => {
    const xhr = new XMLHttpRequest();
    const fomData = new FormData();

    console.log(fomData);
    
}

$dragArea.addEventListener("dragover", e => {
    e.preventDefault();
    e.stopPropagation();
    e.target.classlist.add("active");
    dragText.textContent = "Suelta para subir los archivos"
})

$dragArea.addEventListener("dragleave", e => {
    e.preventDefault();
    e.stopPropagation();
    e.target.classlist.remove("active");
})

$dragArea.addEventListener("drop", e => {
    e.preventDefault();
    e.stopPropagation();
    e.target.classlist.remove("active"); 
})
