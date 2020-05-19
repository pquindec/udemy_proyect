<?php include_once 'includes/templates/header.php'; ?>


  <section class="seccion contenedor">
    <h2>Calendario de Eventos</h2>

    <?php
    try {
        require_once('includes/funciones/bd_conexion.php');
        $sql = "select * from eventos";
        $resultado = $con->query($sql);
    } catch (\Exception $e) {
        echo $e->getMessage();
    }
    ?>
    <div class='calendario'>
        <?php
            $evento = $resultado->fetch_assoc();
        ?>

        <pre>
            <?php var_dump($evento);?>
        </pre>

    </div>

    <?php
    $con->close();
    ?>

  </section><!--seccion cuenta-->
  <?php include_once 'includes/templates/footer.php'; ?>
