import { emojiList } from "./emojis.js";

let emojiContainer = document.querySelector(".emoji-container");

const filters = Array.from(document.querySelectorAll("li"));

const searchInput = document.querySelector("input");

const form  = document.querySelector("form");

const mode = document.getElementById("mode");

const hider = document.getElementById("hider");

const body = document.querySelector("body");
displayEmojis(emojiList);

filters.forEach((filter) => {
  filter.addEventListener("click", (e)=>{
    const filterName = e.target.innerText.toLowerCase(); 
    
    const filteredEmojis = search(emojiList, filterName);
    
    displayEmojis(filteredEmojis)
  })
});

searchInput.addEventListener("keyup",(e)=>{
    let filterName = e.target.value.toLowerCase();
    let filteredEmojis = search(emojiList, filterName);
    displayEmojis(filteredEmojis);
})

form.addEventListener("submit",(e)=>{
    e.preventDefault();
    let filterName = searchInput.value.toLowerCase();
    let filteredEmojis = search(emojiList, filterName);
    searchInput.value = "";
    displayEmojis(filteredEmojis);
})

function displayEmojis(arr) {
    emojiContainer.innerHTML = "";
    const fragment = document.createDocumentFragment();
  
    arr.forEach((obj) => {
      const emoji = document.createElement("span");
      emoji.classList.add("emoji")
      emoji.innerText = obj.emoji;
      emoji.addEventListener("click", ()=>clickToCopy(emoji.innerText))
      fragment.append(emoji);
    });

    emojiContainer.append(fragment);
  }

function  clickToCopy(text){
    window.navigator.clipboard.writeText(text)
    .then(response => {
      alert("Emoji Copied Successfully");
      
    })
    .catch(e=>{
      alert("Something went wrong !")
    })
  }

function search(emojiList, filterName){
    if(filterName === "all"){
        return emojiList;
    }
  let arr =  emojiList.filter((obj)=>{
        if(obj.description.includes(filterName)) {
            return true
        }
        else if(obj.category.includes(filterName)){
            return true;
        }
        else if(obj.aliases.join("").includes(filterName)){
            return true;
        }
        else if(obj.tags.join("").includes(filterName)){
            return true;
        }

    })
    return arr;
}

mode.addEventListener("click", (e)=>{
    hider.classList.toggle("right-move");
    body.classList.toggle("dark-mode");
    searchInput.style.color = "black"
})



