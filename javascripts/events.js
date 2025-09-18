$(document).ready(function(){

  // Ações do usuário que mostram e/ou escondem o logotipo.
  // Por padrão, mostra no topo e fim da página.
  // Remova ou reescreva de acordo com o projeto.

  $(window).scroll(function(){

    var nav = $("nav");
    var scroll = $(window).scrollTop();

    // Mostra o nav quando a página está no topo
    if(scroll == 0){
      nav.fadeIn();
    //Mostra a nav quando a página chega no fim
   // } else if (scroll == $(document).height() - $(window).height()) {
      //nav.fadeIn();
    //Esconde a nav
    } else {
      nav.fadeOut();
    }

  });


//  for (var $x=$(".droppable-area1 li"), i=$x.length-1, j, temp; i>=0; i--) { j=Math.floor(Math.random()*(i+1)), temp=$x[i], $x[i]=$x[j], $x[j]=temp; }
//$x.each(function(i, li) { $(".droppable-area1").append(li); });

  // Volta uma etapa

  $(".etapa .voltarEtapa").on("click", function(){
    var etapaAtual = $(this).parents(".etapa");
    etapaAtual.hide();
    etapaAtual.prev(".etapa").fadeIn();
  })

  // Avança uma etapa ou mostra mensagem de erro

  $(".etapa .avancarEtapa").on("click", function(){
    var etapaAtual = $(this).parents(".etapa");
    if($(this).hasClass("habilitado")){
      etapaAtual.hide();
      etapaAtual.next(".etapa").fadeIn("slow");
    } else {
      etapaAtual.find(".mensagem-erro").fadeIn();
    }
  });


  $("#navOrientada .avancarEtapa").on("click", function(){
    $("#autoaval_orientada ol li").each(function(){
      var lengthChecked = $(this).find("input:checked").length;
      if(lengthChecked == 0){
        $(this).addClass("form-error");
      }
    });
  })

  // Clique nos botões de navegação entre etapas scrolla página para o topo

  $(".voltarEtapa, .avancarEtapa, .avancarEtapa3, .avancarEtapa4").on("click", function(){
    $('html,body').scrollTop(0);
  })

  // Aplica estilo na opção selecionada em Autoavaliação Espontânea

  $("input").on("click", function(){
    var formcheck = $(this).parent();
    if($(this).is(":checked")){
      formcheck.addClass("selecionado");
      formcheck.siblings().removeClass("selecionado");
    };
  });

  // Fixa labels da Autoavaliação orientada no scroll

  $("#autoaval_orientada .labels-header").stick_in_parent();

  // Volta ou avança perguntas da Autoavaliação Orientada

  $("#navPerguntas .avancarPergunta").on("click", function(){
    var perguntaAtual = $(".atual");
    // Verifica se respondeu
    var lengthChecked = perguntaAtual.find("input:checked").length;
    var mensagemErro = perguntaAtual.parent("ol").siblings(".mensagem-erro");
    // Se sim, avança
    if(lengthChecked != 0){
      mensagemErro.hide();
      perguntaAtual.removeClass("form-error atual");
      perguntaAtual.next("li").addClass("atual");
    // Se não, exibe erro
    } else {
      mensagemErro.show();
      perguntaAtual.addClass("form-error");
    }
    // Remove mensagem de erro quando o input é marcado
    $(".atual input").on("change", function(){
      mensagemErro.hide();
    })
    // Atualiza navegação
    atualizaNavPerguntas();
  });

  $("#navPerguntas .voltarPergunta").on("click", function(){
    var perguntaAtual = $(".atual");
    perguntaAtual.removeClass("atual");
    perguntaAtual.prev("li").addClass("atual");
    atualizaNavPerguntas();
  })

  // Se primeira pergunta ou última pergunta, exibe botão de navegação entre etapas

  function atualizaNavPerguntas(){
    $("#navPerguntas div:first-child").attr("class", "");
    if($(".atual").index() == 1){
      $("#navPerguntas div").addClass("inicio");
    } else if($(".atual").index() == $("#autoaval_orientada li").length - 1){
      $("#navPerguntas div").addClass("fim");
    } else {
      $("#navPerguntas div").addClass("meio");
    }
  }

  // Libera botão após todos os campos da etapa estarem preenchidos

  $("#autoaval_espontanea input").on("change", function(){
    $("#autoaval_espontanea .btn.avancarEtapa")
      .addClass("habilitado")
      .parents(".etapa").find(".mensagem-erro").fadeOut();
  })

  $("#autoaval_orientada input").on("change", function(){
    var lengthChecked = $("#autoaval_orientada input:checked").length;
    var lengthLi = $("#autoaval_orientada .input-group").length;
    if(lengthChecked == lengthLi){
      $("#autoaval_orientada .avancarEtapa")
        .addClass("habilitado")
        .parents(".etapa").find(".mensagem-erro").fadeOut();
    }
    $(this).parents("li").removeClass("form-error");

    // Atualiza barra de progresso da visualização para telas pequenas

    var perc_pergunta = 100/lengthLi;
    var perc_usuario = lengthChecked * perc_pergunta;
    $("#navPerguntas .barra-progresso > div").css("width", perc_usuario + "%");
  })

  // Clona opção selecionada em Autoavaliação Espontânea na Etapa de Análise do resultado

  $("#navEspontanea .btn").on("click", function(){
    $(".clone-espontanea .form-check").empty();
    $("#autoaval_espontanea .form-check.selecionado label").clone().appendTo(".clone-espontanea .form-check");
  })

  // No clique do botão ao final da Avaliação Orientada

  $("#autoaval_orientada .avancarEtapa").on("click", function(){

    // Define multiplicadores

    var multiplicador1 = 1;
    var multiplicador2 = 2;
    var multiplicador3 = 3;
    var multiplicador4 = 4;
    var multiplicador5 = 5;

    // Conta total de seleção de cada item e o multiplica pelo multiplicador correspondente

    function calcula_dimensao(dimensao){
      var n_option1 = $("#autoaval_orientada ." + dimensao + " input[value='option1']:checked").length;
      var n_option2 = $("#autoaval_orientada ." + dimensao + " input[value='option2']:checked").length;
      var n_option3 = $("#autoaval_orientada ." + dimensao + " input[value='option3']:checked").length;
      var n_option4 = $("#autoaval_orientada ." + dimensao + " input[value='option4']:checked").length;
      var n_option5 = $("#autoaval_orientada ." + dimensao + " [value='option5']:checked").length;

      var total_dimensao = n_option1 * multiplicador1 + n_option2 * multiplicador2 + n_option3 * multiplicador3 + n_option4 * multiplicador4 + n_option5 * multiplicador5;
      return total_dimensao;
    }

    // Soma o total de cada dimensão

    var total_disposicao = calcula_dimensao("dimensao-disposicao");
    var total_facilidade = calcula_dimensao("dimensao-facilidade");
    var total_reconhecimento = calcula_dimensao("dimensao-reconhecimento");
    var total_assertividade = calcula_dimensao("dimensao-assertividade");
    var total_competicao = calcula_dimensao("dimensao-competicao");
    var total_poder = calcula_dimensao("dimensao-poder");

    var total_orientada_usuario = total_disposicao + total_facilidade + total_reconhecimento + total_assertividade + total_competicao + total_poder;

    // Aponta nível do usuário de acordo com a soma total

    if(total_orientada_usuario >= 89){
      var nivel = "desenvolvida";
    } else if(total_orientada_usuario >= 56){
      var nivel = "moderada";
    } else if(total_orientada_usuario >= 24){
      var nivel = "inicial";
    } else {
      var nivel = "";
    }

    // Descobre o máximo total possível (número de perguntas * máximo multiplicador)

    var total_orientada_max = $("#autoaval_orientada li").length * multiplicador5;

    // Transforma total do usuário em porcentagem

    var porcentagem = total_orientada_usuario/total_orientada_max * 100;

    // Exibe porcentagem na barra de progresso da Parte 3

    $("#analise .barra-progresso > div").css("width", porcentagem + "%");


    

    // Exibe informações do nível na Parte 3

    $("#analise .nivel").text(nivel);
    $("#resposta_geral > div").removeClass("d-flex");
    $("#resposta_geral > div." + nivel).addClass("d-flex");

    // Atualiza gráficos das dimensões

    function atualiza_grafico(dimensao, total_dimensao){
      $(".quadro ." + dimensao + " .grafico > div").removeClass("filled");
      $(".quadro ." + dimensao + " .grafico > div:nth-child(-n+" + total_dimensao + ")").addClass("filled");
    }

    atualiza_grafico("disposicao", total_disposicao);
    atualiza_grafico("facilidade", total_facilidade);
    atualiza_grafico("reconhecimento", total_reconhecimento);
    atualiza_grafico("assertividade", total_assertividade);
    atualiza_grafico("competicao", total_competicao);
    atualiza_grafico("poder", total_poder);

  });

  // Libera resposta detalhada

  $(".btn-detalhada").on("click", function(){
    $("#resposta_detalhada").fadeIn("slow");
    $('html, body').animate({
      scrollTop: $("#resposta_detalhada").offset().top - 60
    }, 1000)
  })

  // Libera conclusão e popup de impressão

  $("#btnConclusao").on("click", function(){
    $(this).hide();
    $("#conclusao").fadeIn("slow");
    $('html, body').animate({
      scrollTop: $("#conclusao").offset().top - 60
    }, 1000)
    $(".popup").addClass("visible");
  })

  // Clique no link de impressão abre janela de impressão
  $(".imprimir").on("click", function(){
    window.print();
  });

});


  numero_questoes = 30;
  
  numero_alternativas = 5;
  
  parte1 = [];

  
  //Vai guardar os valores que o usuario marcar
  var total = [];
  
  for (var i = 0; i < numero_questoes; i++ ) {
    total[i] = 0;  
  }

