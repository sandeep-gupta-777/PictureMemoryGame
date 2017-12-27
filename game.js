'use strict';
//credits: https://stackoverflow.com/questions/5836833/create-a-array-with-random-values-in-javascript
let urlArray = initializeURLarray(25);
let usedUrlArray = [];
let boxCount = 9;
let timerCount=20;
let timerFinished = false;
let gameStarted = false;
let indexOfHintImage  =Math.floor(Math.random() *(boxCount-1));//in urlArray
let randomElementFromUrlArray;
let maximumTimerCount = 20000;
let imageHintWrapperElement = document.getElementById('imageHintWrapper');
let timerElement = document.getElementById('timer');
// imageHintWrapperElement.style.visibility = "hidden";
let placeholder = "https://lh4.ggpht.com/cfo9ApPG_DfKZ139O84XUGem1aXZL3cIGw9jB4cGpUprGNeEMav5TLBfq8sEZc8mHeY=h300";
let setIntervalRef,setTimeoutRef;
//todo: dont hardcode total time or any variablegit
//make helper.js file
function initializeUsedURLarray() {
    for(let i=0;i<boxCount;i++){
        usedUrlArray[i] = urlArray[i];

    }
}
function reset() {
    initializeUsedURLarray();
    urlArray = initializeURLarray(25);
    timerCount=20;
    timerFinished = false;
    gameStarted = false;
    indexOfHintImage  =Math.floor(Math.random() *(boxCount-1));//in urlArray
    maximumTimerCount = 20000;

    let boxElements = document.getElementsByClassName('box');
    for(let i=0;i<boxElements.length;i++){
        boxElements[i].innerHTML = "";
    }
    document.getElementById("imageHint").src = "";
    document.getElementById("timer").innerHTML = "20";
    if(setIntervalRef) clearInterval(setIntervalRef);
    if(setTimeoutRef) clearInterval(setTimeoutRef);
}

initializeUsedURLarray();
console.log(1);

function initializeURLarray(length){
    let a=[];
    for (let i=0;i<length;++i) a[i]=i;

    function shuffle(array) {
        let tmp, current, top = array.length;
        if(top) while(--top) {
            current = Math.floor(Math.random() * (top + 1));
            tmp = array[current];
            array[current] = array[top];
            array[top] = tmp;
        }
        return array;
    }


    return shuffle(a);
}
function imageClick(el) {
    let rowsWrapperElement = document.getElementsByClassName('rowsWrapper')[0];
    if(!timerFinished)
        return;
    let imageElement = el.firstElementChild;
    if(getImageDataID(el)=== usedUrlArray[indexOfHintImage]){
        el.classList.add('success');
        setTimeout(function () {
            el.classList.remove('success');
        },1000);

        //move to next image
        el.firstElementChild.style.display  = "block";

        updateIndexOfHintImage();
        showOneImageInSideBar();
        if(usedUrlArray.length===0)
        {
            alert('Game finished!');
        }
    }
    else {
        //show that guess is incorrect
        rowsWrapperElement.classList.add('shakeMe');
        setTimeout(function () {
           rowsWrapperElement.classList.remove('shakeMe');
        },300);
    }
}
function updateIndexOfHintImage() {
    if(!indexOfHintImage===undefined){
        indexOfHintImage = Math.floor(Math.random() * usedUrlArray.length);
        return;
    }
    usedUrlArray.splice(indexOfHintImage,1);

    indexOfHintImage = Math.floor(Math.random() * usedUrlArray.length);

    return indexOfHintImage;
}

function getImageDataID(el){
    return parseInt(el.getAttribute('data-number'));
}

function getImageID(img) {
    return img.src[9]
}

//create and append <img> to .box
function createImgElement(src,data_number) {
    let divElement = document.createElement('DIV');
    divElement.setAttribute("class", "gridImageWrapper");
    divElement.setAttribute("onClick", "imageClick(this)");
    divElement.setAttribute("data-number", data_number);
    divElement.style.width='100%';
    divElement.style.height='100%';

    let imgElement = document.createElement('IMG');
    imgElement.setAttribute("src", src);
    // imgElement.setAttribute("onClick", "imageClick(this)");
    imgElement.setAttribute("class", "gridImage");
    // imgElement.setAttribute("data-number", data_number);
    imgElement.style.width='100%';
    imgElement.style.height='100%';
    divElement.appendChild(imgElement);
    // return imgElement;
    return divElement;

}
function appendAnElement(parent, child) {
    parent.appendChild(child);
}

window.onload = function () {
    // createAndAppendImagesIntoBoxes();
};
function createAndAppendImagesIntoBoxes(){
    for(let i=0;i<boxCount;i++){
        let tempSrc = `./images/${usedUrlArray[i]}.jpg`;
        let tempChild = createImgElement(tempSrc,usedUrlArray[i]);
        let tempParent = document.getElementsByClassName('box')[i];
        appendAnElement(tempParent,tempChild);
    }
}

function startGame() {
    // let imageElemenets = document.getElementsByClassName()
    // for(var i=0;i<arr.length;i++){
    //
    // }r
    if(gameStarted) return;
    else gameStarted= true;
    createAndAppendImagesIntoBoxes();
    startTimer();
}
function showOneImageInSideBar() {
    document.querySelector('#imageHint').src = `./images/${usedUrlArray[indexOfHintImage]}.jpg`;
}
function showPlaceHoldersInsteadOfImages() {
    let imgArr = document.getElementsByClassName('gridImage');
    for(let i=0;i<imgArr.length;i++){
        imgArr[i].style.display  = 'none';
    }
}

function startTimer() {
     setIntervalRef = setInterval(function () {

        if(timerCount>=0)--timerCount ;
        document.querySelector("#timer").innerHTML = timerCount.toString();
    },1000);
    setTimeoutRef = setTimeout(function () {
        timerFinished=true;
        showPlaceHoldersInsteadOfImages();
        showOneImageInSideBar();
        clearInterval(setIntervalRef);

    },maximumTimerCount);
}

