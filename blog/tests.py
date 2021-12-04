import json
import requests
import urllib.request

from django.test import TestCase, Client
from django.urls import reverse, resolve
from .views import login_view, logout_view, register_view, categories, user, blogs, new_blog, new_comment, blog_page, user_page, like_comment, unlike_comment, like_blog, unlike_blog, blogs_saved, save_blog, unsave_blog, delete_blog, edit_blog, edit_profile

# Create your tests here.
from .models import User, Blog, Category, Profile, Comments

class TestsWithData(TestCase):
    ##SetUp Function /Create dummy data
    def setUp(self):
        u1 = User.objects.create(username="Admin", email="Admin@admin.admin", password="0000")
        u2 = User.objects.create(username="Admin2", email="Admin2@admin.admin", password="00002")
        u3 = User.objects.create(username="1", email="1@1.1", password="1")

        c1 = Category.objects.create(category="Web")
        c2 = Category.objects.create(category="Gaming")

        b1 = Blog.objects.create(title="t1", description="d1", content="ct1", created_by=u1, category=c1)
        b1.likes.set([u3, u2])
        b2 = Blog.objects.create(title="t2", description="d2", created_by=u2, category=c2)
        b3 = Blog.objects.create(title="t3", description="d3", content="ct3", created_by=u2, category=c1)
        b3.likes.set([u1])

        p1 = Profile.objects.create(user=u1, bio="This is Admin")
        p1.saves.set([b3])
        p2 = Profile.objects.create(user=u2, bio="Music Lover")
        p2.saves.set([b1, b3, b2])
        p3 = Profile.objects.create(bio="")

        cm1 = Comments.objects.create(created_by=u2, content="cm1", on_blog=b1)
        cm1.likes.set([u1])
        cm2 = Comments.objects.create(created_by=u3, content="cm2", on_blog=b2)
        cm2.likes.set([u2])
        cm3 = Comments.objects.create(created_by=u3, content="cm3", on_blog=b1)
        cm3.likes.set([u1, u2])
        cm4 = Comments.objects.create(created_by=u1, content="cm4", on_blog=b1)

    ##TestModels
    def test_users_count(self):
        u = User.objects.all()
        self.assertEqual(u.count(), 3)

    def test_profiles_count(self):
        p = Profile.objects.all()
        self.assertEqual(p.count(), 3)

    def test_category_count(self):
        c = Category.objects.all()
        self.assertEqual(c.count(), 2)

    def test_blog_count(self):
        b = Blog.objects.all()
        self.assertEqual(b.count(), 3)

    def test_blog_count_2(self):
        u2 = User.objects.get(username="Admin2")
        b = Blog.objects.filter(created_by=u2)
        self.assertEqual(b.count(), 2)

    def test_comment_count(self):
        cm = Comments.objects.all()
        self.assertEqual(cm.count(), 4)

    def test_comment_count_2(self):
        u1 = User.objects.get(username="Admin")
        cm = Comments.objects.filter(created_by=u1)
        self.assertEqual(cm.count(), 1)

    def test_valid_blog(self):
        b1 = Blog.objects.get(title="t1")
        self.assertTrue(b1.is_valid_blog())

    def test_invalid_blog(self):
        b1 = Blog.objects.get(title="t2")
        self.assertFalse(b1.is_valid_blog())

    def test_valid_profile(self):
        u1 = User.objects.get(username="Admin")
        p1 = Profile.objects.get(user=u1)
        self.assertTrue(p1.is_valid_profile())

    def test_invalid_profile(self):
        p3 = Profile.objects.get(bio="")
        self.assertFalse(p3.is_valid_profile())

    def test_blog_likes_count(self):
        b1 = Blog.objects.get(title="t1")
        self.assertEqual(b1.likes.count(), 2)

    def test_blog_likes_count_2(self):
        b2 = Blog.objects.get(title="t2")
        self.assertEqual(b2.likes.count(), 0)

    def test_blog_comments_count(self):
        b1 = Blog.objects.get(title="t1")
        cms = Comments.objects.filter(on_blog=b1)
        self.assertEqual(cms.count(), 3)
    
    def test_blog_comments_count_2(self):
        b3 = Blog.objects.get(title="t3")
        cms = Comments.objects.filter(on_blog=b3)
        self.assertEqual(cms.count(), 0)

    def test_blog_comments_count_3(self):
        b2 = Blog.objects.get(title="t2")
        self.assertEqual(b2.likes.count(), 0)

    def test_comment_likes_count(self):
        cm1 = Comments.objects.get(content="cm1")
        self.assertEqual(cm1.likes.count(), 1)

    def test_comment_likes_count_2(self):
        cm4 = Comments.objects.get(content="cm4")
        self.assertEqual(cm4.likes.count(), 0)

    def test_saves_blog_count(self):
        u2 = User.objects.get(username="Admin2")
        p2 = Profile.objects.get(user=u2)
        self.assertEqual(p2.saves.count(), 3)

    def test_saves_blog_count_2(self):
        u1 = User.objects.get(username="Admin")
        p1 = Profile.objects.get(user=u1)
        self.assertEqual(p1.saves.count(), 1)

    ##TestViews
    def test_post_edit_blog_route_without_data(self):
        bid = Blog.objects.first().id
        c = Client()
        response = c.post(reverse("edit_blog"))
        self.assertEqual(response.status_code, 404)

    def test_user_page(self):
        u = User.objects.get(username="Admin")

        c = Client()
        response = c.get(f"/data/user_page/{u.id}")
        self.assertEqual(response.status_code, 201)

    ##TestURLs
    def test_user_page_url(self):
        url = reverse('user_page', args=[1])
        self.assertEqual(resolve(url).func, user_page)

        c = Client()
        response = c.get("/data/user_page/1")
        self.assertEqual(response.status_code, 201)

