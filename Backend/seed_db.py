import random
from database import SessionLocal
from models import Todo, User
from auth import get_password_hash

def seed_database():
    db = SessionLocal()
    
    # 1. First, we need a user to own these todos! Let's create a test user.
    dummy_username = "testuser"
    
    # Check if the user already exists
    existing_user = db.query(User).filter(User.username == 1).first()
    
    if not existing_user:
        pass
    else:
        dummy_user = existing_user
        print(f"Test user '{dummy_username}' already exists.")

    # 2. Generate 300 random Todos
    statuses = ["Todo", "In progress", "Done", "Canceled"]
    sample_tasks = [
        "Buy groceries", "Walk the dog", "Finish the quarterly report", 
        "Call mom", "Read 10 pages", "Water the indoor plants", 
        "Clean the kitchen", "Do the laundry", "Fix the leaky sink", 
        "Learn more Python", "Build an awesome React app", "Review pull requests",
        "Go for a 5k run", "Meal prep for the week", "Pay the electricity bill"
    ]
    
    print("Generating 300 random todos...")
    todos_to_add = []
    
    for i in range(300):
        # Pick a random task string and a random status
        random_text = f"{random.choice(sample_tasks)} (Task #{i+1})"
        random_status = random.choice(statuses)
        
        # Create a Todo object linked to our dummy_user
        new_todo = Todo(
            text=random_text,
            status=random_status,
            owner_id=1
        )
        todos_to_add.append(new_todo)
        
    # Using add_all makes it much faster than adding them one by one
    db.add_all(todos_to_add)
    db.commit()
    
    print("✅ Successfully added 300 random todos to the database!")
    db.close()

if __name__ == "__main__":
    seed_database()
