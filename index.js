// get the inputs element by ID ---------- 
let title = document.getElementById('title');
let price = document.getElementById('price');
let taxes = document.getElementById('taxes');
let adds = document.getElementById('adds');
let discound = document.getElementById('discound');
let count = document.getElementById('count');
let Category = document.getElementById('Category');
let total = document.getElementById('total');
let submit = document.getElementById('submit');
let mood ='creat';// creat a function (MOOD) to creat and Update element
let MOOD = 'title'; // MOOD >>>> Search 
let temp; // glopal variable to help me to get the i from update function to submet functuin
// function to Get Total --------------->
function GetTotal(){
    if(price.value!='' && taxes.value!='' && adds.value!='' && discound.value!='' &&count.value!=''){
        let result = (+price.value + +taxes.value + +adds.value - +discound.value ) ;
        total.innerHTML = result;
        total.style.background= 'linear-gradient(315deg,#00ffbf,#66ff00)';
    }
    else{
        total.innerHTML = '';
        total.style.background= 'linear-gradient(315deg,#ff0000,#ff00ae)';

    }
}
// function Create -----------------------> 
// انشاء اراي لحفظ البيانات فيها 
let datapro;
if(localStorage.product !=null){
    datapro = JSON.parse(localStorage.product);
}
else{
    datapro=[];
}


count.focus();  /// when reload the pag it will foucs on count

submit.onclick = function creat(){
    if(Category.value!='' && title.value!='' && price.value!='' && taxes.value!='' && adds.value!='' && discound.value!='' &&count.value!=''){
        let newpro={
            title:title.value.toLowerCase(),
            price:price.value,
            taxes:taxes.value,
            adds:adds.value,
            discound:discound.value,
            count:count.value,
            Category:Category.value.toLowerCase(),
            total:total.innerHTML,
        }
        
        if(mood==='creat'){
            datapro.push(newpro); // add the object in the array
            localStorage.setItem('product', JSON.stringify(datapro)); // add the array in the local storage
        }
        else if(mood==='update'){   // to update
            datapro[temp]=newpro;
            localStorage.product = JSON.stringify(datapro);
            mood = 'creat'
        }
        
    }
    else{
        console.log("the inputs are empty ");
    }
   
    submit.innerHTML ='Add to list ⇓ ∜ ';
    count.focus();  /// when reload the pag it will foucs on count
    
    cleardata();
    showdata();
}
// clear the input data from the innerhtml --------------->
function cleardata(){
    title.value='';
    price.value='';
    taxes.value='';
    adds.value='';
    discound.value='';
    count.value='';
    Category.value='';
    total.innerHTML='';
    total.style.background= 'linear-gradient(315deg,#ff0000,#ff00ae)'; 
}
// Read the data from inputs and add it in output place
function showdata(){
    let table ='';
    for(let i=0;i<datapro.length;i++){
        table +=`
        <tr>
            <td>${i}</td>
            <td>${datapro[i].title}</td>
            <td>${datapro[i].price}</td>
            <td>${datapro[i].taxes}</td>
            <td>${datapro[i].adds}</td>
            <td>${datapro[i].discound}</td>
            <td>${datapro[i].Category}</td>
            <td>${datapro[i].total}</td>
            <td>${datapro[i].count}</td>
            <td><button onclick="UpdateData(${i})" id="update">Update</button></td>
            <td><button onclick="DeleteData(${i})" id="delete">Delete</button></td>
        </tr>
        
        `
    }
    /////// check if there an items in a list then,do this/////////////////
    document.getElementById('tbody').innerHTML = table;
    let DeleteAll = document.getElementById('DeleteAll');


    if(datapro.length>0){
        DeleteAll.innerHTML=`
        <button onclick="DeleteAll()" id="DELTEbtn">Delete All Element  »⟫ ${datapro.length} </button>
        <button onclick="MergeSortPrice()" id="MergeSort">Sort your List  ${datapro.length} (price) MS</button>
        <button id="QuickSort" onclick="QuickSort()">sort your List ${datapro.length} (title) QS</button>
        `
       
    }
    else{
        DeleteAll.innerHTML='';
       
    }
    /////////////////////////////////////////////////
}
showdata();
// function to delete element ---------------------------->  // خطأ في العمليات الحسابية    Error !
function DeleteData(i){
    if(datapro[i].count >= 1){
        datapro[i].count = datapro[i].count -1;
        localStorage.product = JSON.stringify(datapro);
        console.log(datapro[i].count)
        showdata();
    } 
    else if(datapro[i].count == 0){
        datapro.splice(i,1);
        localStorage.product=JSON.stringify(datapro);
        showdata();
    }
 
    showdata();
}
function DeleteAll(){
    let userInput = prompt("Are you sure you want to delete all? (Type 'ok' to Delete):");
if (userInput === "ok") {
    localStorage.clear();
    datapro.splice(0);
    showdata();
} else {
    console.log("Deletion was not performed.");
}
}
function UpdateData(i){
    title.value = datapro[i].title
    price.value = datapro[i].price
    taxes.value = datapro[i].taxes
    adds.value = datapro[i].adds
    discound.value=datapro[i].discound
    count.value = datapro[i].count
    Category.value=datapro[i].Category
    GetTotal();
    submit.innerHTML='Update Data';
    mood='update';
    temp=i;
    scroll({
        top : 0 ,
        behavior:'smooth'
    })
    // we go to the function submet to add the update function there
}

