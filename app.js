let listes = []
let testListes = [
    {
        "name": "Danser",
        "elements": [
            "Zouk",
            "Chacha"
        ]
    },        {
        "name": "Devoir IPI",
        "elements": [
            "Apprendre Ajax",
            "Etudier Javascript"
        ]
    },
    {
        "name": "Perso",
        "elements": [
            "Se lever",
            "Se doucher"
        ]
    }
]

function createAccount (login, password) {
  $.ajax({
    url: "http://92.222.69.104:80/todo/create/" +
    login +
    "/" +
    password,
    type: "GET"
  }).done(function(response) {
  });
};
function getLists (login, password) {
  $.ajax({
    url: "http://92.222.69.104:80/todo/listes/",
    type: "GET",
    headers: {
      "login":login,
      "password":password
    }
  }).done(function(response) {
    listes = showLists(response.todoListes);
  });
};
function modifyList(json) {
  $.ajax({
    type: 'POST',
    headers: {
      "Content-Type": "application/json; charset=utf-8",
      "login":$('#login-input').val(),
      "password":$('#password-input').val()
    },
    data: JSON.stringify(json),
    url: "http://92.222.69.104:80/todo/listes"
  }).done(function(data) {
  })
}

function showLists (listes) {
  $('#list-menu').empty();
  // Affiche les listes
  for (var index in listes) {
    // Get name
    let listName = listes[index].name;
    // Stock le html d'un h2 liste dans une div
    let html = "<div><h2>"+listName+"</h2><ul></ul></div>";
    // Affiche ce html
    $('#list-menu').append(html);
    let supprBtn = "<button class='suppr-btn' data-element='"+index+"'>x</button>"
    $('#list-menu div:last-child h2').append(supprBtn);
    $('#list-menu div:last-child h2 button').click(function(){
      let clickedTitleIndex = $(this).attr('data-element')
      listes.splice(clickedTitleIndex, 1);
      showLists(listes)
    });
    //
    // Preparation du deuxieme loop
    //
    // Stock les éléments
    let elements = listes[index].elements;
    // Itère dans les éléments
    for (var elementIndex in elements) {
      // Défini element sur l'iteration actuelle
      let element = elements[elementIndex];
      // Stock le html d'un li avec element
      let html = "<li>"+element+"</li>";
      // Affiche ce html
      $('#list-menu div:last-child ul:last-child').append(html);
      // Stock le html
      let supprBtn = "<button class='suppr-btn' data-element='"+elementIndex+"'>x</button>"
      // Ajoute le bouton dans le dernier li de la dernier div
      $('#list-menu div:last-child li:last-child').append(supprBtn);
      $('#list-menu div:last-child li:last-child button').click(function(){
        let clickedElementIndex = $(this).attr('data-element')
        elements.splice(clickedElementIndex, 1);
        showLists(listes)
      });
    }
    let input = "<input class='input element-name' data-list="+index+" type='text'>"
    $('#list-menu').append(input);
    let button = "<button class='button element-name' data-list='"+index+"'>+</button>"
    $('#list-menu').append(button);

    $('[class="button element-name"][data-list="'+index+'"]').click(function(){
      let clickedIndex = $(this).attr('data-list')
      let inputEle = $('[class="input element-name"][data-list="'+clickedIndex+'"]').val();
      elements.push(inputEle);
      showLists(listes)
    });
  }
  index ++;
  $('#list-menu').append('<div></div>');
  let input = "<input id='list-input' data-list="+index+" type='text' place-holder='Nouvelle liste'>"
  $('#list-menu div:last-child').append(input);
  let button = "<button class='button list-name' data-list='"+index+"'>+</button>"
  $('#list-menu div:last-child').append(button);
  $('[class="button list-name"][data-list="'+index+'"]').click(function(){
    let clickedIndex = $(this).attr('data-list')
    let inputListe = $('#list-input').val();
    newListe = {"name": inputListe, "elements": []}
    console.log(newListe);
    listes.push(newListe);
    showLists(listes)
  });
  return listes;
};

$('#create-user-button').click(function(){
  login = $('#login-input').val()
  password = $('#password-input').val()
  createAccount(login, password);
});
$('#get-list-button').click(function(){
  login = $('#login-input').val()
  password = $('#password-input').val()
  getLists(login, password);
});
$('#update-list-button').click(function(){
  let json = {
      "utilisateur": $('#login-input').val(),
      "password": $('#password-input').val(),
      "todoListes": listes
  }
  modifyList(json);
  alert("Vos listes ont bien été mises à jour.")
});
