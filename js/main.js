(function(){
    "use strict";
    var regalo = document.getElementById('regalo');
    document.addEventListener('DOMContentLoaded',function(){
        
        var map = L.map('mapa').setView([-2.118446, -79.943084], 17);

        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        }).addTo(map);

        L.marker([-2.118446, -79.943084]).addTo(map)
        .bindPopup('Encuentranos aquí.<br> Punto de Venta disponible.')
        .openPopup();


        //campos datos usuario
        var nombre = document.getElementById('nombre');
        var apellido = document.getElementById('apellido');
        var email = document.getElementById('email');
        //campos pase
        var pase_dia = document.getElementById('pase_dia');
        var pase_dosdia = document.getElementById('pase_dosdias');
        var pase_completo = document.getElementById('pase_completo');

        //botones y divs
        var calcular = document.getElementById('calcular');
        var errorDiv = document.getElementById('error');
        var botonRegistro = document.getElementById('btnRegistro');
        var lista_productos = document.getElementById('lista-productos');
        var suma = document.getElementById('suma-total');

        //extras
        var etiquetas = document.getElementById('etiquetas');
        var camisas = document.getElementById('camisa_evento');

        if(document.getElementById('calcular')){
        calcular.addEventListener('click', calcularMontos);


        pase_dia.addEventListener('blur', mostrarDias);
        pase_dosdias.addEventListener('blur', mostrarDias);
        pase_completo.addEventListener('blur', mostrarDias);

        nombre.addEventListener('blur', validarCampos);
        apellido.addEventListener('blur', validarCampos);
        email.addEventListener('blur', validarCampos);
        email.addEventListener('blur', validarMail);
        function validarCampos(){
            if(this.value ==''){
                errorDiv.style.display='block';
                errorDiv.innerHTML="este campo es obligatorio";
                this.style.border = "1px solid red";
                errorDiv.style.border = "1px solid red";
            }else{
                errorDiv.style.display = 'none';
                this.style.border = '1px solid #cccccc'
            }
        }
        function validarMail(){
            if(this.value.indexOf("@") > -1){
                errorDiv.style.display ='none';
                this.style.border ='1px solid #cccccc';
            }else{
                errorDiv.style.display='block';
                errorDiv.innerHTML="debe ingresar un email valido";
                this.style.border = "1px solid red";
                errorDiv.style.border = "1px solid red";
            }
        }

        function calcularMontos(event){
            event.preventDefault();
            if(regalo.value === ''){
                alert("Debe elegir un regalo");
            }else{
                var boletosDia = parseInt(pase_dia.value, 10)|| 0,
                    boletos2Dias = parseInt(pase_dosdia.value, 10)|| 0,
                    boletosCompleto = parseInt(pase_completo.value, 10)|| 0,
                    cantCamisas = parseInt(camisas.value, 10)|| 0,
                    cantEtiquetas = parseInt(etiquetas.value, 10)|| 0;


                var totalPagar = (boletosDia * 30) + (boletos2Dias * 45) + (boletosCompleto * 50) + ((cantCamisas * 10) * .93) + (cantEtiquetas * 2);
                
                var listadoProductos = [];

                if(boletosDia >=1){
                    listadoProductos.push(boletosDia +' Pases por dia');
                }
                if(boletos2Dias >=1){
                    listadoProductos.push(boletos2Dias +' Pases por 2 dias');
                }
                if(boletosCompleto >= 1){
                    listadoProductos.push(boletosCompleto +' Pases Completos');
                }
                if(cantCamisas >= 1){
                    listadoProductos.push(cantCamisas +' Camisas');
                }
                if(cantEtiquetas >= 1){
                    listadoProductos.push(cantEtiquetas +' Etiquetas');
                }
                lista_productos.style.display = "block";
                lista_productos.innerHTML = '';
                for(var i =0; i<listadoProductos.length; i++){
                    lista_productos.innerHTML += listadoProductos[i] + '<br/>';
                }
                suma.innerHTML = "$ "+totalPagar.toFixed(2);
            }

        }

        function mostrarDias(){
            var boletosDia = parseInt(pase_dia.value, 10)|| 0,
                    boletos2Dias = parseInt(pase_dosdia.value, 10)|| 0,
                    boletosCompleto = parseInt(pase_completo.value, 10)|| 0;

            var diasElegidos=[];

            if(boletosDia > 0){
                diasElegidos.push('viernes');
            }
            if(boletos2Dias > 0){
                diasElegidos.push('viernes','sabado');
            }
            if(boletosCompleto > 0){
                diasElegidos.push('viernes','sabado','domingo');
            }
            for(var i =0; i<diasElegidos.length; i++){
            document.getElementById(diasElegidos[i]).style.display='block';
            }
        }

    }
    }); //dom content loaded
})();
    
    $(function(){
            //Letering 

        $('.nombre-sitio').lettering();
            //MENU FIJO
            var windowHeight = $(window).height();
            var barraAltura = $('.barra').innerHeight();
            $(window).scroll(function(){
                var scroll = $(window).scrollTop();
            if (scroll > windowHeight){
                $('.barra').addClass('fixed');
                $('body').css({'margin-top': barraAltura+'px'});
            }else{
                $('.barra').removeClass('fixed');
                $('body').css({'margin-top': '0px'});
            }
                
            });

            //MEnu Hamburguesa

            $('.menu-movil').on('click',function(s){
                $('.navegacion-principal').slideToggle();
            });
        
            //programa de conferencia
            $('.programa-evento .info-curso:first').show();
            $('.menu-programa a').addClass('activo');

            $('.menu-programa a').on('click',function(){
                $('.menu-programa a').removeClass ('activo');
                $(this).addClass('activo');
            $('.ocultar').hide();
                var enlace = $(this).attr('href');
                $(enlace).fadeIn(1000);
                return false;
            });
        

            //Animaciones para numeros

            $('.resumen-evento li:nth-child(1) p').animateNumber({number: 6}, 1300);
            $('.resumen-evento li:nth-child(2) p').animateNumber({number: 15}, 1000);
            $('.resumen-evento li:nth-child(3) p').animateNumber({number: 3}, 1200);
            $('.resumen-evento li:nth-child(4) p').animateNumber({number: 9}, 1500);


            //Cuenta Regresiva

            $('.cuenta-regresiva').countdown('2020/12/12 10:00:00', function(event){
                $('#dias').html(event.strftime('%D'));
                $('#horas').html(event.strftime('%H'));
                $('#minutos').html(event.strftime('%M'));
                $('#segundos').html(event.strftime('%S'));


            });



});










