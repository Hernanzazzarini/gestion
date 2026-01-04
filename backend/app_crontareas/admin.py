# backend/app_crontareas/admin.py
from django.contrib import admin
from .models import Area, Operario, Tarea, ArchivoAdjunto

# Registro de modelos en admin

@admin.register(Area)
class AreaAdmin(admin.ModelAdmin):
    list_display = ('id', 'nombre')
    search_fields = ('nombre',)

@admin.register(Operario)
class OperarioAdmin(admin.ModelAdmin):
    list_display = ('id', 'nombre', 'email', 'area')
    list_filter = ('area',)
    search_fields = ('nombre', 'email')

class ArchivoAdjuntoInline(admin.TabularInline):
    model = ArchivoAdjunto
    extra = 1

@admin.register(Tarea)
class TareaAdmin(admin.ModelAdmin):
    list_display = ('id', 'tarea_asignada', 'responsable', 'estado', 'fecha_ejecucion', 'fecha_limite', 'fecha_finalizacion')
    list_filter = ('estado', 'fecha_ejecucion', 'fecha_limite')
    search_fields = ('tarea_asignada', 'responsable__nombre')
    inlines = [ArchivoAdjuntoInline]

@admin.register(ArchivoAdjunto)
class ArchivoAdjuntoAdmin(admin.ModelAdmin):
    list_display = ('id', 'tarea', 'archivo', 'descripcion')
    search_fields = ('tarea__tarea_asignada', 'descripcion')

