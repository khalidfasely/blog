# Distinctiveness and Complexity:
## Requirements :

> Your web application must be sufficiently distinct from the other projects in this course (and, in addition, may not be based on the old CS50W Pizza project), and more complex than those.

I think my project meets this requirement as it's very different from all the projects I built on CS50w course like wiki, commerce, network...
And the Idea of this project came to me when I was building my personal portfolio and I was thinking of a blog page for the portfolio, and I decide to make it(the idea of a Blog) a separate Application for the final project of the course.

> Your web application must utilize Django (including at least one model) on the back-end and JavaScript on the front-end.

The app is using Django on the back-end with 5 models, and using ReactJs (Javascript Framework) on the front-end.

> Your web application must be mobile-responsive.

All the pages on the app are mobile-responsive and works fine on all devices.


# Overview
As I start building my portfolio I think of a blog page for it, from there I got the idea of creating a blog app as the final project of CS50w.  
This app it's a Blog App, so the user can create a profile, create/delete a blog, read a blog, like/unlike a blog, save/unsave a blog, comment to a blog..(More details bellow)  
To build this App I used Django, React and Sass.

# Routes
## Login: /login
User can log into the website using a valid username and password for an existing account.

## Register: /register
User must enter their username, email address, password and confirmation password.  
The validation of the page are:
1. The password must match the confirmation password.
2. The username should be unique, meaning no other existing account has the same username.

## Index: /
This page makes a GET request to the blogs API route to get all the blogs, this page is access by every user no matter if he's logged in or not. Then display all the blogs on the database. The user who created a blog can delete it from this page.  
This page also contains a filter by search. 

## New blog: /new
This page responsable for creating new blog for the Users already logged in.  
If the the form submitted with empty data some errors will display.
The same form in this page will display when some user want to edit his blog but in this case the form will be displayed with the current blog data.  
After an User submit the form with the right data he will redirect to the home page ( / ).

## Blog page: /blog/\<blogID>
This page display All the details about a blog, some of them displayed to everyone, some of them displayed only for Users that logged in:

- Display to everyone: the blog content like the title, description, body of the blog, the comments, the share section for share the blog with other people, number of likes..
- Display only to users logged in: the form for add new comment, button for like/unlike a comment, button for like/unlike a blog, button for save/unsave a blog, and finally button to edit a blog if your the creater of it.

## User page: /user/\<userID>
This page display All the blogs created by a User and some other informations about the user like the date of joining and the bio.  
The User who visit his page can edit the bio or go to the saved page.

## Saved page: /saves
This page display all the blogs that the user logged in saved.  
This page only available for the users logged in.


# Models
There is 5 models in this app(BlogApp)

1. User: An extension of Django's AbstractUser model. Stores the informations about users.
2. Category: Store the categories to use them on the blog.
3. Blog: Store blogs informations (**title**, **description**, **content**, **created_at**, **created_by**, **likes** is ManyToMany relationship with the User, **dislikes** is the same as likes field, **category**)
4. Profile: Creates a OneToOne relationship with User, it store more informations about the users like the bio, and the saved blogs.
5. Comments: Stores comments that Users create on some blog, it containes 5 fields:     
**created_by**, **created_at**, **content**, **blog_on**, and **likes**.


# Directories and files

## final_project/ folder:
This folder comes with django as the project folder and it containes the settings.py file...

## blog/ folder:
The backend folder project is blog/ :
In this folder as you can see there are the default files that comes with Django and the files I created:

1- First I create the models:
- User: for the users I use the default model.
- Blog: This model contain all the blog's informations as the Title, the Description, the Content, the Likes...
- Category: This model contain just the category so when you create a blog you have to choose a category for it.
- Profile: This model contain the profile's infos as the Bio, the Saved blogs...
- Comments: This model contain the comment's informations as on wich blog is this comment belong...

2- Second I edit admin.py file to access the data from the admin page that comes with Django.

3- Third I create the Views:

- In the views.py file I import all the things that I will need as JsonResponse, The models...

    - user view: This view return the user's logged in informations to the front-end like username, id, blogs/comments that he liked, blogs that he saved.
    - categories view: Returns every category on the database.
    - user_page view: Returns profile informations, the bio, blogs that the user created, and other informations.
    - edit_profile view: this view try to edit the bio on the profile and returns the new one.
    - login_view: This view try to login, and then return the informations about the user logged in.
    - logout_view: This view logout the user that logged in.
    - register_view: This view try to create a new user, then login and returns the user informations to the front-end.
    - blogs view: Returns all blogs on the database.
    - blog_page: Returns all data about an exact blog.
    - new_blog view: This view try to create a new blog, then return the blog's information.
    - edit_blog view: This view try to edit a blog, then returns the new data.
    - delete_blog view: To delete a blog from the database.
    - new_comment view: This view try to create a new comment, and then returns it.
    - like_blog/unlike_blog: To Like or Unlike a blog.
    - like_comment/unlike_comment: To Like or Unlike a comment.
    - blogs_saved: Returns the blogs that the logged in user saved.
    - save_blog/unsave_blog: To Save or Unsave a blog.

4- Forth I create a url on the urls.py file for every view.

5- Last I create the tests for the views on the tests.py file.


## blog-f-e/ folder:
The folder for the front-end is blog-f-e/:  
When we go to this folder and to the src/ folder, we first see:
- The __ mocks __/ folder that containes all the modules that needs to be mocked for tests purpose.
- The actions/ folder that containes files like auth.js blogs.js ... with actions for the Redux Store.
- The components/ folder that containes all components that renders the app, every component is response for a part of the app(Header component response for the header in the app...).
- The fetching/ folder that containes files, each of them contain function that response for fetch specific data from the backend views.
- The functions/ folder containes some functions that I used on the components.
- The images/ folder containes all images and icons I used on the app.
- The reducers/ folder containes files, every file contain a Redux reducer.
- The router/ folder containes 3 files:
    - AppRouter.js: as the root of the app and specified every component with his URL.
    - PriveteRoute.js and SignRoute.js: check if some user have the access to some page, if yes render the page, if no redirect the User to an available page.
- The store/ folder containes a configureStore.js file that combine all the Redux reducers.
- The styles/ containes:
    - base/: That contains some base styling.
    - components/: That containes styles files, every file contains styles for a specific component.
    - styles.scss: That imports all the styles files, and this file is the one imported on the root of the app(index.js file).
- The tests/ folder that containes all actions/, components/, functions/, reducers/, router/ folders tests, and the fictures/ folder it's a fake data to tests some files that needs it.

# How to run the application
First you must have Python and Django and NodeJs installed in your machine
- Then you need to go to the front-end folder(blog-f-e/) and run npm install to create node_modules/ folder.
- Then back on the root of the app run python manage.py runserver.