function GetSearchMood(id){
    let Search=document.getElementById('Search');
    if(id == 'searchTitle'){
        MOOD='title';
        Search.placeholder = "search By Name Of product🔎";
    }
    else if(id == 'searchCategoy'){
        MOOD='Categoy';
        Search.placeholder = "search By Categoy Of product🔎";
    }
    Search.focus();

}
function SearchData(value){
    let table='';
    if(MOOD === 'title'){
        for(let i=0;i<datapro.length;i++){

            if(datapro[i].title.includes(value.toLowerCase())){
                table +=`
                    <tr>
                        <td>${i}</td>
                        <td>${datapro[i].title}</td>
                        <td>${datapro[i].price}</td>
                        <td>${datapro[i].taxes}</td>
                        <td>${datapro[i].adds}</td>
                        <td>${datapro[i].discound}</td>
                        <td>${datapro[i].Category}</td>
                        <td>${datapro[i].total}</td>
                        <td>${datapro[i].count}</td>
                        <td><button onclick="UpdateData(${i})" id="update">Update</button></td>
                        <td><button onclick="DeleteData(${i})" id="delete">Delete</button></td>
                    </tr>
         
                    `
            }
        }

    }
    else if(MOOD='Categoy'){
        for(let i=0;i<datapro.length;i++){

            if(datapro[i].Category.includes(value.toLowerCase())){
                table +=`
                    <tr>
                        <td>${i}</td>
                        <td>${datapro[i].title}</td>
                        <td>${datapro[i].price}</td>
                        <td>${datapro[i].taxes}</td>
                        <td>${datapro[i].adds}</td>
                        <td>${datapro[i].discound}</td>
                        <td>${datapro[i].Category}</td>
                        <td>${datapro[i].total}</td>
                        <td>${datapro[i].count}</td>
                        <td><button onclick="UpdateData(${i})" id="update">Update</button></td>
                        <td><button onclick="DeleteData(${i})" id="delete">Delete</button></td>
                    </tr>
         
                    `
            }
        }

    }

    document.getElementById('tbody').innerHTML = table; // showe the search result on the table
}

showdata();
/* localStorage.product = JSON.stringify(datapro); */  // >>>> تحديث بيانات التخزين المحلي



function MergeSortPrice(){
    
// Define the merge sort function
function mergeSort(datapro) {
    if (datapro.length <= 1) {
        return datapro;
    }
    
    let middle = Math.floor(datapro.length / 2);
    let left = datapro.slice(0, middle);
    let right = datapro.slice(middle);
    
    return merge(mergeSort(left), mergeSort(right));
}

function merge(left, right) {
    let result = [];
    let leftIndex = 0;
    let rightIndex = 0;

    while (leftIndex < left.length && rightIndex < right.length) {
        if (parseFloat(left[leftIndex].price) < parseFloat(right[rightIndex].price)) {
            result.push(left[leftIndex]);
            leftIndex++;
        } else {
            result.push(right[rightIndex]);
            rightIndex++;
        }
    }

    return result.concat(left.slice(leftIndex)).concat(right.slice(rightIndex));
}

// Call the merge sort function passing your data array
datapro = mergeSort(datapro);

// Update the display function to reflect the sorted data
showdata();

localStorage.product = JSON.stringify(datapro);
showdata();
}
//////   quick sort 
function QuickSort(){
    
// Define the quick sort function
function quickSort(datapro, left = 0, right = datapro.length - 1) {
    if (left < right) {
        const pivotIndex = partition(datapro, left, right);
        quickSort(datapro, left, pivotIndex - 1);
        quickSort(datapro, pivotIndex + 1, right);
    }
    return datapro;
}

// Implement a partition function
function partition(datapro, left, right) {
    const pivot = datapro[Math.floor((right + left) / 2)].title;
    let i = left;
    let j = right;

    while (i <= j) {
        while (datapro[i].title < pivot) {
            i++;
        }
        while (datapro[j].title > pivot) {
            j--;
        }
        if (i <= j) {
            // Swap elements
            [datapro[i], datapro[j]] = [datapro[j], datapro[i]];
            i++;
            j--;
        }
    }
    return i;
}

// Call the quick sort function passing your data array
datapro = quickSort(datapro);

// Update the display function to reflect the sorted data
showdata();

localStorage.product = JSON.stringify(datapro);
showdata();
}
