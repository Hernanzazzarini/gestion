from django.db import models

class Capacitacion(models.Model):
    fecha = models.DateField()
    operario = models.CharField(max_length=100)
    sector = models.CharField(max_length=100)
    nombre_capacitacion = models.CharField(max_length=200)
    dictado = models.CharField(
        max_length=10,
        choices=[('insitu', 'In Situ'), ('classroom', 'Classroom')]
    )
    nota = models.DecimalField(max_digits=5, decimal_places=2)

    quien_realizo = models.CharField(max_length=150)
    
    def __str__(self):
        return f"{self.nombre_capacitacion} - {self.operario}"


