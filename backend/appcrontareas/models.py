from django.db import models

class Area(models.Model):
    nombre = models.CharField(max_length=100, unique=True)

    def __str__(self):
        return self.nombre

class Responsable(models.Model):
    nombre = models.CharField(max_length=150)
    email = models.EmailField()

    def __str__(self):
        return self.nombre

class Tarea(models.Model):
    ESTADOS = (
        ('EN_PROCESO', 'En proceso'),
        ('FINALIZADA', 'Finalizada'),
    )

    responsable = models.ForeignKey(Responsable, on_delete=models.CASCADE, related_name='tareas')
    area = models.ForeignKey(Area, on_delete=models.CASCADE, related_name='tareas')
    tarea = models.CharField(max_length=255)
    fecha_ejecucion = models.DateField()
    fecha_limite = models.DateField()
    fecha_finalizacion = models.DateField(null=True, blank=True)
    estado = models.CharField(max_length=20, choices=ESTADOS)
    observaciones = models.TextField(blank=True)
    archivo = models.FileField(upload_to='tareas/', null=True, blank=True)
    creado = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.tarea
