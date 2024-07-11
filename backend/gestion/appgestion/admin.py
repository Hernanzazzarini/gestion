from django.contrib import admin
from .models import Personal, Capacitacion, CapacitacionPersonal, RecordatorioDeTarea, Tarea

# Registrar el modelo Personal
@admin.register(Personal)
class PersonalAdmin(admin.ModelAdmin):
    list_display = ('nombre', 'apellido', 'puesto', 'email')
    search_fields = ('nombre', 'apellido', 'email')

# Registrar el modelo Capacitacion
@admin.register(Capacitacion)
class CapacitacionAdmin(admin.ModelAdmin):
    list_display = ('nombre', 'descripcion', 'fecha_inicio', 'fecha_fin')
    search_fields = ('nombre',)

# Registrar el modelo CapacitacionPersonal
@admin.register(CapacitacionPersonal)
class CapacitacionPersonalAdmin(admin.ModelAdmin):
    list_display = ('capacitacion', 'personal', 'fecha_asignacion')
    search_fields = ('capacitacion__nombre', 'personal__nombre')

# Registrar el modelo RecordatorioDeTarea
@admin.register(RecordatorioDeTarea)
class RecordatorioDeTareaAdmin(admin.ModelAdmin):
    list_display = ('titulo', 'descripcion', 'fecha_recordatorio', 'personal')
    search_fields = ('titulo', 'personal__nombre')

# Registrar el modelo Tarea
@admin.register(Tarea)
class TareaAdmin(admin.ModelAdmin):
    list_display = ('titulo', 'descripcion', 'fecha_vencimiento', 'estado', 'personal')
    search_fields = ('titulo', 'personal__nombre')
