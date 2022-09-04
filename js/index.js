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




