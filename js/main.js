let inputProductTitel = document.getElementById("titel");
let inputProductPric = document.getElementById("pric");
let inputProductTaxes = document.getElementById("taxes");
let inputProductAds = document.getElementById("ads");
let inputProductDiscount = document.getElementById("discount");
let inputProductTotel = document.getElementById("totel");
let inputProductCategory = document.getElementById("category");
let count = document.getElementById("count");
let createProduct = document.querySelector(".createProduct");
let catagorySearch = document.querySelector(".searchByCatagory");
let titleSearch = document.querySelector(".searchByTitle");

let temp = "";

//  vailbel   3lshan el update
let mood = "create";
//علشان حذف المنتجات
let btnDeleteALL = document.querySelector(".btnDeleteALL");
// arry ely bkzen feha el product
let allProducts = [];
// 3lshan el refresh no delete product
if (localStorage.getItem("product") != null) {
  allProducts = JSON.parse(localStorage.getItem("product"));

  displayAllProduct();
}

// 3lshan el update

// console.log(
//     allProducts[i].inputProductTitel,
//     inputProductPric,
//     inputProductTaxes,
//     inputProductAds,
//     inputProductDiscount,
//     inputProductTotel,
//     inputProductCategory
//     );

// بتجيب اجمالي سعر المنتج بعد الخصم
function getPriceProduct() {
  if (inputProductPric.value != "") {
    let result = Number(
      +inputProductPric.value +
        +inputProductTaxes.value +
        +inputProductAds.value -
        +inputProductDiscount.value
    );
    inputProductTotel.innerHTML = result;

    document.querySelector(".bg-totel").style.background = "#040";
  } else {
    inputProductTotel.innerHTML = "";

    document.querySelector(".bg-totel").style.background = "red";
  }
}

// بتضيف منتج
function addProduct() {
  let errorMassge = validations();

  // wasfe el product
  let product = {
    titel: inputProductTitel.value,
    pric: inputProductPric.value,
    taxes: inputProductTaxes.value,
    ads: inputProductAds.value,
    discount: inputProductDiscount.value,
    category: inputProductCategory.value,
    totel: inputProductTotel.innerHTML,
  };

  // 3lshan eluptate and create
  if (mood === "create") {
    if (errorMassge == true) {
      if (count.value > 1) {
        for (let i = 0; i < count.value; i++) {
          allProducts.push(product);
          localStorage.setItem("product", JSON.stringify(allProducts));
        }
      } else {
        allProducts.push(product);
        localStorage.setItem("product", JSON.stringify(allProducts));
      }
    } else {
      alert(errorMassge);
    }
  } else {
    allProducts[temp] = product;
    mood = "create";

    localStorage.setItem("product", JSON.stringify(allProducts));
  }

  //   بتعرض المنتج
  displayAllProduct();
  // بتنظف الفورم
  clearForm();
}

// بتنظف الفورم
function clearForm() {
  inputProductPric.value = "";
  inputProductTaxes.value = "";
  inputProductTitel.value = "";
  inputProductAds.value = "";
  inputProductDiscount.value = "";
  inputProductTotel.innerHTML = "";
  inputProductCategory.value = "";
  count.value = "";
  search.value = "";
}

// وبتحذف  +++++++++بتعرض المنتج
function displayAllProduct() {
  let cartona = "";
  for (let i = 0; i < allProducts.length; i++) {
    cartona += `
     
 <tr class="text-center">
     <td>${i}</td>
     <td>${allProducts[i].titel}</td>
     <td>${allProducts[i].pric}</td>
     <td>${allProducts[i].taxes}</td>
     <td>${allProducts[i].ads}</td>
     <td>${allProducts[i].discount}</td>
     <td>${allProducts[i].totel}</td>
     <td>${allProducts[i].category}</td>
     <td><button onclick="deleteProduct(${i})">delete</button></td>
     <td><button  onclick=" ubdateElement(${i}) "  >ubdate</button></td>
 </tr>
     
     
     
     `;
    document.querySelector("tbody").innerHTML = cartona;

    //علشان حذف المنتجات
    if (allProducts.length > 0) {
      btnDeleteALL.innerHTML = `<button onclick="deleteALL()" >deleteALL<span>${allProducts.length}</span>
        </button>`;
    }
  }
}
// بتحذف المنتج
function deleteProduct(index) {
  allProducts.splice(index, 1);
  localStorage.product = JSON.stringify(allProducts);
  if (allProducts.length == 0) {
    document.querySelector("tbody").innerHTML = "";
  } else {
    displayAllProduct();
  }
}

