import json

from django.http import HttpResponse, JsonResponse
from django.shortcuts import render
from django.contrib.auth import authenticate, login, logout
from django.views.decorators.csrf import csrf_exempt
from django.db import IntegrityError

from .models import User, Blog, Category

# Create your views here.

def index(request):
    return HttpResponse("Hello, world!")

def user(request):
    if request.user.username:
        print(request.user.date_joined)
    return JsonResponse({"user": f"{request.user}"}, status=201)

@csrf_exempt
def login_view(request):
    if request.method == "POST":
        data = json.loads(request.body)

        username = data.get("username")
        password = data.get("password")
        
        #user = authenticate(request, username=username, password=password)
        #users = authenticate(request, username=username, password=password)
        user = authenticate(request, username=username, password=password)
        print(user)

        #if user is not None:
        if user is not None:
            login(request, user)

            return JsonResponse({"message": "Login Successfully.", "user": f"{request.user}"}, status=201)

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

        return JsonResponse({"message": "Register"}, status=201)

    else:
        return JsonResponse({"message": "The method must be POST"}, status=400)

def blogs(request):
    blogs = Blog.objects.order_by("-created_at").all()
    return JsonResponse({ "blogs": [blog.serialize_all() for blog in blogs] }, status=201)


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