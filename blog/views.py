import json

from django.http import HttpResponse, JsonResponse
from django.shortcuts import render
from django.contrib.auth import authenticate, login, logout
from django.views.decorators.csrf import csrf_exempt
from django.db import IntegrityError
#from django.contrib.auth.decorators import login_required

from .models import User, Blog, Category, Comments, Profile

# Create your views here.

def index(request):
    return HttpResponse("Hello, world!")

def user(request):
    if request.user.username:
        comments_liked = Comments.objects.filter(likes=request.user).all()
        blogs_liked = Blog.objects.filter(likes=request.user).all()    
    else:
        comments_liked = []
        blogs_liked = []

    return JsonResponse({ "user": f"{request.user}", "likes": [ comment.comment_id() for comment in comments_liked ], "likes_b": [ blog.blog_id() for blog in blogs_liked ] }, status=201)    

def user_page(request, uname):
    blogs = Blog.objects.filter(created_by=uname).all()
    bio = Profile.objects.filter(user=uname).first()
    return JsonResponse({ "blogs": [ blog.serialize_all() for blog in blogs ], "bio": bio }, status=201)

@csrf_exempt
def login_view(request):
    if request.method == "POST":
        data = json.loads(request.body)

        username = data.get("username")
        password = data.get("password")
        
        #user = authenticate(request, username=username, password=password)
        #users = authenticate(request, username=username, password=password)
        user = authenticate(request, username=username, password=password)

        #if user is not None:
        if user is not None:
            login(request, user)

            comments_liked = Comments.objects.filter(likes=request.user).all()
            blogs_liked = Blog.objects.filter(likes=request.user).all()
            return JsonResponse({"message": "Login Successfully.", "user": f"{request.user}", "likes": [ comment.comment_id() for comment in comments_liked ], "likes_b": [ blog.blog_id() for blog in blogs_liked ]}, status=201)

        else:
            return JsonResponse({"message": "Invalid username and/or password."}, status=201)

    else:
        return JsonResponse({"message": "The method must be POST"}, status=400)

def logout_view(request):
    if request.user.username:
        logout(request)
        
        return JsonResponse({"message": "Logout successfully."}, status=201)
    
    return JsonResponse({"message": "You are not logged in!"}, status=201)

@csrf_exempt
def register_view(request):
    if request.method == "POST":
        data = json.loads(request.body)

        username = data.get("username")
        email = data.get("email")
        password = data.get("password")
        confirmation = data.get("confirmation")

        if password != confirmation:
            return JsonResponse({"message": "Passwords must match"}, status=201)

        try:
            #user = User.objects.create(username=username, email=email, password=password)
            user = User.objects.create_user(username, email, password)
            user.save()
        except IntegrityError:
            return JsonResponse({"message": "Username already taken"}, status=201)

        login(request, user)

        comments_liked = Comments.objects.filter(likes=request.user).all()
        blogs_liked = Blog.objects.filter(likes=request.user).all()
        #print([ comment.comment_id() for comment in comments_liked ])
        return JsonResponse({"message": "Register", "likes": [ comment.comment_id() for comment in comments_liked ], "likes_b": [ blog.blog_id() for blog in blogs_liked ]}, status=201)

    else:
        return JsonResponse({"message": "The method must be POST"}, status=400)

def blogs(request):
    blogs = Blog.objects.order_by("-created_at").all()
    return JsonResponse({ "blogs": [blog.serialize_all() for blog in blogs] }, status=201)

def blog_page(request, blog_id):
    blog = Blog.objects.filter(pk=blog_id).first()
    comments = Comments.objects.filter(on_blog=blog).all()
    return JsonResponse({ "blog": blog.serialize(), "comments": [comment.serialize() for comment in comments] }, status=201)

@csrf_exempt
def new_blog(request):
    if request.method == "POST":
        if request.user is None:
            return JsonResponse({ "message": "You must be Logged In to Create a New Blog!" }, status=201)

        data = json.loads(request.body)

        title = data.get("title")
        description = data.get("description")
        content = data.get("content")
        category_f_e = data.get("category")

        category = Category.objects.get(category=category_f_e)

        blog = Blog.objects.create(title=title, description=description, content=content, created_by=request.user, category=category)
        blog.save()

        #print([blog.serialize()])

        return JsonResponse({ "message": "Blog Created", "blog": blog.serialize() }, status=201)

    else:
        return JsonResponse({"message": "The method must be POST"}, status=400)

@csrf_exempt
def new_comment(request):
    if request.method == "POST":
        if request.user is None:
            return JsonResponse({ "message": "You must be Logged In to Create a New Blog!" }, status=201)
    
        data = json.loads(request.body)

        comment_f_e = data.get("comment")
        on_blog = data.get("blog_id")
        blog = Blog.objects.filter(pk=on_blog).first()

        comment = Comments.objects.create(created_by=request.user, content=comment_f_e, on_blog=blog)
        comment.save()

        return JsonResponse({ "message": "Comment Added", "comment": comment.serialize() }, status=201)

    else:
        return JsonResponse({"message": "The method must be POST"}, status=400)

def like_blog(request, blog_id):
    if request.user.username:
        blog = Blog.objects.get(pk=blog_id)
        blog.likes.add(request.user)
        return JsonResponse({ "message": "Liked successfully." }, status=201)

    return JsonResponse({ "message": "You must be Logged In to Like a Comment!" }, status=201)

def unlike_blog(request, blog_id):
    if request.user.username:
        blog = Blog.objects.get(pk=blog_id)
        blog.likes.remove(request.user)
        return JsonResponse({ "message": "Unliked successfully." }, status=201)

    return JsonResponse({ "message": "You must be Logged In to Like a Comment!" }, status=201)

def like_comment(request, comment_id):
    if request.user.username:
        comment = Comments.objects.get(pk=comment_id)
        comment.likes.add(request.user)
        return JsonResponse({ "message": "Liked successfully." }, status=201)
    
    return JsonResponse({ "message": "You must be Logged In to Like a Comment!" }, status=201)


def unlike_comment(request, comment_id):
    if request.user.username:
        comment = Comments.objects.get(pk=comment_id)
        comment.likes.remove(request.user)
        return JsonResponse({ "message": "Unliked successfully." }, status=201)
    
    return JsonResponse({ "message": "You must be Logged In to Unlike a Comment!" }, status=201)

def blogs_saved(request):
    if request.user.username:
        profile = Profile.objects.filter(user=request.user).first()
        if profile:
            blogs = profile.saves.all()
        else:
            blogs = []

        return JsonResponse({ "message": "Profile.", "blogs_saved": [blog.serialize_all() for blog in blogs] }, status=201)
    
    return JsonResponse({ "message": "No Profile!" }, status=201)