const articleForm = document.querySelector("#articleForm");
const postBtn = document.querySelector("#postBtn");
const getBtn = document.querySelector("#getBtn");
const putBtn = document.querySelector("#putBtn");
const deleteBtn = document.querySelector("#deleteBtn");
const xmlHttp = document.querySelector("#xmlHTTP");
const fetchAPI = document.querySelector("#fetchAPI");
const response = document.querySelector("#response");

function getCurrentDate() {
  const date = new Date();
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();
  const hours = date.getHours();
  const minutes = date.getMinutes();
  const seconds = date.getSeconds();
  return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
}

// POST
postBtn.addEventListener("click", () => {
  const formData = new FormData();
  formData.append("id", articleForm.id.value);
  formData.append("article_name", articleForm.article_name.value);
  formData.append("article_body", articleForm.article_body.value);
  formData.append("date", getCurrentDate());

  const url = "https://httpbin.org/post";

  if (xmlHttp.checked) {
    const xhr = new XMLHttpRequest();
    xhr.open("POST", url, true);
    xhr.onreadystatechange = () => {
      if (xhr.readyState === XMLHttpRequest.DONE) {
        if (xhr.status === 200) {
          const data = JSON.parse(xhr.responseText);
          response.innerHTML = `
						<p><strong>Form Data:</strong></p>
						<ul>
							<li>ID: ${data.form.id}</li>
							<li>Article Name: ${data.form.article_name}</li>
							<li>Article Body: ${data.form.article_body}</li>
							<li>Date: ${data.form.date}</li>
						</ul>
						`;
        } else {
          console.log("Error: ", xhr.status);
        }
      }
    };
    xhr.send(formData);
  } else if (fetchAPI.checked) {
    fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: articleForm.id.value,
        article_name: articleForm.article_name.value,
        article_body: articleForm.article_body.value,
        date: getCurrentDate(),
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("FETCH API POST: ", data);
        response.innerHTML = `
				<p><strong>Form Data:</strong></p>
				<ul>
					<li>ID: ${data.json.id}</li>
					<li>Article Name: ${data.json.article_name}</li>
					<li>Article Body: ${data.json.article_body}</li>
					<li>Date: ${data.json.date}</li>
				</ul>
				`;
      });
  }
});

// GET
getBtn.addEventListener("click", () => {
  const url = "https://httpbin.org/get";

  if (xmlHttp.checked) {
    const xhr = new XMLHttpRequest();
    xhr.open("GET", url, true);
    xhr.onreadystatechange = () => {
      if (xhr.readyState === XMLHttpRequest.DONE) {
        if (xhr.status === 200) {
          const data = JSON.parse(xhr.responseText);
          console.log(JSON.parse(xhr.responseText));
          response.innerHTML = `
						<p><strong>URL:</strong> ${data.url}</p>
						<p><strong>Args:</strong></p>
						<ul>
						<li>${data.args}</li>
						</ul>
						`;
        }
      }
	  else {
		console.log("Error: ", xhr.status);
	  }
    };
    xhr.send();
  } else if (fetchAPI.checked) {
    fetch(url, {
      method: "GET",
    })
      .then((response) => response.json())
      .then((data) => {
        response.innerHTML = `
				<p><strong>URL:</strong> ${data.url}</p>
				<p><strong>Args:</strong></p>
				<ul>
				<li>${data.args}</li>
				</ul>
				`;
      });
  }
});

// PUT
putBtn.addEventListener("click", () => {
  const formData = new FormData();
  formData.append("id", articleForm.id.value);
  formData.append("article_name", articleForm.article_name.value);
  formData.append("article_body", articleForm.article_body.value);
  formData.append("date", getCurrentDate());

  const url = "https://httpbin.org/put";

  if (xmlHttp.checked) {
    const xhr = new XMLHttpRequest();
    xhr.open("PUT", url);
    xhr.send(formData);
    xhr.onreadystatechange = () => {
      if (xhr.readyState === 4 && xhr.status === 200) {
        const data = JSON.parse(xhr.responseText);
        console.log(JSON.parse(xhr.responseText));
        response.innerHTML = `
						  <p><strong>Form Data:</strong></p>
						  <ul>
							  <li>ID: ${data.form.id}</li>
							  <li>Article Name: ${data.form.article_name}</li>
							  <li>Article Body: ${data.form.article_body}</li>
							  <li>Date: ${data.form.date}</li>
						  </ul>
						  `;
      }
    };
  } else if (fetchAPI.checked) {
    fetch(url, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: articleForm.id.value,
        article_name: articleForm.article_name.value,
        article_body: articleForm.article_body.value,
        date: getCurrentDate(),
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("FETCH API PUT: ", data);
        response.innerHTML = `
				  <p><strong>Form Data:</strong></p>
				  <ul>
					  <li>ID: ${data.json.id}</li>
					  <li>Article Name: ${data.json.article_name}</li>
					  <li>Article Body: ${data.json.article_body}</li>
					  <li>Date: ${data.json.date}</li>
				  </ul>
				  `;
      });
  }
});

// DELETE
deleteBtn.addEventListener("click", () => {
  const url = "https://httpbin.org/delete";

  if (xmlHttp.checked) {
    const xhr = new XMLHttpRequest();
    xhr.open("DELETE", url);
    xhr.send();
    xhr.onreadystatechange = () => {
      if (xhr.readyState === 4 && xhr.status === 200) {
        const data = JSON.parse(xhr.responseText);
        console.log(JSON.parse(xhr.responseText));
        response.innerHTML = `
						<p><strong>URL:</strong> ${data.url}</p>
						<p><strong>Args:</strong></p>
						<ul>
						<li>${data.args}</li>
						</ul>
						`;
      }
    };
  } else if (fetchAPI.checked) {
    fetch(url, {
      method: "DELETE",
    })
      .then((response) => response.json())
      .then((data) => {
        response.innerHTML = `
				<p><strong>URL:</strong> ${data.url}</p>
				<p><strong>Args:</strong></p>
				<ul>
				<li>${data.args}</li>
				</ul>
				`;
      });
  }
});
