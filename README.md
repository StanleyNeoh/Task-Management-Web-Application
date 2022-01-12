# [TASKonquer](https://taskonquer-app.herokuapp.com/)
## This is a Task-Management Web Application built for CVWO assignment.

## Made with React.js and Ruby on Rails and styled by Bootstrap

### Features
- tagging of tasks
- searching of tasks
- sorting of tasks by name, importance, completion and deadline
- User authentication to support multiple users on the site

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
