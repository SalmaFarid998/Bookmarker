var bookmarkInput = document.getElementById("bookmarkName").value;
var bookmarkUrl = document.getElementById("bookmarkUrl").value;


var bookmarks = [];




bookmarkRegex = /^[\w ]{2,}$/
urlRegex= /(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,})/gi//;

if (localStorage.getItem("bookmarks") != null) {
    bookmarks = JSON.parse(localStorage.getItem("bookmarks"))   
}
displayBookmarks()

function addBookmark(){
     bookmarkInput = document.getElementById("bookmarkName").value;
     bookmarkUrl = document.getElementById("bookmarkUrl").value;
    if(bookmarkRegex.test(bookmarkInput)&&urlRegex.test(bookmarkUrl)){
        var bookmark ={
            name: "",
            url: ""
        }
        bookmark.name = bookmarkInput;
        bookmark.url = bookmarkUrl;
        bookmarks.push(bookmark);
        console.log(bookmarks);
        localStorage.setItem("bookmarks", JSON.stringify(bookmarks));
        displayBookmarks();
        closeForm();
        emptyForm();
    }else{
        alert("Please only use letters and spaces for the name with a valid URL")
    }       
}

function displayBookmarks() {
    if(bookmarks.length == 0){
        document.getElementById("bookmarksDisplay").innerHTML = "Click the add icon to start adding your bookmarks!"
    }else{
    var display = ""
    for (var i = 0; i < bookmarks.length; i++) {
        display += `
        <div class="bookmark">
        <button class="deletebtn" onclick="deleteBookmark(${i})"><i class="fa-solid fa-xmark ">
        </i></button>
        <a target="_blank" href="${bookmarks[i].url}"><img src="https://www.google.com/s2/favicons?domain=${bookmarks[i].url}">  ${bookmarks[i].name}</a>
    </div>`
    }

    document.getElementById("bookmarksDisplay").innerHTML = display
}}


function deleteBookmark(index) {
    const swalWithBootstrapButtons = Swal.mixin({
        customClass: {
            confirmButton: "btn",
            cancelButton: "btn"
        },
        buttonsStyling: false
    });

    swalWithBootstrapButtons.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Delete",
        cancelButtonText: "Cancel",
        reverseButtons: true
    }).then((result) => {
        if (result.isConfirmed) {
            bookmarks.splice(index, 1)
            displayBookmarks()
            localStorage.setItem("bookmarks", JSON.stringify(bookmarks))
            swalWithBootstrapButtons.fire({
                title: "Deleted!",
                text: "Your bookmarks has been deleted.",
                icon: "success"
            });
        } else if (
            /* Read more about handling dismissals below */
            result.dismiss === Swal.DismissReason.cancel
        ) {
            swalWithBootstrapButtons.fire({
                title: "Cancelled",
                text: "Operation Cancelled",
                icon: "error"
            });
        }
    });
}

function openForm() {
    document.getElementById("myForm").style.display = "block";
    emptyForm();
  }
  
  function closeForm() {
    document.getElementById("myForm").style.display = "none";
  }

function emptyForm(){
    document.getElementById("bookmarkName").value = "";
    document.getElementById("bookmarkUrl").value = "";
}

