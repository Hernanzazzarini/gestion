from django.contrib import admin
from .models import Capacitacion


@admin.register(Capacitacion)
class CapacitacionAdmin(admin.ModelAdmin):
    list_display = ("id", "fecha", "operario", "sector", "nombre_capacitacion", "dictado", "nota")
    search_fields = ("operario", "sector", "nombre_capacitacion")
    list_filter = ("sector", "dictado")

