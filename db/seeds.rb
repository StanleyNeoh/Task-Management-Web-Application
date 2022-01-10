users =User.create([
    {
        username: "stanley",
        password: "stan",
        password_confirmation: "stan"
    },
    {
        username: "peter",
        password: "pass123",
        password_confirmation: "pass123"
    },
    {
        username: "simon",
        password_digest: "ABCDE"
    }
])

tasks = Task.create([
    {
        name: "clean house",
        description: "scrub the floor",
        importance: 0,
        deadline: DateTime.new(2025,2,3),
        public: true,
        completed: false,
        user_id: User.first.id
    },
    {
        name: "buy groceries",
        description: "carrots and apples",
        importance: 2,
        deadline: DateTime.new(2025,2,3),
        public: false,
        completed: false,
        user_id: User.first.id
    },
    {
        name: "take out the trash",
        description: "getting stinky",
        importance: 4,
        deadline: DateTime.new(2022, 2, 3),
        public: false,
        completed: true,
        user_id: User.second.id
    }
])

tags = Tag.create([
    {
        name: "chores",
        description: "things to do at home",
        colour: "blue",
        user_id: User.first.id
    },
    {
        name: "fast jobs",
        description: "things to do immediately",
        colour: "pink",
        user_id: User.second.id
    }
])

manifests = Manifest.create([
    {
        task_id: Task.first.id,
        tag_id: Tag.first.id
    },
    {
        task_id: Task.second.id,
        tag_id: Tag.first.id
    },
    {
        task_id: Task.first.id,
        tag_id: Tag.second.id
    },
    {
        task_id: Task.second.id,
        tag_id: Tag.second.id
    },
])

