/**
 * Created by Artiom on 28.09.2014.
 */
$(document).ready(function() {
    $('.error').hide();
    //момент нажатия кнопки ADD и проверка заполненности формы
    $('#add').click( function addPerson() {
        var newName = $('#inputName').val();
        var newSurname = $('#inputSurname').val();
        var newPatronymic = $('#inputPatronymic').val();
        var newtTel = $('#inputTel').val();
        var newEmail=$('#inputEmail').val();
        //если форма пустая, вывести предупреждение
        if (newName === '' || newSurname === '' || newPatronymic === '' || newtTel === '' || newEmail === '') {
            $('.success').hide();
            $('.error').fadeIn('fast').delay(2000).fadeOut(function(){
                $('.success').show();
            });
            return false;
        }
        //создание объекта Person
        var person={
            name:newName,
            surname:newSurname,
            patronymic:newPatronymic,
            tel:newtTel,
            email:newEmail
        }
        // добавление данных в список
        var newPerson = "<li> <b>ФИО:</b> "+person.name+" "+person.surname+" "+person.patronymic+" <b>Телефон:</b> "+person.tel+" <b>Email:</b> "+person.email+"</li>"
        $('#directory').prepend(newPerson);
        $('#form')[0].reset();
        var key = localStorage.length;
        localStorage.setItem(key, JSON.stringify(newPerson));
    });
        // проварка, есть ли у нас что нибудь в localStorage
    function viewlocalStorage(){
      if (localStorage) {
        for (i = 0; i < localStorage.length; i++) {
          var newPerson = JSON.parse(localStorage.getItem(i));
          $('#directory').prepend(newPerson);
          }
      }
    }
    viewlocalStorage();
    // очистить localStorage
    $('#clear').click(function() {
        $("#directory").empty();
        window.localStorage.clear();
    });

    //интерактивный поиск в списке
         $('#inputValue').keyup(function() {
             $("#directory").empty();
             var newValue = $('#inputValue').val();
             if(newValue != " ") {
                 for (i = 0; i < localStorage.length; i++) {//цикл перебора ключей локал стореджа
                     var newPerson = JSON.parse(localStorage.getItem(i));
                     var newPos = newPerson.indexOf(newValue);
                     if (newPos > -1) {
                         $('#directory').prepend(newPerson);
                     }
                 }
             } else if(newValue = " ") viewlocalStorage();

         });
});
