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
    <a onclick="loadAllCategories('${categories.category_id}')" class="navbar-brand" href="#"">${categories.category_name}</a>
    `;
    allCategoriesContainer.appendChild(div);
  }
}


const loadAllCategories = (code) => {
  const url = `https://openapi.programming-hero.com/api/news/category/${code}`
  // console.log('get country detail',code);
  // console.log(url)
  fetch(url)
    .then(res => res.json())
    .then(data => displayCategory(data.data))
}

const displayCategory = onlyCategoty => {
  // console.log(onlyCategoty)
  const newsNumber = document.getElementById('newsNumber');
  newsNumber.innerText =` ${onlyCategoty.length} items found`
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
           <span>
           <p>${category.author.name}</p>
           <span <i class="fa-solid fa-eye"></i>${category.total_view}</span>
           <span <i class="fa-solid fa-arrow-right mx-5"></i> </span>
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

loadCategories()





