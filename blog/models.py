from django.contrib.auth.models import AbstractUser, User
from django.db import models
# Create your models here.
#class User(AbstractUser):
#    pass
"""username = models.CharField(max_length=255, unique=True)
    email = models.EmailField(max_length=255)
    active = models.BooleanField(default=True)
    staff = models.BooleanField(default=False)
    admin = models.BooleanField(default=False)

    USERNAME_FIELD = 'username'

    def __str__(self):
        return self.username

    objects = UserManager()"""
    

class Profile(models.Model):
    user = models.OneToOneField(User, null=True, on_delete=models.CASCADE)
    bio = models.TextField(max_length=255)
    saves = models.ManyToManyField('Blog', default=None, blank=True, related_name="saves_blogs")

    def __str__(self):
        return f"{self.user} - {self.bio} - {self.saves.all().count()}"

    def saves_blogs_num(self):
        return self.saves.all().count()


class Category(models.Model):
    category = models.CharField(max_length=64, default='No Category')

    def __str__(self):
        return self.category


class Blog(models.Model):
    title = models.TextField(max_length=120)
    description = models.TextField(max_length=300)
    content = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)
    created_by = models.ForeignKey(User, on_delete=models.PROTECT, related_name="creater")
    likes = models.ManyToManyField(User, default=None, blank=True, related_name="liker")
    dislikes = models.ManyToManyField(User, default=None, blank=True, related_name="disliker")
    category = models.ForeignKey(Category, on_delete=models.PROTECT, related_name="category_of_blog")
    #hashes

    def __str__(self):
        return f"{self.title} - {self.created_by}"

    def serialize_all(self):
        return {
            "id": self.id,
            "title": self.title,
            "description": self.description,
            "created_at": self.created_at.strftime("%b %d %Y, %I:%M %p"),
            "created_by": {
                "id": self.created_by.id,
                "username": self.created_by.username
            },
            "likes": self.likes.count(),
            "dislikes": self.dislikes.count(),
            "category": self.category.category
        }

    def serialize(self):
        return {
            "id": self.id,
            "title": self.title,
            "description": self.description,
            "content": self.content,
            "created_at": self.created_at.strftime("%b %d %Y, %I:%M %p"),
            "created_by": {
                "id": self.created_by.id,
                "username": self.created_by.username
            },
            "likes": self.likes.count(),
            "dislikes": self.dislikes.count(),
            "category": self.category.category
        }

    def likes_num(self):
        return self.likes.all().count()

    def dislikes_num(self):
        return self.dislikes.all().count()

class Comments(models.Model):
    created_by = models.ForeignKey(User, on_delete=models.PROTECT, related_name="creater_com")
    created_at = models.DateTimeField(auto_now_add=True)
    content = models.TextField(max_length=300)
    on_blog = models.ForeignKey(Blog, on_delete=models.CASCADE, related_name="comment_on_blog")
    likes = models.ManyToManyField(User, related_name="liker_com")

    def __str__(self):
        return f"{self.content} - {self.created_by} <on> {self.on_blog}"

    def serialize(self):
        return {
            "id": self.id,
            "content": self.content,
            "created_at": self.created_at.strftime("%b %d %Y, %I:%M %p"),
            "created_by": {
                "id": self.created_by.id,
                "username": self.created_by.username
            },
            "likes": self.likes.count()
        }



"""from django.db import models
from django.contrib.auth.models import AbstractUser

# Create your models here.
class User(AbstractUser):
    pass

#class User(models.Model):
#    username = models.CharField(max_length=64)
#    email = models.EmailField(max_length=100, unique=True)
#    password = models.Password
#    start_date = models.DateTimeField(auto_now_add=True)


class Category(models.Model):
    category = models.CharField(max_length=64, default='No Category')


class Blog(models.Model):
    title = models.TextField(max_length=120)
    description = models.TextField(max_length=300)
    content = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)
    created_by = models.ForeignKey(User, on_delete=models.PROTECT, related_name="creater")
    likes = models.ManyToManyField(User, related_name="liker")
    dislikes = models.ManyToManyField(User, related_name="disliker")
    category = models.ForeignKey(Category, on_delete=models.PROTECT, related_name="category_of_blog")
    #hashes

class Comments(models.Model):
    created_by = models.ForeignKey(User, on_delete=models.PROTECT, related_name="creater_com")
    created_at = models.DateTimeField(auto_now_add=True)
    content = models.TextField(max_length=300)
    on_blog = models.ForeignKey(Blog, on_delete=models.CASCADE, related_name="comment_on_blog")
    likes = models.ManyToManyField(User, related_name="liker_com")
"""
""""""