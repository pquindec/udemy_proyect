<?php include_once 'includes/templates/header.php'; ?>

    <!-- 
        SELECT e.nombre_evento,e.fecha_evento,e.hora_evento,c.cat_evento,i.nombre_invitado,i.apellido_invitado
        FROM eventos e, categoria_eventos c, invitados i 
        where e.id_cat_evento=c.id_categoria and e.id_inv=i.id_invitado
    -->

    <!--
        SELECT e.evento_id,e.nombre_evento,e.fecha_evento,e.hora_evento,c.cat_evento,i.nombre_invitado,i.apellido_invitado
        FROM eventos e 
        inner join categoria_evento c
        on e.id_cat_evento=c.id_categoria
        inner join invitados i
        on e.id_inv=i.id_invitado
        order by e.evento_id
    -->
  <section class="seccion contenedor">
    <h2>Calendario de Eventos</h2>

    <?php
    try {
        require_once('includes/funciones/bd_conexion.php');
        $sql = "SELECT e.evento_id,e.nombre_evento,e.fecha_evento,e.hora_evento,c.cat_evento,c.icono,i.nombre_invitado,i.apellido_invitado
                FROM eventos e 
                inner join categoria_evento c
                on e.id_cat_evento=c.id_categoria
                inner join invitados i
                on e.id_inv=i.id_invitado
                order by e.evento_id";
        $resultado = $con->query($sql);
    } catch (\Exception $e) {
        echo $e->getMessage();
    }
    ?>
    <div class='calendario'>
        <?php
            $calendario = array();
            
            while($eventos = $resultado->fetch_assoc()){
                $fecha = $eventos['fecha_evento'];
                $evento = array(
                    'titulo' => $eventos['nombre_evento'],
                    'fecha' => $eventos['fecha_evento'],
                    'hora' => $eventos['hora_evento'],
                    'categoria' => $eventos['cat_evento'],
                    'icono' => $eventos['icono'],
                    'invitado' => $eventos['nombre_invitado']." ".$eventos['apellido_invitado']
                );
                
                $calendario[$fecha][]= $evento;
                ?>
            <?php  } //while de fetch ?>
        <?php
            //Imprimir eventos
            foreach($calendario as $dia => $lista_eventos) { ?>
                 <h3>
                    <i class="fa fa-calendar"></i>
                    <?php 
                        //Unix
                        setlocale(LC_TIME,'es_ES.UTF-8');
                        //Windows
                        setlocale(LC_TIME,'spanish');

                        echo strftime("%A, %d de %B del %Y",strtotime($dia));
                    
                    ?>
                </h3>
                <?php 
                    foreach($lista_eventos as $evento) { ?>
                        <div class="dia">
                            <p class="titulo"><?php echo $evento['titulo']; ?> </p>
                            <p class="hora">
                                <i class="fas fa-clock" aria-hidden="true"></i>
                                <?php echo $evento['fecha']." ".$evento['hora'];?>
                            </p>
                            <p class="categoria">
                            <i class="fa <?php echo $evento['icono'];?> " aria-hidden="true"></i>
                            <?php echo $evento['categoria']; ?>
                            </p>
                            <p class="invitado">
                                <i class="fa fa-user" aria-hidden="true"></i>
                                <?php echo $evento['invitado'];?>
                            </p>
                           
                        </div>

                <?php } //foreach eventos?>
        <?php } //Foreach de dias?>


        
       
       

    </div>

    <?php
    $con->close();
    ?>

  </section><!--seccion cuenta-->
  <?php include_once 'includes/templates/footer.php'; ?>