$('.clicavel').on('input', function() {
    
    //Pega do atributo name, o número do pergunta.
    var pergunta = parseInt($(this).attr('name').substring(8,10));
    
    //Varifica pelo atributo value qual opção ele marcou.
    var marcou = parseInt($(this).attr('value').substring(6,7));
    
    //Guarda a soma de todos.
    var soma = 0;
    
    //Guarda neste array qual opção foi marcada, exemplo total[17] = 2,
    //quer dizer que na pergunta 17 ele marcou 2.
    total[pergunta-1] = marcou;
    
    var j = 0;
     
    //Soma o array.
    for (var i = 0; i < 31; i = i+5 ) {
      parte1[j] = total[i] + total[i+1] + total[i+2] + total[i+3] + total[i+4];
      j++;
      }
      
    var empresarial = parte1[0];
    var administrativo = parte1[1];
    var pratico = parte1[2];
    var intelectual = parte1[3];
    var criativo = parte1[4];
    var social = parte1[5];

	
	//Descobre qual é o maior valor entre os 6
	var maior = Math.max(parte1[0],parte1[1],parte1[2],parte1[3],parte1[4],parte1[5]);
	
	
	
	//Remove os contornos.
	for(j = 3 ; j < 9 ; j++){
	  $(".barra-progresso" + j.toString()).removeClass('contorno');
	}
	
	//Remove os /25 para atualizar depois.
	$('.empresarial').text("0 de 25");
	$('.administrativo').text("0 de 25");
	$('.pratico').text("0 de 25");
	$('.intelectual').text("0 de 25");
	$('.criativo').text("0 de 25");
	$('.social').text("0 de 25");
	
	
	//Verifica quais areas são às que estão com mais pontos e atualiza os contornos
	for( j = 0 ; j < 6 ; j++){
      if(parte1[j] == maior){
	    switch (j) {
          case 0:
			$(".barra-progresso3").addClass('contorno');
            break;
          case 1:
			$(".barra-progresso4").addClass('contorno');
            break;
          case 2:
			$(".barra-progresso5").addClass('contorno');
            break;
          case 3:
			$(".barra-progresso6").addClass('contorno');
            break;
          case 4:
			$(".barra-progresso7").addClass('contorno');
            break;
          case 5:
			$(".barra-progresso8").addClass('contorno');
        }	  
	  }
	}	
	
	//Preenche os /25
	if(empresarial != 0)
      $('.empresarial').text(empresarial + " de 25");
    if(administrativo != 0)
      $('.administrativo').text(administrativo + " de 25");
    if(pratico != 0)
      $('.pratico').text(pratico + " de 25");
    if(intelectual != 0)
      $('.intelectual').text(intelectual + " de 25");
    if(criativo != 0)
      $('.criativo').text(criativo + " de 25");
    if(social != 0)
      $('.social').text(social + " de 25");  
  
    //Ajustes da barra de progresso.
    $(".barra-progresso3 > div").css("width", empresarial*4 + "%");
    $(".barra-progresso4 > div").css("width", administrativo*4 + "%");
    $(".barra-progresso5 > div").css("width", pratico*4 + "%");
    $(".barra-progresso6 > div").css("width", intelectual*4 + "%");
    $(".barra-progresso7 > div").css("width", criativo*4 + "%");
    $(".barra-progresso8 > div").css("width", social*4 + "%");
    
    });


  //Vai guardar as opçoes da etapa 2.
  //parte2[0] - Prático.
  //parte2[1] - Intelectual.
  //parte2[2] - Criativo.
  //parte2[3] - Social.
  //parte2[4] - Empresarial.
  //parte2[5] - administrativo. 
  var parte2 = [0,0,0,0,0,0];
  
  var total100 = 0;
  
  //Vetor que guarda quais caixas foram marcadas.
  var caixas = []
  
  //Preenchimento do vetor caixas
  for(var i = 0; i< 15; i++)
  caixas[i] = false;

  $('.clicavel_2').click (function() {
  
  //Verifica se o botão já está clicado.
  clicado = $(this).hasClass('retangulo_cheio');
  
  //Verifica qual dos blocos é
  var bloquinho = $(this).attr('id').substring(8,10);
  
  //Verifica em qual caixa está
  var caixa = 'caixa' + bloquinho;
  
  //Verifica se marcou a opcao b ou a opcao a
  var opcao = $(this).attr('id').substring(11,12);
  
  //O conteúdo que foi marcado
  var conteudo = $(this).html();
  
  //Opcao que foi desmarcada.
  var desmarcado = '';
  
  //Preenche o retangulo que foi clicado.
  $(this).addClass('retangulo_cheio');
  
  //Troca a opcao, para poder desmarcar a outra opcao.
  if(opcao == 'a')
    opcao = 'b';
    else
    opcao = 'a';
  
    //Verifica qual das opções foi desmarcada.
  desmarcado = '#clicavel' + bloquinho + '_' + opcao;
  
  //Se já estiver clicado, não soma mais.
  if(!clicado){
  
      //Atualiza o array parte[2], somando o que foi marcado.
    switch (conteudo) {
        case 'Prático':
          parte2[0]++;
          break;
        case 'Intelectual':
          parte2[1]++;
          break;
        case 'Criativo':
          parte2[2]++;
          break;
        case 'Social':
          parte2[3]++;
          break;
        case 'Empresarial':
          parte2[4]++;
          break;
        case 'Administrativo':
          parte2[5]++;
      }
  }
  
  //Só vai subtrair o contador, se ele já foi marcado alguma vez.
  if ($(desmarcado).hasClass('retangulo_cheio')){
    //Atualiza o array parte[2], subtraindo o que desmarcado.
    switch ($(desmarcado).html()) {
        case 'Prático':
          parte2[0]--;
          break;
        case 'Intelectual':
          parte2[1]--;
          break;
        case 'Criativo':
          parte2[2]--;
          break;
        case 'Social':
          parte2[3]--;
          break;
        case 'Empresarial':
          parte2[4]--;
          break;
        case 'Administrativo':
          parte2[5]--;
      } 
    }
  
  //Tira o preenchimento do outro elemento do bloquinho.
  $(desmarcado).removeClass('retangulo_cheio');
  
  //Tirar o vermelho da caixa.
  $('#' + caixa).removeClass('selecao');
  $(".mensagem-erro").hide();
  
  //Atualiza o array de caixas, com as caixas que foram marcadas, mas apenas se for na fase 2.
  caixas[parseInt(bloquinho)-1] = true;

    //Remove os /5 para atualizar depois.
	$('.empresarial2').text("0 de 5");
	$('.administrativo2').text("0 de 5");
	$('.pratico2').text("0 de 5");
	$('.intelectual2').text("0 de 5");
	$('.criativo2').text("0 de 5");
	$('.social2').text("0 de 5"); 
  
    //Remove os contornos.
	for(j = 9 ; j < 15 ; j++){
	  $(".barra-progresso" + j.toString()).removeClass('contorno');
	}
  
    //Verifica qual foi a pontuação máxima
    var maior = Math.max(parte2[0],parte2[1],parte2[2],parte2[3],parte2[4],parte2[5]);
   
  	//Verifica quais areas estão com a pontuação máxima e atualiza os contornos.
	//Em caso de empate, preenche os dois.
	for( j = 0 ; j < 6 ; j++){
      if(parte2[j] == maior){
	    switch (j) {
          case 0:
			$(".barra-progresso11").addClass('contorno');
            break;
          case 1:
			$(".barra-progresso12").addClass('contorno');
            break;
          case 2:
			$(".barra-progresso13").addClass('contorno');
            break;
          case 3:
			$(".barra-progresso14").addClass('contorno');
            break;
          case 4:
			$(".barra-progresso9").addClass('contorno');
            break;
          case 5:
			$(".barra-progresso10").addClass('contorno');
        }	  
	  }
	}

    var empresarial2 = parte2[4];
	var pratico2 = parte2[0];
    var administrativo2 = parte2[5];
    var intelectual2 = parte2[1];
    var criativo2 = parte2[2];
    var social2 = parte2[3];


   
	//Preenche as barrinhas;
    $(".barra-progresso9 > div").css("width", empresarial2*20 + "%");
    $(".barra-progresso10 > div").css("width", administrativo2*20 + "%");
    $(".barra-progresso11 > div").css("width", pratico2*20 + "%");
    $(".barra-progresso12 > div").css("width", intelectual2*20 + "%");
    $(".barra-progresso13 > div").css("width", criativo2*20 + "%");
    $(".barra-progresso14 > div").css("width", social2*20 + "%");
	

	
	//Preenche os /5
	if(empresarial2 != 0)
      $('.empresarial2').text(empresarial2 + " de 5");
    if(administrativo2 != 0)
      $('.administrativo2').text(administrativo2 + " de 5");
    if(pratico2 != 0)
      $('.pratico2').text(pratico2 + " de 5");
    if(intelectual2 != 0)
      $('.intelectual2').text(intelectual2 + " de 5");
    if(criativo2 != 0)
      $('.criativo2').text(criativo2 + " de 5");
    if(social2 != 0)
      $('.social2').text(social2 + " de 5"); 
  

  });


  

   $(".avancarEtapa3").on("click", function(){
    var etapaAtual = $(this).parents(".etapa");
  total100 = parte2[0] + parte2[1]  + parte2[2] + parte2[3] +  parte2[4] +  parte2[5];
  if(total100==15){
      etapaAtual.hide();
      etapaAtual.next(".etapa").fadeIn("slow");
      draw();
    }
  
  //Marca de vermelho as caixas que não foram marcadas.
  for(var i = 0 ; i < 15 ; i++){
    if(!caixas[i]){
    if(i < 9) 
          $('#' + 'caixa' + '0' + (i+1).toString()).addClass('selecao');
        else
        $('#' + 'caixa' + (i+1).toString()).addClass('selecao');
        etapaAtual.find(".mensagem-erro").fadeIn();
    }   
  }
  
  });

 $(".etapa .voltarEtapa3").on("click", function(){
    var etapaAtual = $(this).parents(".etapa");
    etapaAtual.hide();
    etapaAtual.prev(".etapa").fadeIn();
  })

  $(".etapa .voltarEtapa4").on("click", function(){
    var etapaAtual = $(this).parents(".etapa");
    etapaAtual.hide();
    etapaAtual.prev(".etapa").fadeIn();
  })

  $(".etapa .voltarEtapa5").on("click", function(){
    var etapaAtual = $(this).parents(".etapa");
    etapaAtual.hide();
    etapaAtual.prev(".etapa").fadeIn();
  })

  $(".fase2").on("click", function(){
    total100 = parte2[0] + parte2[1]  + parte2[2] + parte2[3] +  parte2[4] +  parte2[5];
    var perc_usuario2 = total100 * 6.7;
    $(".barra-progresso2 div").css("width", perc_usuario2 + "%");
   }); 

  $(".avancarEtapa4").on("click", function(){
     var etapaAtual = $(this).parents(".etapa");
      etapaAtual.hide();
      etapaAtual.next(".etapa").fadeIn("slow");
  });

