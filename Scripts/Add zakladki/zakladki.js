/***************************************
 * ZAKLADKI
 **************************************/
const BOOKMARKS_NAME = '_any_unique_for_this_domain';function getBookmarks() {
let bookmarks = localStorage.getItem(BOOKMARKS_NAME);
bookmarks = !bookmarks ? "[]" : bookmarks;return JSON.parse(bookmarks);}
function setBookmarks(bookmarks) {
localStorage.setItem(BOOKMARKS_NAME, JSON.stringify(bookmarks)); } 
function createBookmarks() {
let bookmarks = getBookmarks();const bookmarksDiv = document.querySelector('.zakladki');const ul = bookmarksDiv.querySelector('ul');ul.innerHTML = '';bookmarks.map((bookmark) => { 
const li = document.createElement('li');
const aBkm = document.createElement('a');
aBkm.href = bookmark.link;
aBkm.innerText = bookmark.header;
li.appendChild(aBkm);
const space = document.createElement('span');space.innerHTML = '&nbsp;';li.appendChild(space);
const aDel = document.createElement('a');console.log(bookmark.id)
aDel.href = `javascript:delItem("${bookmark.id}")`;aDel.innerText = 'удалить';li.appendChild(aDel);
ul.appendChild(li);});}			
window.onload = () => {
createBookmarks();};function add(e) {
const targetButton = e.target;const parentElement = targetButton.parentElement;const id = parentElement.getAttribute('id');const span = parentElement.querySelector('span');const link = span.innerText;
    const h3 = parentElement.querySelector('h3');const header = h3.innerText;
let bookmarks = getBookmarks();
const checkBookmarks = bookmarks.some((bookmark) => bookmark.id === id);if (checkBookmarks) {
alert('Закладка добавлена ранее');return;}
bookmarks.push({
id,
link,
header,
})
setBookmarks(bookmarks);createBookmarks();}
function delItem(id) {
const bookmarks = getBookmarks();
let newBookmarks = bookmarks.map((bookmark) => {
if (bookmark.id !== id) return bookmark;
return undefined;});newBookmarks = newBookmarks.filter((bookmark) => bookmark !== undefined);setBookmarks(newBookmarks);createBookmarks();}