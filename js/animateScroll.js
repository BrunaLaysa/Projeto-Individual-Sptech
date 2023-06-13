window.addEventListener('scroll', function() {
    var sections = document.querySelectorAll('section');
    
    sections.forEach(function(section) {
      var sectionTop = section.offsetTop;
      var sectionHeight = section.offsetHeight;
      var scrollTop = window.scrollY;
      var windowHeight = window.innerHeight;
      
      if (scrollTop >= sectionTop - windowHeight + (sectionHeight / 2)) {
        section.classList.add('fade');
      } else {
        section.classList.remove('fade');
      }
    });
  });

let btnLogin = document.getElementById('btn_login')

var login = document.getElementById('email')

var senha = document.getElementById('senha')

var valorLogin = login.value;

var valorSenha = senha.value;

btnLogin.addEventListener('click', ()=> {
  console.log(login);
  console.log(senha);

  if(valorLogin === '' || valorSenha === ''){
    window.alert('Oopa')
  }
  else{
    window.location.href = 'User/PaginaInicial.html'
  }
})