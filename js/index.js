const loadCategories = async () => {
  const url = `https://openapi.programming-hero.com/api/news/categories`
  const res = await fetch(url);
  const data = await res.json();
  displayCategories(data.data.news_category)
  // displayCategories (data.data.news_category);
}
const displayCategories = allCategories => {
  // console.log(allCategories)
  const allCategoriesContainer = document.getElementById('categories-container');
  for (const categories of allCategories) {
    // console.log(categories)

    const div = document.createElement('div');
    div.classList.add('navbar');
    div.innerHTML = `
    <a onclick="loadAllCategories('${categories.category_id ? categories.category_id : 'No News Found'}')" class="navbar-brand" href="#"">${categories.category_name}</a>
    `;
    allCategoriesContainer.appendChild(div);
  }
}


const loadAllCategories = (code) => {
  const url = `https://openapi.programming-hero.com/api/news/category/${code}`
  // console.log('get country detail',code);
  // console.log(url)
  const spinner = document.getElementById('spinner');
  spinner.classList.remove("d-none");
    fetch(url)
    .then(res => res.json())
    .catch(error => alert(error))
    .then(data => displayCategory(data.data))
  }

const loadModal = async(id) =>{
  const url = (`https://openapi.programming-hero.com/api/news/${id}`);
  const res = await fetch(url);
  const data = await res.json();
  displayModel(data.data) ;
}
const displayModel = model =>{
  for(const onlyModel of model){
    // console.log(onlyModel);
    const modalTaitle = document.getElementById('allNewsModalLabel');
    modalTaitle.innerText = onlyModel.title;
    const newsDetails = document.getElementById('newsdetails');
    newsDetails.innerHTML = `
    <p>${onlyModel.details}</p>
    <img src=" ${onlyModel.author.img}"style="height: 150px;" class="rounded-circle mb-2" alt="...">
    <p class="mx-2">${onlyModel.author.name ? onlyModel.author.name : 'No Data Available'} <span class="mx-5">View: ${onlyModel.total_view ? onlyModel.total_view : 'No Data Available'}</span></p>
    `
  }

}

const displayCategory = onlyCategoty => {
  // console.log(onlyCategoty)
  spinner.classList.add("d-none");
  const newsNumber = document.getElementById('newsNumber');
  newsNumber.innerText =` ${onlyCategoty.length ? onlyCategoty.length : 'No News Found'} items found`
  onlyCategoty.sort(function (a,b){
    return b.total_view - a.total_view;
  });


  const displayAll = document.getElementById('all-category-container');
  displayAll.innerHTML = ``; 
  onlyCategoty.forEach(category => {
    // console.log(category);
    const categoriesDiv = document.createElement('div');
    categoriesDiv.classList.add('row');
    categoriesDiv.innerHTML = `
        <div class="col-md-4 my-3">
          <img src="${category.thumbnail_url}" class="img-fluid rounded-start" alt="...">
        </div>
        <div class="col-md-8">
          <div class="card-body">
            <h5 class="card-title">${category.title}</h5>
            <p class="card-text">${category.details.length > 200 ? category.details.slice(0, 200) + '...' : category.details}</p>
            <div>
            <img src=" ${category.author.img}"style="height: 80px;" class="rounded-circle" alt="...">
           <span class="d-flex">
           <p class="mx-2">${category.author.name ? category.author.name : 'No Data Available'}</p>
           <span <i class="fa-solid fa-eye mx-5"></i>${category.total_view ? category.total_view : 'No Data Available'}</span>
           <span <i onclick="loadModal('${category._id}')" class="fa-solid fa-arrow-right mx-5" data-bs-toggle="modal" data-bs-target="#allNewsModal"></i> </span>
           </span>
           </di
          </div>
        </div>            
  `;

  displayAll.appendChild(categoriesDiv);
  })
  
}

// loadAllCategories()

// const loadNewsDetails = async id =>{
//   const url = ` https://openapi.programming-hero.com/api/news/${id}`
//   const res = await fetch(url);
//   const data = await res.json();
// }

loadCategories('')





