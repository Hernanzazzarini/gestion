from django.db import models

# Normalizamos las áreas
class Area(models.Model):
    nombre = models.CharField(max_length=100, unique=True)
    def __str__(self):
        return self.nombre

# Operarios (responsables de tareas)
class Operario(models.Model):
    nombre = models.CharField(max_length=150)
    email = models.EmailField(unique=True)
    area = models.ForeignKey(Area, on_delete=models.SET_NULL, null=True, blank=True)
    def __str__(self):
        return self.nombre

# Tareas
class Tarea(models.Model):
    ESTADO_CHOICES = [
        ('EN_PROCESO', 'En Proceso'),
        ('FINALIZADA', 'Finalizada'),
    ]
    responsable = models.ForeignKey(Operario, on_delete=models.SET_NULL, null=True)
    tarea_asignada = models.CharField(max_length=255)
    fecha_ejecucion = models.DateField()
    fecha_limite = models.DateField()
    fecha_finalizacion = models.DateField(null=True, blank=True)
    estado = models.CharField(max_length=20, choices=ESTADO_CHOICES, default='EN_PROCESO')
    observaciones = models.TextField(blank=True)
    def __str__(self):
        return f"{self.tarea_asignada} - {self.responsable}"

# Archivos adjuntos
class ArchivoAdjunto(models.Model):
    tarea = models.ForeignKey(Tarea, on_delete=models.CASCADE, related_name='archivos')
    archivo = models.FileField(upload_to='tareas/')
    descripcion = models.CharField(max_length=255, blank=True)
    def __str__(self):
        return f"{self.archivo.name}"

