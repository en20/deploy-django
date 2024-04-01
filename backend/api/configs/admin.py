from django.contrib import admin
from django.db import models


# Only for test purposes
class Usuario(models.Model):
    nome = models.CharField(max_length=200)
    email = models.CharField(max_length=200)
    telefone = models.CharField(max_length=200)

    def __str__(self):
        return self.nome


# Register your models here.
admin.site.register(Usuario)
