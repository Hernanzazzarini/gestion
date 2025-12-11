from django.db import models

class Reclamo(models.Model):
    TIPO_CHOICES = [
        ('FORMAL', 'Formal'),
        ('NO_FORMAL', 'No Formal'),
    ]

    DESTINATARIO_CHOICES = [
        ('BLANCHED', 'Blanched'),
        ('SUPER_CLEAN', 'Super Clean'),
        ('LOGISTICA', 'Logística'),
        ('CRUDO', 'Crudo'),
        ('TOSTADO', 'Tostado'),
        ('PASTA', 'Pasta'),
    ]

    GRAVEDAD_CHOICES = [
        ('BAJA', 'Baja'),
        ('MEDIA', 'Media'),
        ('ALTA', 'Alta'),
    ]

    ESTADO_CHOICES = [
        ('ABIERTO', 'Abierto'),
        ('CERRADO', 'Cerrado'),
    ]

    fecha = models.DateField()
    tipo = models.CharField(max_length=20, choices=TIPO_CHOICES)
    codigo = models.CharField(max_length=100)
    cliente = models.CharField(max_length=200)
    destinatario = models.CharField(max_length=50, choices=DESTINATARIO_CHOICES)
    lote_reclamado = models.CharField(max_length=100)
    motivo = models.CharField(max_length=200)
    descripcion_reclamo = models.TextField()
    gravedad = models.CharField(max_length=10, choices=GRAVEDAD_CHOICES)
    comentarios = models.TextField(blank=True, null=True)
    archivo_adjunto = models.FileField(upload_to="reclamos_adjuntos/", blank=True, null=True)
    estado = models.CharField(max_length=20, choices=ESTADO_CHOICES)
    año_lote_reclamado = models.IntegerField()

    def __str__(self):
        return f"{self.codigo} - {self.cliente}"

