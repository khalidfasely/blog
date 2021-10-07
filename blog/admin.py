from django.contrib import admin

# Register your models here.
from .models import User, Blog, Comments, Category, Profile

# Register your models here.
#admin.site.register(User)
#admin.site.register(User, MyUserAdmin)

# Register your models here.
admin.site.register(Blog)
admin.site.register(Comments)
admin.site.register(Category)
admin.site.register(Profile)