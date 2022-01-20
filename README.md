# [TASKonquer](https://taskonquer-app.herokuapp.com/)
## This is a Task-Management Web Application built for CVWO assignment.

## Made with React.js and Ruby on Rails and styled by Bootstrap

### Description
This is a web app that can keep track of the tasks from multiple users.
Users will be able to track the urgency and importance of a task using deadlines and importance rankings.
Users can choose to display their tasks as public or private and mark the tasks when completed.
Users can make tags to categorise their own tasks.

### Use cases and features
1. Basic CRUD functionality for Tasks and Tags
    * Public tasks and all tags are accessible to all users
    * Private tasks are only accessible to the user who owns the task
    * Users can only create, update, and delete tasks when logged in
    * Users can add / remove their tasks to / from their own tag
2. Sorting and filtering of tasks by parameters and tags respectively
    * Query string from the “get” request can be used to determine how sorting is done
    * Tags can be used to filter tasks, showing only the tasks that are tagged
3. User friendly interface
    * Intuitive task management and tagging
4. User authentication
    * Done with “bcrypt” gem
    * Ensure that only authorised user can perform CRUD on the appropriate Tasks and Tags

### Rails version: Rails 6.1.4.4

### Database used: PostgreSQL

### How to run the code locally:
1) cd into project folder
2) run "bundle install"
3) run "yarn install"
4) run "rails db:create"
5) run "rails db:migrate"
6) run "rails db:seed" to preload some tasks and tags (Optional)
7) run "rails s" to start the server

#### If database migration required, run the following (For first time launch):
```
rails db:migrate:up VERSION=20211228074338
rails db:migrate
sudo service postgresql restart
```

Note to self for improvements
1) <del>Search is currently case-sensitive, it shouldnt be</del>
2) <del>"No Deadline" should be sorted last</del>
3) Completion of tasks should be easy to update
4) <del>Colour code deadlines that are approaching</del>
5) <del>Improve tagging management</del>
6) Introduce private tags
7) Fix bug for change taggings -> some devices can change taggings of tasks while others can't
8) Make app layout compatible for mobile use

Submission Status: Submitted
