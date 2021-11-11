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
    path("new_comment", views.new_comment, name="new_comment"),
    path("blog_page/<int:blog_id>", views.blog_page, name="blog_page"),
    path("user_page/<str:uname>", views.user_page, name="user_page"),
    path("like_comment/<int:comment_id>", views.like_comment, name="like_comment"),
    path("unlike_comment/<int:comment_id>", views.unlike_comment, name="unlike_comment"),
    path("like_blog/<int:blog_id>", views.like_blog, name="like_blog"),
    path("unlike_blog/<int:blog_id>", views.unlike_blog, name="unlike_blog"),
    path("blogs_saved", views.blogs_saved, name="blogs_saved"),
    path("save_blog/<int:blog_id>", views.save_blog, name="save_blog"),
    path("unsave_blog/<int:blog_id>", views.unsave_blog, name="unsave_blog"),
    path("delete_blog/<int:blog_id>", views.delete_blog, name="delete_blog"),
]