// بنحذف المنتجات
function deleteALL() {
  allProducts.splice(0);
  localStorage.clear();

  if (allProducts.length == 0) {
    document.querySelector("tbody").innerHTML = "";
    btnDeleteALL.innerHTML = "";
  }
}
// بتنفذ تحديث المنتج
function ubdateElement(i) {
  console.log(i);

  (inputProductTitel.value = allProducts[i].titel),
    (inputProductPric.value = allProducts[i].pric),
    (inputProductTaxes.value = allProducts[i].taxes),
    (inputProductAds.value = allProducts[i].ads),
    (inputProductDiscount.value = allProducts[i].discount),
    (inputProductCategory.value = allProducts[i].category),
    // inputProductTotel.innerHTML=allProducts[i]. inputProductTotel
    getPriceProduct();

  scroll({
    top: 0,
    behavior: "smooth",
  });
  temp = i;

  count.style.display = "none";
  createProduct.innerHTML = "update.....";
  console.log(createProduct);
  mood = "update";
}
//  CATAGORY   بتبحث ب
function searchByCatagory(value) {
  //  Titel   بتبحث ب

  let cartona = "";

  for (let i = 0; i < allProducts.length; i++) {
    if (
      allProducts[i].category
        .toLocaleLowerCase()
        .includes(value.toLocaleLowerCase())
    ) {
      // for (let i = 0; i < allProducts.length; i++) {

      cartona += `
            
             <tr class="text-center">
            <td>${i}</td>
            <td>${allProducts[i].titel}</td>
            <td>${allProducts[i].pric}</td>
            <td>${allProducts[i].taxes}</td>
            <td>${allProducts[i].ads}</td>
            <td>${allProducts[i].discount}</td>
            <td>${allProducts[i].totel}</td>
            <td>${allProducts[i].category}</td>
            <td><button onclick="deleteProduct(${i})">delete</button></td>
            <td><button  onclick=" ubdateElement(${i}) "  >ubdate</button></td>
            </tr>
            
            
            
            `;
      document.querySelector("tbody").innerHTML = cartona;

      // }

      console.log("foundit", allProducts[i]);
    }
    // console.log(value,"mo adel");
    else {
      // displayAllProduct()
    }
  }
}
function searchByTitle(value) {
  let cartona = "";

  for (let i = 0; i < allProducts.length; i++) {
    if (
      allProducts[i].titel
        .toLocaleLowerCase()
        .includes(value.toLocaleLowerCase())
    ) {
      // for (let i = 0; i < allProducts.length; i++) {

      cartona += `
            
             <tr class="text-center">
            <td>${i}</td>
            <td>${allProducts[i].titel}</td>
            <td>${allProducts[i].pric}</td>
            <td>${allProducts[i].taxes}</td>
            <td>${allProducts[i].ads}</td>
            <td>${allProducts[i].discount}</td>
            <td>${allProducts[i].totel}</td>
            <td>${allProducts[i].category}</td>
            <td><button onclick="deleteProduct(${i})">delete</button></td>
            <td><button  onclick=" ubdateElement(${i}) "  >ubdate</button></td>
            </tr>
            
            
            
            `;
      document.querySelector("tbody").innerHTML = cartona;

      // }

      console.log("foundit", allProducts[i]);
    }
    // console.log(value,"mo adel");
    else {
      // displayAllProduct()
    }
  }
}

// بتنفذ الفالديشن
function validations() {
  let regexTitel = /[a-z]{3,12}/gi;
  let regexCount = /[1-9]/;
  let regexCategory = /[a-z]{3,12}/gi;
  let regexPrice = /[1-9]{1,}/;

  if (regexTitel.test(inputProductTitel.value) == false) {
    return "titel muste is from 3 to 12 chracters";
  } else if (regexCount.test(count.value) == false) {
    return "count muste is one number from 2 to 9 ";
  } else if (regexCategory.test(inputProductCategory.value) == false) {
    return "category muste is from 3 to 12 chracters";
  } else if (regexPrice.test(inputProductPric.value) == false) {
    return "price muste is from 1 to 9 number not -number";
  }

  return true;
}


document.querySelector(".fa-sun").style.display="none";
let moodBtn=document.querySelector(".mood");
moodBtn.addEventListener("click",()=>{
  console.log('mohamed');
  
  document.body.classList.toggle("bg")
    

    
    
  
    

  
})




// function darckMood() {


  
  


  
// }