class TestsWithoutData(TestCase):
    ##TestURLs
    def test_login_url(self):
        url = reverse('login')
        self.assertEqual(resolve(url).func, login_view)

    def test_logout_url(self):
        url = reverse('logout')
        self.assertEqual(resolve(url).func, logout_view)

    def test_register_url(self):
        url = reverse('register')
        self.assertEqual(resolve(url).func, register_view)

    def test_categories_url(self):
        url = reverse('categories')
        self.assertEqual(resolve(url).func, categories)

    def test_user_url(self):
        url = reverse('user')
        self.assertEqual(resolve(url).func, user)

    def test_blogs_url(self):
        url = reverse('blogs')
        self.assertEqual(resolve(url).func, blogs)

    def test_new_blog_url(self):
        url = reverse('new_blog')
        self.assertEqual(resolve(url).func, new_blog)

    def test_new_comment_url(self):
        url = reverse('new_comment')
        self.assertEqual(resolve(url).func, new_comment)

    def test_blogs_saved_url(self):
        url = reverse('blogs_saved')
        self.assertEqual(resolve(url).func, blogs_saved)
    
    def test_edit_blog_url(self):
        url = reverse('edit_blog')
        self.assertEqual(resolve(url).func, edit_blog)
    
    def test_edit_profile_url(self):
        url = reverse('edit_profile')
        self.assertEqual(resolve(url).func, edit_profile)

    def test_blog_page_url(self):
        #In args you can give it whatever: args=["str"] / args=[int]
        url = reverse('blog_page', args=[1])
        self.assertEqual(resolve(url).func, blog_page)

        c = Client()
        response = c.get("/data/blog_page/1")
        self.assertEqual(response.status_code, 201)

    def test_like_comment_url(self):
        url = reverse('like_comment', args=[1])
        self.assertEqual(resolve(url).func, like_comment)

        c = Client()
        response = c.get("/data/like_comment/1")
        self.assertEqual(response.status_code, 201)
    
    def test_unlike_comment_url(self):
        url = reverse('unlike_comment', args=[1])
        self.assertEqual(resolve(url).func, unlike_comment)

        c = Client()
        response = c.get("/data/unlike_comment/1")
        self.assertEqual(response.status_code, 201)

    def test_like_blog_url(self):
        url = reverse('like_blog', args=[1])
        self.assertEqual(resolve(url).func, like_blog)

        c = Client()
        response = c.get("/data/like_blog/1")
        self.assertEqual(response.status_code, 201)
    
    def test_unlike_blog_url(self):
        url = reverse('unlike_blog', args=[1])
        self.assertEqual(resolve(url).func, unlike_blog)

        c = Client()
        
        response_incorrect_url = c.get("/data/unlike_blog/string")
        self.assertEqual(response_incorrect_url.status_code, 404)

        response_correct_url = c.get("/data/unlike_blog/1")
        self.assertEqual(response_correct_url.status_code, 201)

    def test_save_blog_url(self):
        url = reverse('save_blog', args=[1])
        self.assertEqual(resolve(url).func, save_blog)

        c = Client()
        response = c.get("/data/save_blog/1")
        self.assertEqual(response.status_code, 201)
    
    def test_unsave_blog_url(self):
        url = reverse('unsave_blog', args=[1])
        self.assertEqual(resolve(url).func, unsave_blog)

        c = Client()
        response = c.get("/data/unsave_blog/1")
        self.assertEqual(response.status_code, 201)

    def test_delete_blog_url(self):
        url = reverse('delete_blog', args=[1])
        self.assertEqual(resolve(url).func, delete_blog)

        c = Client()
        response = c.get("/data/delete_blog/1")
        self.assertEqual(response.status_code, 201)

    ## TestViews
    def test_index(self):
        c = Client()
        response = c.get("/data/")
        self.assertEqual(response.status_code, 200)

    def test_get_login_route(self):
        c = Client()
        response = c.get("/data/login")
        self.assertEqual(response.status_code, 400)

    def test_post_login_route_with_data(self):
        c = Client()
        jsondata=json.dumps({'username': 'Admin', 'password': '0000'})
        response = c.post(reverse('login'), content_type=jsondata)
        self.assertEqual(response.status_code, 201)

    def test_post_login_route_without_data(self):
        c = Client()
        response = c.post(reverse('login'))
        self.assertEqual(response.status_code, 404)

    def test_logout_route(self):
        c = Client()
        response = c.get("/data/logout")
        self.assertEqual(response.status_code, 201)

    def test_get_register_route(self):
        c = Client()
        response = c.get("/data/register")
        self.assertEqual(response.status_code, 400)

    def test_post_register_route_with_data(self):
        c = Client()
        jsondata=json.dumps({'username': 'Admin', 'email': 'Admin@admin.admin', 'password': '0000', 'confirmation': '0000'})
        response = c.post(reverse('register'), content_type=jsondata)
        self.assertEqual(response.status_code, 201)
    
    def test_post_register_route_without_data(self):
        c = Client()
        response = c.post(reverse('register'))
        self.assertEqual(response.status_code, 404)

    def test_categories_route(self):
        c = Client()
        response = c.get("/data/categories")
        self.assertEqual(response.status_code, 201)

    def test_user_route(self):
        c = Client()
        response = c.get("/data/user")
        self.assertEqual(response.status_code, 201)

    def test_blogs_route(self):
        c = Client()
        response = c.get("/data/blogs")
        self.assertEqual(response.status_code, 201)

    def test_get_new_blog_route(self):
        c = Client()
        response = c.get("/data/new_blog")
        self.assertEqual(response.status_code, 400)

    def test_post_new_blog_route_with_data(self):
        c = Client()
        jsondata=json.dumps({'title': 't1', 'description': 'd1', 'content': 'ct1', 'category': 'Web'})
        response = c.post(reverse('new_blog'), content_type=jsondata)
        self.assertEqual(response.status_code, 201)
    
    def test_post_new_blog_route_without_data(self):
        c = Client()
        response = c.post(reverse('new_blog'))
        self.assertEqual(response.status_code, 404)

    def test_get_new_comment_route(self):
        c = Client()
        response = c.get("/data/new_comment")
        self.assertEqual(response.status_code, 400)

    def test_post_new_comment_route_with_data(self):
        c = Client()
        jsondata=json.dumps({'comment': 'cmt1', 'blog_id': 1})
        response = c.post(reverse('new_comment'), content_type=jsondata)
        self.assertEqual(response.status_code, 201)
    
    def test_post_new_comment_route_without_data(self):
        c = Client()
        response = c.post(reverse('new_comment'))
        self.assertEqual(response.status_code, 404)

    def test_blogs_saved_route(self):
        c = Client()
        response = c.get("/data/blogs_saved")
        self.assertEqual(response.status_code, 201)

    def test_get_edit_blog_route(self):
        c = Client()
        response = c.get(reverse("edit_blog"))
        self.assertEqual(response.status_code, 400)

    def test_get_edit_profile_route(self):
        c = Client()
        response = c.get(reverse("edit_profile"))
        self.assertEqual(response.status_code, 400)

    def test_post_edit_blog_route_with_data(self):
        c = Client()
        jsondata = json.dumps({ 'uname': 'Admin', 'title': 'e_t1', 'description': 'e_d1', 'content': 'e_ct1', 'category': 'Web', 'bid': 1})#f"{bid}"
        response = c.post(reverse("edit_blog"), content_type=jsondata)
        self.assertEqual(response.status_code, 201)

    def test_post_edit_profile_route_with_data(self):
        c = Client()
        jsondata = json.dumps({ 'uname': 'Admin', 'bio': 'NewBio'})
        response = c.post(reverse("edit_profile"), content_type=jsondata)
        self.assertEqual(response.status_code, 201)

    def test_post_edit_profile_route_without_data(self):
        c = Client()
        response = c.post(reverse("edit_profile"))
        self.assertEqual(response.status_code, 404)

    def test_not_found_page(self):
        c = Client()
        response = c.get(f"/data/page1")
        self.assertEqual(response.status_code, 404)
