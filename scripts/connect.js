async function getListOfPosts() {
  const response = await fetch("http://plony.hopto.org:70/posts");

  const obj = await response.json();
  //createPosts(obj);
  if (document.title === "Блог") {
    createBlogs(obj);
  }
  if (document.title === "Новости") {
    createNews(obj);
  }
  if (document.title === "Статьи") {
    createArticles(obj);
  }
}

getListOfPosts();

function createPosts(arrayResponse) {
  for (let i = 0; i < arrayResponse.length; i += 2) {
    const divPosts = arrayResponse[i];
    let body;
    if (divPosts.body.length <= 81) {
      body = divPosts.body;
    } else {
      body = divPosts.body.slice(0, 81);
    }
    const date = new Date(divPosts.createdAt);
    if (i + 1 === arrayResponse.length) {
      const newPostElement = document.createElement("li");
      newPostElement.className = "PostElement";
      newPostElement.innerHTML = `
    <div class="row mb-2">
      <div class="col-md-6 p-0">
      <div
        class="post-container row no-gutters border rounded overflow-hidden flex-md-row mb-4 shadow-sm h-md-250 position-relative"
      >
        <div class="col d-none d-lg-block">
          <img
            class="img-thumbnail p-0"
            style="min-height: 100%"
            src="../img/post1.jpg"
            alt="Image"
          />
        </div>
        <div class="col p-4 d-flex flex-column position-static">
          <strong class="d-inline-block mb-2 text-primary"
            >Раздел или Тема</strong>
          <h3 class="mb-0">${divPosts.title}</h3>
          <div class="mb-1 text-muted">${date.getDate()}.${date.getMonth()}.${date.getFullYear()}</div>
          <p class="card-text mb-auto">
            ${body}
          </p>
          <a href="#" class="stretched-link mt-3">Читать</a>
        </div>
      </div>
    </div>      
    </div>    
  </div>
    
          `;
      const listRoot = document.getElementById("listOfPosts");
      listRoot.append(newPostElement);
    } else {
      const divPosts2 = arrayResponse[i + 1];
      let body2;
      if (divPosts2.body.length <= 81) {
        body2 = divPosts2.body;
      } else {
        body2 = divPosts2.body.slice(0, 81);
      }
      const date2 = new Date(divPosts2.createdAt);
      const newPostElement = document.createElement("li");
      newPostElement.className = "PostElement";
      newPostElement.innerHTML = `
    <div class="row mb-2">
      <div class="col-md-6 p-0">
      <div
        class="post-container row no-gutters border rounded overflow-hidden flex-md-row mb-4 shadow-sm h-md-250 position-relative"
      >
        <div class="col d-none d-lg-block">
          <img
            class="img-thumbnail p-0"
            style="min-height: 100%"
            src="../img/post1.jpg"
            alt="Image"
          />
        </div>
        <div class="col p-4 d-flex flex-column position-static">
          <strong class="d-inline-block mb-2 text-primary"
            >Раздел или Тема</strong>
          <h3 class="mb-0">${divPosts.title}</h3>
          <div class="mb-1 text-muted">${date.getDate()}.${date.getMonth()}.${date.getFullYear()}</div>
          <p class="card-text mb-auto">
            ${body}
          </p>
          <a href="#" class="stretched-link mt-3">Читать</a>
        </div>
      </div>
    </div>      
    <div class="col-md-6 p-0">
    <div
      class="post-container row no-gutters border rounded overflow-hidden flex-md-row mb-4 shadow-sm h-md-250 position-relative"
    >
      <div class="col d-none d-lg-block">
        <img
          class="img-thumbnail p-0"
          style="min-height: 100%"
          src="../img/post1.jpg"
          alt="Image"
        />
      </div>
      <div class="col p-4 d-flex flex-column position-static">
        <strong class="d-inline-block mb-2 text-primary"
          >Раздел или Тема</strong>
        <h3 class="mb-0">${divPosts2.title}</h3>
        <div class="mb-1 text-muted">${date2.getDate()}.${date2.getMonth()}.${date2.getFullYear()}</div>
        <p class="card-text mb-auto">
          ${body2}
        </p>
        <a href="#" class="stretched-link mt-3">Читать</a>
      </div>
    </div>
    </div>    
  </div>
    
          `;
      const listRoot = document.getElementById("listOfPosts");
      listRoot.append(newPostElement);
    }
  }
}

function createBlogs(objArrayResponse) {
  const array = [];
  for (element of objArrayResponse) {
    if (element.type === "BLOG") {
      array.push(element);
    }
  }
  createPosts(array);
}
function createNews(objArrayResponse) {
  const array = [];
  for (element of objArrayResponse) {
    if (element.type === "NEWS") {
      array.push(element);
    }
  }
  createPosts(array);
}
function createArticles(objArrayResponse) {
  const array = [];
  for (element of objArrayResponse) {
    if (element.type === "Article") {
      array.push(element);
    }
  }
  createPosts(array);
}
