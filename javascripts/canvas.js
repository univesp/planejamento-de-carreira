	
	function draw(){
	  
	  var canvas = document.getElementById("canvas1"),
    ctx = canvas.getContext("2d");

canvas.width = 1090;
canvas.height = 950;


var background = new Image();
background.src = "assets/mapa2.svg";

background.onload = function(){
    ctx.drawImage(background,0,0);   
}
	  
	  
	  //Origem do plano cartesiano.
	  origem = [354,361];
	  
	  //O primeiro ponto de referência, onde o eixo 'x' se encontra com a primeira bola.
	  primeiro_ponto = [425,361];
	  
	  //Array para simular a parte 1
	  var parte1 = [10,9,5,4,3,6];
	  
	  //Array pra simular a parte 2.
	  var parte2 = [2,2,4,2,5,6];
	  
	  //Array para guardar os pontos da fase 1
	  fase1 = [];
	  
	  //Array para guardar os pontos da fase 2
	  fase2 = [];
	  
	  //Posicionamento dos pontos, preenche o array fase2
	  for( i=0 ; i < 6 ; i++){
	    var aux_1;
		var aux_2;
		//Angulo de rotação
		var angulo_1;
		var angulo_2;
		//Pega o primeiro ponto e faz o incremento de acordo com os valores preenchidos pelo usuario.
	    aux_1 = [primeiro_ponto[0]+(18*(parte1[i])) , primeiro_ponto[1]];
		aux_2 = [primeiro_ponto[0]+(30*(parte2[i])) , primeiro_ponto[1]];
		
		//Verifica quanto vai ser o angulo de rotacao.
		switch (i) {
          case 0:
            angulo_1 = 10;
			angulo_2 = 350;
            break;
          case 1:
            angulo_1 = 55;
			angulo_2 = 35;
            break;
          case 2:
            angulo_1 = 145;
			angulo_2 = 125;
            break;
          case 3:
            angulo_1 = 190;
			angulo_2 = 170;
            break;
          case 4:
            angulo_1 = 235;
			angulo_2 = 215;
            break;
          case 5:
            angulo_1 = 325;
			angulo_2 = 305;
        }
		//Faz a rotacao dos pontos.
	    aux_1 = rotate(origem[0] , origem[1] , aux_1[0] , aux_1[1] , angulo_1);
		aux_2 = rotate(origem[0] , origem[1] , aux_2[0] , aux_2[1] , angulo_2);
		//Preenche o array fase2.
		fase1.push(aux_1);
		fase2.push(aux_2);
      }
		
	  ctx.beginPath();
	    //Posiciona no primeiro ponto
	    ctx.moveTo(fase1[0][0],fase1[0][1]);
	  
	    //Cria as linhas do primeiro até o último ponto
	    for( var i=1 ; i<6 ;i++){
	      ctx.lineTo(fase1[i][0],fase1[i][1]);
	    }
	  
	    //Liga o último ponto ao primeiro.
	    ctx.lineTo(fase1[0][0],fase1[0][1]);
	  
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
	    ctx.stroke();

	  
	  //Cria as bolinhas.
	  for( i=0 ; i<6 ;i++){
	    ctx.beginPath();
        ctx.arc(fase1[i][0], fase1[i][1], 5, 0, 2 * Math.PI);
        ctx.fill();
	    ctx.beginPath();
        ctx.arc(fase2[i][0], fase2[i][1], 5, 0, 2 * Math.PI);
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
	


    
	  