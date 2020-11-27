$(document).ready(() => {
    $(".mdb-select").materialSelect();
  
    let filters = getFilters();
  
    getProducts(filters);
  
    $("#sort").change((e) => {
      e.stopImmediatePropagation();
      const property = e.target.value === '1' ? 'rating' : 'price';
      const increase = e.target.value === '2'
      getProducts(filters, property, increase);
    });
  
    $(".filter-option").change((e) => {
      e.stopImmediatePropagation();
      for (let filter of Object.keys(filters)) {
        if (e.target.attributes[filter]) {
          filters = updateFilters(
            filters,
            filter,
            e.target.attributes[filter].value,
            e.target.checked
          );
        }
      }
  
      getProducts(filters);
  
    });
  });
  
  function getFilters() {
    const filters = Array.from($("[filter]")).map(
      (el) => el.attributes.filter.value
    );
    const dict = {};
  
    filters.forEach((filter) => {
      dict[filter] = [];
    });
  
    return dict;
  }
  
  function updateFilters(filters, filter, option, value) {
    const dict = { ...filters };
    if (filter === "price") {
      dict.price = [option];
    } else if (filter === "rating") {
      dict.rating = [option];
    } else if (value && filters[filter].indexOf(option) === -1)
      dict[filter].push(option);
    else if (!value)
      dict[filter] = dict[filter].filter((entry) => entry !== option);
  
    return dict;
  }
  
  function getProducts(filters, sortProperty = "rating", increase = false) {
    $('#loader').css('display', 'flex');
  
    $.get("products.json", (products) => {
      let productList;
  
      productList = products.sort((a, b) => {
        if (a[sortProperty] === b[sortProperty]) return 0;
        if (increase ? a[sortProperty] > b[sortProperty] : a[sortProperty] < b[sortProperty])
          return 1;
        else return -1;
      });
  
      renderProducts(applyFilters(productList, filters));
    })
      .fail(() => {
        console.log("error");
        $('#loader').css('display', 'none');
        renderProducts([]);
      });
  }
  
  function applyFilters(products, filters) {
    return products.filter((product) => {
      for (let filter of Object.keys(filters)) {
        if (filters[filter].length > 0 && !matchFilters(filter, filters, product))
          return false;
      }
      return true;
    });
  }
  
  function matchFilters(filter, filters, data) {
    if (filter === "price") {
      let [min, max] = filters.price[0].split("-");
  
      if (max === "*") return data.price > min;
  
      else return data.price > min && data.price < max;
  
    } else if (filter === "rating") {
      return data.rating >= filters.rating[0];
    }
    if (!Array.isArray(data[filter]))
      return filters[filter].indexOf(data[filter]) !== -1;
  
    for (let value of data[filter]) {
      if (filters[filter].indexOf(value) !== -1) return true;
    }
  
    return false;
  }
  
  function createTemplate(product) {
    return  `
      <div class="col-md-4 mb-5">
        <div >
          <div class="view zoom overlay rounded z-depth-2" style="height: 260px;">
            <img class="img-fluid w-100"
              src="${product.image}" alt="Sample">
            <a href="#!">
              <div class="mask">
                <img class="img-fluid w-100"
                  src="${product.image}">
                <div class="mask rgba-black-slight"></div>
              </div>
            </a>
          </div>
          <div class="text-center pt-4">
            <h5>${product.name}</h5>
            <p><span class="mr-1"><strong>$${product.price}</strong></span></p>
          </div>
        </div>
      </div>  `
  
  }
  
  function renderProducts(products) {
    setTimeout(() => {
      $('#loader').css('display', 'none');
    }, 300)
  
    const template =
      products.length === 0
        ? `<p>No matching results found.</p>`
        : products.map((product) => createTemplate(product)).join("\n");
    $("#products").html(template);
  
  }