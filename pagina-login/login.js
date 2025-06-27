function logar(){
  var login = document.getElementById('usuario').value;
  var senha = document.getElementById('senha').value;

  if(login == 'admin' && senha == '1234'){
  alert('sucesso')
  location.href = "../pagina-adm/admin-pag.html" ;
}
else{
  alert('usuario ou senha incorretos') ;
}


}