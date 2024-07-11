from django.db import models

class Personal(models.Model):
    id = models.AutoField(primary_key=True)
    nombre = models.CharField(max_length=100)
    apellido = models.CharField(max_length=100)
    puesto = models.CharField(max_length=100)
    email = models.EmailField(unique=True)

    def __str__(self):
        return f"{self.nombre} {self.apellido}"

class Capacitacion(models.Model):
    id = models.AutoField(primary_key=True)
    nombre = models.CharField(max_length=100)
    descripcion = models.TextField()
    fecha_inicio = models.DateField()
    fecha_fin = models.DateField()
    personal = models.ManyToManyField(Personal, through='CapacitacionPersonal')
    realizada = models.BooleanField(default=False)
    fecha_realizacion = models.DateField(null=True, blank=True)

    def __str__(self):
        return self.nombre

class CapacitacionPersonal(models.Model):
    id = models.AutoField(primary_key=True)
    capacitacion = models.ForeignKey(Capacitacion, on_delete=models.CASCADE)
    personal = models.ForeignKey(Personal, on_delete=models.CASCADE)
    fecha_asignacion = models.DateField(auto_now_add=True)

    def __str__(self):
        return f"{self.capacitacion} - {self.personal}"

class RecordatorioDeTarea(models.Model):
    id = models.AutoField(primary_key=True)
    titulo = models.CharField(max_length=100)
    descripcion = models.TextField()
    fecha_recordatorio = models.DateTimeField()
    personal = models.ForeignKey(Personal, on_delete=models.CASCADE)

    def __str__(self):
        return self.titulo

class Tarea(models.Model):
    id = models.AutoField(primary_key=True)
    titulo = models.CharField(max_length=100)
    descripcion = models.TextField()
    fecha_vencimiento = models.DateField()
    estado = models.CharField(max_length=50, choices=[('pendiente', 'Pendiente'), ('completada', 'Completada')])
    personal = models.ForeignKey(Personal, on_delete=models.CASCADE)

    def __str__(self):
        return self.titulo
