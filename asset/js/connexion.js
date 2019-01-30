$(document).ready(function () {
    
    $('#myForm').submit(function(){

        var userMdp = $('input[name=user_mdp]').val();
        var userId = $('input[name=user_identifiant]').val();
        var id = "Larry";
        var mdp = "football";

        if(userMdp == mdp && userId == id){
            return true;
        }else{
            var msg_id_incorrect = $('#msgId');
            msg_id_incorrect.text("Identifiant incorrect !");
            msg_id_incorrect.addClass('alert alert-danger');
            var msg_mdp_incorrect = $('#msgMdp');
            msg_mdp_incorrect.text("Mot de passe incorrect !");
            msg_mdp_incorrect.addClass('alert alert-danger');
            return false;
        };
    });

$('.container').css('margin-bottom', '100px');
//Footer
//var date = new Date();
//var annee = date.getFullYear();
//var footer = document.querySelector('footer');
//footer.innerHTML = "Copyright &copy; " + date.getFullYear() +  " - Réalisé par Telbois Larry";

});