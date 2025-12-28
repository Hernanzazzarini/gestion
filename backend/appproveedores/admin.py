from django.contrib import admin
from .models import TipoProveedor, Proveedor, DocumentoProveedor


class DocumentoInline(admin.TabularInline):
    model = DocumentoProveedor
    extra = 1


@admin.register(Proveedor)
class ProveedorAdmin(admin.ModelAdmin):
    list_display = ('nombre', 'tipo', 'ciudad', 'provincia', 'telefono')
    search_fields = ('nombre', 'ciudad')
    list_filter = ('tipo',)
    inlines = [DocumentoInline]


admin.site.register(TipoProveedor)

