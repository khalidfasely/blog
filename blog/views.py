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
        #blogs_saved = Profile.objects.filter(user=request.user).first().saves.all()
        profile_blogs_saved = Profile.objects.filter(user=request.user).first()
        if profile_blogs_saved:
            blogs_saved = profile_blogs_saved.saves.all()
        else:
            blogs_saved = []
    else:
        comments_liked = []
        blogs_liked = []
        blogs_saved = []

    return JsonResponse({ "user": f"{request.user}", "likes": [ comment.comment_id() for comment in comments_liked ], "likes_b": [ blog.blog_id() for blog in blogs_liked ], "blogs_saved": [ f"{blog_saved.id}" for blog_saved in blogs_saved ] }, status=201)    

def user_page(request, uname):
    blogs = Blog.objects.filter(created_by=uname).order_by("-created_at").all()
    profile_bio = Profile.objects.filter(user=uname).first()
    #uid = User.objects.get(username=uname)
    #print(profile_bio.user.id)
    user = User.objects.filter(username=profile_bio.user).first()
    if profile_bio:
        bio = profile_bio.bio
        profile_user = user.id
        profile_username = user.username
        join_date = user.date_joined.strftime("%b %d %Y, %I:%M %p")
        last_login = user.last_login.strftime("%b %d %Y, %I:%M %p")
        # = profile_bio.id
    #else:
    #    bio = "No Bio Disponible!"
    #    profile_user = User.objects.filter(username=uname).first().id
    return JsonResponse({ "uid": {
        "id": f"{profile_user}",
        "username": f"{profile_username}"
    }, "uinfo": {
        "join_date": join_date,
        "last_login": last_login
    }, "blogs": [ blog.serialize_all() for blog in blogs ], "bio": f"{bio}" }, status=201)

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
            profile_blogs_saved = Profile.objects.filter(user=request.user).first()
            if profile_blogs_saved:
                blogs_saved = profile_blogs_saved.saves.all()
            else:
                blogs_saved = []

            return JsonResponse({"message": "Login Successfully.", "user": f"{request.user}", "likes": [ comment.comment_id() for comment in comments_liked ], "likes_b": [ blog.blog_id() for blog in blogs_liked ], "blogs_saved": [ f"{blog_saved.id}" for blog_saved in blogs_saved ] }, status=201)

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
            profile = Profile.objects.create(user=user)
            profile.save()
        except IntegrityError:
            return JsonResponse({"message": "Username already taken"}, status=201)

        login(request, user)

        comments_liked = Comments.objects.filter(likes=request.user).all()
        blogs_liked = Blog.objects.filter(likes=request.user).all()
        #blogs_saved = Profile.objects.filter(user=request.user).first().saves.all()
        profile_blogs_saved = Profile.objects.filter(user=request.user).first()
        if profile_blogs_saved:
            blogs_saved = profile_blogs_saved.saves.all()
        else:
            blogs_saved = []
        return JsonResponse({"message": "Register", "likes": [ comment.comment_id() for comment in comments_liked ], "likes_b": [ blog.blog_id() for blog in blogs_liked ], "blogs_saved": [ f"{blog_saved.id}" for blog_saved in blogs_saved ] }, status=201)

    else:
        return JsonResponse({"message": "The method must be POST"}, status=400)

def blogs(request):
    blogs = Blog.objects.order_by("-created_at").all()
    return JsonResponse({ "blogs": [blog.serialize_all() for blog in blogs] }, status=201)

def blog_page(request, blog_id):
    blog = Blog.objects.filter(pk=blog_id).first()
    comments = Comments.objects.filter(on_blog=blog).all()
    if blog:
        return JsonResponse({ "blog": blog.serialize(), "comments": [comment.serialize() for comment in comments] }, status=201)
    default_blog = {
            "isDefault": True,
            "id": 0,
            "title": "",
            "description": "",
            "created_at": "",
            "created_by": {
                "id": 0,
                "username": ""
            },
            "likes": 0,
            "dislikes": 0,
            "category": ""
        }
    return JsonResponse({ "blog": default_blog, "comments": [comment.serialize() for comment in comments] }, status=201)


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
def edit_blog(request):
    if request.method == "POST":

        data = json.loads(request.body)
        uname = data.get("uname")
        
        if request.user is None or request.user.username != uname:
            return JsonResponse({ "message": "You must be Logged In to Edit Your Blog!" }, status=201)
        
        title = data.get("title")
        description = data.get("description")
        content = data.get("content")
        category_f_e = data.get("category")
        bid = data.get("bid")

        category = Category.objects.get(category=category_f_e)

        Blog.objects.filter(pk=bid).update(title=title, description=description, content=content, category=category)

        return JsonResponse({ "message": "Edit Successfully." }, status=201)
    
    else:
        return JsonResponse({"message": "The method must be POST"}, status=400)


def delete_blog(request, blog_id):
    blog = Blog.objects.filter(pk=blog_id)
    blog.delete()

    return JsonResponse({ "message": "Delete Successfully" }, status=201)

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
        blogs = profile.saves.order_by("-created_at").all()
    else:
        blogs = []
        
    return JsonResponse({ "message": "Profile.", "blogs_saved": [blog.serialize_all() for blog in blogs] }, status=201)
    #return JsonResponse({ "message": "No Profile!" }, status=201)

def save_blog(request, blog_id):
    if request.user.username:
        profile = Profile.objects.filter(user=request.user).first()
        if profile:
            profile.saves.add(blog_id)
        else:
            new_profile = Profile.objects.create(user=request.user)
            new_profile.save()
            new_profile.saves.add(blog_id)

        blog = Blog.objects.get(pk=blog_id)

        return JsonResponse({ "message": "Saved successfully.", "blog": blog.serialize_all() }, status=201)
    
    return JsonResponse({ "message": "You must be Logged In to Save a Blog!" }, status=201)

def unsave_blog(request, blog_id):
    if request.user.username:
        profile = Profile.objects.get(user=request.user)
        profile.saves.remove(blog_id)
        return JsonResponse({ "message": "Unsaved successfully." }, status=201)
    
    return JsonResponse({ "message": "You must be Logged In to Unsave a Blog!" }, status=201)