"""
=>=>=> First Tests(Takes more time than the Tests above one)
class BlogTestCase(TestCase):
    #@classmethod

    def setUp(self):
        u1 = User.objects.create(username="Admin", email="Admin@admin.admin", password="0000")
        u2 = User.objects.create(username="Admin2", email="Admin2@admin.admin", password="00002")
        u3 = User.objects.create(username="1", email="1@1.1", password="1")

        c1 = Category.objects.create(category="Web")
        c2 = Category.objects.create(category="Gaming")

        b1 = Blog.objects.create(title="t1", description="d1", content="ct1", created_by=u1, category=c1)
        b1.likes.set([u3, u2])
        b2 = Blog.objects.create(title="t2", description="d2", created_by=u2, category=c2)
        b3 = Blog.objects.create(title="t3", description="d3", content="ct3", created_by=u2, category=c1)
        b3.likes.set([u1])

        p1 = Profile.objects.create(user=u1, bio="This is Admin")
        p1.saves.set([b3])
        p2 = Profile.objects.create(user=u2, bio="Music Lover")
        p2.saves.set([b1, b3, b2])
        p3 = Profile.objects.create(bio="")

        cm1 = Comments.objects.create(created_by=u2, content="cm1", on_blog=b1)
        cm1.likes.set([u1])
        cm2 = Comments.objects.create(created_by=u3, content="cm2", on_blog=b2)
        cm2.likes.set([u2])
        cm3 = Comments.objects.create(created_by=u3, content="cm3", on_blog=b1)
        cm3.likes.set([u1, u2])
        cm4 = Comments.objects.create(created_by=u1, content="cm4", on_blog=b1)

    # Test Models
    def test_users_count(self):
        u = User.objects.all()
        self.assertEqual(u.count(), 3)

    def test_profiles_count(self):
        p = Profile.objects.all()
        self.assertEqual(p.count(), 3)

    def test_category_count(self):
        c = Category.objects.all()
        self.assertEqual(c.count(), 2)

    def test_blog_count(self):
        b = Blog.objects.all()
        self.assertEqual(b.count(), 3)

    def test_blog_count_2(self):
        u2 = User.objects.get(username="Admin2")
        b = Blog.objects.filter(created_by=u2)
        self.assertEqual(b.count(), 2)

    def test_comment_count(self):
        cm = Comments.objects.all()
        self.assertEqual(cm.count(), 4)

    def test_comment_count_2(self):
        u1 = User.objects.get(username="Admin")
        cm = Comments.objects.filter(created_by=u1)
        self.assertEqual(cm.count(), 1)

    def test_valid_blog(self):
        b1 = Blog.objects.get(title="t1")
        self.assertTrue(b1.is_valid_blog())

    def test_invalid_blog(self):
        b1 = Blog.objects.get(title="t2")
        self.assertFalse(b1.is_valid_blog())

    def test_valid_profile(self):
        u1 = User.objects.get(username="Admin")
        p1 = Profile.objects.get(user=u1)
        self.assertTrue(p1.is_valid_profile())

    def test_invalid_profile(self):
        p3 = Profile.objects.get(bio="")
        self.assertFalse(p3.is_valid_profile())

    def test_blog_likes_count(self):
        b1 = Blog.objects.get(title="t1")
        self.assertEqual(b1.likes.count(), 2)

    def test_blog_likes_count_2(self):
        b2 = Blog.objects.get(title="t2")
        self.assertEqual(b2.likes.count(), 0)

    def test_blog_comments_count(self):
        b1 = Blog.objects.get(title="t1")
        cms = Comments.objects.filter(on_blog=b1)
        self.assertEqual(cms.count(), 3)
    
    def test_blog_comments_count_2(self):
        b3 = Blog.objects.get(title="t3")
        cms = Comments.objects.filter(on_blog=b3)
        self.assertEqual(cms.count(), 0)

    def test_blog_comments_count_3(self):
        b2 = Blog.objects.get(title="t2")
        self.assertEqual(b2.likes.count(), 0)

    def test_comment_likes_count(self):
        cm1 = Comments.objects.get(content="cm1")
        self.assertEqual(cm1.likes.count(), 1)

    def test_comment_likes_count_2(self):
        cm4 = Comments.objects.get(content="cm4")
        self.assertEqual(cm4.likes.count(), 0)

    def test_saves_blog_count(self):
        u2 = User.objects.get(username="Admin2")
        p2 = Profile.objects.get(user=u2)
        self.assertEqual(p2.saves.count(), 3)

    def test_saves_blog_count_2(self):
        u1 = User.objects.get(username="Admin")
        p1 = Profile.objects.get(user=u1)
        self.assertEqual(p1.saves.count(), 1)

    # Test Urls
    def test_login_url(self):
        url = reverse('login')
        self.assertEqual(resolve(url).func, login_view)

    def test_logout_url(self):
        url = reverse('logout')
        self.assertEqual(resolve(url).func, logout_view)

    def test_register_url(self):
        url = reverse('register')
        self.assertEqual(resolve(url).func, register_view)

    def test_categories_url(self):
        url = reverse('categories')
        self.assertEqual(resolve(url).func, categories)

    def test_user_url(self):
        url = reverse('user')
        self.assertEqual(resolve(url).func, user)

    def test_blogs_url(self):
        url = reverse('blogs')
        self.assertEqual(resolve(url).func, blogs)

    def test_new_blog_url(self):
        url = reverse('new_blog')
        self.assertEqual(resolve(url).func, new_blog)

    def test_new_comment_url(self):
        url = reverse('new_comment')
        self.assertEqual(resolve(url).func, new_comment)

    def test_blogs_saved_url(self):
        url = reverse('blogs_saved')
        self.assertEqual(resolve(url).func, blogs_saved)
    
    def test_edit_blog_url(self):
        url = reverse('edit_blog')
        self.assertEqual(resolve(url).func, edit_blog)

    def test_blog_page_url(self):
        #In args you can give it whatever: args=["str"] / args=[int]
        url = reverse('blog_page', args=[1])
        self.assertEqual(resolve(url).func, blog_page)

        c = Client()
        response = c.get("/data/blog_page/1")
        self.assertEqual(response.status_code, 201)

    def test_user_page_url(self):
        url = reverse('user_page', args=[1])
        self.assertEqual(resolve(url).func, user_page)

        c = Client()
        response = c.get("/data/user_page/1")
        self.assertEqual(response.status_code, 201)

    def test_like_comment_url(self):
        url = reverse('like_comment', args=[1])
        self.assertEqual(resolve(url).func, like_comment)

        c = Client()
        response = c.get("/data/like_comment/1")
        self.assertEqual(response.status_code, 201)
    
    def test_unlike_comment_url(self):
        url = reverse('unlike_comment', args=[1])
        self.assertEqual(resolve(url).func, unlike_comment)

        c = Client()
        response = c.get("/data/unlike_comment/1")
        self.assertEqual(response.status_code, 201)

    def test_like_blog_url(self):
        url = reverse('like_blog', args=[1])
        self.assertEqual(resolve(url).func, like_blog)

        c = Client()
        response = c.get("/data/like_blog/1")
        self.assertEqual(response.status_code, 201)
    
    def test_unlike_blog_url(self):
        url = reverse('unlike_blog', args=[1])
        self.assertEqual(resolve(url).func, unlike_blog)

        c = Client()
        
        response_incorrect_url = c.get("/data/unlike_blog/string")
        self.assertEqual(response_incorrect_url.status_code, 404)

        response_correct_url = c.get("/data/unlike_blog/1")
        self.assertEqual(response_correct_url.status_code, 201)

    def test_save_blog_url(self):
        url = reverse('save_blog', args=[1])
        self.assertEqual(resolve(url).func, save_blog)

        c = Client()
        response = c.get("/data/save_blog/1")
        self.assertEqual(response.status_code, 201)
    
    def test_unsave_blog_url(self):
        url = reverse('unsave_blog', args=[1])
        self.assertEqual(resolve(url).func, unsave_blog)

        c = Client()
        response = c.get("/data/unsave_blog/1")
        self.assertEqual(response.status_code, 201)

    def test_delete_blog_url(self):
        url = reverse('delete_blog', args=[1])
        self.assertEqual(resolve(url).func, delete_blog)

        c = Client()
        response = c.get("/data/delete_blog/1")
        self.assertEqual(response.status_code, 201)

    # Test Client Side
    def test_index(self):
        c = Client()
        response = c.get("/data/")
        self.assertEqual(response.status_code, 200)

    def test_get_login_route(self):
        c = Client()
        response = c.get("/data/login")
        self.assertEqual(response.status_code, 400)

    def test_post_login_route_with_data(self):
        c = Client()
        jsondata=json.dumps({'username': 'Admin', 'password': '0000'})
        response = c.post(reverse('login'), content_type=jsondata)
        self.assertEqual(response.status_code, 201)

    def test_post_login_route_without_data(self):
        c = Client()
        response = c.post(reverse('login'))
        self.assertEqual(response.status_code, 404)

    def test_logout_route(self):
        c = Client()
        response = c.get("/data/logout")
        self.assertEqual(response.status_code, 201)

    def test_get_register_route(self):
        c = Client()
        response = c.get("/data/register")
        self.assertEqual(response.status_code, 400)

    def test_post_register_route_with_data(self):
        c = Client()
        jsondata=json.dumps({'username': 'Admin', 'email': 'Admin@admin.admin', 'password': '0000', 'confirmation': '0000'})
        response = c.post(reverse('register'), content_type=jsondata)
        self.assertEqual(response.status_code, 201)
    
    def test_post_register_route_without_data(self):
        c = Client()
        response = c.post(reverse('register'))
        self.assertEqual(response.status_code, 404)

    def test_categories_route(self):
        c = Client()
        response = c.get("/data/categories")
        self.assertEqual(response.status_code, 201)

    def test_user_route(self):
        c = Client()
        response = c.get("/data/user")
        self.assertEqual(response.status_code, 201)

    def test_blogs_route(self):
        c = Client()
        response = c.get("/data/blogs")
        self.assertEqual(response.status_code, 201)

    def test_get_new_blog_route(self):
        c = Client()
        response = c.get("/data/new_blog")
        self.assertEqual(response.status_code, 400)

    def test_post_new_blog_route_with_data(self):
        c = Client()
        jsondata=json.dumps({'title': 't1', 'description': 'd1', 'content': 'ct1', 'category': 'Web'})
        response = c.post(reverse('new_blog'), content_type=jsondata)
        self.assertEqual(response.status_code, 201)
    
    def test_post_new_blog_route_without_data(self):
        c = Client()
        response = c.post(reverse('new_blog'))
        self.assertEqual(response.status_code, 404)

    def test_get_new_comment_route(self):
        c = Client()
        response = c.get("/data/new_comment")
        self.assertEqual(response.status_code, 400)

    def test_post_new_comment_route_with_data(self):
        c = Client()
        jsondata=json.dumps({'comment': 'cmt1', 'blog_id': 1})
        response = c.post(reverse('new_comment'), content_type=jsondata)
        self.assertEqual(response.status_code, 201)
    
    def test_post_new_comment_route_without_data(self):
        c = Client()
        response = c.post(reverse('new_comment'))
        self.assertEqual(response.status_code, 404)

    def test_blogs_saved_route(self):
        c = Client()
        response = c.get("/data/blogs_saved")
        self.assertEqual(response.status_code, 201)

    def test_get_edit_data_route(self):
        c = Client()
        #response = c.get("/data/edit_blog")
        response = c.get(reverse("edit_blog"))
        self.assertEqual(response.status_code, 400)

    def test_post_edit_blog_route_with_data(self):
        bid = Blog.objects.first().id
        c = Client()
        jsondata = json.dumps({ 'uname': 'Admin', 'title': 'e_t1', 'description': 'e_d1', 'content': 'e_ct1', 'category': 'Web', 'bid': 1})#f"{bid}"
        response = c.post(reverse("edit_blog"), content_type=jsondata)
        self.assertEqual(response.status_code, 201)

    def test_post_edit_blog_route_without_data(self):
        bid = Blog.objects.first().id
        c = Client()
        response = c.post(reverse("edit_blog"))
        self.assertEqual(response.status_code, 404)

    def test_user_page(self):
        u = User.objects.get(username="Admin")

        c = Client()
        response = c.get(f"/data/user_page/{u.id}")
        self.assertEqual(response.status_code, 201)

    def test_not_found_page(self):
        c = Client()
        response = c.get(f"/data/page1")
        self.assertEqual(response.status_code, 404)

    # Test Views with arguments on URLs
    #def test_blog_page_route(self):
       # c = Client()
       # response = c.get(reverse("blog_page"), args=[1])
       # self.assertEqual(reselve(response).status_code, 201)

        #url = reverse('blog_page', args=[1])
        #self.assertEqual(url.status_code, 201)"""