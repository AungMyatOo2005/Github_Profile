const APIURL = "https://api.github.com/users/";
const main = document.getElementById("main");
const form = document.querySelector("form");
const search = document.querySelector(".search-user");
async function getUser(user) {
  const res = await fetch(APIURL + user);
  const resData = await res.json();
  createUserCard(resData);
  getRepo(user);
}
getUser("AungMyatOo2005");
async function getRepo(user) {
  const res = await fetch(APIURL + user + "/repos");
  const resData = await res.json();
  addRepoCard(resData);
}
function createUserCard(user) {
  const cardHtml = `
    <img src=${user.avatar_url} alt=${user.name}/>
    <div class="content-box">
        <h2>${user.name}</h2>
        <p>${user.bio}</p>
        <ul>
          <li><strong>Followers</strong>${user.followers}</li>
          <li><strong>Following</strong>${user.following}</li>
          <li><strong>Repos</strong>${user.public_repos}</li>
        </ul>
        <div id="repos"></div>
    </div>
    `;
  main.innerHTML = cardHtml;
}
function addRepoCard(data) {
  const reposEl = document.getElementById("repos");
  data
    .sort((a, b) => b.stargazers_count - a.stargazers_count)
    .slice(0, 10)
    .map((repoData) => {
      const repoEl = document.createElement("a");
      console.log("lol");
      repoEl.classList.add("repo");
      repoEl.href = repoData.html_url;
      repoEl.target = "_blank";
      repoEl.innerText = repoData.name;
      reposEl.appendChild(repoEl);
    });
}
form.addEventListener("submit", (e) => {
  e.preventDefault();
  const user = search.value;
  if (user) {
    main.innerHTML = "";
    getUser(user);
    search.value = "";
  }
});
