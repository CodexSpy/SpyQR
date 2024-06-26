const generatorDiv=document.querySelector(".generator");
const generateBtn=document.querySelector(".generator-form button");
const qrInput= generatorDiv.querySelector(" .generator-form input");
const qrImg=generatorDiv.querySelector(".generator-img img");
const downloadBtn=generatorDiv.querySelector(".generator-btn .btn-link");

let imgURL='';
generateBtn.addEventListener("click", ()=>{
    console.log("ok")
    let qrValue=qrInput.value;
    if(!qrValue.trim()) return;
    
    generateBtn.innerText="Generating QR..."

    imgURL=`https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${qrValue}`

    qrImg.src=imgURL;
    qrImg.addEventListener("load", ()=>{
generatorDiv.classList.add("active");
generateBtn.innerText="Genrate QR Code"
    })

})

downloadBtn.addEventListener("click", () =>{
    if(!imgURL) return;
    fetchImage(imgURL)
})

function fetchImage(url){
    fetch(url).then(res=>res.blob()).then(file=>{
     let tempFile=URL.createObjectURL(file)
     let file_name=url.split("/").pop().split(".")[0];  
     let extension=url.split("/")[1];
     download(tempFile, file_name, extension); 
    })
    .catch(()=>imgURL='');
}

function download(tempFile, file_name, extension){
    let a=document.createElement('a');
    a.href=tempFile;
    a.download=`${file_name}.${extension}`;
    document.body.appendChild(a);
    a.click();
    a.remove();
}