from django.test import Client, TestCase

from .models import User, Posts, Likes, Followers

# Create your tests here.

class PostsTestCase(TestCase):

    def setUp(self):
        u1 = User.objects.create(username="Admin", email="Admin@admin.admin", password="0000")
        u2 = User.objects.create(username="Admin2", email="Admin2@admin.admin", password="00002")
        u3 = User.objects.create(username="1", email="1@1.1", password="1")

        p1 = Posts.objects.create(user=u1, content="This is Admin")
        p2 = Posts.objects.create(user=u2, content="")
        p3 = Posts.objects.create(user=u3, content="This is 1")
        p4 = Posts.objects.create(user=u3, content="@Admin is my friend", likes=-1)

        Followers.objects.create(user_id=u1, following=u3)
        Followers.objects.create(user_id=u1, following=u1)

        Likes.objects.create(post_id=p4, likes_user_id=u1)
        Likes.objects.create(post_id=p3, likes_user_id=u1)

    def test_users_count(self):
        u = User.objects.all()
        self.assertEqual(u.count(), 3)

    def test_posts_count(self):
        p = Posts.objects.all()
        self.assertEqual(p.count(), 4)

    def test_likes_count(self):
        l = Posts.objects.get(content="This is Admin")
        self.assertEqual(l.likes, 0)

    def test_valid_post(self):
        u = User.objects.get(username="Admin")
        p = Posts.objects.get(user=u)
        self.assertTrue(p.is_valid_post())
    
    def test_invalid_post(self):
        u = User.objects.get(username="Admin2")
        p = Posts.objects.get(user=u)
        self.assertFalse(p.is_valid_post())

    def test_invalid_post(self):
        u = User.objects.get(username="1")
        p = Posts.objects.get(user=u, content="@Admin is my friend")
        self.assertFalse(p.is_valid_post())

    def test_valid_follower(self):
        u1 = User.objects.get(username="Admin")
        u3 = User.objects.get(username="1")
        f = Followers.objects.get(user_id=u1, following=u3)
        self.assertTrue(f.is_valid_follower())
    
    def test_invalid_follower(self):
        u1 = User.objects.get(username="Admin")
        f = Followers.objects.get(user_id=u1, following=u1)
        self.assertFalse(f.is_valid_follower())

    def test_valid_likes(self):
        u = User.objects.get(username="Admin")
        l = Likes.objects.filter(likes_user_id=u)
        self.assertEqual(l.count(), 2)
    
    def test_invalid_likes(self):
        u = User.objects.get(username="1")
        l = Likes.objects.filter(likes_user_id=u)
        self.assertEqual(l.count(), 0)

    def test_index(self):
        c = Client()
        response = c.get("/")
        self.assertEqual(response.status_code, 200)

    def test_user_page(self):
        u = User.objects.get(username="Admin")

        c = Client()
        response = c.get(f"/user/{u.id}")
        self.assertEqual(response.status_code, 200)
