# [TASKonquer](https://taskonquer-app.herokuapp.com/)

## Stanley Neoh Jia Jun (A0234457B)
This is a Task-Management Web Application built for CVWO assignment.
Made with React.js and Ruby on Rails and styled by Bootstrap
###### Rails version: Rails 6.1.4.4
###### Database used: PostgreSQL
###### User authentication done with bcrypt gem

## Use cases and features
1. Basic CRUD functionality for Tasks and Tags
2. Sorting and filtering of tasks by parameters and tags respectively
3. User friendly interface
4. User authentication

## How to run the code locally:
1) cd into project folder
2) run "bundle install"
3) run "yarn install"
4) run "rails db:create"
5) run "rails db:migrate"
6) run "rails db:seed" to preload some tasks and tags (Optional)
7) run "rails s" to start the server

## If database migration required, run the following (For first time launch):
```
rails db:migrate:up VERSION=20211228074338
rails db:migrate
sudo service postgresql restart
```

## User manual
### Home page
![Home page when not logged in](https://res.cloudinary.com/deb0xrj56/image/upload/v1642678323/CVWO%20assets/README%20Pics/Home_notLoggedIn_otynsj.png)

### Tasks page
![Task page when not logged in](https://res.cloudinary.com/deb0xrj56/image/upload/v1642679126/CVWO%20assets/README%20Pics/Tasks_notLoggedIn_eqpki3.png)
![Task page when searching and sorting](https://res.cloudinary.com/deb0xrj56/image/upload/v1642679431/CVWO%20assets/README%20Pics/Tasks_searchingAndSorting_ee7jxm.png)
In the tasks page, you can see all public tasks by other users and your own task. You can sort the task by clicking on the header of a certain column or search of a particular task with the search box.

### Tags page
![Tags page when not logged in](https://res.cloudinary.com/deb0xrj56/image/upload/v1642679653/CVWO%20assets/README%20Pics/Tags_notLoggedIn_ahbt1d.png)
In the tags page, you can see all tags by all users. Tags can be sorted by name or searched for with the search box.

### Logging in
![Login page](https://res.cloudinary.com/deb0xrj56/image/upload/v1642680028/CVWO%20assets/README%20Pics/Login_loggingin_uuawxs.png)
In the login page, you can login to your account or click on "create new account" to make a new account. Once logged in, you will be able to create, read, update and delete your tasks and tags.

### Looking at a particular task
![Particular task](https://res.cloudinary.com/deb0xrj56/image/upload/v1642680377/CVWO%20assets/README%20Pics/Task_main_w09kfk.png)
Here you can edit or delete the displayed task if you are the owner of the task.

### Looking at a particular tag
![Particular tag](https://res.cloudinary.com/deb0xrj56/image/upload/v1642680607/CVWO%20assets/README%20Pics/Tag_main_icxkih.png)
Here you can look at all tasks associated to the tags as well as edit and delete the tag if you are the owner of the tag. The table of tasks is the same as the table found on the main tasks page, hence sorting and searching are supported.

![Update Tagging](https://res.cloudinary.com/deb0xrj56/image/upload/v1642680716/CVWO%20assets/README%20Pics/Tag_updateTagging_fig9rp.png)
If you click on the "change taggings" button, you will be brought here where you can choose which task will have the tag. When you are done, click on "update taggings" to re-tag your tasks.

### Looking at a particular User
![Particular User](https://res.cloudinary.com/deb0xrj56/image/upload/v1642681041/CVWO%20assets/README%20Pics/User_main_mbmavd.png)
If you are want to look at the tasks of a particular user, here is the place to go. You can choose to expand out and view all tasks and tags belonging to the user. Similar to the the main tasks and tags page, you can sort the tasks and tags by clicking on the column headers and search for a particular task or tag you are looking for.

If you are logged in as the user you are looking at, you can update your account details here as well as delete your account if you choose.

Feel free to explore the application to see how it works!