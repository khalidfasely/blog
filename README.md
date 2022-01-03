# This Project used Python on the back-end and JavaScript on the front-end
This app it's a Blog App, so you can create/delete a blog, read a blog, like/unlike a blog, save/unsave a blog, comment to a blog..(More details bellow)

## Back-end (Python-Django):
The backend folder project is blog/ :
In this folder as you can see there is the default files that comes with Django
1- First I create the models:
    - User: for the users I use the default model.
    - Blog: This model contain all the blog's informations as the Title, the Description, the Content, the Likes...
    - Category: This model contain just the category so when you create a blog you have to choose a category for it.
    - Profile: This model contain the profile's infos as the Bio, the Saved blogs...
    - Comments: This model contain the comment's informations as on wich blog is this comment belong...

2- Second I edit admin.py file to change data from the admin page that comes with Django.

3- Third I create the Views:
    => In the views.py file I import all the things that I will need as JsonResponse, The models...

    - user view: This view return the user's logged in information to the front-end like username, id, blogs/comment that he likes, blogs that he saves.
    - categories view: Returns every category on the database.
    - user_page view: Returns profile informations, the bio, blogs that he creates, and other informations.
    - edit_profile view: this view try to edit the bio on the profile and returns the result.
    - login_view: This view try to login, and then return the informations about the user logged in.
    - logout_view: This view logout the user that logged in.
    - register_view: This view try to create a new user, then login and returns the user informations to the front-end.
    - blogs view: Returns all blogs on the database.
    - blog_page: Returns all data about an exact blog.
    - new_blog view: This view try to create a new blog, then return the blog's information.
    - edit_blog view: This view try to edit a blog, then returns the result.
    - delete_blog view: To delete a blog from the database.
    - new_comment view: This view try to create a new comment, and then returns it.
    - like_blog/unlike_blog: To Like or Unlike a blog.
    - like_comment/unlike_comment: To Like or Unlike a comment.
    - blogs_saved: Returns the blogs that the logged in user saved.
    - save_blog/unsave_blog: To Save or Unsave a blog.

4- Forth I create a url on the urls.py file for every view.

5- Last I create the tests for the views on the tests.py file.


## Front-end (JavaScript-React):
The folder for the front-end is blog-f-e/:
When we go to this folder and to the src/ folder, we first see:
- The __mocks__/ folder that containes all the modules that needs to be mocked for tests purpose.
- The actions/ folder that containes files like auth.js blogs.js ... with actions for the Redux Store.
- The components/ folder that containes all components that renders the app, every component is response for a part of the app(Header component response for the header in the app...).
- The fetching/ folder that containes files, each of them contain function that response for fetch specific data from the backend views.
- The functions/ folder containes some functions that I used on the components.
- The images/ folder containes all images and icons I used on the app.
- The reducers/ folder containes files, every file contain a Redux reducer.
- The router/ folder containes 3 files:
    - AppRouter.js: as the root of the app and specified every component with his URL.
    - PriveteRoute.js and SignRoute.js: check if some user have the acces to some page.
- The store/ folder containes a configureStore.js file that combine all the reducers.
- The styles/ containes:
    - base/: That containes the base of styling.
    - components/: that containes file style for every component.
    - styles.scss: that imports all these files.
- The tests/ folder that containes all actions/, components/, functions/, reducers/, router/ folders tests, and the fictures/ folder it's a fake data to tests some files that needs it.