let productName = document.getElementById("productName");
let productPrice = document.getElementById("productPrice");
let productCategory = document.getElementById("productCategory");
let productDesc = document.getElementById("productDesc");
let productNameAlert = document.getElementById("name-alert");
let productCategoryAlert = document.getElementById("category-alert");
let pageAlert = document.querySelector(".page-alert");
let submitBtn = document.getElementById("addProduct");
let searchInput = document.getElementById("search-input");
let deleteBtn = document.querySelector(".deleteBtn");
let productsContainer ;
let errors =` `;

if(localStorage.getItem("productsList") == null)
{
    productsContainer = [];
}
else
{
    productsContainer = JSON.parse(localStorage.getItem("productsList"));
    displayProducts();
}

function addProduct(){

    if(checkInputs() == true)
    {
        if(validateProductName() == true && validateProductCategory() == true){
            let product = {
                name: productName.value,
                price: productPrice.value,
                category: productCategory.value,
                desc: productDesc.value
            }
            productsContainer.push(product);
            localStorage.setItem("productsList", JSON.stringify(productsContainer));

            pageAlert.classList.replace("d-block", "d-none");
            displayProducts();
        }
        else
        {
            document.getElementById('name-alert').innerHTML = errors;
        }
    } 
    else
    {
        pageAlert.classList.replace("d-none", "d-block");
    }
    
    console.log(productsContainer); 

    displayProducts();
    clearForm();
}

submitBtn.addEventListener("click", addProduct);

function clearForm(){
    productName.value = "";
    productPrice.value = "";
    productCategory.value = "";
    productDesc.value = "";
}

function displayProducts(){
    let dataBox =``;
    for(let i = 0; i < productsContainer.length; i++){
        dataBox += 
        `<tr>
            <td> ${i+1} </td>
            <td>${productsContainer[i].name}</td>
            <td>${productsContainer[i].price}</td>
            <td>${productsContainer[i].category}</td>
            <td>${productsContainer[i].desc}</td>
            <td><i class="bi bi-pencil-square " onclick="changeFormForUpdate(${i});"></i></td>
            <td><i id="delete" class="bi bi-trash deleteBtn" onclick="deleteProduct(${i});" ></i></td>
        </tr>`;
    }
    document.getElementById("tableBody").innerHTML = dataBox;
}

function checkInputs(){

    if(productName.value != "" && productPrice.value != "" && productCategory.value != "" && productDesc.value != ""){
        return true;
    }else{
        return false;
    }
}

function deleteProduct(productIndex){
    productsContainer.splice(productIndex, 1);
    localStorage.setItem("productsList", JSON.stringify(productsContainer)); 

    displayProducts();
}


function searchProduct(searchItem){
    let dataBox = ``;
    for(i = 0; i < productsContainer.length; i++){
        if(productsContainer[i].name.toLowerCase().includes(searchItem.toLowerCase()) == true || productsContainer[i].category.toLowerCase().includes(searchItem.toLowerCase()) == true)
        {
            dataBox += 
        `<tr>
            <td> ${i+1} </td>
            <td>${productsContainer[i].name}</td>
            <td>${productsContainer[i].price}</td>
            <td>${productsContainer[i].category}</td>
            <td>${productsContainer[i].desc}</td>
            <td><i class="bi bi-pencil-square " onclick="changeFormForUpdate(${i});"></i></td>
            <td><i id="delete" class="bi bi-trash deleteBtn" onclick="deleteProduct(${i});" ></i></td>
        </tr>`;
        }
        
    }
    document.getElementById("tableBody").innerHTML = dataBox;

}

function changeFormForUpdate(productIndex){
    productName.value = productsContainer[productIndex].name;
    productPrice.value = productsContainer[productIndex].price;
    productCategory.value = productsContainer[productIndex].category;
    productDesc.value = productsContainer[productIndex].desc;
}

function validateProductName (){
    let regex = /^[A-Z][a-z]{2,8}$/;
    if(regex.test(productName.value) == true)
    {
        productName.classList.add("is-valid");
        productName.classList.remove("is-invalid");
        productNameAlert.classList.replace("d-block", "d-none");

        return true;

    }
    else{
        productNameAlert.classList.replace("d-none", "d-block");
        productName.classList.add("is-invalid");
        productName.classList.remove("is-valid");

        return false;
    }
}
productName.addEventListener("keyup", validateProductName);

function validateProductCategory (){
    let regex = /^[A-Za-z][a-z]{2,10}(\s[A-Z][a-z]{3,15})?$/;
    if(regex.test(productCategory.value) == true)
    {
        productCategory.classList.add("is-valid");
        productCategory.classList.remove("is-invalid");
        productCategoryAlert.classList.replace("d-block", "d-none");

        return true;
    }
    else{
        productCategoryAlert.classList.replace("d-none", "d-block");
        productCategory.classList.add("is-invalid");
        productCategory.classList.remove("is-valid");

        return false;
    }
}
productCategory.addEventListener("keyup", validateProductCategory);