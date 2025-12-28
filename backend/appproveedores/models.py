from django.db import models


class TipoProveedor(models.Model):
    nombre = models.CharField(max_length=50, unique=True)

    def __str__(self):
        return self.nombre


class Proveedor(models.Model):
    tipo = models.ForeignKey(
        TipoProveedor,
        on_delete=models.PROTECT,
        related_name='proveedores'
    )
    nombre = models.CharField(max_length=150)
    fecha_alta = models.DateField(auto_now_add=True)
    ciudad = models.CharField(max_length=100)
    provincia = models.CharField(max_length=100)
    telefono = models.CharField(max_length=30)
    email = models.EmailField()

    def __str__(self):
        return self.nombre


class DocumentoProveedor(models.Model):
    proveedor = models.ForeignKey(
        Proveedor,
        on_delete=models.CASCADE,
        related_name='documentos'
    )
    nombre = models.CharField(max_length=150)
    archivo = models.FileField(upload_to='proveedores/documentos/')
    fecha_emision = models.DateField()
    fecha_vencimiento = models.DateField()

    def __str__(self):
        return f"{self.nombre} - {self.proveedor.nombre}"