$(".imprimir").click(function(){
  window.print();
  return false;
     });


$('.one').click(function() {
        $('.um').toggleClass('rotated');
    });

$('.two').click(function() {
        $('.dois').toggleClass('rotated');
    });

$('.three').click(function() {
        $('.tres').toggleClass('rotated');
    });

$('.four').click(function() {
        $('.quatro').toggleClass('rotated');
    });

$('.five').click(function() {
        $('.cinco').toggleClass('rotated');
    });

$('.six').click(function() {
        $('.seis').toggleClass('rotated');
    });

$('.seven').click(function() {
        $('.sete').toggleClass('rotated');
    });

$(".avancarEtapa5").click(function(){
   window.location.replace('index.html');
     });
	
function draw(){
    
    var canvas = document.getElementById("canvas1");
      ctx = canvas.getContext("2d");

      canvas.width = 1090;
      canvas.height = 950;
    
      var background = new Image();
    
      background.src = "assets/mapa3.png";

      background.onload = function(){
        ctx.drawImage(background,0,0);   
      }
    
    var fase1 = [];
    var fase2 = [];
    
    //Origem do plano cartesiano.
    origem = [540,450];
    
    //O primeiro ponto de referência, onde o eixo 'x' se encontra com a primeira bola.
    primeiro_ponto = [624,450];
     
    //Posicionamento dos pontos, preenche o array fase2.
    for( i = 0 ; i < 6 ; i++){
     
    //Variaveis auxiliares para realizar troca de valores. 
      var aux_1;
    var aux_2;
    var aux_3;
    //Angulo de rotação
    var angulo_1;
    var angulo_2;
    
    if(parte1[i] <= 6)
      aux_3 = 0;
      else
      aux_3 = parte1[i]-6;
    
    //Pega o primeiro ponto e faz o incremento de acordo com os valores preenchidos pelo usuario.
      aux_1 = [primeiro_ponto[0] + Math.floor(11.2*aux_3) , primeiro_ponto[1]];
    aux_2 = [primeiro_ponto[0] + 40*parte2[i], primeiro_ponto[1]];
    
    //Verifica quanto vai ser o angulo de rotacao.
    switch (i) {
          case 0:
            angulo_1 = 142; //emp//
      angulo_2 = 355; //prático
            break;
          case 1:
            angulo_1 = 50; //adm//
      angulo_2 = 300; //intelectual
            break;
          case 2:
            angulo_1 = 0;   //prat//
      angulo_2 = 220; //criativo
            break;
          case 3:
            angulo_1 = 310;  //intel//
      angulo_2 = 175; //social
            break;
          case 4:
            angulo_1 = 225; //criat
      angulo_2 = 137;  //empresarial
            break;
          case 5:
            angulo_1 = 180;  //social
      angulo_2 = 45; //administrativo//
        }
    //Faz a rotacao dos pontos.
      aux_1 = rotate(origem[0] , origem[1] , aux_1[0] , aux_1[1] , angulo_1);
    aux_2 = rotate(origem[0] , origem[1] , aux_2[0] , aux_2[1] , angulo_2);
    //Preenche o array fase2.
    fase1.push(aux_1);
    fase2.push(aux_2);
      }
    
    
    //Faz o desenho 1.
    ctx.beginPath();
      //Posiciona no primeiro ponto
      ctx.moveTo(fase1[0][0],fase1[0][1]);
    
      //Cria as linhas do primeiro até o último ponto
      for( var i=1 ; i < 6 ;i++){
        ctx.lineTo(fase1[i][0],fase1[i][1]);
      }
    
      //Liga o último ponto ao primeiro.
      ctx.lineTo(fase1[0][0],fase1[0][1]);
    ctx.lineWidth = 2.5;
      //Faz o traçado.
      ctx.stroke();

    
    
      //Faz o desenho 2
      ctx.beginPath();
      //Posiciona no primeiro ponto
      ctx.moveTo(fase2[0][0],fase2[0][1]);
    
      //Cria as linhas do primeiro até o último ponto
      for( var i=1 ; i<6 ;i++){
      ctx.setLineDash([5, 5]);
        ctx.lineTo(fase2[i][0],fase2[i][1]);
      }
    
      //Liga o último ponto ao primeiro.
      ctx.lineTo(fase2[0][0],fase2[0][1]);
    
      //Faz o traçado.
    ctx.lineWidth = 2.5;
      ctx.stroke();

    
    //Desenha os pontos.
    for( i=0 ; i<6 ;i++){
      //Desenha as bolinhas para o desenho 1.
        ctx.beginPath();
        ctx.arc(fase1[i][0], fase1[i][1], 5, 0, 2 * Math.PI);
        ctx.fill();

    //Desenha os triângulos para o desenho 2
    ctx.beginPath();
    ctx.moveTo(fase2[i][0],fase2[i][1]);
    ctx.lineTo(fase2[i][0],fase2[i][1]-7);
    ctx.lineTo(fase2[i][0]-6,fase2[i][1]+7);
    ctx.lineTo(fase2[i][0]+6,fase2[i][1]+7);
    ctx.lineTo(fase2[i][0],fase2[i][1]-7);
    ctx.fill();
    }
      
  }
  
  //Funcao para fazer a rotacao dos elementos.
    function rotate(cx, cy, x, y, angle) {
      var radians = (Math.PI / 180) * angle,
      cos = Math.cos(radians),
      sin = Math.sin(radians),
      nx = (cos * (x - cx)) + (sin * (y - cy)) + cx,
      ny = (cos * (y - cy)) - (sin * (x - cx)) + cy;
      return [nx, ny];
    } 