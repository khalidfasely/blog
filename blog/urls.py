from django.urls import path
from . import views

urlpatterns = [
    path("", views.index, name="index"),
    path("login", views.login_view, name="login"),
    path("logout", views.logout_view, name="logout"),
    path("register", views.register_view, name="register"),
    path("user", views.user, name="user"),
    path("blogs", views.blogs, name="blogs"),
    path("new_blog", views.new_blog, name="new_blog"),
    path("blog_page/<int:blog_id>", views.blog_page, name="blog_page"),
]