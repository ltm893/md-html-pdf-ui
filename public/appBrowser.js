"use strict" ; 
const selectDoc = document.getElementById('selectDoc');
const textBox = document.getElementById('rawTextId');
const formUpload = document.getElementById('fileInputForm');

window.onload = () => {
    const changeEvent = new Event("change");
    selectDoc.dispatchEvent(changeEvent)
};




const sendFile = async () => {
    textBox.setAttribute("name", "mdFile");
    const formData = new FormData(formUpload);
    for (const [key, value] of formData) {
        console.log(`${key}: ${value}`);
    }
    const response = await fetch('http://localhost:3000/upload', {
        method: 'POST',
        body: formData
    })
    const json = await response.json()
    console.log(json);

}

formUpload.addEventListener('submit', (e) => {
    e.preventDefault()
    sendFile()
})

//const buttonTa = document.getElementById('savedTa');

const selectDocEventHandler = async (event) => {
    let docType = event.srcElement.value;
    if (docType === 'txt') {
        showElementInClass('working', 'updateArea');
       // document.getElementById('displayDocument').setAttribute("src", '/txtfile');
        
        const response = await fetch("http://localhost:3000/txtfile");
        const text = await response.json();
        textBox.value = text.body;
       
    }
    else if (docType === 'md') {
        showElementInClass('working', 'iframeArea');
        document.getElementById('displayDocument').setAttribute("src", '/mdfile');
    }
    else if (docType === 'html') {
        showElementInClass('working', 'iframeArea');
        document.getElementById('displayDocument').setAttribute("src", '/htmlfile');
    }
    else if (docType === 'pdf') {
        showElementInClass('working', 'iframeArea');
        document.getElementById('displayDocument').setAttribute("src", '/pdffile');
    }
    else {
        return false;
    }
}

selectDoc.addEventListener('change', selectDocEventHandler, true);




const showElementInClass = (elClass, area) => {
    let els = document.getElementsByClassName(elClass);
    Array.prototype.forEach.call(els, function (el) {
        if (el.id === area) {
            el.style.display = "block";
        } else {
            el.style.display = "none";
        }
    })
}

